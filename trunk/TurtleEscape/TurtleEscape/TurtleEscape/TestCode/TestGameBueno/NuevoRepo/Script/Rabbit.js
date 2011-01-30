function Rabbit() {

	var x = 100;
	var y = 100;
	var isBurning = false;
	var needsToRelocate = false;
	var alreadyBurning = false;

    this.startupRabbit = function() {
        this.startupAnimatedGameObject(g_ResourceManager.rabbit, 0, g_floor + 5, 8,
            12, 3);

        this.x = -270;
        this.y = 280;

        return this;
    }

	this.burnRabbit = function() {
		// Change animation
		this.startupAnimatedGameObject(g_ResourceManager.rabbitBurn, this.x, this.y - 13, 8, 4, 3);
		// Set state to burning
		this.alreadyBurning = true;
        return this;
	}

	this.rebornRabbit = function () {
		this.startupAnimatedGameObject(g_ResourceManager.rabbit, 0, this.y + 13, 8, 12, 3);
		this.x = g_GameObjectManager.xScroll + 600 + Math.random() * 100;
		this.alreadyBurning = false;
	}

	this.update = function (/**Number*/dt, /**CanvasRenderingContext2D*/context, /**Number*/xScroll, /**Number*/yScroll) {

	    // Update status
	    this.isBurning = this.x < g_mainMagma.x + 120;
	    this.needsToRelocate = this.x < g_mainMagma.x;

	    // Check if is burning
	    if (this.isBurning && !this.alreadyBurning) {
	        g_SoundManager.doSizzle();
	        this.burnRabbit();
	    }
	    // Check if needs to be relocated
	    if (this.needsToRelocate && this.alreadyBurning) {
	        this.rebornRabbit();
	    }
	}

}

Rabbit.prototype = new AnimatedGameObject;
