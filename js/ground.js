class Ground {
    constructor(dotArr) {
        this.dotArr = [];
        for (let i = 0; i < dotArr.length; i++)
            this.dotArr.push(new Point(...dotArr[i]));
    }

    draw() {
        context.beginPath();
        context.moveTo(this.dotArr[0].x - camera.x, this.dotArr[0].y - camera.y);
        for (let i = 1; i < this.dotArr.length; i++) {
            context.lineTo(this.dotArr[i].x - camera.x, this.dotArr[i].y - camera.y);
        }
        context.stroke();

    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}