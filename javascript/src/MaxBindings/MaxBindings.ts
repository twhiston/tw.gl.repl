import 'reflect-metadata'

export interface MaxMspBindingOptions extends Record<string, any> {
    instanceName?: string;
    functionName?: string;
    draw?: boolean;
}

//This is used effectively as a compile time decorator as we are using it for code generation
//Therefore it cannot be wrapped in a decorator factory and all our logic is done in the ast
export function maxMspBinding(options: MaxMspBindingOptions): any {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        //Need this checking for compatibility, otherwise tests and things can fail
        if (descriptor === undefined)
            descriptor = {}
        if (descriptor.value === undefined) {
            descriptor.value = {}
        }
        // Add options to the method descriptor
        descriptor.value.maxMspBindingOptions = options;
        // Add a new property to the method descriptor
        descriptor.value.maxMspBinding = true;
    }
}

