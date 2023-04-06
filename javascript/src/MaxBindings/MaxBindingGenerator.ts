import path from 'path';
import fs from 'fs';
import ts from 'typescript';
import Handlebars from 'handlebars';
import { MaxMspBindingOptions } from './MaxBindings';

function cleanComment(comment: string) {
    return
}

Handlebars.registerHelper('cutComment', function (comment: string) {
    const cleanComment = comment.split('\\n')
        .map(line => line.replace(/(\/\/|[\/*])/g, ''))
        .join(' ')
        .trim();
    return cleanComment;
});

Handlebars.registerHelper('firstSentanceOrLine', function (comment: string) {
    const cleanComment = comment.split('\\n')
        .map(line => line.replace(/(\/\/|[\/*])/g, ''))
        .join('\n')
        .trim();
    return cleanComment.split(/[.\n]/, 1)[0];
});


// Using a self-invoking function just to illustrate the closure
(function () {
    // Start at 1, name this unique to anything in this closure
    var positionCounter = 0;

    Handlebars.registerHelper('outletCounter', function () {
        return positionCounter++;
    });

    // Compile/render your template here
    // It will use the helper whenever it seems position
})();


Handlebars.registerHelper('maxSelfReference', function (name: string) {
    return (name === "this")
});

export class MaxGenerator {

    readonly projectDir: string;
    readonly srcDir: string;
    readonly outputDir: string;
    readonly outputPath: string;

    templateFiles = {}

    templates: { [k: string]: HandlebarsTemplateDelegate<any>; }

    constructor(projectDir: string, templateFiles: any, outDir: string = 'dist', fileName: string = 'tw.gl.repl.js') {
        this.templateFiles = templateFiles
        this.projectDir = projectDir
        this.srcDir = path.join(this.projectDir, 'src');
        this.outputDir = path.join(this.projectDir, outDir);
        this.outputPath = path.join(this.outputDir, fileName);

        this.templates = Object.fromEntries(
            Object.entries(this.templateFiles).map(([name, filePath]) => {
                return [name, Handlebars.compile(fs.readFileSync(filePath as any, 'utf8'))];
            })
        );
    }

    generate(filteredFiles: Array<ts.SourceFile>, checker: ts.TypeChecker) {
        let bindings = new Map<string, { filePath: string, options: MaxMspBindingOptions }>();
        for (const file of filteredFiles) {
            bindings = this.mergeMaps(bindings, this.findMaxMspBindings(file, checker))
        }

        // // Write the generated code to a file
        this.writeGeneratedCode(bindings);
    }

    //helper function to merge all the maps we are going to make of bindings
    protected mergeMaps<K, V>(map1: Map<K, V>, map2: Map<K, V>): Map<K, V> {
        return new Map([...map1, ...map2]);
    }

    protected uniq<T>(array: T[]) {
        return array.filter((value, index) => array.indexOf(value) === index);
    }

    writeGeneratedCode(bindings: Map<string, { filePath: string, options: MaxMspBindingOptions }>) {
        //Implement this in a child class and write a file
        //fs.writeFileSync(this.outputPath, generatedCode);
    }

    protected findMaxMspBindings(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Map<string, { filePath: string, options: MaxMspBindingOptions }> {
        const bindings = new Map<string, { filePath: string, options: MaxMspBindingOptions }>();
        let classOptions: MaxMspBindingOptions = {};
        const visit = (node: ts.Node) => {
            //function visit(node: ts.Node) {
            const kindName = ts.SyntaxKind[node.kind];
            if (ts.isClassDeclaration(node)) {
                const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
                if (decorators === undefined)
                    return;
                let maxMspBindingDecorator = decorators.find(dec => ts.isIdentifier((<any>dec.expression).expression) && ((<any>dec.expression).expression.escapedText === 'maxMspBinding'));
                if (maxMspBindingDecorator) {
                    classOptions = this.extractBindings((<any>maxMspBindingDecorator?.expression).arguments[0], checker)
                }
            } else if (ts.isMethodDeclaration(node)) {
                //const decorators = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
                const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
                if (decorators === undefined)
                    return;
                let maxMspBindingDecorator = decorators.find(dec => ts.isIdentifier((<any>dec.expression).expression) && ((<any>dec.expression).expression.escapedText === 'maxMspBinding'));
                if (maxMspBindingDecorator) {


                    const options = this.extractBindings((<any>maxMspBindingDecorator?.expression).arguments[0], checker)

                    const name = node.name?.getText() || 'anonymousFunction';
                    const filePath = sourceFile.fileName;
                    options.instanceName = classOptions.instanceName || options.instanceName;
                    options.draws = classOptions.draws || options.draws;
                    options.throws = classOptions.throws || options.throws;
                    options.noroute = classOptions.noroute || options.noroute;
                    if (options.handlerInlet === undefined)
                        options.handlerInlet = 0;
                    options.functionName = options.functionName || name;
                    options.callName = name;
                    options.paramCount = node.parameters.length
                    options.params = []
                    for (const param of node.parameters) {
                        const parameterName = param.name.getText(sourceFile);
                        let parameterType: string
                        if (param.type === undefined)
                            parameterType = 'unknown'
                        else
                            parameterType = checker.typeToString(checker.getTypeAtLocation(param.type));

                        const hasDefaultValue = param.initializer !== undefined;
                        const defaultValue = hasDefaultValue ? param.initializer.getText(sourceFile) : false;
                        options.params.push({
                            name: parameterName,
                            type: parameterType,
                            default: defaultValue
                        })
                    }

                    const leadingTrivia = ts.getLeadingCommentRanges(sourceFile.text, maxMspBindingDecorator.getFullStart());
                    if (leadingTrivia && leadingTrivia.length > 0) {
                        const commentRange = leadingTrivia[leadingTrivia.length - 1];
                        options.comment = sourceFile.text.substring(commentRange.pos, commentRange.end).trim();
                    }

                    bindings.set(name, { filePath, options });
                }
            }
            ts.forEachChild(node, visit);
        }
        visit(sourceFile);
        return bindings;
    }

    protected extractBindings(optionsArg: any, checker: ts.TypeChecker): MaxMspBindingOptions {

        const options: MaxMspBindingOptions = {};

        if (!ts.isObjectLiteralExpression(optionsArg)) {
            // Handle invalid argument types
            console.warn('maxMspBinding decorator called with invalid arguments:', optionsArg);
            return options;
        }

        // Extract the options from the object literal
        for (const prop of optionsArg.properties) {
            if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                const propName = prop.name.escapedText.toString();
                const propValue = checker.typeToString(checker.getTypeAtLocation(prop.initializer));
                //strip any quotes
                options[propName] = propValue.replace(/['"]+/g, '');
            }
        }

        return options;
    }

}

export class MaxXmlGenerator extends MaxGenerator {

    protected generateMethodCode(name: string, options: MaxMspBindingOptions) {
        return {
            rendered: this.templates.methodTemplate({ options })
        }
    }

    protected generateAttributeCode(name: string, options: MaxMspBindingOptions) {
        return {
            rendered: this.templates.attributeTemplate({ options })
        }
    }

    writeGeneratedCode(bindings: Map<string, { filePath: string, options: MaxMspBindingOptions }>) {
        const bindingArr = Array.from(bindings.entries())
        let genMethods: any = []
        let genAttributes: any = []
        for (const b of bindingArr) {
            const o = this.generateMethodCode(b[0], b[1].options)
            if (o.rendered !== '')
                genMethods.push(o)

            const a = this.generateAttributeCode(b[0], b[1].options)
            if (a.rendered !== '')
                genAttributes.push(a)
        }
        const generatedCode = this.templates.mainTemplate({ methods: genMethods, attributes: genAttributes })

        fs.writeFileSync(this.outputPath, generatedCode);
    }

}

export class MaxBindingGenerator extends MaxGenerator {

    protected generateFunctionCode(name: string, options: MaxMspBindingOptions) {
        return {
            rendered: this.templates.functionTemplate({ options })
        }
    }

    writeGeneratedCode(bindings: Map<string, { filePath: string, options: MaxMspBindingOptions }>) {
        const bindingArr = Array.from(bindings.entries())
        let genFuncs: any = []
        let importPaths: Array<string> = []
        //initialize with the fixed functions we have in our template
        let funcNames: Array<string> = ['init', 'keyPress', 'run', 'read', 'write']
        for (const b of bindingArr) {
            const relativePath = path.relative("src", path.dirname(b[1].filePath));
            importPaths.push(relativePath)
            const o = this.generateFunctionCode(b[0], b[1].options)
            genFuncs.push(o)
            funcNames.push(b[0])
        }
        importPaths = this.uniq(importPaths)
        const generatedCode = this.templates.mainTemplate({ imports: importPaths, functions: genFuncs, functionNames: funcNames })

        fs.writeFileSync(this.outputPath, generatedCode);
    }

}

export class PatcherInitGenerator extends MaxGenerator {


    writeGeneratedCode(bindings: Map<string, { filePath: string, options: MaxMspBindingOptions }>) {
        const bindingArr = Array.from(bindings.entries())
        let genFuncs: any = []
        genFuncs.push({
            functionName: "init",
            noroute: true
        });
        genFuncs.push({
            functionName: "keyPress",
            noroute: true
        });
        genFuncs.push({
            functionName: "run",
            customHandler: "runHandler",
            handlerInlet: 0
        });
        genFuncs.push({
            functionName: "read",
            customHandler: "readHandler",
            handlerInlet: 0
        });
        genFuncs.push({
            functionName: "write",
            customHandler: "writeHandler",
            handlerInlet: 0
        });
        genFuncs.push({
            functionName: "keybindings",
            customHandler: "this",
            handlerInlet: 0
        });
        //initialize with the fixed functions we have in our template
        for (const b of bindingArr) {
            genFuncs.push(b[1].options)
        }
        const generatedCode = this.templates.mainTemplate({ functions: genFuncs })

        fs.writeFileSync(this.outputPath, generatedCode);
    }

}