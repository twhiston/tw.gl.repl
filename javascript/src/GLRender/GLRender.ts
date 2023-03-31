import { CursorPosition } from 'Cursor';
import { maxMspBinding } from 'MaxBindings';

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

// class JitterObject {  // The fake B
//     type: string
//     constructor(type: string) {
//         this.type = type
//     }
//     font(name: string) {

//     }
// }

// class JitterMatrix {  // The fake B
//     args: any
//     name: string
//     fnt: string
//     constructor(...args: any[]) {
//         this.args = args
//         this.name = "";
//         this.fnt = "";
//     }
//     setall(a: any) {

//     }
//     setcell2d(a: any, b: any, c: any) {

//     }

// }

//There's a lot of casting to any in this class to make typescript happy, it's a bit tedious
//but hopefully it never has to be touched ;) 
export class GLRender {

    // the main node that all text is drawn to
    // for display on videoplane through camera capture
    textNode = new JitterObject("jit.gl.node");
    // the main anim node to position all text according to screensize
    animNode = new JitterObject("jit.anim.node");
    // the anim node and text for the command line
    textAnim = new JitterObject("jit.anim.node");

    //glText = new JitterObject("jit.gl.text");

    // the anim node and text for the cursor
    crsrAnim = new JitterObject("jit.anim.node");
    //glCrsr = new JitterObject("jit.gl.text");

    // the anim node and text for the line numbers
    nmbrAnim = new JitterObject("jit.anim.node");
    //glNmbr = new JitterObject("jit.gl.text");

    // add all objects to array for easy access when
    // changing multiple parameters
    glTextObj = {
        text: new JitterObject("jit.gl.text"),
        crsr: new JitterObject("jit.gl.text"),
        lnmr: new JitterObject("jit.gl.text")
    }
    //allTextObj = [this.glText, this.glCrsr, this.glNmbr];

    // the camera for capture
    glCam = new JitterObject("jit.gl.camera");
    // the videoplane for display in world
    glVid = new JitterObject("jit.gl.videoplane");

    // matrices for text display
    textMtx = new JitterMatrix
    crsrMtx = new JitterMatrix
    nmbrMtx = new JitterMatrix

    private readonly UNIQ = Date.now();
    private readonly NODE_CTX = "node" + this.UNIQ;
    private readonly ANIM_NODE = "anim" + this.UNIQ;
    private readonly CAM_CAP = "cam" + this.UNIQ;
    private readonly LINE_CHARS = 140;
    private readonly DEFAULT_FONT = 'Arial';
    private FONT_SIZE = 100;
    private MAIN_CTX = "CTX";
    private SCALING = 1;
    private CRSR_CHARS = [];
    //TODO: can get rid of most accessor functions for these
    // and use an annotation to make a binding
    private textAlpha = 1; //TODO: why are we not using the a from the rgba?
    private useBlink = true;
    private blinkToggle = 0;

    private textColor = new Color(1, 1, 1, 1);
    private runColor = new Color(0, 0, 0, 1);
    private cursorColor = new Color(1, 0.501961, 0, 1);
    private blinkColor = new Color(0.4, 0.8, 1, 1);


    // THE HORROR!!
    constructor() {
        (<any>this.textNode).fsaa = 1;
        (<any>this.textNode).type = "float32";
        (<any>this.textNode).name = this.NODE_CTX;
        (<any>this.textNode).adapt = 0;

        (<any>this.textNode).name = this.ANIM_NODE;
        (<any>this.textNode).position = [0, 0, 0];

        (<any>this.textAnim).anim = this.ANIM_NODE;
        (<any>this.textAnim).position = [0.9, 0, 0];

        (<any>this.glTextObj.text).drawto = this.NODE_CTX;
        (<any>this.glTextObj.text).anim = (<any>this.textAnim).name;
        (<any>this.glTextObj.text).gl_color = [1, 1, 1, 1];
        (<any>this.glTextObj.text).screenmode = 0;
        (<any>this.glTextObj.text).cull_face = 1;

        (<any>this.crsrAnim).anim = this.ANIM_NODE;
        (<any>this.crsrAnim).position = [0.9, 0, 0];

        (<any>this.glTextObj.crsr).drawto = this.NODE_CTX;
        (<any>this.glTextObj.crsr).anim = (<any>this.crsrAnim).name;
        (<any>this.glTextObj.crsr).gl_color = [1, 1, 1, 1];
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
    }

    drawto(v: string) {
        this.MAIN_CTX = v;
        (<any>this.textNode).drawto = this.MAIN_CTX;
        (<any>this.glVid).drawto = this.MAIN_CTX;
    }

    // the text position
    @maxMspBinding({ instanceName: 'i.glRender' })
    position(x: number, y: number) {
        (<any>this.textNode).position = [x, y, 0];
    }

    // the text scaling
    @maxMspBinding({ instanceName: 'i.glRender' })
    scale(s: number) {
        this.SCALING = s * 100 / this.FONT_SIZE;
        (<any>this.textNode).scale = [this.SCALING, this.SCALING, 0];
    }

    draw(textBuf: Array<string>, pos: CursorPosition) {
        this.drawText(textBuf); //place the strings as text in a matrix
        this.drawCursor(textBuf, pos); //set the cursorposition
        this.drawNumbers(textBuf, pos); //store the numbers in the matrix
        this.matrixToText(); //set the matrices to the gl text objects
    }

    // draw the text to a jitter matrix as ascii
    drawText(textBuf: Array<string>) {
        this.textMtx = new JitterMatrix("text" + this.UNIQ, 1, "char", this.LINE_CHARS, textBuf.length);
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
        this.crsrMtx = new JitterMatrix("crsr" + this.UNIQ, 1, "char", this.LINE_CHARS, textBuf.length);

        this.crsrMtx.setall([32]);
        // draw at least something at the end of the matrix.
        for (var i = 0; i < textBuf.length; i++) {
            this.crsrMtx.setcell2d(this.LINE_CHARS - 1, i, 46);
        }
        for (var c = 0; c < this.CRSR_CHARS.length; c++) {
            this.crsrMtx.setcell2d(cur.char + c, cur.line, this.CRSR_CHARS[c]);
        }
    }

    // draw the numbers to a jitter matrix as ascii
    drawNumbers(textBuf: Array<string>, pos: CursorPosition) {
        this.nmbrMtx = new JitterMatrix("nmbr" + this.UNIQ, 1, "char", 3, textBuf.length);

        for (var i = 0; i < textBuf.length; i++) {
            var digits = new Array(2);
            digits[0] = String(Math.floor((i) / 10));
            digits[1] = String((i) % 10);
            if (digits[0] == 0) {
                digits[0] = " ";
            }
            // post(digit1.charCodeAt(0), digit2.charCodeAt(0));
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

    color(color: Color) {
        this.textColor = color;
        (<any>this.glTextObj.text).gl_color = color.toArray();
    }

    run_color(color: Color) {
        this.runColor = color;
    }

    number_color(color: Color) {
        (<any>this.glTextObj.lnmr).gl_color = color.toArray();
    }

    @maxMspBinding({ instanceName: 'i.glRender' })
    runBlink(t: number) {

        var c = [];
        var carr = this.textColor.toArray()
        var runc = this.runColor.toArray()
        for (var i = 0; i < carr.length; i++) {
            c[i] = carr[i] * (1 - t) + runc[i] * t;
        }
        (<any>this.glTextObj.text).gl_color = c;

        // if (t){
        // 	glText.gl_color = runColor;
        // } else {
        // 	glText.gl_color = textColor;
        // }
    }

    @maxMspBinding({ instanceName: 'i.glRender' })
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

    @maxMspBinding({ instanceName: 'i.glRender' })
    blink_enable(v: boolean) {
        this.useBlink = v;
    }

    cursor_color(color: Color) {
        this.cursorColor = color;
        this.blink();
    }

    blink_color(color: Color) {
        this.blinkColor = color;
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


    font(f: string) {
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).font(f);
        }
    }

    fontsize(s: number) {
        this.FONT_SIZE = s;
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).size(this.FONT_SIZE);
        }
        this.scale(this.SCALING);
        // textAnim.position = [0.9, 0, 0];
        // crsrAnim.position = [0.9, 0, 0];
    }

    leadscale(l: number) {
        for (const [k, v] of Object.entries(this.glTextObj)) {
            (<any>v).leadscale = l;
        }
    }

    //TODO: tighten type
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