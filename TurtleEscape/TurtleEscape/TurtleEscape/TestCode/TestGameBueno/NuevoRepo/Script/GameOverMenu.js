/**
The main menu screen
@author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
@class
*/
function GameOverMenu() {
    
    this.startupGameOverMenu = function () {
        this.startupVisualGameObject(g_ResourceManager.gameOver, 0, 0, 1);
        return this;
    }

    this.MouseDown = function (event) {
        g_SoundManager.mainTheme.pause();
        g_SoundManager.mainTheme.currentTime = 0;

        g_ApplicationManager.openMainMenu();        
    }

    this.draw = function (dt, canvasContext, xScroll, yScroll) {

        canvasContext.drawImage(this.image, 0, 0);
        canvasContext.fillStyle = '#FF0000';
        canvasContext.font = 'Bold 30px Sans-Serif';
        canvasContext.textBaseline = 'Top';
        canvasContext.strokeStyle;
        canvasContext.fillText('Score: ' + g_score, 40, 380);
    }
}
GameOverMenu.prototype = new VisualGameObject;