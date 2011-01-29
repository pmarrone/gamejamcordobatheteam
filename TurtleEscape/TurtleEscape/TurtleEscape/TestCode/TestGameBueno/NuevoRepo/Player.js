/**
    A class to represent the player on the screen
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function Player() {
    var climbYOffset = -20;
    var climbZOffset = 4;
    var alreadyReset = false;
    this.climbStage = 0;
    this.climbFnishStage = 17;
    this.lastKeyCode = 0;
	
    this.correctHitFrames = 0;
    this.wasLastKeyGood = false;
    this.keyHandler = new KeySwitchHandler(65, 68);
	
	this.isClimbing = false;
	var doState = run;
	
	
	this.self = this;
	
    /** The maximum height of the jump
        @type Number
     */
    this.jumpHeight = 64;
    /** The constant or half PI
        @type Number
     */
    this.halfPI = Math.PI / 2;
    /** The amount of time to spend in the air when jumping
        @type Number
     */
    this.jumpHangTime = 0.5;
    /** The speed to progress alone the sine wave that defines
        the jumping arc
        @type Number
     */
    this.jumpSinWaveSpeed = this.halfPI / this.jumpHangTime;
    /** The current position on the sine wave that defines the jump arc
        @type Number
     */
    this.jumpSinWavePos = 0;
    /** The rate to fall at
        @type Number
     */
    this.fallMultiplyer = 1.5;
    /** True when the player is on the ground, false otherwise
        @type Boolean
     */
    this.grounded = true;
    /** the players running speed
        @type Number
     */
    //this.speed = 0.2;
    this.speed = 2.3;
	/** 
     */
    this.latency = 1;
    /** True if the player is moving left, false otherwise
        @type Boolean
     */
    this.left = false;
    /** True if the player is moving right, false otherwise
        @type Boolean
     */
    this.right = false;
    /** A reference to the level object
        @type Level
    */
    this.level = null;
    /** The distance between the player and the edge of the screen
        @type Number
     */
    this.screenBorder = 300;
	this.isStopped = true;
    /**
        Initialises this object
    */
    this.startupPlayer = function(level)
    {
        this.startupAnimatedGameObject(g_ResourceManager.idleRight, 0, g_floor - g_ResourceManager.runRight.height, 4, 6, 20);
        this.level = level;
        return this;
    }
    
    this.keyDown = function (event) {
		
		this.keyHandler.onKeyDown(event);
		this.lastKeyDownCode = event.keyDown;
		
        if (event.keyCode == 32 && this.grounded) {
			this.keyHandler.SetKeys(38, 40);
            this.grounded = false;
            this.jumpSinWavePos = 0;
        }
    }

    /**
        Called when a key is pressed
        @param event Event Object
    */

    this.startClimbing = function () {
        this.isClimbing = true;
        doState = climb;
        this.keyHandler.SetKeys(87, 83);
        this.updateAnimation();
        this.y += climbYOffset;
        this.zOrder += climbZOffset;
        g_GameObjectManager.SortObjects();
        debug(this.zOrder);
        alreadyReset = false;
    }	
	
	this.stopClimbing = function() {
		this.isClimbing = false;
	}	

    this.keyUp = function (event) {
		this.keyHandler.onKeyUp(event);
    }

    /**
        Updates the current animation depending on the movement
        of the player. This accounts for the fact that both
        the left and right arrow keys can be pressed at the
        same time.
    */
    this.updateAnimation = function()
    {
		if (this.isClimbing) {
			this.setAnimation(g_ResourceManager.climb, 17,-1);
		} else if (this.right && this.left)
            this.setAnimation(g_ResourceManager.idleRight, 6, 6);
        else if (this.right)
            this.setAnimation(g_ResourceManager.runRight, 8, 15);
        else if (this.left)
            this.setAnimation(g_ResourceManager.runRight, 8, 15);
        else 
            this.setAnimation(g_ResourceManager.idleRight, 6, 6);
    }

    /**
        Updates the object
        @param dt The time since the last frame in seconds
        @param context The drawing context
        @param xScroll The global scrolling value of the x axis
        @param yScroll The global scrolling value of the y axis
    */
    this.update = function (/**Number*/dt, /**CanvasRenderingContext2D*/context, /**Number*/xScroll, /**Number*/yScroll) {

        doState(this.self);

        g_GameObjectManager.xScroll += (this.x - g_GameObjectManager.xScroll - this.screenBorder) * 0.5;

        g_score = parseInt(self.x);
        g_ApplicationManager.updateScore();
    }
	
	function run(self) {
		self.keyHandler.update();
		var updateRequired = false;
		if (self.keyHandler.impulse > 0){			
			self.x += self.speed * (self.keyHandler.impulse / self.keyHandler.resetImpulse);
			self.right = true;
			if (self.isStopped){				
				self.isStopped = false;
				updateRequired = true;
			}
		} else {
			self.right = false;
			if (!self.isStopped)
			{
				updateRequired = true;
				self.isStopped = true;
			}
			
		}
	
		
		if (updateRequired){
			self.updateAnimation();
		}
	}

	var oldFrame = 0;

	function climb(self) {
	    
		self.keyHandler.update();
		var updateRequired = false;
		if (self.keyHandler.impulse > 0){
		    self.climbStage += 0.14 * (self.keyHandler.impulse / self.keyHandler.resetImpulse);

		    if (self.climbStage > 9 && self.climbStage < 12) {
		        var newFrame = parseInt(self.climbStage);
		        if (oldFrame != newFrame) {
		            self.x += 12;
		            oldFrame = newFrame;
		        }
            }

            if (self.climbStage > 11 && self.climbStage < 12 && !alreadyReset) {
                alreadyReset = true;
                self.zOrder -= climbZOffset;
                g_GameObjectManager.SortObjects();
                debug(self.zOrder);
            }

            self.setFrame(parseInt(self.climbStage));
		    if (self.climbStage > self.climbFnishStage) {
		        //Stop climbing
		        self.climbStage = 0;
		        self.isClimbing = false;
		        self.keyHandler.SetKeys(65, 68);

		        self.left = false;
		        self.right = false;

		        self.y -= climbYOffset;
                doState = run;		        
		        self.updateAnimation();
		    } 

		} 
	}	
}

Player.prototype = new AnimatedGameObject;
