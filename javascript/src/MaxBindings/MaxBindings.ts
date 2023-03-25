import 'reflect-metadata'

export interface MaxMspBindingOptions extends Record<string, any> {
    instanceName?: string;
    functionName?: string;
    draw?: boolean;
}

//This is used effectively as a compile time decorator as we are using it for code generation
//Therefore it cannot be wrapped in a decorator factory and all our logic is done in the ast
// export function maxMspBinding(target: any, key: string, descriptor: PropertyDescriptor) {
//     // Add a new property to the method descriptor
//     descriptor.value.maxMspBinding = true;
// }
export function maxMspBinding(options: MaxMspBindingOptions) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        // Add options to the method descriptor
        descriptor.value.maxMspBindingOptions = options;
        // Add a new property to the method descriptor
        descriptor.value.maxMspBinding = true;
    }
}

//TODO: add another binding for calling draw after the function is called in the binding @draws
