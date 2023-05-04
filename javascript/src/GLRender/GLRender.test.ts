import test from "ava";
import { CursorPosition } from '../Cursor/Cursor';
import { GLRender, Color } from "./GLRender";
var sinon = require("sinon");


test('Color class', (t) => {
    const defaultColor = new Color();
    t.deepEqual(defaultColor.toArray(), [0, 0, 0, 0]);

    const customColor = new Color(0.5, 0.5, 0.5, 0.5);
    t.deepEqual(customColor.toArray(), [0.5, 0.5, 0.5, 0.5]);

    const colorWithNoAlpha = new Color(1, 1, 1);
    t.deepEqual(colorWithNoAlpha.toArray(), [1, 1, 1, 0]);
});

test('GLRender', (t) => {
    const glRender = new GLRender(123);

    t.is(glRender.UNIQ, 123);

    // Test drawto method
    glRender.drawto('test_context');
    t.is((<any>glRender.glVid).drawto, 'test_context');

    // Test setCursorChars method
    glRender.setCursorChars('>>');
    t.deepEqual(glRender.getCursorChars(), [62, 62]);

    const initialPosition = (<any>glRender.animNode).position;
    t.deepEqual(initialPosition, [0, 0, 0]);

    glRender.position(0.5, 0.5);
    const updatedPosition = (<any>glRender.animNode).position;
    t.deepEqual(updatedPosition, [0.5, 0.5, 0]);

    glRender.scale(1.0)
    const initialScale = (<any>glRender.animNode).scale;
    t.deepEqual(initialScale, [1, 1, 0]);

    glRender.scale(2.0);
    const updatedScale = (<any>glRender.animNode).scale;
    t.deepEqual(updatedScale, [2, 2, 0]);

    const initialColor = glRender.getTextColor();
    t.deepEqual(initialColor, new Color(1, 1, 1, 1));

    glRender.setTextColor(0.5, 0.5, 0.5, 0.5);
    const updatedColor = glRender.getTextColor();
    t.deepEqual(updatedColor, new Color(0.5, 0.5, 0.5, 0.5));
    glRender.setTextColor(1, 0, 0, 0.5);
    const tc = glRender.getTextColor()
    t.deepEqual(tc, new Color(1, 0, 0, 0.5));


    // Test setLineWidth method
    glRender.line_width(5);
    t.is((<any>glRender.glTextObj.text).line_width, 5);


    // Test setLineLength method
    glRender.line_length(10);
    t.is((<any>glRender.glTextObj.text).line_length, 10);


    // Test setTracking method
    glRender.tracking(1);
    t.is((<any>glRender.glTextObj.text).tracking, 1);


    // Test disableText method
    glRender.disableText(true);
    t.is(glRender.textDisabled(), true);
    t.is((<any>glRender.glTextObj).text.gl_color[3], 0.5);
    glRender.disableText(false);
    t.is(glRender.textDisabled(), false);
    t.is((<any>glRender.glTextObj).text.gl_color[3], 1.0);


    // Test setLeadscale method
    glRender.leadscale(0.5);
    t.is((<any>glRender.glTextObj.text).leadscale, 0.5);
    t.is((<any>glRender.glTextObj.crsr).leadscale, 0.5);
    t.is((<any>glRender.glTextObj.lnmr).leadscale, 0.5);


    // Test setFont method
    let af = glRender.activeFont()
    t.is(af, 'Arial')
    glRender.font('Comic Sans');
    af = glRender.activeFont()
    t.is(af, 'Comic Sans')
    // Comic Sans is objectively bad, only use it for jokes!


    // Test setFontsize method
    let fs = glRender.getFontSize()
    t.is(fs, 100)
    glRender.fontsize(12);
    fs = glRender.getFontSize()
    t.is(fs, 12)


    t.is((<any>glRender.glTextObj.lnmr).cull_face, 1)
    t.is((<any>glRender.glTextObj.crsr).cull_face, 1)
    t.is((<any>glRender.glTextObj.text).cull_face, 1)
    glRender.cull_face(2)
    t.is((<any>glRender.glTextObj.lnmr).cull_face, 2)
    t.is((<any>glRender.glTextObj.crsr).cull_face, 2)
    t.is((<any>glRender.glTextObj.text).cull_face, 2)

    // Test blink method
    glRender.blink_enable(true);
    const initialCrsrColor = (<any>glRender.glTextObj.crsr).gl_color;
    glRender.blink();
    const afterBlinkCrsrColor = (<any>glRender.glTextObj.crsr).gl_color;
    t.notDeepEqual(afterBlinkCrsrColor, initialCrsrColor);

    // Test runBlink method
    const initialTextColor = (<any>glRender.glTextObj.text).gl_color;
    glRender.runBlink(0.5);
    const afterRunBlinkTextColor = (<any>glRender.glTextObj.text).gl_color;
    t.notDeepEqual(afterRunBlinkTextColor, initialTextColor);

});

test('Blink', (t) => {

    const glRender = new GLRender(123);
    let crsrColor = (<any>glRender.glTextObj.crsr).gl_color;
    glRender.blink_enable(false);
    glRender.blink();
    let newCrsrColor = (<any>glRender.glTextObj.crsr).gl_color;
    t.deepEqual(newCrsrColor, crsrColor);

    glRender.blink_enable(true);
    glRender.blink();
    newCrsrColor = (<any>glRender.glTextObj.crsr).gl_color;
    t.notDeepEqual(newCrsrColor, crsrColor);

    glRender.blink_color(1, 0, 0, 0.5);
    glRender.blink();
    glRender.blink();
    newCrsrColor = (<any>glRender.glTextObj.crsr).gl_color;
    t.deepEqual(newCrsrColor, new Color(1, 0, 0, 0.5).toArray());


    glRender.cursor_color(0, 0, 1, 0.5);
    // cursor_color itself calls blink so we don't need to call it here to see a change
    newCrsrColor = (<any>glRender.glTextObj.crsr).gl_color;
    t.deepEqual(newCrsrColor, new Color(0, 0, 1, 0.5).toArray());

    glRender.number_color(1, 1, 0, 0.5);
    const initialNumberColor = (<any>glRender.glTextObj.lnmr).gl_color;
    t.deepEqual(initialNumberColor, [1, 1, 0, 0.5]);

    const preRun = (<any>glRender.glTextObj.text).gl_color;
    glRender.run_color(0, 1, 0, 0.5);
    glRender.runBlink(0.5)
    const postRun = (<any>glRender.glTextObj.text).gl_color;
    t.notDeepEqual(postRun, preRun)

})

test('GLRender draw, drawCursor, drawNumbers, drawText and matrixToText methods', (t) => {
    const renderer = new GLRender(1);
    const textBuf = ['hello', 'world'];
    const curPos = { line: 0, char: 0 };

    // === Internal Function Calls ===
    const drawTextStub = sinon.stub(renderer, 'drawText');
    const drawCursorStub = sinon.stub(renderer, 'drawCursor');
    const drawNumbersStub = sinon.stub(renderer, 'drawNumbers');
    //const matrixToTextStub = sinon.stub(renderer, 'matrixToText');

    renderer.draw(textBuf, curPos);

    // Verify internal functions were called correctly.
    t.true(drawTextStub.calledWith(textBuf));
    t.true(drawCursorStub.calledWith(textBuf, curPos));
    t.true(drawNumbersStub.calledWith(textBuf, curPos));
    //t.true(matrixToTextStub.calledOnce);

    // Restore functions
    drawTextStub.restore();
    drawCursorStub.restore();
    drawNumbersStub.restore();
    //matrixToTextStub.restore();
});