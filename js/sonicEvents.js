sonicImg.onload = function () {
    sonic.draw();
};

document.onkeydown = function (event) {
    if (event.keyCode === 39) {
        sonic.state.run = true;
        sonic.direction = 1;
    }
    if (event.keyCode === 37) {
        sonic.state.run = true;
        sonic.direction = -1;
    }
};

document.onkeypress = function (event) {
    if (event.keyCode === 32) {
        if (sonic.gravityDisable === 0) {
            sonic.animStep = 0;
            sonic.jump();
            sonic.state.jump = true;
        }
    }
};

document.onkeyup = function (event) {
    if (event.keyCode === 39 || event.keyCode === 37) {
        sonic.direction = 0;
        sonic.state.run = false;
    }
    if (event.keyCode === 32) {
        sonic.state.jump = false;
    }
};