/**
    A class to represent the player on the screen
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function Lava() {

    /** the lava speed
        @type Number
     */
    this.speed = 75;
    /** A reference to the level object
        @type Level
    */
    this.level = null;
    /** The distance between the player and the edge of the screen
        @type Number
     */
    this.screenBorder = 10;

    /**
        Initialises this object
    */
    this.startupLava = function(level)
    {
        this.startupAnimatedGameObject(g_ResourceManager.block, 50, 50, 1, 1, 20);
        this.level = level;
        return this;
    }

    /**
        Updates the current animation depending on the movement
        of the player. 
    */
    this.updateAnimation = function()
    {
	   this.setAnimation(g_ResourceManager.block,1,1);
    }

}

Lava.prototype = new AnimatedGameObject;
