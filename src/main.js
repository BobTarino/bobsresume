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

k.loadSprite("map", "./map.png"); 

k.setBackground(k.Color.fromHex("311047"));

k.scene("main", async () => {
    const mapData = await (await fetch("./map")).json()   /* we await fetch function because its async; code would continue to execute - we want to load map data and not move rest of code until it's done - then convert to json object - once data is loaded we are ready to move on */
    const layers = mapData.layers;

    const map = k.make([k.sprite("map"), k.pos(0), k.scale()]);    /* map game object - make (makes game object) add (displays game object) */
});

k.go("main");

/* time 19:17 */