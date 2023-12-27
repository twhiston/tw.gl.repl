import { CursorPosition } from 'Cursor';
import { maxMspBinding } from 'MaxBindings';
import 'array.extensions';


/*
 * The following wrappers allow us to make the GLRender class testable
 * Basically they pass a proxy into the test environment where all of
 * the max classes are unavailable. It's cumbersome but necessary if
 * we want unit tests here. Luckily they are internal to the implementation.
 */
/* istanbul ignore next */
type JitterMatrixConstructor = new (...args: any[]) => JitterMatrix;

/* istanbul ignore next */
class FallbackJitterMatrix {
    constructor(...args: any[]) {
        const handler = {
            get: (target: any, propName: string) => {
                //throw new Error("JitterMatrix is not available in this context");
                if (propName === 'setall' || propName === 'setcell2d') {
                    return (...funcArgs: any[]) => {
                        // console.log('Custom method called with arguments:', funcArgs);
                    };
                }
            },
        };

        const proxy = new Proxy({}, handler);
        Object.setPrototypeOf(proxy, FallbackJitterMatrix.prototype);
        return proxy;
    }
}
/* istanbul ignore next */
const WrappedJitterMatrix: JitterMatrixConstructor =
    typeof JitterMatrix === "undefined"
        ? (FallbackJitterMatrix as any)
        : JitterMatrix;
/* istanbul ignore next */
type JitterObjectConstructor = new (...args: any[]) => JitterObject;

/* istanbul ignore next */
class FallbackJitterObject {
    constructor(...args: any[]) {
        const handler = {
            get: (target: any, propName: string) => {
                // Define a custom method implementation
                if (propName === 'font' || propName === 'size' || propName === 'jit_matrix') {
                    return (...funcArgs: any[]) => {
                        // console.log('Custom method called with arguments:', funcArgs);
                    };
                }
                if (typeof target[propName] === "function") {
                    return (...funcArgs: any[]) => {
                        // If JitterObject is not available, throw an error or provide fallback implementation
                        target[propName].apply(target, funcArgs);
                    };
                }
                // If JitterObject is not available, return undefined or provide fallback attribute values
                //console.warn(`JitterObject property '${propName}' is not available in this context`);
                return target[propName];
            },
        };

        const proxy = new Proxy({}, handler);
        Object.setPrototypeOf(proxy, FallbackJitterObject.prototype);
        return proxy;
    }
}
/* istanbul ignore next */
const WrappedJitterObject: JitterObjectConstructor =
    typeof JitterObject === "undefined"
        ? (FallbackJitterObject as any)
        : JitterObject;

// polyfill Object.entries for archaic max runtimes
// test environment has this function so hard to test, hence we ignore it
/* istanbul ignore next */
if (!Object.entries)
    Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array

        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
        return resArray;
    };

export class Color {
    r: number
    g: number
    b: number
    a: number
    constructor(r?: number, g?: number, b?: number, a?: number) {
        this.r = r || 0.0
        this.g = g || 0.0
        this.b = b || 0.0
        this.a = a || 0.0
    }
    toArray(): Array<number> {
        return [this.r, this.g, this.b, this.a];
    }
};

//There's a lot of casting to any in this class to make typescript happy, it's a bit tedious
//but hopefully it never has to be touched ;)
@maxMspBinding({ instanceName: 'glrepl.renderer', isMethod: true, isAttribute: true })
export class GLRender {

    // the main node that all text is drawn to
    // for display on videoplane through camera capture
    textNode = new WrappedJitterObject("jit.gl.node");
    // the main anim node to position all text according to screensize
    animNode = new WrappedJitterObject("jit.anim.node");
    // the anim node and text for the command line
    textAnim = new WrappedJitterObject("jit.anim.node");

    glText = new WrappedJitterObject("jit.gl.text");

    // the anim node and text for the cursor
    crsrAnim = new WrappedJitterObject("jit.anim.node");

    // the anim node and text for the line numbers
    nmbrAnim = new WrappedJitterObject("jit.anim.node");

    // add all objects to array for easy access when
    // changing multiple parameters
    glTextObj = {
        text: new WrappedJitterObject("jit.gl.text"),
        crsr: new WrappedJitterObject("jit.gl.text"),
        lnmr: new WrappedJitterObject("jit.gl.text")
    }

    // the camera for capture
    glCam = new WrappedJitterObject("jit.gl.camera");
    // the videoplane for display in world
    glVid = new WrappedJitterObject("jit.gl.videoplane");

    // matrices for text display
    textMtx: JitterMatrix
    crsrMtx: JitterMatrix
    nmbrMtx: JitterMatrix

    readonly UNIQ: number;
    private readonly NODE_CTX: string;
    private readonly ANIM_NODE: string;
    private readonly CAM_CAP: string;
    private readonly DEFAULT_FONT = 'Arial';
    private ACTIVE_FONT = this.DEFAULT_FONT;
    private FONT_SIZE = 100;
    private MAIN_CTX = "CTX";
    private SCALING = 1;
    private CRSR = "<<";
    private CRSR_CHARS = [];
    //TODO: can get rid of most accessor functions for these
    // and use an annotation to make a binding
    private textAlpha = 1; //TODO: why are we not using the a from the rgba?
    private useBlink = true;
    private blinkToggle = 0;
    private isDisabled = false;

    private textColor = new Color(1, 1, 1, 1);
    private runColor = new Color(0, 0, 0, 1);
    private cursorColor = new Color(1, 0.501961, 0, 1);
    private blinkColor = new Color(0.4, 0.8, 1, 1);

    private hideDisplay: boolean = false;

    // THE HORROR!!
    constructor(uuid: number) {

        this.UNIQ = uuid;
        this.NODE_CTX = "node" + this.UNIQ;
        this.ANIM_NODE = "anim" + this.UNIQ;
        this.CAM_CAP = "cam" + this.UNIQ;

        this.textMtx = new WrappedJitterMatrix("text" + this.UNIQ);
        this.crsrMtx = new WrappedJitterMatrix("crsr" + this.UNIQ);
        this.nmbrMtx = new WrappedJitterMatrix("nmbr" + this.UNIQ);

        (<any>this.textNode).fsaa = 1;
        (<any>this.textNode).type = "float32";
        (<any>this.textNode).name = this.NODE_CTX;
        (<any>this.textNode).adapt = 0;

        (<any>this.animNode).name = this.ANIM_NODE;
        (<any>this.animNode).position = [0, 0, 0];

        (<any>this.textAnim).anim = this.ANIM_NODE;
        (<any>this.textAnim).position = [0.9, 0, 0];

        (<any>this.glTextObj.text).drawto = this.NODE_CTX;
        (<any>this.glTextObj.text).anim = (<any>this.textAnim).name;
        (<any>this.glTextObj.text).gl_color = this.textColor.toArray();
        (<any>this.glTextObj.text).screenmode = 0;
        (<any>this.glTextObj.text).cull_face = 1;

        (<any>this.crsrAnim).anim = this.ANIM_NODE;
        (<any>this.crsrAnim).position = [0.9, 0, 0];

        (<any>this.glTextObj.crsr).drawto = this.NODE_CTX;
        (<any>this.glTextObj.crsr).anim = (<any>this.crsrAnim).name;
        (<any>this.glTextObj.crsr).gl_color = this.cursorColor.toArray();
        (<any>this.glTextObj.crsr).screenmode = 0;
        (<any>this.glTextObj.crsr).cull_face = 1;
        (<any>this.glTextObj.crsr).layer = 10;

        (<any>this.nmbrAnim).anim = this.ANIM_NODE;

        (<any>this.glTextObj.lnmr).drawto = this.NODE_CTX;
        (<any>this.glTextObj.lnmr).anim = (<any>this.nmbrAnim).name;
        (<any>this.glTextObj.lnmr).gl_color = [0.6, 0.6, 0.6, 1];
        (<any>this.glTextObj.lnmr).screenmode = 0;
        (<any>this.glTextObj.lnmr).cull_face = 1;
        (<any>this.glTextObj.lnmr).layer = 10;

        (<any>this.glCam).drawto = this.NODE_CTX;
        (<any>this.glCam).out_name = this.CAM_CAP;
        (<any>this.glCam).erase_color = [0, 0, 0, 0];
        (<any>this.glCam).capture = 1;
        (<any>this.glCam).ortho = 2;

        (<any>this.glVid).texture = this.CAM_CAP;
        (<any>this.glVid).transform_reset = 2;
        (<any>this.glVid).blend_enable = 1;
        (<any>this.glVid).depth_enable = 0;
        (<any>this.glVid).layer = 1000;
        (<any>this.glVid).blend = "difference";

        this.font(this.DEFAULT_FONT)
        this.setCursorChars(this.CRSR)
    }

    /* istanbul ignore next */
    /*
     * free all the jitter objects, called via [freebang] in abstraction
     * it is not routed so can only be called from inside the abstraction
     * and as such is not available for use
     */
    @maxMspBinding({ isAttribute: false, isMethod: false, noroute: true, functionName: "_close" })
    destroy() {
        this.textNode.freepeer()
        this.animNode.freepeer()
        this.textAnim.freepeer()
        this.glText.freepeer()
        this.crsrAnim.freepeer()
        this.nmbrAnim.freepeer()
        this.glTextObj.text.freepeer()
        this.glTextObj.crsr.freepeer()
        this.glTextObj.lnmr.freepeer()
        this.glCam.freepeer()
        this.glVid.freepeer()
    }

    /*
     * Set the render context for displaying the repl.
     * This is the same as the rendering-context argument
     */
    @maxMspBinding({ isAttribute: false })
    drawto(v: string) {
        this.MAIN_CTX = v;
        (<any>this.textNode).drawto = this.MAIN_CTX;
        (<any>this.glVid).drawto = this.MAIN_CTX;
    }

    /*
     * set the text position.
     * This is mostly called internally to dynamically resize text and should not need to be called by the user
     * in regular use of the repl
     */
    @maxMspBinding({ customHandler: 'textScalingHandler' })
    position(x: number, y: number) {
        (<any>this.animNode).position = [x, y, 0];
    }

    /*
     * set the text scaling.
     * This is mostly called internally to dynamically resize text and should not need to be called by the user
     * in regular use of the repl
     */
    @maxMspBinding({ customHandler: 'textScalingHandler' })
    scale(s: number) {
        this.SCALING = s * 100 / this.FONT_SIZE;
        (<any>this.animNode).scale = [this.SCALING, this.SCALING, 0];
    }

    hideText(hide: boolean) {
        this.hideDisplay = hide;
    }

    draw(textBuf: Array<string>, pos: CursorPosition) {
        if (this.hideDisplay) {
            this.textMtx.setall([0]);
            this.crsrMtx.setall([0]);
            this.nmbrMtx.setall([0]);
        } else {
            this.drawText(textBuf); //place the strings as text in a matrix
            this.drawCursor(textBuf, pos); //draw the cursor position in a matrix
            this.drawNumbers(textBuf, pos); //draw the line numbers in a matrix
        }
        this.matrixToText(); //set the matrices to the gl text objects
    }

    // draw the text to a jitter matrix as ascii
    drawText(textBuf: Array<string>) {
        //Uses the Array extension which you can see code for in TextBuffer.ts
        const maxChars = textBuf.getMaxChar()
        this.textMtx = new WrappedJitterMatrix("text" + this.UNIQ, 1, "char", maxChars, textBuf.length);
        this.textMtx.setall([0]);
        // draw all the characters as ascii code in a matrix
        for (var l = 0; l < textBuf.length; l++) {
            // check if not an empty line/string
            if (!textBuf[l].match(/^[ \t]*$/g)) {
                for (var c = 0; c < textBuf[l].length; c++) {
                    this.textMtx.setcell2d(c, l, textBuf[l].charCodeAt(c));
                }
            }
        }
    }

    // draw the cursor to a jitter matrix as ascii
    drawCursor(textBuf: Array<string>, cur: CursorPosition) {
        const maxChars = textBuf.getMaxChar()
        // TODO: If you don't draw something into every cell and put something proper other than
        // space into each line it does not want to draw the cursor properly!
        // why is this! it sucks!
        // To work around this we make a massively wide matrix and fill it with spaces and a single dot!
        this.crsrMtx = new WrappedJitterMatrix("crsr" + this.UNIQ, 1, "char", 1000, textBuf.length);
        this.crsrMtx.setall([32]);
        for (var i = 0; i < textBuf.length; i++) {
            this.crsrMtx.setcell2d(999, i, 46);
        }
        for (var c = 0; c < this.CRSR_CHARS.length; c++) {
            this.crsrMtx.setcell2d(cur.char + c, cur.line, this.CRSR_CHARS[c]);
        }
    }

    // draw the numbers to a jitter matrix as ascii
    drawNumbers(textBuf: Array<string>, pos: CursorPosition) {
        this.nmbrMtx = new WrappedJitterMatrix("nmbr" + this.UNIQ, 1, "char", 3, textBuf.length);
        for (var i = 0; i < textBuf.length; i++) {
            var digits = new Array(2);
            digits[0] = String(Math.floor((i) / 10));
            digits[1] = String((i) % 10);
            if (digits[0] == 0) {
                digits[0] = " ";
            }
            for (var n = 0; n < 2; n++) {
                this.nmbrMtx.setcell2d(n, i, digits[n].charCodeAt(0));
            }
        }
        this.nmbrMtx.setcell2d(0, pos.line, 62);
        this.nmbrMtx.setcell2d(1, pos.line, 62);
    }

    matrixToText() {
        (<any>this.glTextObj.text).jit_matrix(this.textMtx.name);
        (<any>this.glTextObj.crsr).jit_matrix(this.crsrMtx.name);
        (<any>this.glTextObj.lnmr).jit_matrix(this.nmbrMtx.name);
    }

    /*
     * set the text colour.
     * R G B A format where A is optional and default set to 1.0
     */
    @maxMspBinding({ functionName: "color" })
    setTextColor(r: number, g: number, b: number, a: number = 1.0) {
        this.color(new Color(r, g, b, a))
    }

    color(color: Color) {
        this.textColor = color;
        (<any>this.glTextObj.text).gl_color = color.toArray();
    }

    getTextColor() {
        return this.textColor;
    }

    /*
     * set the run colour.
     * This is the colour things change to briefly when the run/execute function is called
     * R G B A format where A is optional and default set to 1.0
     */
    @maxMspBinding({})
    run_color(r: number, g: number, b: number, a: number = 1.0) {
        this.runColor = new Color(r, g, b, a);
    }

    /*
     * set the line number colour.
     * R G B A format where A is optional and default set to 1.0
     */
    @maxMspBinding({})
    number_color(r: number, g: number, b: number, a: number = 1.0) {
        const color = new Color(r, g, b, a);
        (<any>this.glTextObj.lnmr).gl_color = color.toArray();
    }

    /*
     * set the cursor character colour.
     * R G B A format where A is optional and default set to 1.0
     */
    @maxMspBinding({})
    cursor_color(r: number, g: number, b: number, a: number = 1.0) {
        const color = new Color(r, g, b, a);
        this.cursorColor = color;
        this.blink();
    }

    /*
     * set the cursor characters.
     * default is <<
     */
    @maxMspBinding({ draw: true, functionName: 'cursor' })
    setCursorChars(c: string) {
        this.CRSR = c.toString();
        this.CRSR_CHARS = [];
        for (var i = 0; i < this.CRSR.length; i++) {
            this.CRSR_CHARS.push(this.CRSR[i].charCodeAt(0));
        }
    }

    getCursorChars() {
        return this.CRSR_CHARS;
    }

    /*
    * Turn the blinking cursor on and off.
    * In normal operation this is called internally when ignore_keys is true to give
    * a visual indication of the locked state of the repl.
    */
    @maxMspBinding({})
    blink_enable(v: boolean) {
        this.useBlink = v;
    }

    /*
     * set the blink colour.
     * R G B A format where A is optional and default set to 1.0
     */
    @maxMspBinding({})
    blink_color(r: number, g: number, b: number, a: number = 1.0) {
        const color = new Color(r, g, b, a);
        this.blinkColor = color;
    }


    /*
     * runs the blink command, called internally in abstraction and not exposed via routing
     */
    @maxMspBinding({ noroute: true, isMethod: false, isAttribute: false })
    runBlink(t: number) {
        var c = [];
        var carr = this.textColor.toArray()
        var runc = this.runColor.toArray()
        for (var i = 0; i < carr.length; i++) {
            c[i] = carr[i] * (1 - t) + runc[i] * t;
        }
        (<any>this.glTextObj.text).gl_color = c;
    }

    /*
     * blinks the cursor
     * called internally and not exposed to the router
     */
    @maxMspBinding({ noroute: true, isMethod: false, isAttribute: false })
    blink() {
        if (this.useBlink) {
            this.blinkToggle = 1 - this.blinkToggle;
            if (this.blinkToggle) {
                (<any>this.glTextObj.crsr).gl_color = this.blinkColor.toArray();
            } else {
                (<any>this.glTextObj.crsr).gl_color = this.cursorColor.toArray();
            }
        } else {
            (<any>this.glTextObj.crsr).gl_color = this.cursorColor.toArray();
        }
    }

    //CHANGE ALL FUNCTIONS
    //Things below here change all things in the text objects
    alpha(a: number) {
        this.textAlpha = Math.max(0, Math.min(1, a));
        for (const [k, v] of Object.entries(this.glTextObj)) {
            var c = (<any>v).gl_color;
            c[3] = this.textAlpha;
            (<any>v).gl_color = c;
        }
    }

    //TODO: tighten type
    cull_face(c: any) {
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).cull_face = c;
        }
    }

    /*
     * set the font.
     * set the font by name in all objects, should be the name of a valid font installed on the system
     */
    @maxMspBinding({})
    font(f: string) {
        this.ACTIVE_FONT = f;
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).font(f);
        }
    }

    activeFont(): string {
        return this.ACTIVE_FONT
    }

    fontsize(s: number) {
        this.FONT_SIZE = s;
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).size(this.FONT_SIZE);
        }
        this.scale(this.SCALING);
    }

    getFontSize(): number {
        return this.FONT_SIZE
    }

    /*
     * set the lead scale
     * float value
     */
    @maxMspBinding({})
    leadscale(l: number) {
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).leadscale = l;
        }
    }

    disableText(state: boolean) {
        this.isDisabled = state;
        this.alpha(1.0 - Number(this.isDisabled) * 0.5);
    }

    textDisabled() {
        return this.isDisabled;
    }

    /*
     * set the tracking on the gl text objects
     */
    @maxMspBinding({})
    tracking(t: any) {
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).tracking = t;
        }
    }

    line_length(l: number) {
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).line_length = l;
        }
    }

    line_width(w: number) {
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).line_width = w;
        }
    }
}