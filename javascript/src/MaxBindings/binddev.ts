import ts from 'typescript';

const program = ts.createProgram(['./src/REPLManager/REPLManager.ts'], {});
//Call this to force bindings
program.getTypeChecker()
const sourceFile = program.getSourceFile('./src/REPLManager/REPLManager.ts');

function getMethodName(node: ts.MethodDeclaration): string | undefined {
    const name = node.name;
    if (name) {
        return name.getText();
    }
    return undefined;
}




function visit(node: ts.Node) {
    // Do something with the node
    const kindName = ts.SyntaxKind[node.kind];

    if (ts.isMethodDeclaration(node)) {
        const decorators = ts.canHaveDecorators(node) ? ts.getDecorators(node) : undefined;
        if (decorators === undefined)
            return;

        let maxMspBinding = false;
        for (const dec of decorators) {
            if (ts.isIdentifier(dec.expression) &&
                dec.expression.text === 'maxMspBinding') {
                maxMspBinding = true;
                break;
            }
        }
        if (maxMspBinding) {
            console.log(`Name: ${name} \n   Node type: ${kindName} \n   Bind to max: ${maxMspBinding}\n`);
            //return maxMspBinding;
        }

    } else {
        //console.log('not method or function or class')
    }


    // Visit all children of the node
    ts.forEachChild(node, visit);
}

if (sourceFile !== undefined)
    visit(sourceFile);



if (ts.isDecorator(node)) {
    const expression = node.expression;
    if (ts.isCallExpression(expression)) {
        const signature = checker.getResolvedSignature(expression);
        const declaration = signature?.declaration;
        if (declaration && ts.isFunctionDeclaration(declaration)) {
            const optionsArgument = expression.arguments[0];
            if (ts.isObjectLiteralExpression(optionsArgument)) {
                const messageProp = optionsArgument.properties.find(
                    (prop) => ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name) && prop.name.text === 'message'
                ) as ts.PropertyAssignment;
                if (messageProp) {
                    const message = messageProp.initializer.getText(sourceFile);
                    console.log(`Found options for ${declaration.name.text}: ${message}`);
                }
            }
        }
    }
}