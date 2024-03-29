﻿ig.baked = true;
ig.module('impact.input').defines(function () {
    ig.KEY = { 'MOUSE1': -1, 'MOUSE2': -3, 'MWHEEL_UP': -4, 'MWHEEL_DOWN': -5, 'BACKSPACE': 8, 'TAB': 9, 'ENTER': 13, 'PAUSE': 19, 'CAPS': 20, 'ESC': 27, 'SPACE': 32, 'PAGE_UP': 33, 'PAGE_DOWN': 34, 'END': 35, 'HOME': 36, 'LEFT_ARROW': 37, 'UP_ARROW': 38, 'RIGHT_ARROW': 39, 'DOWN_ARROW': 40, 'INSERT': 45, 'DELETE': 46, '0': 48, '1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57, 'A': 65, 'B': 66, 'C': 67, 'D': 68, 'E': 69, 'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74, 'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79, 'P': 80, 'Q': 81, 'R': 82, 'S': 83, 'T': 84, 'U': 85, 'V': 86, 'W': 87, 'X': 88, 'Y': 89, 'Z': 90, 'NUMPAD_0': 96, 'NUMPAD_1': 97, 'NUMPAD_2': 98, 'NUMPAD_3': 99, 'NUMPAD_4': 100, 'NUMPAD_5': 101, 'NUMPAD_6': 102, 'NUMPAD_7': 103, 'NUMPAD_8': 104, 'NUMPAD_9': 105, 'MULTIPLY': 106, 'ADD': 107, 'SUBSTRACT': 109, 'DECIMAL': 110, 'DIVIDE': 111, 'F1': 112, 'F2': 113, 'F3': 114, 'F4': 115, 'F5': 116, 'F6': 117, 'F7': 118, 'F8': 119, 'F9': 120, 'F10': 121, 'F11': 122, 'F12': 123, 'SHIFT': 16, 'CTRL': 17, 'ALT': 18, 'PLUS': 187, 'COMMA': 188, 'MINUS': 189, 'PERIOD': 190 };
    ig.Input = ig.Class.extend({ bindings: {}, actions: {}, locks: {}, delayedKeyup: [], isUsingMouse: false, isUsingKeyboard: false, mouse: { x: 0, y: 0 }, initMouse: function () {
        if (this.isUsingMouse) {
            return;
        }
        this.isUsingMouse = true;
        window.addEventListener('mousewheel', this.mousewheel.bind(this), false);
        ig.system.canvas.addEventListener('contextmenu', this.contextmenu.bind(this), false);
        ig.system.canvas.addEventListener('mousedown', this.keydown.bind(this), false);
        ig.system.canvas.addEventListener('mouseup', this.keyup.bind(this), false);
        ig.system.canvas.addEventListener('mousemove', this.mousemove.bind(this), false);
        ig.system.canvas.addEventListener('touchstart', this.keydown.bind(this), false);
        ig.system.canvas.addEventListener('touchend', this.keyup.bind(this), false);
        ig.system.canvas.addEventListener('touchmove', this.mousemove.bind(this), false);
    }, initKeyboard: function () {
        if (this.isUsingKeyboard) {
            return;
        }
        this.isUsingKeyboard = true;
        window.addEventListener('keydown', this.keydown.bind(this), false);
        window.addEventListener('keyup', this.keyup.bind(this), false);
    }, mousewheel: function (event) {
        var code = event.wheel > 0 ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN;
        var action = this.bindings[code];
        if (action) {
            this.actions[action] = true;
            event.stopPropagation();
            this.delayedKeyup.push(action);
        } 
    }, mousemove: function (event) {
        var el = ig.system.canvas;
        var pos = { left: 0, top: 0 };
        while (el != null) {
            pos.left += el.offsetLeft;
            pos.top += el.offsetTop;
            el = el.offsetParent;
        }
        var tx = event.pageX;
        var ty = event.pageY;
        if (event.targetTouches) {
            tx = event.targetTouches[0].clientX;
            ty = event.targetTouches[0].clientY;
        }
        this.mouse.x = (tx - pos.left) / ig.system.scale;
        this.mouse.y = (ty - pos.top) / ig.system.scale;
    }, contextmenu: function (event) {
        if (this.bindings[ig.KEY.MOUSE2]) {
            event.stopPropagation();
            event.preventDefault();
        } 
    }, keydown: function (event) {
        if (event.target.type == 'text') {
            return;
        }
        var code = event.type == 'keydown' ? event.keyCode : (event.button == 2 ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1);
        if (event.type == 'touchstart') {
            this.mousemove(event);
        }
        var action = this.bindings[code];
        if (action) {
            this.actions[action] = true;
            event.stopPropagation();
            event.preventDefault();
        } 
    }, keyup: function (event) {
        if (event.target.type == 'text') {
            return;
        }
        var code = event.type == 'keyup' ? event.keyCode : (event.button == 2 ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1);
        var action = this.bindings[code];
        if (action) {
            this.delayedKeyup.push(action);
            event.stopPropagation();
            event.preventDefault();
        } 
    }, bind: function (key, action) {
        if (key < 0) {
            this.initMouse();
        }
        else if (key > 0) {
            this.initKeyboard();
        }
        this.bindings[key] = action;
    }, bindTouch: function (selector, action) {
        var element = ig.$(selector);
        var that = this;
        element.addEventListener('touchstart', function (ev) {
            that.touchStart(ev, action);
        }, false);
        element.addEventListener('touchend', function (ev) {
            that.touchEnd(ev, action);
        }, false);
    }, unbind: function (key) {
        this.bindings[key] = null;
    }, unbindAll: function () {
        this.bindings = [];
    }, state: function (action) {
        return this.actions[action];
    }, pressed: function (action) {
        if (!this.locks[action] && this.actions[action]) {
            this.locks[action] = true;
            return true;
        }
        else {
            return false;
        } 
    }, clearPressed: function () {
        for (var i = 0;
			i < this.delayedKeyup.length;
			i++) {
            var action = this.delayedKeyup[i];
            this.locks[action] = false;
            this.actions[action] = false;
        }
        this.delayedKeyup = [];
    }, touchStart: function (event, action) {
        this.actions[action] = true;
        event.stopPropagation();
        event.preventDefault();
        return false;
    }, touchEnd: function (event, action) {
        this.delayedKeyup.push(action);
        event.stopPropagation();
        event.preventDefault();
        return false;
    } 
    });
});