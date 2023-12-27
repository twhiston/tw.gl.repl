import test from 'ava';
import { KeypressProcessor, KeyProcessor } from './KeypressProcessor';

test('Test attachFunctions and processKeypress', t => {
  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.attachFunctions('testFunc1', 25, [() => { return 'A pressed'; }]);
  keypressProcessor.attachFunctions('testFunc2', 25, [() => { return 'A pressed again'; }]);
  const funcs = keypressProcessor.processKeypress(25);
  t.is(funcs.length, 2);
  t.is(funcs[0](1, {}), 'A pressed');
  t.is(funcs[1](1, {}), 'A pressed again');
});

test('Test attachFunctions with an array', t => {
  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.attachFunctions('testFunc1', 20, [() => { return 'A pressed'; }, () => { return 'A pressed again'; }]);
  const funcs = keypressProcessor.processKeypress(20);
  t.is(funcs.length, 2);
  t.is(funcs[0](1, {}), 'A pressed');
  t.is(funcs[1](1, {}), 'A pressed again');
});

function testReply() {
  return 'hello!';
}
test('Test attachFunctions with a function reference', t => {
  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.attachFunctions('testFunc1', -3, [testReply]);
  const funcs = keypressProcessor.processKeypress(-3);
  t.is(funcs.length, 1);
  t.is(funcs[0](1, {}), 'hello!');
});

test('Test replaceFunctions and processKeypress', t => {
  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.replaceFunctions('testFunc3', 10, [() => { return 'B pressed' }]);
  const funcs = keypressProcessor.processKeypress(10);
  t.is(funcs.length, 1);
  t.is(funcs[0](1, {}), 'B pressed');
});

test('Test loadConfigFromJSON', t => {
  const jsonConfig = `{
    "bindings":[
    {
      "id": "testFunc4",
      "asciiCode": 1,
      "functions": [
        "return('C pressed function 1');",
        "return('C pressed function 2');"
      ]
    },
    {
      "id": "testFunc5",
      "asciiCode": 2,
      "functions": "return('D pressed');"
    }
  ]}`;

  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.loadConfigFromJSON(jsonConfig);

  const funcsC = keypressProcessor.processKeypress(1);
  t.is(funcsC.length, 2);
  t.is(funcsC[0](1, {}), 'C pressed function 1');
  t.is(funcsC[1](1, {}), 'C pressed function 2');

  const funcsD = keypressProcessor.processKeypress(2);
  t.is(funcsD.length, 1);
  t.is(funcsD[0](1, {}), 'D pressed');

});

test('Test processKeypress with character keys', t => {
  const keypressProcessor = new KeypressProcessor();
  const funcs = keypressProcessor.processKeypress(34);
  t.is(funcs.length, 0);
  //t.is(funcs[0](), 'to customize call replaceFunctions on 127');

  keypressProcessor.replaceFunctions('alphanum', 127, [() => { return 'ok' }]);
  for (let index = 33; index < 127; index++) {
    const funcs = keypressProcessor.processKeypress(index);
    t.is(funcs.length, 1);
    t.is(funcs[0](1, {}), 'ok');
  }
});
test('Test processKeypress with non-existent key code', t => {
  const keypressProcessor = new KeypressProcessor();
  const funcs = keypressProcessor.processKeypress(129);
  t.deepEqual(funcs, []);
});


test('customAlphaNum overrides alphanum key processing when set to true', t => {
  const kp = new KeypressProcessor();
  const testFunc = () => { return 'testing'; };
  kp.replaceFunctions('alphanum', 127, [testFunc]);

  kp.customAlphaNum(true);
  const results = kp.processKeypress(36); //
  t.is(results.length, 0);
  t.deepEqual(results, []);

  kp.customAlphaNum(false);
  const results2 = kp.processKeypress(36); //
  t.is(results2.length, 1);
  t.deepEqual(results2[0](1, {}), 'testing');
});

test('customAlphaNum does not override alphanum key processing when set to false', t => {
  const kp = new KeypressProcessor();
  const testFunc = () => { return 'override' };
  kp.replaceFunctions('alphanum', 127, [testFunc]);

  kp.customAlphaNum(false);
  const results = kp.processKeypress(65); // 'A' key
  t.is(results.length, 1);
  t.deepEqual(results[0](1, {}), 'override');

  kp.customAlphaNum(true);
  const results2 = kp.processKeypress(65); // 'A' key
  t.is(results2.length, 0);
  t.deepEqual(results2, []);
});

test('customAlphaNum sets overrideAlphaNum property correctly', t => {
  const kp = new KeypressProcessor();

  kp.customAlphaNum(true);
  t.true(kp.overrideAlphaNum);

  kp.customAlphaNum(false);
  t.false(kp.overrideAlphaNum);
});

test('loadConfigFromJSON should attach functions specified in JSON config', (t) => {
  const processor = new KeypressProcessor();

  const functionOne = (k: number, ctx: {}) => {
    return `Function One called with key: ${k} and context: ${ctx}`;
  };

  const functionTwo = (k: number, ctx: {}) => {
    return `Function Two called with key: ${k} and context: ${ctx}`;
  };

  processor.preloadFunction('functionOne', functionOne);
  processor.preloadFunction('functionTwo', functionTwo);

  //Need to say this is custom alpha as we will bind to key id 65
  processor.customAlphaNum(true)

  const config = JSON.stringify({
    "bindings": [
      {
        id: 'testConfig',
        asciiCode: 65,
        functions: ['functionOne', 'functionTwo'],
      },
    ]
  });

  processor.loadConfigFromJSON(config);

  const res = processor.processKeypress(65);

  t.is(res.length, 2);
  const res1 = res[0](65, {})
  const res2 = res[1](65, {})
  t.is(res1, "Function One called with key: 65 and context: [object Object]")
  t.is(res2, "Function Two called with key: 65 and context: [object Object]")
});

test('preloading a function to a non alphanumerical key works without override true', (t) => {
  const processor = new KeypressProcessor();

  const functionOne = (k: number, ctx: {}) => {
    return `Function One called with key: ${k} and context: ${ctx}`;
  };
  processor.preloadFunction('deckardsDream', functionOne);

  const config = JSON.stringify({
    "bindings": [
      {
        id: 'testConfig',
        asciiCode: 356,
        functions: ['deckardsDream'],
      },
    ]
  });

  processor.loadConfigFromJSON(config);

  const res = processor.processKeypress(356);

  t.is(res.length, 1);
  const res1 = res[0](356, {})
  t.is(res1, "Function One called with key: 356 and context: [object Object]")
});

test('processKeypress method overrides alphaNum processing if overrideAlphaNum is true', (t) => {
  const keypressProcessor = new KeypressProcessor();
  // Attach test functions to ASCII code 127 (used for general alphanumeric keys if overrideAlphaNum is false)
  keypressProcessor.attachFunctions('alphanum', 127, [
    (k: number, ctx: any) => {
      return 'Alphanumeric handler executed';
    },
  ]);

  // Set overrideAlphaNum to true to disable default alphanumeric processing
  keypressProcessor.customAlphaNum(true);

  // Generate an alphanumeric keypress event (ASCII code between 33 and 126)
  const alphaNumKeyCode = 65; // 'A'
  const result = keypressProcessor.processKeypress(alphaNumKeyCode);

  // Verify that default alphanumeric processing was not called
  t.is(result.length, 0);
});

test('processKeypress method does not override alphaNum processing if overrideAlphaNum is false', (t) => {
  const keypressProcessor = new KeypressProcessor();
  // Attach test functions to ASCII code 127 (used for general alphanumeric keys if overrideAlphaNum is false)
  keypressProcessor.attachFunctions('alphanum', 127, [
    (k: number, ctx: any) => {
      return 'Alphanumeric handler executed';
    },
  ]);

  // Set overrideAlphaNum to false to enable default alphanumeric processing
  keypressProcessor.customAlphaNum(false);

  // Generate an alphanumeric keypress event (ASCII code between 33 and 126)
  const alphaNumKeyCode = 65; // 'A'
  const result = keypressProcessor.processKeypress(alphaNumKeyCode);

  // Verify that default alphanumeric processing was called
  t.is(result.length, 1);
  t.is(result[0](alphaNumKeyCode, null), 'Alphanumeric handler executed');
});

test('processKeypress method calls both default key handler and custom function if overrideAlphaNum is false', (t) => {
  const keypressProcessor = new KeypressProcessor();
  // Attach test functions to ASCII code 127 (used for general alphanumeric keys if overrideAlphaNum is false)
  keypressProcessor.attachFunctions('alphanum', 127, [
    (k: number, ctx: any) => {
      return 'Alphanumeric handler executed';
    },
  ]);


  // Attach test function to an alphanumeric key
  const alphaNumKeyCode = 65; // 'A'
  keypressProcessor.attachFunctions('custom', alphaNumKeyCode, [
    (k: number, ctx: any) => {
      return 'Custom handler executed';
    },
  ]);

  // Set overrideAlphaNum to false to enable default alphanumeric processing
  keypressProcessor.customAlphaNum(false);

  // Generate an alphanumeric keypress event
  const result = keypressProcessor.processKeypress(alphaNumKeyCode);

  // Verify that both default alphanumeric processing and custom function were called
  t.is(result.length, 2);
  t.is(result[0](alphaNumKeyCode, null), 'Alphanumeric handler executed');
  t.is(result[1](alphaNumKeyCode, null), 'Custom handler executed');

});

test("loadConfigFromJSON changes overrideAlphaNum", (t) => {
  const kp = new KeypressProcessor();

  const config = JSON.stringify({
    settings: {
      keypressProcessor: { overrideAlphaNum: true },
    },
  });

  kp.loadConfigFromJSON(config);
  t.true(kp.overrideAlphaNum);
});