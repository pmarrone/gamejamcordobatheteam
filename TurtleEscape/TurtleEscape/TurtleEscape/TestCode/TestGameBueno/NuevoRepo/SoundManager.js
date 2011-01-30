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
}