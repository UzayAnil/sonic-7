class Sonic{
    constructor(img,x,y,w,h){
          this.img = img;
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
          this.speed = 5;
          this.direction = 0;
    }
    draw(){
       context.drawImage(this.img,0,0,this.w,this.h,this.x,this.y,this.w,this.h);
    }
    moveX(){
      this.x+=this.speed*this.direction;
    }
}
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const sonicImg = new Image();
sonicImg.src = "../sonic/images/sonic.png";

let sonic = new Sonic(sonicImg,0,0,37,44);

sonicImg.onload = function(){
    sonic.draw();
}

document.onkeydown = function(event){
	if(event.keyCode == 39){
		sonic.direction = 1;
	}
	if(event.keyCode == 37){
		sonic.direction = -1;
	}
}
document.onkeyup = function(event){
    if(event.keyCode == 39 || event.keyCode == 37){
		sonic.direction = 0;
	}
}
setInterval(function(){
	context.clearRect(0,0,canvas.width,canvas.height);

	sonic.moveX();

	sonic.draw();
	
},1000/30);
