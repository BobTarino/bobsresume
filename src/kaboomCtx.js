import kaboom from "kaboom";

export const k = kaboom({
    global: false,
    touchToMouse: true, /* transaltes all touch events on mobile to click events*/
    canvas: document.getElementById("game") /* telling canvas to target the game element in html */
})
