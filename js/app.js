const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const sonicImg = new Image();
sonicImg.src = "../sonic/images/sonic.png";

let sonic = new Sonic(sonicImg, 0, 0, 29, 39);
/*
let ground = new Ground([[30, 50], [30, 150], [100, 100], [150, 100], [200, 50], [255, 50], [280, 170], [280, 70], [30, 50]]);
let ground2 = new Ground([[430, 70], [430, 170], [680, 150], [680, 50], [430, 70]]);
let ground3 = new Ground([[0, 600], [700, 600], [650, 650], [50, 650], [0, 600]]);
let grounds = [ground, ground2, ground3];*/

let ground = new Ground([[0,50],[50,50],[100,100],[150,150],[200,50]]);
let grounds = [ground];

const gravity = 5;

setInterval(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let gr of grounds)
        gr.draw();

    sonic.moveX(grounds);
    sonic.moveY();

    sonic.draw();
}, 1000 / 15);
