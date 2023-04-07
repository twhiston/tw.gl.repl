import { maxMspBinding } from "MaxBindings"

//Used internally but not exposed as users add functions directly
interface FunctionIdentifier {
    id: string
    functions: Array<KeyProcessor>
}

interface FunctionBinding {
    id: string
    asciiCode: number
    functions: Array<string>
}

export type KeyProcessor = (k: number, ctx: any) => any

@maxMspBinding({ instanceName: 'i.repl.kp' })
export class KeypressProcessor {

    private attachedFunctions: { [key: string]: Array<FunctionIdentifier> } = {};
    private preloadedFunctions: { [key: string]: KeyProcessor } = {};
    overrideAlphaNum: boolean

    constructor() {
        // Object to store arrays of functions attached to specific ASCII codes
        this.attachedFunctions = {};
        this.preloadedFunctions = {};
        //this.attachFunctions('alphanum hint', 127, () => { return 'to customize call replaceFunctions on 127' });
        this.overrideAlphaNum = false
    }

    //if you dont want to invoke the generic handler for alphanumerical characters set this to true
    //TODO: do we want to also execute specifcally attached functions to keys when false?
    //recurse keypress function with output context to do this
    customAlphaNum(state: boolean) {
        this.overrideAlphaNum = state;
    }

    //preload a function so we can refer to it in our json config later
    //function should have the signature (k, ctx) where k is the key pressed and context is whatever you need to send to it
    //preloaded functions can ONLY be bound via json files. They are not meant to be added in code!!!! attach functions directly instead
    preloadFunction(id: string, func: KeyProcessor) {
        this.preloadedFunctions[id] = func;
    }

    // Function to attach a function to an ASCII code
    attachFunctions(id: string, keyCode: number, funcs: Array<KeyProcessor>) {
        if (!this.attachedFunctions[keyCode]) {
            this.attachedFunctions[keyCode] = [];
        }
        this.attachedFunctions[keyCode].push({
            id: id,
            functions: funcs,
        });
    }

    // Function to replace functions attached to an ASCII code
    replaceFunctions(id: string, keyCode: number, func: Array<KeyProcessor>) {
        this.attachedFunctions[keyCode] = [];
        this.attachFunctions(id, keyCode, func);
    }

    // Function to process a keypress and return any attached functions
    processKeypress(k: number): Array<KeyProcessor> {
        //to handle general alphanumeric keys we do a little trickery here
        let funcs: FunctionIdentifier[] = [];
        if (k > 32 && k <= 126) {
            if (this.overrideAlphaNum === false) {
                funcs = funcs.concat(this.attachedFunctions[127] ?? [])
            }
        }
        funcs = funcs.concat(this.attachedFunctions[k] ?? []) // Get the attached functions, if any
        // const fId = (k > 32 && k <= 126 && this.overrideAlphaNum === false) ? 127 : k;
        const results = [];
        if (funcs && funcs.length > 0) {
            // If there are attached functions, call each one with the event object as the argument
            for (const func of funcs) {
                for (const f of func.functions) {
                    results.push(f);
                }
            }
        }
        return results;
    }

    // Function to load configuration from a JSON object
    loadConfigFromJSON(config: string) {
        const json = JSON.parse(config);
        if (json.bindings === undefined)
            throw new Error('bindings undefined');


        json.bindings.forEach((item: FunctionBinding) => {
            const id = item.id;
            const asciiCode = item.asciiCode;
            const functions = item.functions;
            const functionArray = Array.isArray(functions) ? functions : [functions];
            const parsedFunctions = functionArray.map((funcString) => {
                //If we have preloaded a function with this name then include it
                const func = this.preloadedFunctions[funcString];
                let f = undefined;
                if (func !== undefined) {
                    f = func;
                } else {
                    //otherwise assume it is a direct function body and wrap it in a Function
                    f = new Function('k', 'ctx', funcString);
                }
                return f;
            });
            this.replaceFunctions(id, asciiCode, parsedFunctions);
        });
    }
}
