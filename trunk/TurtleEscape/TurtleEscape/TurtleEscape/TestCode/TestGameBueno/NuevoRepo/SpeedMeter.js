function SpeedMeter() {

    this.startUpSpeedMeter = function () {
        this.startupVisualGameObject(g_ResourceManager.numbers, 0, 0, 10);
        this.isVisible = false;
        return this;
    }

    this.update = function (dt, context, xScroll, yScroll) {
    }

    var localSpeed = 0;
    var startDistance = g_player.x;
    var counter = 0;

    this.draw = function (dt, canvasContext, xScroll, yScroll) {
        counter++;
        if (counter >= 100) {
            localSpeed = startDistance - g_player.x;
            startDistance = g_player.x;
            counter = 0;
        }

        var xCoord = 300;
        var xSource = 0;
        var castedSting = parseInt(localSpeed * 100) + "";

        //        canvasContext.drawImage(this.image,
        //                176, 0, 79, 17,
        //                10, 0, 79, 17);

        for (var i = 0; i < castedSting.length; i++) {
            var charToRender = castedSting.charAt(i);

            switch (charToRender) {
                case "0":
                    xSource = 1;
                    break;
                case "1":
                    xSource = 18;
                    break;
                case "2":
                    xSource = 34;
                    break;
                case "3":
                    xSource = 50;
                    break;
                case "4":
                    xSource = 67;
                    break;
                case "5":
                    xSource = 84;
                    break;
                case "6":
                    xSource = 102;
                    break;
                case "7":
                    xSource = 120;
                    break;
                case "8":
                    xSource = 138;
                    break;
                case "9":
                    xSource = 157;
                    break;
                default:
            }

            canvasContext.drawImage(this.image,
                xSource, 0, 15, 17,
                xCoord + (i * 15), 0, 15, 17);
        }
    }
}

SpeedMeter.prototype = new VisualGameObject;