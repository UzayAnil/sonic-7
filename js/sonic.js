class Sonic {
    constructor(img, x, y, w, h) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 5;
        this.direction = 0;
        this.gravityDisable = 0;
        this.state = {
            jump: false,
            run: false,
        };
        this.animStep = 0;
        this.runAnimArr = [[10, 54, 24, 37], [41, 54, 32, 38], [81, 55, 36, 37], [122, 56, 33, 36], [161, 56, 29, 38], [199, 54, 25, 38], [232, 54, 26, 37], [265, 55, 32, 38], [302, 54, 37, 37], [346, 52, 32, 39], [386, 53, 32, 38], [425, 52, 25, 38]];
        this.runAnimReverseArr = [[5, 449, 25, 38], [37, 450, 32, 38], [77, 449, 32, 39], [116, 451, 37, 37], [265, 453, 29, 38], [231, 451, 25, 38], [197, 451, 26, 37], [158, 452, 32, 38], [116, 451, 37, 37], [77, 449, 32, 39], [37, 450, 32, 38], [5, 449, 25, 38]];
        this.jumpInRunAnimArr = [[10, 102, 24, 37], [49, 102, 36, 34], [101, 102, 25, 38], [140, 101, 25, 38]];

    }

    draw() {
        if (!this.state.run && !this.state.jump) {
            context.drawImage(this.img, 4, 5, this.w, this.h, this.x, this.y, this.w, this.h);
        }
        if (this.state.run && !this.state.jump) {
            if (this.direction === 1)
                context.drawImage(this.img, ...this.runAnimArr[this.animStep], this.x, this.y, this.runAnimArr[this.animStep][2], this.runAnimArr[this.animStep][3]);
            else
                context.drawImage(this.img, ...this.runAnimReverseArr[this.animStep], this.x, this.y, this.runAnimReverseArr[this.animStep][2], this.runAnimReverseArr[this.animStep][3]);

            this.animStep = (this.animStep + 1) % this.runAnimArr.length;
        }
        if (this.state.run && this.state.jump) {
            context.drawImage(this.img, ...this.jumpInRunAnimArr[this.animStep], this.x, this.y, this.jumpInRunAnimArr[this.animStep][2], this.jumpInRunAnimArr[this.animStep][3]);
            this.animStep = (this.animStep + 1) % this.jumpInRunAnimArr.length;
        }
        if (!this.state.run && this.state.jump) {

        }
        if (!this.state.run && this.state.jump) {

        }


    }

    moveX(groundArr = [ground]) {
        this.x += this.speed * this.direction;

        const diff = 1; // magic const (pogreshnost')
        for (let groundIndex = 0; groundIndex < groundArr.length; groundIndex++) {
            let ground = groundArr[groundIndex];

            for (let pointIndex = 0; pointIndex < ground.dotArr.length - 1; pointIndex++) {
                let point1 = ground.dotArr[pointIndex];
                let point2 = ground.dotArr[pointIndex + 1];

                let whichFoot = point1.y < point2.y;
                let x = this.x + (whichFoot ? 6 : this.w);
                let y = this.y + this.h;
                if (x >= Math.min(point1.x, point2.x) - diff && x <= Math.max(point1.x, point2.x) + diff
                    && y >= Math.min(point1.y, point2.y) - diff && y <= Math.max(point1.y, point2.y) + diff) {
                    // context.strokeRect(point1.x, point1.y, point2.x - point1.x, point2.y - point1.y);
                    this.y = ((point2.y - point1.y) * (x - point1.x)) / (point2.x - point1.x) + point1.y - this.h;
                    return;
                }

            }
        }
    }

    moveY() {
        if (!this.state.jump && !this.isIntersecting([ground])) {
            this.y += gravity - this.gravityDisable;
        }
        if(this.gravityDisable > 0)
            this.gravityDisable--;
    }

    jump() {
        this.y -= (this.gravityDisable = 15);
    }


    isIntersecting(groundArr) {
        for (let groundIndex = 0; groundIndex < groundArr.length; groundIndex++) {
            let ground = groundArr[groundIndex];

            for (let pointIndex = 0; pointIndex < ground.dotArr.length - 1; pointIndex++) {
                let point1 = ground.dotArr[pointIndex];
                let point2 = ground.dotArr[pointIndex + 1];

                let whichFoot = point1.y < point2.y;
                let x = this.x + (whichFoot ? 6 : this.w);
                let y = this.y + this.h;

                let a = dist(new Point(x, y), point1);
                let b = dist(new Point(x, y), point2);
                let c = dist(point1, point2);
                let p = (a + b + c) / 2;
                let h = 2 * Math.sqrt(p * (p - a) * (p - b) * (p - c)) / c;

                if (h < 5 && this.x >= Math.min(point1.x, point2.x) && this.x <= Math.max(point1.x, point2.x)) {
                    return true;
                }
            }
        }
        return false;

        function dist(p1, p2) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        }
    }
}