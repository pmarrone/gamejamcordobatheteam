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
        wall = new Wall().startupWall(g_ResourceManager.wall, 200 + Math.random() * 40, g_floor - g_ResourceManager.wall.height, 5);
        wall.EventPointer = WallEvent;
        wall.image = wall.getRandomImage();

        new Rabbit().startupRabbit();
        new Bird().startupBird();
        new OldGuy().startupOldGuy();

        return this;
    }

    function WallEvent(wall) {
        wall.Reset(g_GameObjectManager.xScroll + 650 + Math.random() * 150);  // + Math.random() * 300);   
    }


}
