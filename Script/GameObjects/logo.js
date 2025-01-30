import { global } from "../Modules/global.js";

class logo {
    index = 0;
    active = true;
    x = 0;
    y = 0;
    width = 50;
    height = 50;

    logoCan = document.querySelector("#logo");
    logoCtx = this.logoCan.getContext("2d");

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 11,
        "currentSpriteIndex": 0
    };

    draw = function () {
        let sprite = this.getNextSprite();
        this.logoCtx.drawImage(sprite, this.x, this.y, this.width, this.height);
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
        constructor(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                global.logo.push(this);
                this.index = level -1;
                this.loadImagesFromSpritesheet("./Images/spritesheet(4).png",12,1);
            }

}
export { logo }