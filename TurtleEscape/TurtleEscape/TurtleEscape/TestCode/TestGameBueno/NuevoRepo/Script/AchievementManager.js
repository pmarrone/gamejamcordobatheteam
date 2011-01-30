function AchievementManager() {

    this.achievements = new Array();
    var smallAchievementSide = 20;
    var startXPos = 22;
    var startXPos = 10;
    var startYPos = 30;

    this.startupAchievementManager = function () {        
        return this;        
    }

    this.add = function (achievement) {
        achievement.image = achievement.smallImage;
        achivementBarWidth = 400;

        fullXPosition = (smallAchievementSide * this.achievements.length) + 15;

        var xPos = startXPos + fullXPosition % achivementBarWidth;
        var yPos = startYPos + parseInt(fullXPosition / achivementBarWidth) * smallAchievementSide;

        achievement.x = xPos;
        achievement.y = yPos;

        this.achievements.push(achievement);
    }
}
