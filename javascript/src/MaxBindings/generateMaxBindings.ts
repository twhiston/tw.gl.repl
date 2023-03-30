import ts from 'typescript';
import glob from 'glob';
import path from 'path';
import Handlebars from 'handlebars';
import fs from 'fs';
import { MaxMspBindingOptions } from './MaxBindings';

const projectDir = './';
const srcDir = path.join(projectDir, 'src');
const outputDir = path.join(projectDir, 'dist');
const outputPath = path.join(outputDir, 'tw.gl.repl.js');

// Options to configure the TypeScript Compiler API
const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    downlevelIteration: true
};

const templateFiles = {
    mainTemplate: './src/MaxBindings/templates/main.hbs',
    functionTemplate: './src/MaxBindings/templates/function.hbs'
};

const templates = Object.fromEntries(
    Object.entries(templateFiles).map(([name, filePath]) => {
        return [name, Handlebars.compile(fs.readFileSync(filePath, 'utf8'))];
    })
);

export function generateBindingCode(name: string, options: MaxMspBindingOptions) {
    return {
        rendered: templates.functionTemplate({ options })
    }
}

function uniq<T>(array: T[]) {
    return array.filter((value, index) => array.indexOf(value) === index);
}

export function writeGeneratedCode(bindings: Map<string, { filePath: string, options: MaxMspBindingOptions }>, outputPath: string) {
    const bindingArr = Array.from(bindings.entries())
    let genFuncs: any = []
    let importPaths: Array<string> = []
    for (const b of bindingArr) {
        //const dirname = path.dirname(b[1].filePath)
        const relativePath = path.relative("src", path.dirname(b[1].filePath));
        //const requirePath = `./${relativePath}/${b[1].filePath}`;
        importPaths.push(relativePath)
        const o = generateBindingCode(b[0], b[1].options)
        genFuncs.push(o)
    }
    importPaths = uniq(importPaths)
    const generatedCode = templates.mainTemplate({ imports: importPaths, functions: genFuncs })

    fs.writeFileSync(outputPath, generatedCode);
}

export function findMaxMspBindings(sourceFile: ts.SourceFile, checker: ts.TypeChecker): Map<string, { filePath: string, options: MaxMspBindingOptions }> {
    const bindings = new Map<string, { filePath: string, options: MaxMspBindingOptions }>();
    function visit(node: ts.Node) {
        const kindName = ts.SyntaxKind[node.kind];
        if (ts.isClassDeclaration(node)) {
            //TODO - add class decorator stuff
        } else if (ts.isMethodDeclaration(node)) {
            //const decorators = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
            const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
            if (decorators === undefined)
                return;
            let maxMspBindingDecorator = decorators.find(dec => ts.isIdentifier((<any>dec.expression).expression) && ((<any>dec.expression).expression.escapedText === 'maxMspBinding'));
            if (maxMspBindingDecorator) {

                const options: MaxMspBindingOptions = {};
                const optionsArg = (<any>maxMspBindingDecorator.expression).arguments[0];

                if (!ts.isObjectLiteralExpression(optionsArg)) {
                    // Handle invalid argument types
                    console.warn('maxMspBinding decorator called with invalid arguments:', optionsArg);
                    return;
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

                const name = node.name?.getText() || 'anonymousFunction';
                const filePath = sourceFile.fileName;
                options.functionName = options.functionName || name;
                options.callName = name;
                bindings.set(name, { filePath, options });
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return bindings;
}

// Find all TypeScript files in the source directory
const files = glob.sync('**/*.ts', { cwd: srcDir });

// // Create a TypeScript program from the source files and options
const program = ts.createProgram(files.map(file => path.join(srcDir, file)), options);
//IMPORTANT!!! You must call this to force bindings or names etc. will not work
const checker = program.getTypeChecker();

// // Get the root file of the program
const filteredFiles = program.getSourceFiles().filter(sourceFile => files.includes(path.relative(srcDir, sourceFile.fileName)))

//helper function to merge all the maps we are going to make of bindings
function mergeMaps<K, V>(map1: Map<K, V>, map2: Map<K, V>): Map<K, V> {
    return new Map([...map1, ...map2]);
}

let bindings = new Map<string, { filePath: string, options: MaxMspBindingOptions }>();
for (const file of filteredFiles) {
    bindings = mergeMaps(bindings, findMaxMspBindings(file, checker))
}

console.log(bindings);

// // Write the generated code to a file
writeGeneratedCode(bindings, outputPath);

