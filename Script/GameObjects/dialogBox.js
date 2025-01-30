import { global } from "../Modules/global.js";
import { menu } from "../Constuctor/menu.js";

class dialog {
    index = 0;
    x = 0;
    y = 0;
    width = 50;
    height = 50;

    diaCan = document.querySelector("#dialogCan");
    diaCtx = this.diaCan.getContext("2d");

    dialog = [["You pressed the red button, didn't you?", "Don't try to deny it, you're still standing right in front of it.", "Well as you can see the button activates our security system, which shreds our exhibition pieces to protect them from theft.", "And since you pressed, you also be the one to put the paintings back together. I'll keep an eye on you."],["Have you learned from your mistakes yet? No? I can see you eye the red button.", "If you press it you just have to start over again.", "There's still several paintings to go, so let's not waste time."],["'Why does our security system shred the paintings?' Well you see its a lot harder to steal a painting if you have to pick up a bunch of scraps.", "It also diminishes its value but that's why the button is only pressed in EMERGENCIES.", "You continue putting them back together, I continue to keep record of your misdeeds."],["Well, well, well. Look at that! You've almost finished with the paintings AND not pressed the button again. Impressive.", "Or it would be if not-pressing-the-button wasn't what's expected from every visitor and employee.", "You're doing a good job though, I will admit."]];

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.3,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 8,
        "currentSpriteIndex": 0
    };

    update = function () {

    };

    draw = function () {
        let sprite = this.getNextSprite();
        this.diaCtx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    getNextSprite = function () {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };


   /* loadImages = function (imageSources) {
        let image = new Image();
        image.src = imageSources;
        this.animationData.animationSprites.push(image);
        console.log("load Image");
    };*/

    loadImagesFromSpritesheet(spritesheetPath, cols, rows) {
        // Calculate the number of rows and columns
        //const cols = Math.floor(spritesheetWidth / singleSpriteWidth);
        //const rows = Math.floor(spritesheetHeight / singleSpriteHeight);
        const totalSprites = cols * rows;
    
        // Pre-create an array with `Image` objects for all sprites
        this.animationData.animationSprites = Array.from({ length: totalSprites }, () => new Image());
    
        // Load the spritesheet
        const spritesheet = new Image();
        spritesheet.src = spritesheetPath;
    
        // Add a "load" event listener to the spritesheet
        spritesheet.addEventListener("load", () => {
            const spritesheetWidth = spritesheet.width;
            const spritesheetHeight = spritesheet.height;
            const singleSpriteWidth = Math.floor(spritesheetWidth / cols);
            const singleSpriteHeight = Math.floor(spritesheetHeight / rows);


            // Create a temporary canvas to extract sprites from the spritesheet
            const tempSpritesheetCanvas = document.createElement("canvas");
            const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
            tempSpritesheetCanvas.width = singleSpriteWidth;
            tempSpritesheetCanvas.height = singleSpriteHeight;

            // Loop through each sprite's row and column position
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                
                    // Clear the temporary canvas and draw the specific sprite region from the spritesheet
                    tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                    tempSpritesheetCtx.drawImage(
                        spritesheet,
                        col * singleSpriteWidth,
                        row * singleSpriteHeight,
                        singleSpriteWidth,
                        singleSpriteHeight,
                        0,
                        0,
                        singleSpriteWidth,
                        singleSpriteHeight
                    );
    
                    // assign it to the corresponding Image object
                    const index = row * cols + col;
                    this.animationData.animationSprites[index].src = tempSpritesheetCanvas.toDataURL();
                }
            }
        });
    }

    switchCurrentSprites = function (firstSpriteIndex, lastSpriteIndex) {
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
    }

    changeDialog = function (levelref){
        menu.dialog.innerText = this.dialog[this.index][levelref];
    }

    buttonReact = function(){
        if(global.dialogValue < this.dialog[this.index].length){
            this.changeDialog(global.dialogValue);
        }else{
            menu.GameSetUp(global.currentlvl);
            global.dialogObjects.length = 0;
            global.dialogValue = 0;
        }
    }

    constructor(x, y, width, height, level) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.index = level -1;
        //this.loadImages("./Images/Pieces/C.png");
        this.loadImagesFromSpritesheet("./Images/neutral.png",9,1);
        this.changeDialog(0);
        global.dialogObjects.push(this);
    }

}
export { dialog }