import { dialogueData, scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue, setCamScale } from "./utils";

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
    const mapData = await (await fetch("./map.json")).json()   /* we await fetch function because its async; code would continue to execute - we want to load map data and not move rest of code until it's done - then convert to json object - once data is loaded we are ready to move on */
    const layers = mapData.layers;

    const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);    /* map game object - make (makes game object) add (displays game object) */

    const player = k.make([
        k.sprite("spritesheet", { anim: "idle-down" }), /* import spritesheet and default animation is idle-down */
        k.area({
            shape: new k.Rect(k.vec2(0,3,), 10, 10) /* hitbox will be a rectangle and first param is vector coordinates (hitbox drawn from origin of player plus 3 on x axis, and last two params are height and width of hitbox   )  */
        }),
        k.body(), /* k.body is a component that makes player tangible physics object that can be collided with  */
        k.anchor("center"), /* draw player from center not top left corner (default) */
        k.pos(),
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
                        displayDialogue(dialogueData[boundary.name], () => (player.isInDialogue = false)); /* sets isInDialogue back to false after dialog is displayed so character can move again */
                    });
                }
            }
            continue; /* skip to next situation in for loop */
        }

        if (layer.name === "spawnpoints") {
            for (const entity of layer.objects) {
                if (entity.name === "player") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor, /*positions character spawn and scaled 4x */
                        (map.pos.x + entity.y) * scaleFactor
                    );
                    k.add(player); /* add player game object we created into scene */
                    continue;
                }
            }
        }
    }

    setCamScale(k);

    k.onResize(() => {
        setCamScale(k);
    });

    k.onUpdate(() => {   /* logic to make camera follow player*/
        k.camPos(player.pos.x, player.pos.y + 100);
    });

    k.onMouseDown((mouseBtn) => {
        if (mouseBtn !== "left" || player.isInDialogue) return; /* if mousebtn is not equal to left mouse click, then nothing, we don't move  */

        const worldMousePos = k.toWorld(k.mousePos());  /* logic for player movement */
        player.moveTo(worldMousePos, player.speed);

        const mouseAngle = player.pos.angle(worldMousePos) 

        /* logic for player direction facing and animations*/

        const lowerBound = 50; 
        const upperBound = 125;

        if (     
            mouseAngle > lowerBound &&
            mouseAngle < upperBound &&
            player.curAnim() !== "walk-up"
        ) {
            player.play("walk-up");
            player.direction = "up";
            return;
        }

        if (     
            mouseAngle < -lowerBound &&
            mouseAngle > -upperBound &&
            player.curAnim() !== "walk-down"
        ) {
            player.play("walk-down");
            player.direction = "down";
            return;
        }

        if (Math.abs(mouseAngle) > upperBound) {
            player.flipX = false;
            if (player.curAnim() !== "walk-side") player.play ("walk-side");
            player.direction = "right";
            return;
        }

        if (Math.abs(mouseAngle) < lowerBound) {
            player.flipX = true;
            if (player.curAnim() !== "walk-side") player.play ("walk-side");
            player.direction = "left";
            return;
        }
    });

    k.onMouseRelease(() => {
        if (player.direction === "down") {
            player.play("idle-down");
            return;
        }
        if (player.direction === "up") {
            player.play("idle-up");
            return;
        }

        player.play("idle-side"); /* if neither up or down, idle-side animation is displayed */
    });


});

k.go("main");







/* time 1:37:40 */