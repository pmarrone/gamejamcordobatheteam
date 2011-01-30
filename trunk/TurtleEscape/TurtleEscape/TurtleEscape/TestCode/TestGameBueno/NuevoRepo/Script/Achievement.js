function Achievement() {

    var isEndangered = false;
    var soundStarted = false;
    this.bigImage = null;
    this.smallImage = null;
    var stored = false;

    this.startupAchievement = function (bigImage, smallImage) {
        this.bigImage = bigImage;
        this.smallImage = smallImage;

        this.x = 100;
        this.y = 200;
        this.zOrder = 14;
        this.startupVisualGameObject(this.bigImage, this.x, this.y, this.zOrder);
        this.isVisible = true;
        return this;
    }

    this.update = function (dt, context, xScroll, yScroll) {
    
    }

    var counter = 0;

    this.draw = function (dt, canvasContext, xScroll, yScroll) {
        if (counter > 1000 && !stored) {
            stored = true;
            g_AchievementManager.add(this);
        } else {
            counter++;
        }

        canvasContext.drawImage(
            this.image,
            this.x,
            this.y);
    }
}

Achievement.prototype = new VisualGameObject;