function AchievementManager() {

    this.achievements = new Array();
    var smallAchievementWidth = 50;
    var startXPos = 30;
    var startYPos = 270;


    this.startupAchievementManager = function () {        
        return this;        
    }

    this.add = function (achievement) {
        this.achievements.push(achievement);
        achievement.image = achievement.smallImage;
        achievement.x = startXPos + achievements.length() * smallAchievementWidth;
    }
}