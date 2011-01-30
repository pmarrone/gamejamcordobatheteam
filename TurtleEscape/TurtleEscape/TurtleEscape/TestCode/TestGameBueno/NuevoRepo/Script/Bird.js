function Bird() {

    this.startupBird = function () {
        this.startupAnimatedGameObject(g_ResourceManager.bird, 0, g_floor - 80, 8,
            4, 8);
        this.x = 300;
        this.y = 180;
        return this;
    }

    var counter = 0;
    var birdSpeed = 0.6;

    this.update = function (/**Number*/dt, /**CanvasRenderingContext2D*/context, /**Number*/xScroll, /**Number*/yScroll) {
        counter += 0.1;
        var sinResult = Math.sin(counter);

        this.x -= birdSpeed;
        this.y = (sinResult * 2) + this.y;

        if (this.x + this.image.width < g_GameObjectManager.xScroll) {
            g_score += 20;
            this.x = g_GameObjectManager.xScroll + 650 + Math.random() * 150;
        }

    }

}

Bird.prototype = new AnimatedGameObject;