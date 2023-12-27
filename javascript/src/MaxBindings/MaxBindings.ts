import 'reflect-metadata'

export interface MaxMspBindingOptions extends Record<string, any> {
    //usually best to add this on a class level, the instance name that
    //method calls will be attached to
    instanceName?: string;
    //if set the generated function name will be different to the
    //method it is attached to, so you can refactor without changing
    //the max bindings for compatibility
    functionName?: string;
    //if true then the generated function will use `arguments` instead of the
    //function argument when passing data to internal function calls, needed when
    //input might be an array of variable length because we can't use any modern
    // js like (...arg) to get it! For this to work your methods Array<string> argument
    //MUST be named "text" and it MUST be the second argument passed to your function
    //if your function has more than one argument
    useArgsForText?: boolean;
    //if true call the glrender draw function after calling this
    //in generated max code
    draw?: boolean;
    //if true then exception handling will be generated around the
    //function call
    throws?: boolean;
    //if true do not include in the routepass generation at init
    //ie make this a private function to tw.gl.repl.maxpatch
    noroute?: boolean;
    //if in the routepass geneneration and not a simple list output
    //for javascript input then give the scriptingName of an object
    //to connect to
    customHandler?: string;
    //If connected to a custom handler then what inlet number should it be?
    handlerInlet?: number;
    //should be added as an attribute to the max xml
    isAttribute?: boolean;
    //should be added as a method to the max xml
    isMethod?: boolean;
}

//This is used effectively as a compile time decorator as we are using it for code generation
//Therefore it cannot be wrapped in a decorator factory and all our logic is done in the ast
export function maxMspBinding(options: MaxMspBindingOptions): any {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        //Need this checking for compatibility, otherwise tests and things can fail
        if (descriptor === undefined)
            descriptor = {}
        if (descriptor.value === undefined)
            descriptor.value = {}
        // Add options to the method descriptor
        descriptor.value.maxMspBindingOptions = options;
        // Add a new property to the method descriptor
        descriptor.value.maxMspBinding = true;
    }
}

