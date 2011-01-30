function AchievementManager() {

    this.achievements = new Array();
    var smallAchievementWidth = 50;
    var startXPos = 10;
    var startYPos = 30;


    this.startupAchievementManager = function () {        
        return this;        
    }

    this.add = function (achievement) {
        achievement.image = achievement.smallImage;
        achievement.x = startXPos + this.achievements.length * smallAchievementWidth;
        achievement.y = startYPos;
        this.achievements.push(achievement);
    }
}