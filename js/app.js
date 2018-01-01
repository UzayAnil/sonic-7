const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const sonicImg = new Image();
sonicImg.src = "../sonic/images/sonic.png";

let sonic = new Sonic(sonicImg, 50, 20, 29, 39);
let ground = new Ground([[30, 50], [30, 150], [100, 100], [150, 100], [200, 50], [255, 50], [320, 170], [360, 170]]);
//let ground2 = new Ground([[430, 70], [430, 170], [680, 150], [680, 50], [430, 70]]);
//let ground3 = new Ground([[0, 600], [700, 600], [650, 650], [50, 650], [0, 600]]);

let grounds = [ground/*, ground2, ground3*/];

let camera = {
	x : 0,
	y : 0,
	move : function(x, y) {
		this.x = x - 350;
		this.y = y - 350;
	}
};

const gravity = 5;

setInterval(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    

    if(sonic.state.run)
        sonic.moveX(grounds);
    sonic.moveY();

    camera.move(sonic.x + sonic.w / 2, sonic.y + sonic.h / 2);

	for (let gr of grounds)
        gr.draw();
    sonic.draw();
}, 1000 / 30);