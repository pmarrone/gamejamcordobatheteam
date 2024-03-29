/** target frames per second  
    @type Number
*/
var FPS = 30;
/** time between frames 
    @type Number
*/
var SECONDS_BETWEEN_FRAMES = 1 / FPS;
/** A global reference to the GameObjectManager instance  
    @type GameObjectManager
*/
var g_GameObjectManager = null;
/** A global reference to the ApplicationManager instance  
    @type ApplicationManager
*/
var g_ApplicationManager = null;
/** A global reference to the ResourceManager instance
    @type ResourceManager
*/
var g_ResourceManager = null;
/** The players score
    @type Number
 */
var g_score = 0;
/** A reference to the player
    @type Player    
 */
var g_player = null;
/** An image to be used by the application
    @type Image
*/

var g_scoreObject = null;

var g_mainMagma = null;

var g_floor = 300;

var g_speed = 0;

var g_followingTurle = false;

var g_SoundManager = null;

var g_KeyHelping = null;

var g_AchievementManager = null;

// The entry point of the application is set to the init function
window.onload = init;

/**
    Application entry point
*/
function init()
{
    new GameObjectManager().startupGameObjectManager();
}