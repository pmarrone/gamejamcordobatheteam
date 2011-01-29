/**
    An object that causes the player to stop when touched
    @author 
    @class
*/
function Wall()
{
    
    /** Position of the wall
        @type Number
     */
    this.active = true;
    this.wallPositionX = 0;
    this.wallPositionY = 0;
    this.wallWidth = 0;
    this.collisionFrameWidth = 0;

    /**
        Initialises this object
        @param image        The image to be displayed
        @param x            The position on the X axis
        @param y            The position on the Y axis
        @param z            The depth
        @param fps          The frames per second to animate this object at
     */
    this.startupWall = function(/**Image*/ image, /**Number*/ x, /**Number*/ y, /**Number*/ z)
    {
        this.startupVisualGameObject(image,x,y,z);
        this.wallPositionX = x;
        this.wallPositionY = y;
        this.wallWidth = this.image.width;
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
    this.update = function (/**Number*/dt, /**CanvasRenderingContext2D*/context, /**Number*/xScroll, /**Number*/yScroll) {
        var currentPlayerX = g_player.x
        //this.x = g_player.x;
        //this.y = g_player.y - 50;

        if (this.collisionArea().intersects(g_player.collisionArea()) && this.active) {
            if (!g_player.isClimbing) {
                //g_player.x = this.x - this.wallWidth;
                g_player.startClimbing();
                this.active = false;
            }
        }
    }
}

Wall.prototype = new VisualGameObject;
