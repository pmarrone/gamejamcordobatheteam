function Rabbit() {

    this.startupRabbit = function() {
        this.startupAnimatedGameObject(g_ResourceManager.rabbit, 0, g_floor + 5, 8,
            12, 3);
        return this;
    }

    this.update = function (/**Number*/dt, /**CanvasRenderingContext2D*/context, /**Number*/xScroll, /**Number*/yScroll) {
        
    }

}

Rabbit.prototype = new AnimatedGameObject;