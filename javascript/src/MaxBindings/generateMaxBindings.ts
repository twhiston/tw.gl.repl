import ts from 'typescript';
import glob from 'glob';
import path from 'path';
import { MaxBindingGenerator } from './MaxBindingGenerator';

//new rendered with the route path
const mbg = new MaxBindingGenerator("./")

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

