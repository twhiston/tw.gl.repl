import ts from 'typescript';
import glob from 'glob';
import path from 'path';
import { MaxBindingGenerator, MaxXmlGenerator } from './MaxBindingGenerator';

const templates = {
    mainTemplate: './src/MaxBindings/templates/main.hbs',
    functionTemplate: './src/MaxBindings/templates/function.hbs'
};

const xmlTemplates = {
    mainTemplate: './src/MaxBindings/templates/xml/main.hbs',
    attributeTemplate: './src/MaxBindings/templates/xml/attribute.hbs',
    methodTemplate: './src/MaxBindings/templates/xml/method.hbs'
};
//new rendered with the route path
const mbg = new MaxBindingGenerator("./", templates)
const mbgXml = new MaxXmlGenerator("./", xmlTemplates, './../docs', 'tw.gl.repl.maxref.xml')

// Options to configure the TypeScript Compiler API
const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    downlevelIteration: true
};

// Find all TypeScript files in the source directory
const files = glob.sync('**/*.ts', { cwd: mbg.srcDir });

// Create a TypeScript program from the source files and options
const program = ts.createProgram(files.map(file => path.join(mbg.srcDir, file)), options);
//IMPORTANT!!! You must call this to force bindings or names etc. will not work
const checker = program.getTypeChecker();

// Get the root file of the program
const filteredFiles = program.getSourceFiles().filter(sourceFile => files.includes(path.relative(mbg.srcDir, sourceFile.fileName)))

// Find bindings and generate
mbg.generate(filteredFiles, checker);
// Generate xml helper file
mbgXml.generate(filteredFiles, checker);

