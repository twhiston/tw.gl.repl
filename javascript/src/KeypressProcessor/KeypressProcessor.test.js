const test = require('ava');
const KeypressProcessor = require('./KeypressProcessor');

test('Test attachFunctions and processKeypress', t => {
  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.attachFunctions('testFunc1', 25, () => { return 'A pressed'; });
  keypressProcessor.attachFunctions('testFunc2', 25, () => { return 'A pressed again'; });
  const funcs = keypressProcessor.processKeypress(25);
  t.is(funcs.length, 2);
  t.is(funcs[0](), 'A pressed');
  t.is(funcs[1](), 'A pressed again');
});

test('Test attachFunctions with an array', t => {
  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.attachFunctions('testFunc1', 20, [() => { return 'A pressed'; }, () => { return 'A pressed again'; }]);
  const funcs = keypressProcessor.processKeypress(20);
  t.is(funcs.length, 2);
  t.is(funcs[0](), 'A pressed');
  t.is(funcs[1](), 'A pressed again');
});

function testReply() {
  return 'hello!';
}
test('Test attachFunctions with a function reference', t => {
  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.attachFunctions('testFunc1', -3, testReply);
  const funcs = keypressProcessor.processKeypress(-3);
  t.is(funcs.length, 1);
  t.is(funcs[0](), 'hello!');
});

test('Test replaceFunctions and processKeypress', t => {
  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.replaceFunctions('testFunc3', 10, () => console.log('B pressed'));
  const funcs = keypressProcessor.processKeypress(10);
  t.is(funcs.length, 1);
});

test('Test loadConfigFromJSON', t => {
  const jsonConfig = `[
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
  ]`;

  const keypressProcessor = new KeypressProcessor();
  keypressProcessor.loadConfigFromJSON(jsonConfig);

  const funcsC = keypressProcessor.processKeypress(1);
  t.is(funcsC.length, 2);
  t.is(funcsC[0](), 'C pressed function 1');
  t.is(funcsC[1](), 'C pressed function 2');

  const funcsD = keypressProcessor.processKeypress(2);
  t.is(funcsD.length, 1);
  t.is(funcsD[0](), 'D pressed');

});

test('Test processKeypress with character keys', t => {
  const keypressProcessor = new KeypressProcessor();
  const funcs = keypressProcessor.processKeypress(34);
  t.is(funcs.length, 0);
  //t.is(funcs[0](), 'to customize call replaceFunctions on 127');

  keypressProcessor.replaceFunctions('alphanum', 127, () => { return 'ok' });
  for (let index = 33; index < 127; index++) {
    const funcs = keypressProcessor.processKeypress(index);
    t.is(funcs.length, 1);
    t.is(funcs[0](), 'ok');
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
  kp.replaceFunctions('alphanum', 127, testFunc);

  kp.customAlphaNum(true);
  const results = kp.processKeypress(36); //
  t.is(results.length, 0);
  t.deepEqual(results, []);

  kp.customAlphaNum(false);
  const results2 = kp.processKeypress(36); //
  t.is(results2.length, 1);
  t.deepEqual(results2[0](), 'testing');
});

test('customAlphaNum does not override alphanum key processing when set to false', t => {
  const kp = new KeypressProcessor();
  const testFunc = () => { return 'override' };
  kp.replaceFunctions('alphanum', 127, testFunc);

  kp.customAlphaNum(false);
  const results = kp.processKeypress(65); // 'A' key
  t.is(results.length, 1);
  t.deepEqual(results[0](), 'override');

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

  const functionOne = (k, ctx) => {
    console.log(`Function One called with key: ${k} and context: ${ctx}`);
  };

  const functionTwo = (k, ctx) => {
    console.log(`Function Two called with key: ${k} and context: ${ctx}`);
  };

  processor.preloadFunction('functionOne', functionOne);
  processor.preloadFunction('functionTwo', functionTwo);

  const config = JSON.stringify([
    {
      id: 'testConfig',
      asciiCode: 65,
      functions: ['functionOne', 'functionTwo'],
    },
  ]);

  processor.loadConfigFromJSON(config);

  t.is(processor.attachedFunctions[65].length, 1);
  t.is(processor.attachedFunctions[65][0].id, 'testConfig');
  t.is(processor.attachedFunctions[65][0].functions.length, 2);
});

