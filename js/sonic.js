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
            context.drawImage(this.img, 4, 5, this.w, this.h, this.x, this.y, this.w, this.h);
        }


    }

    moveX(groundArr = [ground]) {
        this.x += this.speed * this.direction;

        // Sonic fall until he intersetc with ground
        const diff = 2; // magic const (pogreshnost')
        for (let groundIndex = 0; groundIndex < groundArr.length; groundIndex++) {
            let ground = groundArr[groundIndex];

            for (let pointIndex = 0; pointIndex < ground.dotArr.length - 1; pointIndex++) {
                let point1 = ground.dotArr[pointIndex];
                let point2 = ground.dotArr[pointIndex + 1];

                if(point1.x == point2.x)
                    continue;

                let whichFoot = point1.y < point2.y;
                let x = this.x + (whichFoot ? 6 : this.w);
                let y = this.y + this.h;
                let differency = ((point2.y - point1.y) * (x - point1.x)) / (point2.x - point1.x) + point1.y - this.h;
                if (x >= Math.min(point1.x, point2.x) - diff && x <= Math.max(point1.x, point2.x) + diff
                    && y >= Math.min(point1.y, point2.y) - diff && y <= Math.max(point1.y, point2.y) + diff
                    && !this.state.jump
                    ) {
                    // context.strokeRect(point1.x, point1.y, point2.x - point1.x, point2.y - point1.y);
                    this.y = differency;
                    return;
                }

            }
        }
    }

    moveY() {
        if(this.state.jump && this.isIntersecting(grounds))
            this.state.jump = false;
        if (!this.isIntersecting(grounds)) {
            this.y += gravity - this.gravityDisable;
        }
        if (this.gravityDisable > 0)
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


                let x1 = this.x;
                let x2 = this.x + this.w;
                let y = this.y + this.h;

                if(y < Math.min(point1.y, point2.y) || y > Math.max(point1.y, point2.y) || x2 < Math.min(point1.x, point2.x) || x1 > Math.max(point1.x, point2.x))
                    continue;
                if(point1.x == point2.x)
                    continue;

                

                let line1 = [new Point(x1, y + gravity), new Point(x1, Math.max(point1.y, point2.y))];
                let line2 = [new Point(x2, y + gravity), new Point(x2, Math.max(point1.y, point2.y))];

                /*context.moveTo(line1[0].x, line1[0].y);
                context.lineTo(line1[1].x, line1[1].y);
                context.stroke();

                context.moveTo(line2[0].x, line2[0].y);
                context.lineTo(line2[1].x, line2[1].y);
                context.stroke();*/

                let p1 = Sonic.intersectionOfLines(...line1, point1, point2);
                let p2 = Sonic.intersectionOfLines(...line2, point1, point2);

                if((p1 || p2) && (!p1 || !p2) || point1.y == point2.y) 
                    return true;
            }
        }
        return false;
    }

    static dist(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    static intersectionOfLines(l1b, l1e, l2b, l2e) {
            let t = (l2b.x * (l2e.y - l2b.y) + l2b.y * (l2b.x - l2e.x) - l1b.x * (l2e.y - l2b.y) + l1b.y * (l2e.x - l2b.x)) 
                / ((l1e.x - l1b.x) * (l2e.y - l2b.y) - (l1e.y - l1b.y) * (l2e.x - l2b.x));
            let x = t * (l1e.x - l1b.x) + l1b.x;
            let y = t * (l1e.y - l1b.y) + l1b.y;
            if(x >= Math.min(l1b.x, l1e.x) && x <= Math.max(l1b.x, l1e.x) &&
                y >= Math.min(l1b.y, l1e.y) && y <= Math.max(l1b.y, l1e.y) &&
                x >= Math.min(l2b.x, l2e.x) && x <= Math.max(l2b.x, l2e.x) &&
                y >= Math.min(l2b.y, l2e.y) && y <= Math.max(l2b.y, l2e.y))
                return new Point(x, y);
        }
}