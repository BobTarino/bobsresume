import { scaleFactor } from "./constants";
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

    const map = k.make([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);    /* map game object - make (makes game object) add (displays game object) */

    const player = k.make([
        k.sprite("spritesheet", { anim: "idle-down" }), /* import spritesheet and default animation is idle-down */
        k.area({
            shape: new k.Rect(k.vec2(0,3,), 10, 10) /* hitbox will be a rectangle and first param is vector coordinates (hitbox drawn from origin of player plus 3 on x axis, and last two params are height and width of hitbox   )  */
        }),
        k.body(), /* k.body is a component that makes player tangible physics object that can be collided with  */
        k.anchor("center"), /* draw player from center not top left corner (default) */
        k.scale(scaleFactor), 
        {
            speed: 250,
            direction: "down", 
            isInDialogue: false, /* default - player does not have dialogue box until activated */
        },
        "player", /* identify game object in code - especially when making a collision event */
    ]);

    for (const layer of layers) {   /* for loop iterates through various map.json layers */
        if (layer.name === "boundaries") {  /* if layer name is boundaries */
            for (const boundary of layer.objects) /* for loop iterates through all objects in "boundaries" layer  */ {
                map.add([     /* map object and add game object */
                    k.area({
                       shape: new k.Rect(k.vec2(0), boundary.width, boundary.height), /* area component - coordinates of hitbox relative to game object (will be same position as game object,) width and height of boundary from Tiled export (map.json) */
                    }),
                    k.body({ isStatic: true }), /* body component - isStatic property makes sure that player will not be able to overlap with walls */
                    k.pos(boundary.x, boundary.y), /* position of game object itself */
                    boundary.name, /* acts as tag for game object - will come in handy when player collides with object such as "bed" or "PC" */
                ]);

                if (boundary.name) { 
                    player.onCollide(boundary.name, () => { /* second param is function that runs when collision occurs;  */
                        player.isInDialogue = true;  /* collision with game object will activate isInDialogue property for dialogue box to display */
                        // TO DO
                    });
                }
            }
        }
    }
});

k.go("main");







/* time 58:09 */