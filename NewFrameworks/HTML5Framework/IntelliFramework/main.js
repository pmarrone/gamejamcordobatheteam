(function (window) {
    window.intFW = {
        _canvasId: "intFWcanvas",
        _canvasWidth: 300,
        _canvasHeight: 200,
        _fps: 30,
        _gameObjectCollection: new Array(),
        Setup: function (canvasId, canvasWidth, canvasHeight, fps) {
        },
        RegisterGameObject: function (gameObject) {
            intFW._gameObjectCollection.push(gameObject);
        }
    }

    window.intFW.GameObject = function () {
        this.coordinates = { x: 0, y: 0, z: 0 };
        this.sprite = {
            Width: 0,
            Height: 0,
            ResourceFile: function (file) {
                //Loads the file with file manager
            }
        };
        this.Draw = function (canvasContext) {
        };
        this.Update = function () {
        };
    };
})(window);

function myObject() {
    
};

myObject.prototype = new intFW.GameObject;
intFW.RegisterGameObject(new myObject);

document.write("debug");

