function OldGuy() {

    this.startupOldGuy = function () {
        this.startupVisualGameObject(g_ResourceManager.oldGuy, 0, g_floor + 5, 8,
            12, 3);
        return this;
    }

    this.update = function (/**Number*/dt, /**CanvasRenderingContext2D*/context, /**Number*/xScroll, /**Number*/yScroll) {
        
    }

}

OldGuy.prototype = new VisualGameObject;