// import test from 'ava';
// import { Color, GLRender } from './GLRender';

// // // Initialize GLRender class instance for tests
// const glRender = new GLRender();


// test('Color class', (t) => {
//     const color = new Color(1, 0.5, 0, 0.5);
//     t.deepEqual(color.toArray(), [1, 0.5, 0, 0.5]);
// });



// test('drawto', (t) => {
//     glRender.drawto('test');
//     t.is(glRender['MAIN_CTX'], 'test');
// });


// test('position', (t) => {
//     glRender.position(0.5, 0.5);

//     t.deepEqual((<any>glRender.textNode).position, [0.5, 0.5, 0]);
// });


// test('scale', (t) => {
//     const fontSize = glRender['FONT_SIZE'];
//     const scaling = 1.5;
//     glRender.scale(scaling);
//     t.deepEqual((<any>glRender.textNode).scale, [scaling * 100 / fontSize, scaling * 100 / fontSize, 0]);
// });


// test('alpha', (t) => {
//     glRender.alpha(0.5);
//     for (const [, v] of Object.entries(glRender['glTextObj'])) {
//         t.is((<any>v).gl_color[3], 0.5);
//     }
// });


// test('cull_face', (t) => {
//     glRender.cull_face(1);
//     for (const [, v] of Object.entries(glRender['glTextObj'])) {
//         t.is((<any>v).cull_face, 1);
//     }
// });


// // test('font', (t) => {
// //     glRender.font('Arial');
// //     for (const [, v] of Object.entries(glRender['glTextObj'])) {
// //         t.is((<any>v).font, 'Arial');
// //     }
// // });


// // test('fontsize', (t) => {
// //     const fontSize = 15;
// //     glRender.fontsize(fontSize);
// //     for (const [, v] of Object.entries(glRender['glTextObj'])) {
// //         t.is((<any>v).size, fontSize);
// //     }
// // });


// test('leadscale', (t) => {
//     glRender.leadscale(1.2);
//     for (const [, v] of Object.entries(glRender['glTextObj'])) {
//         t.is((<any>v).leadscale, 1.2);
//     }
// });


// test('tracking', (t) => {
//     glRender.tracking(0.8);
//     for (const [, v] of Object.entries(glRender['glTextObj'])) {
//         t.is((<any>v).tracking, 0.8);
//     }
// });


// test('line_length', (t) => {
//     glRender.line_length(120);
//     for (const [, v] of Object.entries(glRender['glTextObj'])) {
//         t.is((<any>v).line_length, 120);
//     }
// });


// test('line_width', (t) => {
//     glRender.line_width(90);
//     for (const [, v] of Object.entries(glRender['glTextObj'])) {
//         t.is((<any>v).line_width, 90);
//     }
// });

