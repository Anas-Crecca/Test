import { global } from "./global.js";
import { menu } from "../Constuctor/menu.js";
import { dialog } from "../GameObjects/dialogBox.js";

let cursorPoint = {}

function select(event) {
    console.log(event)
    let offset1 = event.target.offsetTop;
    let offset2 = event.target.offsetLeft;
    cursorPoint.cursorX = event.x;
    cursorPoint.prevX = event.x;
    cursorPoint.cursorY = event.y;
    cursorPoint.prevY = event.y;
    console.log(cursorPoint.cursorX);
    for (let i = 0; i < global.allGameObjects.length; i++) {
        let box = global.allGameObjects[i].getBoxBounds();
        if (cursorPoint.cursorX >= (box.left + offset2) && cursorPoint.cursorX <= (box.right + offset2) && cursorPoint.cursorY >= (box.top + offset1) && cursorPoint.cursorY <= (box.bottom + offset1)) {
            console.log("image selected " + global.allGameObjects[i].index);
            global.allGameObjects[i].selected = true;
            global.allGameObjects[i].moving = true;

            //console.log(global.allGameObjects[i].moving);
            console.log(global.allGameObjects[i].selected);

        }
    }
}
function move(event) {
    cursorPoint.cursorX = event.x;
    cursorPoint.cursorY = event.y;
    global.veloX = cursorPoint.cursorX - cursorPoint.prevX;
    global.veloY = cursorPoint.cursorY - cursorPoint.prevY;
    cursorPoint.prevX = cursorPoint.cursorX;
    cursorPoint.prevY = cursorPoint.cursorY;
    //console.log(cursorPoint.veloX);
    //console.log(cursorPoint.veloY);
    for (let i = 0; i < global.allGameObjects.length; i++) {
        if (global.allGameObjects[i].selected === true) {
            global.allGameObjects[i].x += global.veloX;
            global.allGameObjects[i].y += global.veloY;
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            //console.log(global.allGameObjects[i].x)
        }
    }
}
function stop(event) {
    for (let i = 0; i < global.allGameObjects.length; i++) {
        //if (global.allGameObjects[i].moving === true)
        {
            global.allGameObjects[i].moving = false;
            global.allGameObjects[i].selected = false;
        }
    }
}

function screenLvl(event) {
    menu.startScreen.style.display = "none";
    global.logo[0].active = false;
    menu.levelScreen.style.display = "block";
}
function restart(event) {
    menu.endScreen.style.display = "none";
    menu.levelScreen.style.display = "block";
}
function lvl1(event) {
    console.log("Loading Level 1...")
    menu.levelScreen.style.display = "none";
    menu.dialogBox.style.display = "block";
    global.currentlvl = 1;
    let dlog = new dialog(0, 0, 250, 300, global.currentlvl);
    global.dialog = dlog;
}
function lvl2(event) {
    menu.levelScreen.style.display = "none";
    menu.dialogBox.style.display = "block";
    global.currentlvl = 2;
    let dlog = new dialog(0, 0, 250, 300, global.currentlvl);
    global.dialog = dlog;
}
function lvl3(event) {
    menu.levelScreen.style.display = "none";
    menu.dialogBox.style.display = "block";
    global.currentlvl = 3;
    let dlog = new dialog(0, 0, 250, 300, global.currentlvl);
    global.dialog = dlog;
}
function lvl4(event) {
    menu.levelScreen.style.display = "none";
    menu.dialogBox.style.display = "block";
    global.currentlvl = 4;
    let dlog = new dialog(0, 0, 250, 300, global.currentlvl);
    global.dialog = dlog;
}
function cont(event) {
    global.dialogValue +=1;
    global.dialogObjects[0].buttonReact();
}


global.canvas.addEventListener("mousedown", select);
global.canvas.addEventListener("mousemove", move);
global.canvas.addEventListener("mouseup", stop);

menu.startButton.addEventListener("click", screenLvl);
menu.restart.addEventListener("click", restart);
menu.diaButton.addEventListener("click", cont);

menu.lvl1.addEventListener("click", lvl1);
menu.lvl2.addEventListener("click", lvl2);
menu.lvl3.addEventListener("click", lvl3);
menu.lvl4.addEventListener("click", lvl4);