function OldGuy() {

    this.startupOldGuy = function () {
        this.startupVisualGameObject(g_ResourceManager.oldGuy, 120 + Math.random() * 50, 0, 11,
            12, 3);
        this.y = g_floor - this.image.height + 30 + Math.random() * 20;
        return this;
    }

    this.update = function (/**Number*/dt, /**CanvasRenderingContext2D*/context, /**Number*/xScroll, /**Number*/yScroll) {
        if (this.x + this.image.width < g_GameObjectManager.xScroll) {
            g_score += 30;            
            g_SoundManager.doSizzle();
            this.x = g_GameObjectManager.xScroll + 300 + Math.random() * 500;
        }
    }
}

OldGuy.prototype = new VisualGameObject;