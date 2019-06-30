function loadSounds() {
    return {
        _06_heartsStep: new Howl({
            src: ['../sounds/_06_heartsStep.mp3']
        }),
        _01_intro: new Howl({
            src: ['../sounds/_01_intro.mp3']
        }),
        _07_xStep: new Howl({
            src: ['../sounds/_07_xStep.mp3']
        }),
        _08_sunStep: new Howl({
            src: ['../sounds/_08_sunStep.mp3']
        }),
        _04_level2: new Howl({
            src: ['../sounds/_04_level2.mp3']
        }),
        _09_endLevel1: new Howl({
            src: ['../sounds/_09_endLevel1.mp3']
        }),
        _10_nextLevel2Song: new Howl({
            src: ['../sounds/_10_nextLevel2Song.mp3']
        }),
        _11_level2: new Howl({
            src: ['../sounds/_11_level2.mp3']
        }),
        _12_triangleStep: new Howl({
            src: ['../sounds/_12_triangleStep.mp3']
        }),
        _13_squaresStep: new Howl({
            src: ['../sounds/_13_squaresStep.mp3']
        }),
        _14_bearStep: new Howl({
            src: ['../sounds/_14_bearStep.mp3']
        }),
        _07_level3: new Howl({
            src: ['../sounds/_07_level3.mp3']
        }),
        _15_endLevel2: new Howl({
            src: ['../sounds/_15_endLevel2.mp3']
        }),
        _16_nextLevel3Song: new Howl({
            src: ['../sounds/_16_nextLevel3Song.mp3']
        }),
        _17_level3: new Howl({
            src: ['../sounds/_17_level3.mp3']
        }),
        _18_ballStep: new Howl({
            src: ['../sounds/_18_ballStep.mp3']
        }),
        _19_flowerStep: new Howl({
            src: ['../sounds/_19_flowerStep.mp3']
        }),
        _09_endGame: new Howl({
            src: ['../sounds/_09_endGame.mp3']
        }),
        _20_congrats: new Howl({
            src: ['../sounds/_20_congrats.mp3']
        }),
        _21_endGame: new Howl({
            src: ['../sounds/_21_endGame.mp3']
        }),
        _xx_hit: new Howl({
            src: ['../sounds/_xx_hit.mp3']
        }),
        _xx_miss: new Howl({
            src: ['../sounds/_xx_miss.mp3']
        })
    }
}


function turnSound(sound, onOff, callback = null, autoOff = true) {
    if (onOff.includes('on') && !sound.playing()) {
        sound.play();
        if (autoOff) {
            sound.once('end', function () {
                if(callback)
                    callback();
            });
        }
        else {
            sound.loop(true);
        }
    } else if (onOff.includes('off') && sound.playing()) {
        sound.stop();
        sound.once('stop', function () {
            if(callback)
                callback();
        });
        sound.loop(false);
    }
}
