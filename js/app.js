const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");


const sonicImg = new Image();
sonicImg.src = "../sonic/images/sonic.png";

let sonic = new Sonic(sonicImg, 0, 0, 29, 39);
let ground = new Ground([[0, 150]/*, [100, 100], [150, 100], [200, 50], [255, 50], */,[250, 150]]);

const gravity = 5;


setInterval(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ground.draw();

    sonic.moveX();
    sonic.moveY();

    sonic.draw();
}, 1000 / 30);
