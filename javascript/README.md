# tw.gl.repl

## TODO

* Do attributes properly in xml ref file and patch
* Pastebin functionality
* add some settings to the shortkeys.json for repl config (eg alphanumerical override)
* figure out automating releases without source in pipelines for tags

## About

This is a repl based on the excellent th.gl.texteditor. It was partly built as a
way to learn how to take a more modern approach to building javascript code for Max,
but it significantly extends the original functionality, to provide a more fully
featured and configurable repl environment.
Not only is it possible to output the contents of the repl buffer for processing in
max, but it's possible to attach any function to a keypress in the repl, which can
also generate messages for output.

## Install

You should install this inside your Max packages directory, in a folder called `tw.gl.repl`,
it should then be available in max.
See help files for some ideas on what you might do with it!

All source files loaded by max are in the `dist` folder and the typescript which
it is compiled from is found in `src`. Unless you have a more complex project in
mind you probably don't need to care about this and can use the config file and `user-repl.js`
to extend the functionality of the repl.

## Execute functionality

By default executing the code in the repl will run a series of formatters and output
the resulting text from outlet 1. This allows you to write livecoding style commands
in the repl, ensure they are formatted as needed, and then output them for further
routing and processing in max.

### TextFormatters

By default there are two formatters which run on execute, firstly `WhitespaceFormatter`
will trim stings and ensure consistency in the whitespace character used. Secondly
`BraceBalancedFormatter` will check that our output has fully balanced braces, or
it will throw an exception. This is extremely useful if you are outputting some kind
of code, or pseudo-language, and need to ensure it is formatted correctly.
If you need to add additional formatters you can add them in your `user-repl.js` by
implementing TextFormatter.

```Typescript
// This example is in typescript for clarity, and user-repl.js is not
// but hopefully you get the idea.
class UppercaseFormatter implements TextFormatter {
    format(strArr: Array<string>, ctx: {}): Array<string> {
        // Example implementation that returns all strings in uppercase
        return strArr.map(str => str.toUpperCase());
    }
}
i.repl.tb.addFormatter(new UppercaseFormatter);
```

If you don't want the deafult formatters to run before the formatters you add you
should replace all the formatters `i.repl.tb.setFormatters([new UppercaseFormatter]);`

## Config

Basic configuration of your repl can be achieved by loading a `shortkeys.json`
file to reconfigure it. This file is an array of objects which bind a key number
to a function. In contrast to th.gl.editor there are no internal functions, so everything
is defined in this file and the user can override anything.
The config is in the following form:

```json
{
    "bindings": [
        {
            "id": "execute",
            "asciiCode": 2044,
            "functions": [
                "return 'run'"
            ]
        },
        {
            "id": "backspace",
            "asciiCode": -7,
            "functions": [
                "ctx.backSpace()"
            ]
        },
        {
            "id": "customSpace",
            "asciiCode": -2,
            "functions": [
                "myCustomFunction"
            ]
        }
    ]
}
```

As you can see there are a number of ways to define the functions that are called,
and it is possible to call multiple functions with a single key. Functions can be
defined as a function body in text (which will be wrapped  
`new Function('k', 'ctx', funcString)`), it can be a function from whatever context
is passed in (in the case of this application it is an instance of `REPLManager`),
or it can be a reference to a custom function.

## Including custom functions

One of the ways to extend the repl is to attach or preload your own functions so
you can tie them to a key.
To make this easier the package tries to load a file called `user-repl.js`, max should
load this up fine if it's in your path. Inside it you have access to `i.glRender`
and `i.repl`, you also have access to a Dict of `shortkeys.json` in `sKeys`. Which
will be stringified and passed into the repl on `init()`

 Most basic usage will be something like:

```javascript
const functionOne = (k: number, ctx: {}) => {
    return `some message`;
  };
i.repl.kp.preloadFunction('doSomething', functionOne);
```

You can then use this in your `shortkeys.json` app config by binding it
to a key

```json
{
    "bindings": [
        {
            "id": "pushSpace",
            "asciiCode": -2,
            "functions": [
                "doSomething"
            ]
        }
    ]
}
```

Alternatively if, for some reason, you want to configure it in code rather than
with json you could attach the function directly

```javascript
//i.repl.kp.attachFunctions(id: string, keyCode: number, funcs: Array<KeyProcessor>)
i.repl.kp.attachFunctions("arbitraryName", -2, [functionOne])
```

which will then be run when the key is pressed. All custom function should be of
type `KeyProcessor` and thus have the signature `function(k: number, ctx: {})`.

Functions can return nothing or `Array<string>`, these strings are treated
as messages to be output to max, so you can write routing and handling in max to
implement whatever you need. If you get an error message about prototype apply taking
an array you probably are outputting a string and not an array of strings!

## Alphanumeric Characters

By default alphanumeric characters are treated with a special function which
records the keypress into a text buffer for display and output. It may be the
case that you don't want to do this because you want to attach specific functions
to every key. You could override the default handler which will stop this function
being called:

```javascript
//user-repl.js in your path
i.repl.kp.customAlphaNum(true);
```

If you instead want to just override the default handler for alpha-numerical keys
you should bind a function to keycode `127` instead of the default one (shown below)

```JSON
{
    "bindings": [
        {
            "id": "alphahandler",
            "asciiCode": 127,
            "functions": [
                "ctx.addChar(k)"
            ]
        }
    ]
}
```

## Reading and Writing files

Writing files will save the contents of the buffer into a text file.

*IMPORTANT NOTE:* reading files does not just fill the buffer with the text,
because the possibility of attaching functions to each key means that
progressive keypresses can build up application state, when a file is loaded
it is played back as individual keypresses. Because of this you need to ensure
that your config handles both the max and filesystem keycodes for things like
spaces or new lines. You can see this in the default configuration provided.
If you need to work out what keycode a system specific keypress is look inside
the tw.gl.repl object and the messagebox connected to the output of `p quickKey`.

### Differences from th.gl.texteditor

Key differences from th.gl.texteditor are listed below. Other than the total
refactoring there are some subtle, and not so subtle differences that mean it's
a little work to migrate from one to the other.

* Different shortkey.json format
* Different concept of file handling, file contents is "played back" into the repl
* No internal functions, everything is user defined in code or config
* More flexible to extend
* All js file handling
* Slightly different max patch around javascript
* Written in modern modular typescript code and then transpiled to es3 for max's
ancient engine
* Full set of tests
* Autogenerated max bindings

## Developing

We transpile so we can use modern js. See:
<https://cycling74.com/forums/any-plans-to-update-support-for-recent-versions-of-js#reply-58ed21d5c2991221d9ccad8c>

Although the runtime needs no external libraries, you will need to `npm install`
inside the javascript folder to develop this code, as it's all written in typescript
and needs to be transpiled.

### Build cycle

`npm run compile` will render the max compatible javascript from our typescript and
generate the `tw.gl.repl.js` file which we will load into max.

### Testing

Testing is done with the `ava` framework. If you are going to add a new feature
and contribute it back (please do!) then you'll need to write tests for it as well.
The code here has pretty good test coverage so look at the `moduleName.test.ts` files
for lots of examples.
`npm run test` will run all the tests and output coverage. `npm run report` will generate
an html report you can use to see where you are missing test coverage.

Github pipelines will run on push, these run all tests and output coverage and also
compile the code.

### Max bindings

The entrypoint into the code for max is in an autogenerated file, this makes binding
existing functions to the max interface easier as you just need to annotate the code
and run the generator. Functions are annotated like
`@maxMspBinding({ draw: true, functionName: 'cursor' })` see `MaxBindings/MaxBinding.ts`
for a full list of options. You can annotate the class as well, which is useful
for the eg. `instanceName` field.

Although there are only a few options available to the binding the processor
enriches the content with various other bits of metadata which can be used in
template rendering. See the templates.

Mostly you won't need to touch this stuff, as you can extend the repl using `shortkeys.json`
and/or `user-repl.js` for most simple use cases. But if you want to build your own
more complex repl object you will need to recompile and generate the js code.

## Helper Patch

There is a helper patch included `editor-development.maxpat` which has a helpful
simple setup which you can use to help with developing.
