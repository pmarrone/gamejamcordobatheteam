/**
    An object that causes the player to stop when touched
    @author 
    @class
*/
function Wall()
{
    /** The value of the powerup
        @type Number
     */
    this.value = 0;
    /** The current position on the sine wave
        @type Number
     */
    this.sineWavePos = 0;
    /** How quickly the powerup cycles through the sine wave
        @type Number
     */
    this.bounceTime = 1;
    /** The speed to increment the sineWavePos value at
        @type Number
     */
    this.bounceSpeed = Math.PI / this.bounceTime;
    /** The height of the powerups bounce
        @type Number
     */
    this.bounceHeight = 10;
    
    /** Position of the wall
        @type Number
     */
    this.wallPositionX = 0;
    this.wallPositionY = 0;
    this.wallWidth = 0;

    /**
        Initialises this object
        @param value        The value (score) of this powerup
        @param image        The image to be displayed
        @param x            The position on the X axis
        @param y            The position on the Y axis
        @param z            The depth
        @param frameCount   The number of animation frames in the image
        @param fps          The frames per second to animate this object at
     */
    this.startupWall = function(/**Number*/ value, /**Image*/ image, /**Number*/ x, /**Number*/ y, /**Number*/ z)
    {
        this.startupVisualGameObject(image,x,y,z);
        this.wallPositionX = x;
        this.wallPositionY = y;
        this.wallWidth = this.image.width;
        debug(this.wallWidth);
        return this;
    }

    this.shutdownWall = function()
    {
        this.shutdownVisualGameObject();
    }

    /**
        Updates the object
        @param dt The time since the last frame in seconds
        @param context The drawing context
        @param xScroll The global scrolling value of the x axis
        @param yScroll The global scrolling value of the y axis
    */
	this.update = function (/**Number*/ dt, /**CanvasRenderingContext2D*/context, /**Number*/ xScroll, /**Number*/ yScroll)
    {
        var currentPlayerX = g_player.x

        if (this.collisionArea().intersects(g_player.collisionArea()))
        {
			if ( g_player.y < this.wallPositionY ){
            	g_player.x = this.wallPositionX - this.wallWidth * 2;
            } else {
				debug(g_player.x+":"+g_player.y);
				g_player.x = this.wallPositionX + this.wallWidth * 2;
			}
        }
    }
}

Wall.prototype = new VisualGameObject;
