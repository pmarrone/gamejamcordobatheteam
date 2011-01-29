function Player() {

    var canvasContext = CANVASOBJECT.getContext('2d');
    var doubleBuffer = document.createElement("canvas");

    Player.spritePicture;
    Player.pictureLoaded = false;

    this.ImageSource = function (path) {
        spritePicture = new Image();
        spritePicture.onload = function () {
            Player.pictureLoaded = true;
        };
        spritePicture.src = path;
    }

    this.Draw = function () {
        if (Player.pictureLoaded) {
            canvasContext.drawImage(spritePicture,
                28, 0, 75, 149, 0, 0, 28, 149);
        }
    }
};

var player = new Player();
player.ImageSource("Images/gb_walk.png");

function dp() {
    player.Draw();
    setInterval("dp()", 32);
};

dp();
