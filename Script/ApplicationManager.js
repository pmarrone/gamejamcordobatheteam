/**
    The ApplicationManager is used to manage the application itself.
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function ApplicationManager()
{
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    /**
        Initialises this object
        @param canvasWidth      The width of the canvas
        @param canvasHeight     The height of the canvas
        @return                 A reference to the initialised object

    */
    this.startupApplicationManager = function(canvasWidth, canvasHeight)
    {
        g_ApplicationManager = this;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.openMainMenu();

        return this;
    }

    this.startLevel = function () {
        g_GameObjectManager.shutdownAll();
        this.level = new Level().startupLevel(this.canvasWidth, this.canvasHeight);

        //this.background4 = new RepeatingGameObject().startupRepeatingGameObject(g_ResourceManager.background3, 0, 100, 10, 600, 320, 0.5);
        this.background3 = new RepeatingGameObject().startupRepeatingGameObject(g_ResourceManager.background2, 0, 100, 10, 600, 320, 1);
        this.background4 = new RepeatingGameObject().startupRepeatingGameObject(g_ResourceManager.background1, 0, 110, 4, 600, 320, 1);
        this.mountains = new RepeatingGameObject().startupRepeatingGameObject(g_ResourceManager.mountains, 0, 0, 3, 600, 320, 0.15);
        this.background = new RepeatingGameObject().startupRepeatingGameObject(g_ResourceManager.background0, 0, 0, 1, 600, 320, 0.05);
        g_player = new Player().startupPlayer(this.level);
        g_scoreObject = new ScoreObject().startUpScore();
        new SpeedMeter().startUpSpeedMeter();

        //Creates magma
        g_SoundManager.mezcla.loop = "loop";
        g_SoundManager.mezcla.play();
        g_mainMagma = new Magma().startUpMagma(-10, 30, 10);
        g_AchievementManager = new AchievementManager().startupAchievementManager();

        new Magma().startUpMagma(-20, 20, 4.4, 0.5);
        new Magma().startUpMagma(-10, 60, 10, 1);
        new Magma().startUpMagma(-20, 10, 4.4, 1.3);
        new Magma().startUpMagma(-80, 70, 11, 0.9);
        //************

        g_KeyHelping = new KeyHelpingDraw().startKeyHelpingDraw();
        new HurryUpSign().startHurryUpSign();


        this.updateScore();
    }

    this.openGameOverMenu = function () {
        g_GameObjectManager.shutdownAll();
        g_GameObjectManager.xScroll = 0;
        g_GameObjectManager.yScroll = 0;
        this.gameOverMenu = new GameOverMenu().startupGameOverMenu();
    }

    this.openMainMenu = function()
    {
        g_GameObjectManager.shutdownAll();
        g_GameObjectManager.xScroll = 0;
        g_GameObjectManager.yScroll = 0;
        g_score = 0;
        this.mainMenu = new MainMenu().startupMainMenu();
    }

    this.updateScore = function() {
    }
}
