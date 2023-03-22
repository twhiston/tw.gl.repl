class KeypressProcessor {
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
    customAlphaNum(state) {
        this.overrideAlphaNum = state;
    }

    //preload a function so we can refer to it in our json config later
    //function should have the signature (k, ctx) where k is the key pressed and context is whatever you need to send to it
    preloadFunction(id, func) {
        this.preloadedFunctions[id] = func;
    }

    // Function to attach a function to an ASCII code
    attachFunctions(id, keyCode, func) {
        if (!this.attachedFunctions[keyCode]) {
            this.attachedFunctions[keyCode] = [];
        }
        const funcArray = Array.isArray(func) ? func : [func];
        this.attachedFunctions[keyCode].push({
            id: id,
            functions: funcArray,
        });
    }

    // Function to replace functions attached to an ASCII code
    replaceFunctions(id, keyCode, func) {
        this.attachedFunctions[keyCode] = [];
        this.attachFunctions(id, keyCode, func);
    }

    // Function to process a keypress and return any attached functions
    processKeypress(k) {
        //to handle general alphanumeric keys we do a little trickery here
        const fId = (k > 32 && k <= 126 && this.overrideAlphaNum == false) ? 127 : k;
        const funcs = this.attachedFunctions[fId]; // Get the attached functions, if any

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
    loadConfigFromJSON(config) {
        const json = JSON.parse(config);
        json.forEach((item) => {
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
                    f = new Function('k', 'wm', funcString);
                }
                return f;
            });
            this.attachFunctions(id, asciiCode, parsedFunctions);
        });
    }
}
module.exports = KeypressProcessor;