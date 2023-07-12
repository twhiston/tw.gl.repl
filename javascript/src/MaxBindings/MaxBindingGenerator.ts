//@ts-ignore
import path from 'path';
//@ts-ignore
import fs from 'fs';
import ts from 'typescript';
import Handlebars, { HelperOptions } from 'handlebars';
import { MaxMspBindingOptions } from './MaxBindings';


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

Handlebars.registerHelper("truthy", function (conditional, options): any {
    if (conditional === 'true' || conditional === true) {
        // @ts-ignore
        return options.fn(this);
    } else {
        // @ts-ignore
        return options.inverse(this);
    }
});

Handlebars.registerHelper('isTextArgument', function (name: string, options): any {
    if (name === 'text') {
        // @ts-ignore
        return options.fn(this);
    } else {
        // @ts-ignore
        return options.inverse(this);
    }
});

Handlebars.registerHelper('moreThanOne', function (a: string, options): any {
    if (a.length > 1) {
        // @ts-ignore
        return options.fn(this);
    }
    // @ts-ignore
    return options.inverse(this);
});

//code types
//string number boolean unknown any string[]
//max types
//bang signal signal/float float int symbol list
const inputTypes = [
    { name: 'string', outputType: 'symbol' },
    { name: 'number', outputType: 'float' },
    { name: 'boolean', outputType: 'bang/int' },
    { name: 'any', outputType: 'symbol' },
    { name: 'string[]', outputType: 'list' },
];
Handlebars.registerHelper('maxTypeMapper', function (jsType) {
    const typeMapping = inputTypes.find(type => type.name === jsType);

    if (typeMapping) {
        return typeMapping.outputType;
    } else {
        return jsType;
        //throw new Error(`Invalid input type: ${jsType}`);
    }
});

function getCustomFunctionDefinitions(): Array<Object> {
    let genFuncs: any = []
    //Add all of our custom functionsa which live in our template and which are not generated on the fly
    // adding them here makes sure they also get added to the router and output appropriately to a mix
    // of custom handlers, the default out, back to the js object etc.
    genFuncs.push({
        functionName: "init",
        noroute: true,
        isMethod: true,
        isAttribute: false,
        paramCount: 0,
        comment: "Initialize the repl. This sets everything up and will clear the display etc. You should not need to call this in normal operation, prefer clear to empty the buffer. Loading a new settings dict will implictly call init()"
    });
    genFuncs.push({
        functionName: "ignore_keys",
        noroute: true,
        isMethod: true,
        isAttribute: true,
        paramCount: 0,
        comment: "Will stop the repl listening for any keypress, it will also stop blink from running as a visual indicator. Note that if you call this from within the repl you obviously can't start it again so you need to send a message from max to enable again"
    });
    genFuncs.push({
        functionName: "keyPress",
        noroute: false,
        isMethod: true,
        isAttribute: false,
        paramCount: 0,
        handlerInlet: 1,
        customHandler: "ignoreKeyGate",
        comment: "Process a keypress with the repl. This method is usually only called internally, but it is useful to expose in the router for functionality related to clipboard pasting. If in doubt you probably shouldn't be calling this from your code or configuration!"
    });
    genFuncs.push({
        functionName: "replay",
        noroute: false,
        isMethod: true,
        isAttribute: false,
        paramCount: 0,
        handlerInlet: 0,
        comment: "Replay some text into the repl, passing it through the keyPress function. This may or may not insert it into the buffer depending on configuration"
    });
    genFuncs.push({
        functionName: "run",
        customHandler: "runHandler",
        handlerInlet: 0,
        isMethod: true,
        isAttribute: false,
        paramCount: 0,
        comment: "output all the code in the repl, after passing it through attached formatters"
    });
    genFuncs.push({
        functionName: "run_line",
        customHandler: "runHandler",
        handlerInlet: 0,
        noRoute: false,
        isMethod: true,
        isAttribute: false,
        paramCount: 0,
        comment: "output the currently selected line of code in the repl, after passing it through attached formatters"
    });
    genFuncs.push({
        functionName: "read",
        customHandler: "readHandler",
        handlerInlet: 0,
        isMethod: true,
        isAttribute: false,
        paramCount: 1,
        comment: "read (playback) a file into the repl through the keypress handler. Optional first argument for filename otherwise opendialog",
        params: [
            {
                name: "filename",
                default: false,
                type: "string",
            }
        ]
    });
    genFuncs.push({
        functionName: "write",
        customHandler: "writeHandler",
        handlerInlet: 0,
        isMethod: true,
        isAttribute: false,
        paramCount: 1,
        params: [
            {
                name: "filename",
                default: false,
                type: "string",
            }
        ],
        comment: "write all the data in the repl to a file. Optional first argument for file otherwise savedialog. format_writes true/false (0/1) will affect if the output is passed throguh the formatters before being written to disk"
    });
    genFuncs.push({
        functionName: "keybindings",
        customHandler: "this",
        handlerInlet: 0,
        isMethod: true,
        isAttribute: false,
        paramCount: 1,
        params: [
            {
                name: "dictid",
                default: false,
                type: "string",
            }
        ],
        comment: "pass the name of a dict containing the config for the repl. By default loads shortkeys.json provided with the project. Cannot be used as an attribute so send you app configuration with a loadbang referencing a dict name instead"
    });
    genFuncs.push({
        functionName: "output_matrix",
        handlerInlet: 0,
        isMethod: true,
        isAttribute: true,
        paramCount: 1,
        params: [
            {
                name: "v",
                default: false,
                type: "bang/int",
            }
        ],
        comment: "If true then also output the text matrix name behind the command routing jit_matrix when code is run. Note that this does not stop other messages being output from the repl"
    });
    genFuncs.push({
        functionName: "supress_output",
        handlerInlet: 0,
        isMethod: true,
        isAttribute: true,
        paramCount: 1,
        params: [
            {
                name: "v",
                default: false,
                type: "bang/int",
            }
        ],
        comment: "If true then dont output the formatted messages. Can be used with output_matrix to only output the jit_matrix name from the repl"
    });
    genFuncs.push({
        functionName: "ephemeral_mode",
        handlerInlet: 0,
        isAttribute: true,
        isMethod: true,
        paramCount: 1,
        params: [
            {
                name: "v",
                default: false,
                type: "bang/int",
            }
        ],
        comment: "if true then after a run the text or line which was executed will be deleted from the repl"
    });
    genFuncs.push({
        functionName: "format_writes",
        handlerInlet: 0,
        isAttribute: true,
        isMethod: true,
        paramCount: 1,
        params: [
            {
                name: "v",
                default: false,
                type: "bang/int",
            }
        ],
        comment: "if true then run the repl content through formatters before saving to disk. if not dump directly. Defaults to true"
    });
    genFuncs.push({
        functionName: "output_paste_bin",
        customHandler: "this",
        handlerInlet: 0,
        isMethod: true,
        isAttribute: false,
        paramCount: 0,
        comment: "output the current contents of the pastebin from the second outlet. You should bind this to a key. See default bindings for example"
    });

    return genFuncs;
}
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
                    if (options.useArgsForText === undefined)
                        options.useArgsForText = false;
                    options.draws = classOptions.draws || options.draws;
                    options.throws = classOptions.throws || options.throws;
                    options.noroute = classOptions.noroute || options.noroute;
                    if (options.handlerInlet === undefined)
                        options.handlerInlet = 0;
                    if (options.isAttribute === undefined) {
                        options.isAttribute = classOptions.isAttribute;
                    }
                    if (options.isAttribute === undefined) {
                        options.isAttribute = false
                    }
                    if (options.isMethod === undefined) {
                        options.isMethod = classOptions.isMethod;
                    }
                    if (options.isMethod === undefined) {
                        options.isMethod = false
                    }
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

    protected generateMethodCode(options: MaxMspBindingOptions) {
        return {
            rendered: this.templates.methodTemplate({ options })
        }
    }

    protected generateAttributeCode(options: MaxMspBindingOptions) {
        return {
            rendered: this.templates.attributeTemplate({ options })
        }
    }

    writeGeneratedCode(bindings: Map<string, { filePath: string, options: MaxMspBindingOptions }>) {
        const bindingArr = Array.from(bindings.entries())
        let genMethods: any = []
        let genAttributes: any = []
        //Add our custom function definitions to our ones scraped from annotations
        const genFuncs = getCustomFunctionDefinitions()
        for (const b of bindingArr) {
            genFuncs.push(b[1].options)
        }
        //process inner templates
        for (const f of genFuncs) {
            const o = this.generateMethodCode(f)
            if (o.rendered !== '')
                genMethods.push(o)

            const a = this.generateAttributeCode(f)
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

        const genFuncs = getCustomFunctionDefinitions();
        //initialize with the fixed functions we have in our template
        for (const b of bindingArr) {
            genFuncs.push(b[1].options)
        }
        const generatedCode = this.templates.mainTemplate({ functions: genFuncs })

        fs.writeFileSync(this.outputPath, generatedCode);
    }

}