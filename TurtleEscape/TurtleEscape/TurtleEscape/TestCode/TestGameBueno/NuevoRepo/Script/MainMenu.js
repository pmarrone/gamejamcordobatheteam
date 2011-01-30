/**
    The main menu screen
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function MainMenu() {

    var startRectangle;
    var creditRectangle;
    var backRectangle;
    var isStartOn = false;
    var isCreditOn = false;
    var isShowingCredits = false;

    this.startupMainMenu = function () {
        this.startupVisualGameObject(g_ResourceManager.mainmenu, 0, 0, 1);
        startRectangle = new Rectangle().startupRectangle(420, 250, 160, 55);
        creditRectangle = new Rectangle().startupRectangle(480, 330, 100, 40);
        backRectangle = new Rectangle().startupRectangle(10, 10, 80, 32);
        return this;
    }

    this.keyDown = function (event) {
    }

    this.MouseDown = function (event) {
        if (startRectangle.intersects(new Rectangle().startupRectangle(event.offsetX,
            event.offsetY, 2, 2)) && !isShowingCredits) {
            g_SoundManager.bubuzela.play();

            g_SoundManager.mainTheme.pause();
            g_SoundManager.mainTheme.currentTime = 0;
            g_SoundManager.mainTheme.volume = 0.15;
            g_SoundManager.mainTheme.loop = "loop";
            g_SoundManager.mainTheme.play();
            g_ApplicationManager.startLevel();
        }

        if (creditRectangle.intersects(new Rectangle().startupRectangle(event.offsetX,
            event.offsetY, 2, 2))) {
            g_SoundManager.credits.play();
            isShowingCredits = true;
        }

        if (backRectangle.intersects(new Rectangle().startupRectangle(event.offsetX,
            event.offsetY, 2, 2))) {
            g_SoundManager.start.play();
            isShowingCredits = false;
        }
    }

    this.MouseMove = function (event) {

        isStartOn = startRectangle.intersects(new Rectangle().startupRectangle(event.offsetX,
            event.offsetY, 2, 2));

        isCreditOn = creditRectangle.intersects(new Rectangle().startupRectangle(event.offsetX,
            event.offsetY, 2, 2));
    }

    this.draw = function (dt, canvasContext, xScroll, yScroll) {

        if (!isShowingCredits) {
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

            if (!isCreditOn) {
                canvasContext.drawImage(g_ResourceManager.menufont,
                250, 85, 100, 40,
                480, 330, 100, 40);
            } else {
                canvasContext.drawImage(g_ResourceManager.menufont,
                58, 73, 119, 61,
                470, 320, 119, 61);
            }
        } else {
            canvasContext.drawImage(g_ResourceManager.credits, 0, 0);
            canvasContext.drawImage(g_ResourceManager.backButton, 10, 10);
        }
    }
}
MainMenu.prototype = new VisualGameObject;