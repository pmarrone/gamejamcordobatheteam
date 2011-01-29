function ScoreObject() {

    this.startUpScore = function () {
        this.startupVisualGameObject(g_ResourceManager.numbers, 0, 0, 10);
        this.isVisible = false;
        return this;
    }

    this.update = function (dt, context, xScroll, yScroll) {

        this.y = 0 + yScroll;
        this.x = 0 + xScroll;

        for (var i = 0; i < g_score.length; i++) {

        }
        context.drawImage(this.image, this.x, this.y);
    }
}

ScoreObject.prototype = new VisualGameObject;