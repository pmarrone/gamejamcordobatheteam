function Magma() {

    var offSetX = 0;
    var offSetY = 0;
    var counter = 0;
    var magma1Y = 125;
    var magma2Y = 90;
    var magma3Y = 140;
    var magma4Y = 40;
    var magma5Y = 85;

    this.startUpMagma = function (offsetX, offsetY) {
        offSetX = offsetX;
        offSetY = offsetY;
        this.startupVisualGameObject(g_ResourceManager.lava, 0, 0, 2);
        this.isVisible = false;
        return this;
    }

    this.update = function (dt, context, xScroll, yScroll) {

    }

    this.draw = function (dt, canvasContext, xScroll, yScroll) {

        counter += 0.1;
        var sinResult = Math.sin(counter);
        var sinResult2 = Math.sin(counter / 2);

        //Big Magma
        canvasContext.drawImage(this.image,
            (sinResult * 4) + 710, (sinResult2 * 4) + 95, 150, 180,
             -30 + offSetX, (g_floor - magma3Y) + offSetY,
             (sinResult * 5) + 150, 180);

        //Middle Magma
        canvasContext.drawImage(this.image,
            (sinResult * 2) + 994, (sinResult2 * 1.5) + 105, 86, 101,
            30 + offSetX, (g_floor - magma5Y) + offSetY,
            (sinResult * 2) + 86, 101);

        //Second big magma
        canvasContext.drawImage(this.image,
            (sinResult * 6) + 350, (sinResult * 2) + 95, 130, 130,
            -45 + offSetX, (g_floor - magma1Y) + offSetY,
            (sinResult * 4) + 130, 130);

        //Small Magma 1
        canvasContext.drawImage(this.image,
            (sinResult * 2.2) + 885, (sinResult * 2.1) + 125, 65, 65,
            10 + offSetX, (g_floor - magma4Y) + offSetY, (sinResult * 5) + 65, 65);

        //Front Magma
        canvasContext.drawImage(this.image,
            (sinResult * 2) + 560, (sinResult * 2) + 100, 115, 120,
            -55 + offSetX, (g_floor - magma2Y) + offSetY, (sinResult * 8) + 115, 120);

    }

}

Magma.prototype = new VisualGameObject;