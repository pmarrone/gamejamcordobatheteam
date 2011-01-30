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
        new Wall().startupWall(g_ResourceManager.wall, Math.random() * 900 - 200, g_floor - g_ResourceManager.wall.height, 5).EventPointer = WallEvent;
        new Wall().startupWall(g_ResourceManager.wall, Math.random() * 1800 - 200, g_floor - g_ResourceManager.wall.height, 5);
        new Wall().startupWall(g_ResourceManager.wall, Math.random() * 2700 - 200, g_floor - g_ResourceManager.wall.height, 5);


        return this;
    }

    function WallEvent(wall) {
        wall.Reset(g_GameObjectManager.xScroll + 400);  // + Math.random() * 300);
    }
}
