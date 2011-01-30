function HurryUpSign() {
    var isEndangered = false;
    var soundStarted = false;

    this.startHurryUpSign = function () {
        this.startupVisualGameObject(g_ResourceManager.hurryUpSign, 0, 0, 12);
        this.isVisible = true;
        return this;

    }

    this.isClimbing = function (climb) {
        doClimb = climb;
    }

    this.update = function (dt, context, xScroll, yScroll) {
        isEndangered = (g_player.getDistanceToLava() < 150);
    }

    var counter = 0;

    this.draw = function (dt, canvasContext, xScroll, yScroll) {
        counter += 1 / g_player.getDistanceToLava() * 10.00;
        if (counter >= 1000000) {
            counter = 0;
        }

        if (isEndangered) {
            annoyngMeter = g_player.getDistanceToLava();
            annoyingQuotient = 1 - (annoyngMeter - 100) / 50;
            annoyngSin = Math.sin(counter * 1 + Math.random() * annoyingQuotient * 2);
            annoyngCos = Math.cos(counter * 0.8 + Math.random() * annoyingQuotient * 2);


            canvasContext.drawImage(
                g_ResourceManager.hurryUpSign,
                annoyngCos * (10 + annoyingQuotient * 10) + 600 - 300 * annoyingQuotient,
                annoyngSin * 10 + 180);

            if (annoyingQuotient > 0.4) {
                if (!soundStarted) {
                    g_SoundManager.alarm.play();
                }
                g_SoundManager.alarm.loop = "loop";
            } else {
                g_SoundManager.alarm.pause();
            }

        }


    }
}

HurryUpSign.prototype = new VisualGameObject;