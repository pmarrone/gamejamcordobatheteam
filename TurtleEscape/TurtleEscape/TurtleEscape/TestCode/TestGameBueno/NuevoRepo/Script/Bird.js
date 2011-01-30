function Bird() {

    var deathBirds = 0;
    var bird

    this.startupBird = function () {
        this.startupAnimatedGameObject(g_ResourceManager.bird, 0, g_floor - 80, 8,
            4, 8);

        this.x = 300;
        this.y = 180;
        return this;
    }

    var counter = 0;
    var birdSpeed = 2.6;

    this.update = function (/**Number*/dt, /**CanvasRenderingContext2D*/context, /**Number*/xScroll, /**Number*/yScroll) {
        counter += 0.1;
        var sinResult = Math.sin(counter);

        this.x -= birdSpeed;
        this.y = (sinResult * 2) + this.y;

        if (this.x + this.image.width < g_GameObjectManager.xScroll) {
            g_score += 20;
            deathBirds++;

            if (deathBirds == 1)
                new Achievement().startupAchievement(g_ResourceManager.woodenFingersL,
                    g_ResourceManager.woodenFingersS, "Frula");

            this.x = g_GameObjectManager.xScroll + 650 + Math.random() * 150;
        }

    }

}

Bird.prototype = new AnimatedGameObject;