import { global } from "../Modules/global.js"

class puzzlepiece {
    active = true;
    moving = false;
    name = "";
    x = 100;
    prevX = 0;
    y = 500;
    prevY = 0;
    width = 50;
    height = 50;
    index = -1;
    image = [];
    rows = 0;
    offSetX = 0;
    offSetY = 0;
    selected = false;
    hasMovedOnFrame = false;
    attachedImages = {
        "left": null,
        "right": null,
        "top": null,
        "bottom": null
    }
    /*slotIndex = {
        "leftIndex": this.index - 1,
        "rightIndex": this.index + 1,
        "topIndex": this.index - (global.allGameObjects.length / this.rows),
        "bottomIndex": this.index + (global.allGameObjects.length / this.rows)
    }*/
    slotTaken = {
        "left": false,
        "right": false,
        "top": false,
        "bottom": false
    }

    storePrevPosition = function () {
        this.prevX = this.x;
        this.prevY = this.y;
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };

    getSlots = function () {
        let slots = {
            "left": [(this.x - this.width), this.y],
            "right": [(this.x + this.width), this.y],
            "top": [this.x, (this.y - this.height)],
            "bottom": [this.x, (this.y + this.height)]
        }
        return slots;
    };
    getSlotIndex = function () {
        let index = {
            "leftIndex": (this.index - 1),
            "rightIndex": (this.index + 1),
            "topIndex": (this.index - (global.allGameObjects.length / this.rows)),
            "bottomIndex": (this.index + (global.allGameObjects.length / this.rows))
        }
        if (((this.index) % global.puzzleColumns) == 0){
            index.leftIndex = -1;
        }
        if (((this.index +1) % global.puzzleColumns) == 0){
            index.rightIndex = -1;
        }
        return index;
    };

    getRefPoints = function () {
        let refPoints = {
            "left": [this.x, (this.y + (this.height / 2))],
            "right": [(this.x + this.width), (this.y + (this.height / 2))],
            "top": [(this.x + (this.width / 2)), this.y],
            "bottom": [(this.x + (this.width / 2)), (this.y + this.height)]
        }
        return refPoints;
    }
    getRefSides = function () {
        let refSides = {
            "left": [this.x, this.y, this.x, (this.y + this.height)],
            "right": [(this.x + this.width), this.y, (this.x + this.width), (this.y + this.height)],
            "top": [this.x, this.y, (this.x + this.width), this.y],
            "bottom": [this.x, (this.y + this.height), (this.x + this.width), (this.y + this.height)],
            "center": [(this.x + (this.width / 2)), (this.y + (this.height / 2))]
        }
        return refSides;
    }

    update = function () {
        this.boundary();
        if (this.attachedImages.left != null) {
           
            this.attachedImages.left.moving = this.moving;
        }
        if (this.attachedImages.right != null) {
    
            this.attachedImages.right.moving = this.moving;

        }
        if (this.attachedImages.top != null) {
           
            this.attachedImages.top.moving = this.moving;

        }

        if (this.attachedImages.bottom != null) {
   
            this.attachedImages.bottom.moving = this.moving;

        }
        if (this.moving){
            global.puzzleScore += 1;
        }



        /*if (this.slotTaken.right == true) {
            let slotIndex = this.getSlotIndex();
            if (global.allGameObjects[slotIndex.rightIndex].moving == true){
                this.moving = true;
            }
        }
        if (this.slotTaken.left == true) {
            let slotIndex = this.getSlotIndex();
            if (global.allGameObjects[slotIndex.leftIndex].moving == true){
                this.moving = true;
            }
        }
        if (this.slotTaken.bottom == true) {
            let slotIndex = this.getSlotIndex();
            if (global.allGameObjects[slotIndex.bottomIndex].moving == true){
                this.moving = true;
            }
        }
        if (this.slotTaken.top == true) {
            let slotIndex = this.getSlotIndex();
            if (global.allGameObjects[slotIndex.topIndex].moving == true){
                this.moving = true;
            }
        }*/

        /*if (this.selected === true) {
            this.x += global.veloX;
            this.y += global.veloY;
        }*/

       
        //let slots = this.getSlots();
        /* if (this.slotTaken.left == true) {
             global.allGameObjects[this.slotIndex.left].x = slots.left[0];
             global.allGameObjects[this.slotIndex.left].y = slots.left[1];
         }
         if (this.slotTaken.right == true) {
             global.allGameObjects[this.slotIndex.right].x = slots.right[0];
             global.allGameObjects[this.slotIndex.right].y = slots.right[1];
         }
         if (this.slotTaken.top == true) {
             global.allGameObjects[this.slotIndex.top].x = slots.top[0];
             global.allGameObjects[this.slotIndex.top].y = slots.top[1];
         }
         if (this.slotTaken.bottom == true) {
             global.allGameObjects[this.slotIndex.bottom].x = slots.bottom[0];
             global.allGameObjects[this.slotIndex.bottom].y = slots.bottom[1];
         }*/


    };


    placeImages = function () {
        let slots = this.getSlots();

        if (this.attachedImages.left != null && !this.attachedImages.left.selected && !this.attachedImages.left.hasMovedOnFrame) {
            this.attachedImages.left.x = slots.left[0];
            this.attachedImages.left.y = slots.left[1];
            this.attachedImages.left.hasMovedOnFrame = true;
            this.attachedImages.left.placeImages();

           // this.attachedImages.left.moving = this.moving;
        }
        if (this.attachedImages.right != null && !this.attachedImages.right.selected && !this.attachedImages.right.hasMovedOnFrame) {
            this.attachedImages.right.x = slots.right[0];
            this.attachedImages.right.y = slots.right[1];
            this.attachedImages.right.hasMovedOnFrame = true;
            this.attachedImages.right.placeImages();

          //  this.attachedImages.right.moving = this.moving;

        }
        if (this.attachedImages.top != null && !this.attachedImages.top.selected && !this.attachedImages.top.hasMovedOnFrame) {
            this.attachedImages.top.x = slots.top[0];
            this.attachedImages.top.y = slots.top[1];
            this.attachedImages.top.hasMovedOnFrame = true;
            this.attachedImages.top.placeImages();

          //  this.attachedImages.top.moving = this.moving;

        }

        if (this.attachedImages.bottom != null && !this.attachedImages.bottom.selected && !this.attachedImages.bottom.hasMovedOnFrame) {
            this.attachedImages.bottom.x = slots.bottom[0];
            this.attachedImages.bottom.y = slots.bottom[1];
            this.attachedImages.bottom.hasMovedOnFrame = true;
            this.attachedImages.bottom.placeImages();

         //   this.attachedImages.bottom.moving = this.moving;

        }
    }

    draw = function () {
        let picture = this.image[0];
        
        global.ctx.drawImage(picture, this.x, this.y, this.width, this.height);
        this.hasMovedOnFrame = false;
    };

    boundary = function () {
        let objectBox = this.getBoxBounds();
        let canvasBox = global.getCanvasBounds();
        if (objectBox.right >= canvasBox.right || objectBox.left <= canvasBox.left || objectBox.top <= canvasBox.top || objectBox.bottom >= canvasBox.bottom) {
            console.log("wall collision")
            this.moving = false;
            if (objectBox.right >= canvasBox.right) {
                this.x = canvasBox.right - this.width - 1;
            } else if (objectBox.left <= canvasBox.left) {
                this.x = canvasBox.left + 1;
            } else if (objectBox.top <= canvasBox.top) {
                this.y = canvasBox.top + 1;
            } else if (objectBox.bottom >= canvasBox.bottom) {
                this.y = canvasBox.bottom - this.height - 1;
            }
        }
    };

    loadImages = function (imgsrc) {
        let image = new Image();
        image.src = imgsrc;
        this.image.push(image);
    };

    reactToCollision = function (collidingObject, side) {
        if (this.moving === true) {
            console.log(this.slotTaken.left);
            console.log("collision initiated by " + this.index);
             let slotIndex = this.getSlotIndex();
             let slots = this.getSlots();
            switch (side) {
                case "left":
                    /*if (this.slotTaken.left == false) */{
                        if (collidingObject.index == slotIndex.leftIndex) {

                            /*collidingObject.x = slots.left[0];
                            collidingObject.y = slots.left[1];*/
                            global.breakFrame = true;
                            this.attachedImages.left = collidingObject;
                            this.slotTaken.left = true;
                            collidingObject.slotTaken.right = true;
                            collidingObject.moving = true;
                        }
                    }
                    break;
                case "right":
                    /*if (this.slotTaken.right == false) */{
                        if (collidingObject.index == slotIndex.rightIndex) {
                            /*collidingObject.x = slots.right[0];
                            collidingObject.y = slots.right[1];*/
                            console.log("right collision");
                            collidingObject.x = this.getBoxBounds().right;
                            collidingObject.y = this.y;
                            global.breakFrame = true;
                            this.attachedImages.right = collidingObject;
                            this.slotTaken.right = true;
                            collidingObject.slotTaken.left = true;
                            collidingObject.moving = true;
                        }
                    }
                    break;
                case "top":
                   /* if (this.slotTaken.top == false) */{
                        if (collidingObject.index == slotIndex.topIndex) {
                           /* collidingObject.x = slots.top[0];
                            collidingObject.y = slots.top[1];*/
                            global.breakFrame = true;
                            this.attachedImages.top = collidingObject;
                            this.slotTaken.top = true;
                            collidingObject.bottom = true;
                            collidingObject.moving = true;
                        }
                    }
                    break;
                case "bottom":
                    /*if (this.slotTaken.bottom == false)*/ {
                        if (collidingObject.index == slotIndex.bottomIndex) {
                           /* collidingObject.x = slots.bottom[0];
                            collidingObject.y = slots.bottom[1];*/
                            global.breakFrame = true;
                            this.attachedImages.bottom = collidingObject;
                            this.slotTaken.bottom = true;
                            collidingObject.slotTaken.top = true;
                            collidingObject.moving = true;
                        }
                    }
                    break;
            }
        }
    }

    constructor(x, y, width, height, img, numbRows) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rows = numbRows;
        this.previousX = x;
        this.previousY = y;
        this.image.push(img);
        //this.loadImages(img);
        global.allGameObjects.push(this);
        this.index = global.allGameObjects.length - 1;
    }

}

export { puzzlepiece }