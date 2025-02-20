import { k } from "./kaboomCtx";

k.loadSprite("spritesheet", "./spritesheet.png", {
    sliceX: 39, /* 39 frames on X axis (each frame is 16x16 tile) */
    sliceY: 31, /* 31 frames on Y axis */
    anims: {
        "idle-down": 936, 
        "walk-down": { from: 936, to: 939, loop: true, speed: 8 }, 
        "idle-side": 975, 
        "walk-side": { from: 975, to: 978, loop: true, speed: 8 }, 
        "idle-up": 1014, 
        "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 }, 
    },
});

/* time 19:17 */