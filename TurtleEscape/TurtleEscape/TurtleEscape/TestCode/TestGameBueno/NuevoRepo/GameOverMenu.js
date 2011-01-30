/**
The main menu screen
@author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
@class
*/
function GameOverMenu() {

    var restartRectangle;    
    var isStartOn = false;
   
    this.startupGameOverMenu = function () {
        this.startupVisualGameObject(g_ResourceManager.gameOver, 0, 0, 1);
        restartRectangle = new Rectangle().restartRectangle(420, 250, 160, 55);
        return this;
    }

    this.keyDown = function (event) {
    }

    this.MouseDown = function (event) {
        if (restartRectangle.intersects(new Rectangle().startupRectangle(event.offsetX,
            event.offsetY, 2, 2)) {
            g_SoundManager.start.play();
            g_ApplicationManager.startLevel();
        }
    }

    this.MouseMove = function (event) {

        isStartOn = startRectangle.intersects(new Rectangle().startupRectangle(event.offsetX,
            event.offsetY, 2, 2));
    }

    this.draw = function (dt, canvasContext, xScroll, yScroll) {

        canvasContext.drawImage(this.image, 0, 0);

        if (!isStartOn) {
            canvasContext.drawImage(g_ResourceManager.menufont,
                200, 5, 160, 55,
                420, 250, 160, 55);
        } else {
            canvasContext.drawImage(g_ResourceManager.menufont,
                10, 5, 170, 70,
                410, 250, 170, 70);
        }
    }
}
GameOverMenu.prototype = new VisualGameObject;