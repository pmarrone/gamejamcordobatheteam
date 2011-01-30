/**
    The main menu screen
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function MainMenu()
{
    this.startupMainMenu = function()
    {
        this.startupVisualGameObject(g_ResourceManager.mainmenu, 0, 0, 1);
        return this;
    }

    /**
        Called when a key is pressed
        @param event Event Object
    */
    this.keyDown = function (event) {
        //g_ApplicationManager.startLevel();
        this.image = credits;
    }

    this.draw = function (dt, canvasContext, xScroll, yScroll) {

        canvasContext.drawImage(this.image, 0, 0);
        canvasContext.fillStyle = '#000000FF';
        canvasContext.font = '40px Verdana';
        canvasContext.textBaseline = 'Top';
        canvasContext.fillText('Hello world!', 400, 300);

        canvasContext.font = 'Bold 30px Sans-Serif';
        canvasContext.fillStyle = '#000000FF';
        canvasContext.strokeStyle = '#000000FF';
        canvasContext.lineWidth = 5;

        canvasContext.strokeText('Hello world!', 40, 50);


    }
}
MainMenu.prototype = new VisualGameObject;