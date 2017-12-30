class Sonic {
    constructor(img, x, y, w, h) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 5;
        this.direction = 0;
        this.state = {
            jump: false,

            run: false,
        };
        this.animStep = 0;
        this.runAnimArr = [[10, 54, 24, 37], [41, 54, 32, 38], [81, 55, 36, 37], [122, 56, 33, 36], [161, 56, 29, 38], [199, 54, 25, 38], [232, 54, 26, 37], [265, 55, 32, 38], [302, 54, 37, 37], [346, 52, 32, 39], [386, 53, 32, 38], [425, 52, 25, 38]];
    }

    draw() {
        if (!this.state.run && !this.state.jump) {
            context.drawImage(this.img, 4, 5, this.w, this.h, this.x, this.y, this.w, this.h);
        }
        if (this.state.run && !this.state.jump) {
            context.drawImage(this.img, ...this.runAnimArr[this.animStep], this.x, this.y, this.w, this.h);
            this.animStep = (this.animStep + 1) % this.runAnimArr.length;
        }
        if(this.state.run && this.state.jump){
            
        }
        if(!this.state.run && this.state.jump){
        	
        }



    }

    moveX() {
        this.x += this.speed * this.direction;
    }
}