let button = {
    "select": 8,
    "start": 9,
    "x": 0,
    "ball": 1,
    "square": 3,
    "triangle": 2,

    "up": 13,
    "heart": 13,

    "down": 14,
    "sun": 14,

    "left": 15,
    "bear": 15,

    "right": 16,
    "flower": 16
}

let sounds = loadSounds();

$(document).ready(function () {
    window.onload = function () {
        createAnimatedObjects();
        begin();
    }
});

function begin() {

    appendText("Aperte Start");
    wait4(button.start, function () {
        console.log("level 1");
        showBurstInterval();
        $("#text").html("");

        setTimeout(function(){countTo(5);}, 8000);
        
        setTimeout(function () {
            clearInterval(burstInterval);
            showAnimation('heart');
        }, 30000);
        levelOne();
    });
}

function wait4(someButton, callback) {

    let socket = io();

    socket.on('button pressed', function (btn) {
        if (btn == someButton) {
            socket.close();
            showBurst(0,0);
            stopAllAnimations();
            turnSound(sounds._xx_hit, 'on', function () {
                callback();
            });
        } else {
            if (someButton != button.start)
                turnSound(sounds._xx_miss, 'on');
        }
        console.log(btn);
    })
}

function levelOne() {
    turnSound(sounds._01_intro, 'on', function () {
        wait4(button.heart, function () {
            showAnimation('x');
            turnSound(sounds._07_xStep, 'on', function () {
                wait4(button.x, function () {
                    showAnimation('sun');
                    turnSound(sounds._08_sunStep, 'on', function () {
                        wait4(button.sun, function () {
                            showBurstInterval();
                            setTimeout(function () {
                                appendText("Fase 2", 19000);
                            }, 2000);
                            setTimeout(function () {
                                clearInterval(burstInterval);
                                showAnimation('triangle');
                            }, 22000);
                            turnSound(sounds._04_level2, 'on', function () {
                                levelTwo();
                            })
                        })
                    })
                })
            })
        })
    })
}

function levelTwo() {
    wait4(button.triangle, function () {
        showAnimation('square');
        turnSound(sounds._13_squaresStep, 'on', function () {
            wait4(button.square, function () {
                showAnimation('bear');
                turnSound(sounds._14_bearStep, 'on', function () {
                    wait4(button.bear, function () {
                        showBurstInterval();
                        setTimeout(function () {
                            appendText("Fase 3", 19000);
                        }, 2000);
                        setTimeout(function () {
                            clearInterval(burstInterval);
                            showAnimation('circle');
                        }, 22000);
                        turnSound(sounds._07_level3, 'on', function () {
                            levelThree();
                        })
                    })
                })
            })
        })
    })
}

function levelThree() {
    wait4(button.ball, function () {
        showAnimation('flower');
        turnSound(sounds._19_flowerStep, 'on', function () {
            wait4(button.flower, function () {
                showBurstInterval();
                setTimeout(function () {
                    appendText("Parabéns", 20000);
                }, 2000);
                setTimeout(function () {
                    clearInterval(burstInterval);
                }, 18000);
                turnSound(sounds._09_endGame, 'on', function () {
                    begin();
                })
            })
        })
    })
}