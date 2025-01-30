import { global } from "../Modules/global.js";
import { puzzlepiece } from "../GameObjects/pieces.js";
import { logo } from "../GameObjects/logo.js";
const menu = {};
menu.startScreen = document.getElementById("mainScreen");
menu.levelScreen = document.getElementById("levelScreen");
menu.endScreen = document.getElementById("endScreen");
menu.dialogBox = document.getElementById("dialogBox");

menu.startButton = document.getElementById("startButton");
menu.diaButton = document.getElementById("diaButton");
menu.restart = document.getElementById("restart");

menu.lvl1 = document.getElementById("lvl1");
menu.lvl2 = document.getElementById("lvl2");
menu.lvl3 = document.getElementById("lvl3");
menu.lvl4 = document.getElementById("lvl4");
menu.endPic = document.getElementById("endPic");

menu.dialog = document.getElementById("dialog");
menu.endText = document.getElementById("endText");

menu.start = function(){
    let log = new logo(0,0,700,400);
}

menu.GameSetUp = function (levelRef) {
    global.puzzleScore = 0;
    global.allGameObjects.length = 0;
    switch (levelRef) {
        case 1:
            console.log("dialog over");

            this.dialogBox.style.display = "none";
            global.canvas.style.display = "block";

            global.puzzleRows = 3;
            global.puzzleColumns = 3;
            let picture1 = new Image();
            picture1.src = "/images/PearlFrog.png";
            const piecewidth1 = Math.floor(picture1.width / global.puzzleColumns);
            const pieceheight1 = Math.floor(picture1.height / global.puzzleRows);

            let images1 = global.cutImage(global.puzzleColumns, global.puzzleRows, picture1);
            for (let i = 0; i < images1.length; i++) {
                let numb1 = (Math.floor(Math.random() * 750));
                let numb2 = (Math.floor(Math.random() * 750));
                let piece = new puzzlepiece(numb1, numb2, piecewidth1, pieceheight1, images1[i], global.puzzleRows);
            }
            break;
        case 2:
            console.log("dialog over");

            this.dialogBox.style.display = "none";
            global.canvas.style.display = "block";

            global.puzzleRows = 4;
            global.puzzleColumns = 4;
            let picture2 = new Image();
            picture2.src = "/images/croak.png";
            const piecewidth2 = Math.floor(picture2.width / global.puzzleColumns);
            const pieceheight2 = Math.floor(picture2.height / global.puzzleRows);

            let images2 = global.cutImage(global.puzzleColumns, global.puzzleRows, picture2);
            console.log(images2);
            for (let i = 0; i < images2.length; i++) {
                let numb1 = (Math.floor(Math.random() * 750));
                let numb2 = (Math.floor(Math.random() * 750));
                let piece = new puzzlepiece(numb1, numb2, piecewidth2, pieceheight2, images2[i], global.puzzleRows);
            }
            break;
        case 3:
            console.log("dialog over");

            this.dialogBox.style.display = "none";
            global.canvas.style.display = "block";

            global.puzzleRows = 6;
            global.puzzleColumns = 4;
            let picture3 = new Image();
            picture3.src = "/images/quakurn.png";
            const piecewidth3 = Math.floor(picture3.width / global.puzzleColumns);
            const pieceheight3 = Math.floor(picture3.height / global.puzzleRows);

            let images3 = global.cutImage(global.puzzleColumns, global.puzzleRows, picture3);
            console.log(images3);
            for (let i = 0; i < images3.length; i++) {
                let numb1 = (Math.floor(Math.random() * 750));
                let numb2 = (Math.floor(Math.random() * 750));
                let piece = new puzzlepiece(numb1, numb2, piecewidth3, pieceheight3, images3[i], global.puzzleRows);
            }
            break;
        case 4:
            console.log("dialog over");

            this.dialogBox.style.display = "none";
            global.canvas.style.display = "block";

            global.puzzleRows = 1;
            global.puzzleColumns = 10;
            let picture4 = new Image();
            picture4.src = "/images/froggerlisa2.png";
            const piecewidth4 = Math.floor(picture4.width / global.puzzleColumns);
            const pieceheight4 = Math.floor(picture4.height / global.puzzleRows);

            let images4 = global.cutImage(global.puzzleColumns, global.puzzleRows, picture4);
            for (let i = 0; i < images4.length; i++) {
                let numb1 = (Math.floor(Math.random() * 750));
                let numb2 = (Math.floor(Math.random() * 750));
                let piece = new puzzlepiece(numb1, numb2, piecewidth4, pieceheight4, images4[i], global.puzzleRows);
            }
            break;
    }
}
menu.endLevel = function (levelRef) {
    global.allGameObjects.length = 0;
    global.puzzleScore = 0;
    this.endScreen.style.display = "block";
    global.canvas.style.display = "none";

    switch (levelRef) {
        case 1:

            this.endText.innerText = "The Frog with the Pearl Earing: Painted by Frogannes Vermeer in 1665 (44.5cm x 39cm, Oil on Canvas)";
            this.endPic.src = "/images/PearlFrog.png";

            break;
        case 2:

            this.endText.innerText = "The Croak: Painted by Edfrog Munch in 1893 (91cm x 73.5cm; Oil, Tempera, Pastel and Crayon on Cardboard)";
            this.endPic.src = "/images/croak.png";

            break;
        case 3:

            this.endText.innerText = "Quakturn devouring his Spawn: Painted by Frogcisco Goya from 1820-1823 (143.5 cm x 81.4 cm, mixed media mural transfered to Canvas)";
            this.endPic.src = "/images/quakurn.png";

            break;
        case 4:

            this.endText.innerText = "Frogger Lisa: Painted by Frogernardo da Vinci in the 1500s (77 cm x 53 cm, Oil on poplar panel)";
            this.endPic.src = "/images/froggerlisa2.png";

            break;
    }

}

export { menu };