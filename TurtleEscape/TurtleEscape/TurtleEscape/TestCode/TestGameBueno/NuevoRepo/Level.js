/**
    A class to represent the level
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/

function Level()
{
    this.blocks = new Array();
    this.powerups = new Object;
    this.blockWidth = 64;
    this.blockHeight = 48;
    this.initialX = 200;
    /**
        Initialises this object
    */
    this.startupLevel = function (canvasWidth, canvasHeight) {
        new Wall().startupWall(g_ResourceManager.wall, this.initialX, g_floor - g_ResourceManager.wall.height, 5);
        return this;
    }
}
