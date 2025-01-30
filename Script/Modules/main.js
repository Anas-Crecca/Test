import { menu } from "../Constuctor/menu.js";
import { global } from "./global.js";
function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
     // Completely clear the canvas for the next graphical output 

    if(global.dialogObjects.length > 0){
        global.dialogObjects[0].diaCtx.clearRect(0, 0, global.dialogObjects[0].diaCan.width, global.dialogObjects[0].diaCan.height);
        global.dialogObjects[0].draw();
    }

    if (global.logo[0].active){
        global.logo[0].logoCtx.clearRect(0, 0, global.logo[0].logoCan.width, global.logo[0].logoCan.height);
        global.logo[0].draw();
    }

    if (global.allGameObjects.length > 0) {
        for (var phase = 0; phase < 5; phase++) {
            for (var i = 0; i < global.allGameObjects.length; i++) {
                if (global.allGameObjects[i].active == true) {
                /* if (!global.breakFrame)*/ {
                        if (phase == 0) {
                            global.allGameObjects[i].storePrevPosition();
                            global.allGameObjects[i].update();
                            console.log("score: " + global.puzzleScore);
                            if (global.puzzleScore == global.allGameObjects.length) {
                                console.log("win");
                                menu.endLevel(global.currentlvl);
                            }
                        }
                        else if (phase == 1) {
                            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                        }
                        else if (phase == 2) {
                            if (global.allGameObjects[i].selected) {
                                global.allGameObjects[i].placeImages();
                            }
                        }
                        else if (phase == 3) {
                            global.allGameObjects[i].placeImages();
                        }
                        else if (phase == 4) {
                            global.allGameObjects[i].draw();
                            global.puzzleScore = 0;
                        }
                    }

                }
            }
        }
    }

    global.breakFrame = false;

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
menu.start();

/* this is a fix that makes your game still runable after you left the tab/browser for some time: */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        global.deltaTime = performance.now();
    }
});