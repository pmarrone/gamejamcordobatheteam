function Achievement() {

    var isEndangered = false;
    var soundStarted = false;
    this.bigImage = null;
    this.smallImage = null;
    var stored = false;

    var ArchievementString = "";

    this.startupAchievement = function (bigImage, smallImage, achievementString) {
        this.bigImage = bigImage;
        this.smallImage = smallImage;

        ArchievementString = achievementString;

        this.x = 200;
        this.y = 120;
        this.zOrder = 14;
        this.startupVisualGameObject(this.bigImage, this.x, this.y, this.zOrder);
        this.isVisible = true;
        return this;
    }

    this.update = function (dt, context, xScroll, yScroll) {
    
    }

    var counter = 0;

    this.draw = function (dt, canvasContext, xScroll, yScroll) {
        if (counter > 100 && !stored) {
            stored = true;
            g_AchievementManager.add(this);
        } else {
            counter++;
        }

        if (!stored) {
            if (ArchievementString.length > 0) {
                canvasContext.fillStyle = 'White';
                canvasContext.strokeStyle = 'Black';
                canvasContext.font = 'Bold 20px Arial';
                canvasContext.textBaseline = 'Top';
                canvasContext.lineWidth = 1;

                canvasContext.fillText(ArchievementString, this.x, this.y + 105);
                canvasContext.strokeText(ArchievementString, this.x, this.y + 105);
            }
        }

        canvasContext.drawImage(
            this.image,
            this.x,
            this.y);
    }
}

Achievement.prototype = new VisualGameObject;