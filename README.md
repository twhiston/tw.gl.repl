# tw.gl.repl

[![Test](https://github.com/twhiston/th.gl.texteditor/actions/workflows/test.yml/badge.svg)](https://github.com/twhiston/th.gl.texteditor/actions/workflows/test.yml)

## About

This is a repl based on the excellent th.gl.texteditor. It was partly built as a
way to learn how to take a more modern approach to building javascript code for
Max, but it significantly extends the original functionality, to provide a more
fully featured and configurable repl environment.

At it's core this is the same idea as th.gl.texteditor but the way in which
functions can be attached to keys now significantly extends what it is possible
to do. There is a fundamental philosophical difference between the idea of
having a text buffer repl which performs actions on run/execute and a program
where additionally every key press triggers a specific function. It means there
are subtle differences between this and th.gl.texteditor which are important to
be aware of. For example when you load a text file into th.gl.texteditor it just
fills the buffer, in tw.gl.repl it replays the keystrokes back through the input
processing. This means that any function which is attached to the individual
keypress will be executed again. In it's usual configuration this means that the
text is added to the text buffer, but it does not necessarily hold that this is
true in every possible configuration. It would be possible to attach functions
to keypresses which maintain state for other parts of an application, or which
trigger messages to be output immediately etc. This means you should think about
where you put your functionality, does it need to be in the repl itself, ie
should it be triggered every time the keypresses are played back? or does it
need to be some routing and handling in max? Further to this the repl introduces
the concept of output formatters, these can be attached to the repl and then
used in the configuration file to alter the output in some way. This allows you
to format text easily for whatever you are hooking the repl up for, for example
concatenating the output into a single line, or checking that it has balanced
brances, or ensuring whitespace is in a regular format. However it also means
that it's possible to, for example, have a short dsl for the repl, which is
expanded to a full DSL of the thing you wish to interface with. This is useful
if you need to interact with a verbose javascript but don't want to do a lot of
typing.

TLDR not only is it possible to output the contents of the repl buffer for
processing in max, but it's possible to attach any function to a keypress in the
repl, which can in turn do things including generate messages for output. The
text you input can also be mutated on run/execute so that something different is
output from the repl.

Simple use cases for the repl can be handled entirely in configuration, and more
complex use cases can be easily managed by including a `user-repl.js` file
inside your project in which you can further customize behaviour by attaching
your own custom functions to keypresses or your own custom formatters for output
message handling. Read on for more about this

## Install

You should install this inside your Max packages directory, in a folder called `tw.gl.repl`,
it should then be available in max after a restart.
See help files for some ideas on what you might do with it!

### Download zip

```
1. download a release from the github release page for this project
2. unzip and place in Max Searchpath (eg. MacOS ~/Documents/Max 8/Packages)
3. restart Max8
```

### Git clone

If you want to git clone the repo you will need to have npm installed as the compiled
sources are not included in the repo.

```bash
cd ~/Documents/Max\ 8/Packages
git clone https://github.com/twhiston/tw.gl.repl.git
cd tw.gl.repl/javascript
npm install && npm compile
//restart Max8
```

```
4. Go to the extras menu and open the getting started patch
```

All source files loaded by max are in the `dist` folder and the typescript which
it is compiled from is found in `src`. Unless you have a more complex project in
mind you probably don't need to care about this and can use the config file and `user-repl.js`
to extend the functionality of the repl.

## Execute/Run functionality

By default executing the code in the repl will run a series of formatters and output
the resulting text from outlet 0. This allows you to write livecoding style commands
in the repl, ensure they are formatted as needed, and then output them for further
routing and processing in max.

## Config

Basic configuration of your repl can be achieved by loading a `replkeys.json`
file to reconfigure it. This file is an object

The config is in the following form:

```json
{
    "settings":{
        "keypressProcessor": {
            "overrideAlphaNum": true
        }
    }
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

### Settings

Settings allow you to set the value of some repl settings instead
of settings them through messages or in code.
All available settings are as follows:

```json
"settings": {
        "repl": {
            "MAX_CHARS": 40,
            "INDENTATION": 4,
            "BUFFER_SIZE": 30,
            "CMNT": "//"
        },
        "keypressProcessor": {
            "overrideAlphaNum": true
        },
        "textbuffer": {
            "formatters": [
                "whitespace",
                "bracebalanced",
                "singleline"
            ]
        }
}
```

### Bindings

Bindings are an array of of objects which bind a key number to a function. In
contrast to th.gl.editor there are no internal functions, so everything is
defined in this file and the user can override anything. As you can see there
are a number of ways to define the functions that are called, and it is possible
to call multiple functions with a single key. Functions can be defined as a
function body in text (which will be wrapped
`new Function('k', 'ctx', funcString)`), it can be a function from whatever context
is passed in (in the case of this application it is an instance of `REPLManager`),
or it can be a reference to a custom function.

There is one "special" keycode which is not defined in config, this is the binding
for 'ignore_keys'. This is hardcoded to `option+d` which is keycode 8706. This needs
to be handled outside of the javascript because you want to be able to re-enable
the keys. You can change this binding by sending the message `ignore_keys_id` and
the keycode id that you want.

#### Binding a simple function

You can create a simple key binding to output a message when a key is pressed with
the following configuration

```json
{
    "id": "execute",
    "asciiCode": 2044,
    "functions": [
        "return 'run'"
    ]
}
```

Each of the entries in `functions` will be wrapped in a
`new Function('k', 'ctx', funcString)` and will be executed on keypress. This
allows us to perform simple actions such as returning custom messages which we
can process further in max easily.

#### Context based functions

Because the functions called have the signature `('k', 'ctx')` functions we create in
config will always contain the value of the key that was pressed in `k`. The `ctx`
parameter however will contain an instance of REPLManager, which means that its functions
and all the functions of the subclasses are available here. This allows you to create very
complex functionality in just the config file. The shortkey to replace a line of
text in the buffer with the pastebin is an exaxple of this

```json
{
    "id": "replaceLine-alt-p",
    "asciiCode": 960,
    "functions": [
        "var pb = ctx.tb.pasteBinGet(); var startLine = ctx.c.line(); ctx.deleteLine(); if(ctx.c.line() < ctx.tb.length()-1){ctx.jumpLine(-1);ctx.jumpTo(1);} if(startLine === 0){ctx.jumpTo(0); ctx.newLine(); ctx.jumpTo(2); }else { ctx.newLine(); } for(var i = 0; i < pb.length; i++){for (var a = 0; a < pb[i].length; a++) {var char = pb[i].charCodeAt(a); ctx.keyPress(char)}}"
            ]
        }
```

#### Including custom functions

One of the ways to extend the repl further is to attach or preload your own functions
so you can tie them to a key in the config.
To make this easier the package tries to load a file called `user-repl.js`, max should
load this up fine if it's in your path. Inside it you have access to `i.glRender`
and `i.repl`, you also have access to a Dict of `replkeys.json` in `sKeys`. Which
will be stringified and passed into the repl on `init()`

Most basic usage will be something like:

```javascript
//Typescript signature is actually
//const functionOne = (k: number, ctx: {}) => {
const functionOne = (k, ctx) => {
    return `some message`;
};
i.repl.kp.preloadFunction('doSomething', functionOne);
```

You can then use this in your `replkeys.json` app config by binding it
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

### JitterObjects

Be very careful about creating JitterObjects in your custom functions or in your code
at all. Max seems to have serious issues when they are used outside of the top level js
file. This often results in a crash if you open the patch more than once (even sequentially).
See the bound `_close` function for how this is handled for the GLRender class's
`destroy` method.

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

or

```json
"settings": {
    "keypressProcessor": {
         "overrideAlphaNum": true
    }
}
```

If you instead want to just override the default handler for alpha-numerical keys
you should bind a function to keycode `127` replacing the default one (shown below)

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

### TextFormatters

By default there are two formatters which run on execute, firstly `WhitespaceFormatter`
will trim stings and ensure consistency in the whitespace character used. Secondly
`BraceBalancedFormatter` will check that our output has fully balanced braces, or
it will throw an exception. This exception is handled in the repl and will be printed
to the max console. This formatter is extremely useful if you are outputting some
kind of dsl, and need to ensure it is formatted correctly. However it's easy to turn
it off by simply removing it from the config of the repl like so

```json
"textbuffer": {
    "formatters": [
        "whitespace",
    ]
}
```

If you need to add additional formatters you can add them in your `user-repl.js`
by implementing a TextFormatter and preloading it. It can then be referenced in
your repl config.

```Typescript
// This example is in typescript for clarity, and user-repl.js needs
// to be in the type of archaic javascript that max understands but
// hopefully you get the idea. To create a lot of extensions for the
// repl it's recommended to look into using typescript, transpiling and
// generating your user-repl.js file.
class UppercaseFormatter implements TextFormatter {
    id: string = "uppercase"
    format(strArr: Array<string>, ctx: {}): Array<string> {
        // Example implementation that returns all strings in uppercase
        return strArr.map(str => str.toUpperCase());
    }
}
i.repl.preloadFormatter(new UppercaseFormatter);
//include via repl json config: {"settings"{"textbuffer": {"formatters": ["uppercase"]}}}
```

Always prefer preloading over setting formatters directly as failure to do
so will result in issues when the config is loaded, as this is the point at
which formatters are resolved and added to the TextBuffer.

To see a full example of a pure javascript text formatter implementation check out the
`repl-snippet-expander.maxpat` example!

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

## tw.gl.repl.dynamic-size-helper

Usually `tw.gl.repl` is just calculating the scaling values from the dimensions
that you give it in the arguments. However there are occasions where it may be
beneficial to have dynamic scaling. To achieve this you can use the
`tw.gl.repl.dynamic-size-helper` object together with `jit.world` and
`tw.gl.repl`. Add the object, connect inlet 1 to outlet 2 of `jit.world` connect
inlet 2 to outlet 3 of `jit.world`, connect outlet 1 to the inlet of `jit.world`
and connect outlet 2 to the inlet of `tw.gl.repl`. With this in place the text
should scale fairly nicely with window resizing. It might still be a bit weird
at really strange aspect ratios.
See the help file for the object for more info.

## Differences from th.gl.texteditor

Key differences from th.gl.texteditor are listed below. Other than the total
refactoring there are some subtle, and not so subtle differences that mean it's
a little work to migrate from one to the other.

* Different shortkey.json format, and also includes application settings
* Different concept of file handling, file contents is "played back" into the repl
* No internal functions, everything can be user defined in code or config and
attached to a key
* output_matrix 1 will not stop commands being output from the first outlet,
it will just output the `jit_matrix name` command additionally!
* ephemeral_mode to clear the buffer after every run/execute
* adds some additional methods and arguments
* routepass object in tw.gl.repl.maxpatch is generated in js on `init`.
* Autogenerated max bindings in js, routepass object and help xml file
* All js file handling
* Written in modern modular typescript code and then transpiled to es3 for max's
ancient engine
* Extremely flexible to extend
* Full set of tests

Practically most patches using `th.gl.texteditor` can use `tw.gl.repl` as a drop
in replacement, though if you use a custom config you will need to adapt it to
the different format used here. In your max patch if `th.gl.texteditor`'s output
was connected to a `fromsymbol` or `iter` you can also delete these

## Developing the REPL further

We transpile so we can use modern js. See:
<https://cycling74.com/forums/any-plans-to-update-support-for-recent-versions-of-js#reply-58ed21d5c2991221d9ccad8c>

Although the runtime needs no external libraries, you will need to `npm install`
inside the javascript folder to develop this code, as it's all written in typescript
and needs to be transpiled.

### Build cycle

`npm run compile` will render the max compatible javascript from our typescript and
generate the `tw.gl.repl.js` file which is the core of our repl. It will also generate
the max help xml file because this should match the functions we have exposed in
the main repl file, and this might change if we add annotations to functions or methods.

### Testing

Testing is done with the `ava` framework. If you are going to add a new feature
and contribute it back (please do!) then you'll need to write tests for it as well.
The code here has pretty good test coverage so look at the `moduleName.test.ts` files
for lots of examples.
`npm run test` will run all the tests and output coverage. `npm run report` will
generate an html report you can use to see where you are missing test coverage.

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

Mostly you won't need to touch this stuff, as you can extend the repl using `replkeys.json`
and/or `user-repl.js` for most simple use cases. But if you want to build your own
more complex repl object you will need to recompile and generate the js code.

## Helper Patch

There is a helper patch included `editor-development.maxpat` which has a helpful
simple setup which you can use to help with developing.

## TODO

* new core formatters should be automatically added to the init of the repl?
* support and help patches
  * patch that makes max objects?
  * patch which uses processor functions
  * example with something running in the background continually outputting data
  * rewrite opengl example as a shortcode processor style version for demo?

## License

The GNU Lesser General Public License v.3

The artistic and aesthetic output of the software in the examples is licensed under:
Creative Commons Attribution-ShareAlike 4.0 International License

The origin of this project is a refactoring of th.gl.texteditor (c) Timo Hoogland
2020

(c) Tom Whiston 2023
