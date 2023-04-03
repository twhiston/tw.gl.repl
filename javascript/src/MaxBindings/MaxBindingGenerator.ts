import path from 'path';
import fs from 'fs';
import ts from 'typescript';
import Handlebars from 'handlebars';
import { MaxMspBindingOptions } from './MaxBindings';

export class MaxBindingGenerator {

    readonly projectDir: string;
    readonly srcDir: string;
    readonly outputDir: string;
    readonly outputPath: string;

    templateFiles = {
        mainTemplate: './src/MaxBindings/templates/main.hbs',
        functionTemplate: './src/MaxBindings/templates/function.hbs'
    };

    templates = Object.fromEntries(
        Object.entries(this.templateFiles).map(([name, filePath]) => {
            return [name, Handlebars.compile(fs.readFileSync(filePath, 'utf8'))];
        })
    );

    constructor(projectDir: string) {
        this.projectDir = projectDir
        this.srcDir = path.join(this.projectDir, 'src');
        this.outputDir = path.join(this.projectDir, 'dist');
        this.outputPath = path.join(this.outputDir, 'tw.gl.repl.js');
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
    mergeMaps<K, V>(map1: Map<K, V>, map2: Map<K, V>): Map<K, V> {
        return new Map([...map1, ...map2]);
    }

    generateBindingCode(name: string, options: MaxMspBindingOptions) {
        return {
            rendered: this.templates.functionTemplate({ options })
        }
    }

    uniq<T>(array: T[]) {
        return array.filter((value, index) => array.indexOf(value) === index);
    }

    writeGeneratedCode(bindings: Map<string, { filePath: string, options: MaxMspBindingOptions }>) {
        const bindingArr = Array.from(bindings.entries())
        let genFuncs: any = []
        let importPaths: Array<string> = []
        for (const b of bindingArr) {
            //const dirname = path.dirname(b[1].filePath)
            const relativePath = path.relative("src", path.dirname(b[1].filePath));
            //const requirePath = `./${relativePath}/${b[1].filePath}`;
            importPaths.push(relativePath)
            const o = this.generateBindingCode(b[0], b[1].options)
            genFuncs.push(o)
        }
        importPaths = this.uniq(importPaths)
        const generatedCode = this.templates.mainTemplate({ imports: importPaths, functions: genFuncs })

        fs.writeFileSync(this.outputPath, generatedCode);
    }

    findMaxMspBindings(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Map<string, { filePath: string, options: MaxMspBindingOptions }> {
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
                    options.functionName = options.functionName || name;
                    options.callName = name;
                    options.paramCount = node.parameters.length
                    options.params = []
                    for (const param of node.parameters) {
                        options.params.push(param.name.getText(sourceFile))
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

    extractBindings(optionsArg: any, checker: ts.TypeChecker): MaxMspBindingOptions {

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