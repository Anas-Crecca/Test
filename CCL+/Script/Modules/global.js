const global = {};
global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.dialogObjects = [];
global.logo = [];
global.dialogValue = 0;
global.currentlvl = 0;
global.puzzleRows = 0;
global.puzzleColumns = 0;
global.puzzleScore = 0;
global.breakFrame = false;
global.veloX = 0;
global.veloY = 0;

global.cutImage = function (cols, rows, picturePath) {
    // Calculate the number of rows and columns
    //const cols = Math.floor(spritesheetWidth / singleSpriteWidth);
    //const rows = Math.floor(spritesheetHeight / singleSpriteHeight);
    const totalPieces = cols * rows;

    // Pre-create an array with `Image` objects for all sprites
    let pieces = Array.from({ length: totalPieces }, () => new Image());

    // Load the spritesheet
    const picture = picturePath;

    // Add a "load" event listener to the spritesheet
    picture.addEventListener("load", () => {
        const pictureWidth = picture.width;
        const pictureHeight = picture.height;
        const singlePieceWidth = Math.floor(pictureWidth / cols);
        const singlePieceHeight = Math.floor(pictureHeight / rows);


        // Create a temporary canvas to extract sprites from the spritesheet
        const tempPictureCanvas = document.createElement("canvas");
        const tempPictureCtx = tempPictureCanvas.getContext("2d");
        tempPictureCanvas.width = singlePieceWidth;
        tempPictureCanvas.height = singlePieceHeight;

        // Loop through each sprite's row and column position
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {

                // Clear the temporary canvas and draw the specific sprite region from the spritesheet
                tempPictureCtx.clearRect(0, 0, singlePieceWidth, singlePieceHeight);
                tempPictureCtx.drawImage(
                    picture,
                    col * singlePieceWidth,
                    row * singlePieceHeight,
                    singlePieceWidth,
                    singlePieceHeight,
                    0,
                    0,
                    singlePieceWidth,
                    singlePieceHeight
                );

                // assign it to the corresponding Image object
                const index = row * cols + col;
                pieces[index].src = tempPictureCanvas.toDataURL();
            }
        }
    }
    );
    return pieces;
}

global.getCanvasBounds = function () {
    let bounds = {
        "left": 0,
        "right": this.canvas.width,
        "top": 0,
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = 0; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                let side = this.dectectCollisionSide(givenObject, otherObject)
                givenObject.reactToCollision(otherObject, side);
            }
        }
    }
}


global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom &&
            box1.left <= box2.right &&
            box1.bottom >= box2.top &&
            box1.right >= box2.left) {
            return true;
        }
    }
    return false;
}

global.dectectCollisionSide = function (gameObject1, gameObject2) {
    let points1 = gameObject1.getRefPoints();
    let points2 = gameObject2.getRefSides();
    if (gameObject1.moving === true) {
        if (points1.left[1] > points2.right[1] && points1.left[1] < points2.right[3] && points1.left[0] > points2.center[0]) {
            console.log("left collision");
            return "left";
        } else if (points1.right[1] > points2.left[1] && points1.right[1] < points2.left[3] && points1.left[0] < points2.center[0]) {
            console.log("right collision");
            return "right";
        } else if (points1.top[0] > points2.bottom[0] && points1.top[0] < points2.bottom[2] && points1.left[1] > points2.center[1]) {
            console.log("top collision");
            return "top";
        } else if (points1.bottom[0] > points2.top[0] && points1.bottom[0] < points2.top[2] && points1.left[1] < points2.center[1]) {
            console.log("bottom collision");
            return "bottom";
        }
    }
}


export { global }