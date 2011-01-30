function AchievementManager() {

    this.achievements = new Array();
    var smallAchievementSide = 20;
    var startXPos = 22;
    var startYPos = 30;

    this.startupAchievementManager = function () {        
        return this;        
    }

    this.add = function (achievement) {
        achievement.image = achievement.smallImage;
        g_screenWidth = 200;
    
        fullXPosition = (smallAchievementSide * this.achievements.length) + 15;

        var xPos = startXPos + fullXPosition % g_screenWidth;
        var yPos = startYPos + (fullXPosition / g_screenWidth) * smallAchievementSide;

        achievement.x = xPos;
        achievement.y = startYPos;

        this.achievements.push(achievement);
    }
}