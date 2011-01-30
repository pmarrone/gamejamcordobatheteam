function KeyHelpingDraw() {

    var doClimb = false;

    this.startKeyHelpingDraw = function () {
        this.startupVisualGameObject(g_ResourceManager.A, 0, 0, 12);
        this.isVisible = true;
        return this;
    }

    this.isClimbing = function (climb) {
        doClimb = climb;
    }

    this.update = function (dt, context, xScroll, yScroll) {

    }

    var counter = 0;
    var fourState = 0;

    this.draw = function (dt, canvasContext, xScroll, yScroll) {

        counter++;
        if (counter >= 10) {
            fourState++;
            counter = 0;
            fourState = fourState > 3 ? 0 : fourState;
        }

        if (!doClimb) {
            canvasContext.drawImage(
                (fourState == 0 ? g_ResourceManager.AD :
                    fourState == 1 ? g_ResourceManager.A :
                        fourState == 2 ? g_ResourceManager.AD : g_ResourceManager.D)
                , 400, 300);
        } else {
            canvasContext.drawImage(
                (fourState == 0 ? g_ResourceManager.WS :
                    fourState == 1 ? g_ResourceManager.W :
                        fourState == 2 ? g_ResourceManager.WS : g_ResourceManager.S)
                , 400, 300);
        }
    }
}

KeyHelpingDraw.prototype = new VisualGameObject;