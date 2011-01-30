function SoundManager() {
    this.listSound = null;

    this.startupSoundManager = function (/**Array*/sounds) {
        g_SoundManager = this;

        this.listSound = new Array();

        for (var i = 0; i < sounds.length; i++) {
            var thisAudio = new Audio;
            this[sounds[i].name] = thisAudio;
            this.listSound.push(sounds[i].name);

            thisAudio.src = sounds[i].src;
        }

        return this;
    }

    this.doSizzle = function () {
        soundName = null;

        x = parseInt(Math.random() * 3);
        switch (x) {
            case 0:
                soundName = this.sizzle1;
                break;
            case 1:
                soundName = this.sizzle2;
                break;
            case 2:
                soundName = this.sizzle3;
                break;
            default:
                soundName = this.sizzle1;
                break;
        }

        soundName.play();
    } 
           

//    this.PlayRecycled = function (sound) {
//        sound.pause();
//        sound.currentTime = 0;
//        sound.play();
//        //        var recycledAudio = new Audio();
//        //        recycledAudio.src = sound.src;
//        //        recycledAudio.play();
//    }
}