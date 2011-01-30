function Bird() {

    var deathBirds = 0;
    var nextBirds = 4;

    this.startupBird = function () {
        this.startupAnimatedGameObject(g_ResourceManager.bird, 0, g_floor - 80, 8,
            4, 8);

        this.x = 300;
        this.y = 180;
        return this;
    }

    var counter = 0;
    var birdSpeed = 4.6;

    this.update = function (/**Number*/dt, /**CanvasRenderingContext2D*/context, /**Number*/xScroll, /**Number*/yScroll) {
        counter += 0.1;
        var sinResult = Math.sin(counter);

        this.x -= birdSpeed;
        this.y = (sinResult * 2) + this.y;

        if (this.x + this.image.width < g_GameObjectManager.xScroll) {
            g_score += 20;
            deathBirds++;
            g_SoundManager.doSizzle();

            if (deathBirds == nextBirds) {
                new Achievement().startupAchievement(g_ResourceManager.hotchickenL,
                    g_ResourceManager.hotchickenS, "      " + deathBirds + " birds burned.");
                nextBirds *= 5;
                deathBirds = 0;
            }

            this.x = g_GameObjectManager.xScroll + 2750 + Math.random() * 500;
        }
    }
}

Bird.prototype = new AnimatedGameObject;