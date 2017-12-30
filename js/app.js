const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");


const sonicImg = new Image();
sonicImg.src = "../sonic/images/sonic.png";

let sonic = new Sonic(sonicImg, 0, 0, 29, 39);

setInterval(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    sonic.moveX();

    sonic.draw();

}, 1000 / 30);
