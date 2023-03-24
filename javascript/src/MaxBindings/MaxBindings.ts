import 'reflect-metadata'

export interface MaxMspBindingOptions {
    instanceName?: string;
    functionName?: string;
}

//This is used effectively as a compile time decorator as we are using it for code generation
//Therefore it cannot be wrapped in a decorator factory and all our logic is done in the ast
export function maxMspBinding(target: any, key: string, descriptor: PropertyDescriptor) {
    // Add a new property to the method descriptor
    descriptor.value.maxMspBinding = true;
}