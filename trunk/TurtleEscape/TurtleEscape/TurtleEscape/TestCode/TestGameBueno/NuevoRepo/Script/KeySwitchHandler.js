function KeySwitchHandler(keyOne, keyTwo) {

	var timeSinceLastCombo = 0;
	
    var achivCounter = 0;
    var achivNext = 0;

	this.isKeyOnePressed = false;
	this.isKeyTwoPressed = false;
	
	this.stage = 0;
	
	this.keyOne = keyOne;
	this.keyTwo = keyTwo;
	
	this.lastKeyUpCode = 0;
    this.lastKeyDownCode = 0;	    
    this.currentKeyDownCode = 0;
	
	this.currentKeyCombo = 0;
	this.lastKeyCombo = 0;
	
     
	this.impulse = 0;
	this.resetImpulse = 10;
	this.currentKeyTime;
	
	//User is switching keys on time
	this.isActive = false;
	this.wasActive = false;
	
	this.SetKeys = function (keyOne, keyTwo) {
		this.keyOne = keyOne;
		this.keyTwo = keyTwo;
	}
	
	this.onKeyUp = function (event){
		this.lastKeyUpCode = event.keyCode;
		if (this.lastKeyUpCode == this.keyOne) {
			this.isKeyOnePressed = false;
			//debug("Key two up ");
		}
		if (this.lastKeyUpCode == this.keyTwo) {
			this.isKeyTwoPressed = false;
			//debug("Key one up ");
		}
		
		if (this.lastKeyUpCode == this.keyTwo 
			&& this.currentKeyDownCode == this.keyOne) {
			this.currentKeyCombo = 1;
		} else if (this.lastKeyUpCode == this.keyOne 
			&& this.currentKeyDownCode == this.keyTwo){
			this.currentKeyCombo = 2;
		}
		
		keyPressedIsDifferent = (this.lastKeyDownCode != this.currentKeyDownCode);
		//Check if user is switching keys
	}
		
	this.onKeyDown = function(event){
	
		this.currentKeyDownCode = event.keyCode;
		if (this.currentKeyDownCode == this.keyOne) {
			this.isKeyOnePressed = true;
		}
		if (this.currentKeyDownCode == this.keyTwo) {
			this.isKeyTwoPressed = true;
		}
	
		this.lastKeyDownCode = this.currentKeyDownCode;
		this.currentKeyDownCode = event.keyCode;	
		//debug("1 pressed: " + this.isKeyOnePressed + " 2 pressed: " + this.isKeyTwoPressed);
		
	}

	this.update = function (dt) {
		timeSinceLastCombo += dt;
	    getImpulse = false;
	    if ((this.stage == 0 || this.stage == -1) && this.isKeyOnePressed && this.isKeyTwoPressed) {
	        this.stage = 0;
	    } else if (this.stage == 0 && this.isKeyOnePressed && !this.isKeyTwoPressed) {
	        this.stage = 1;
	    } else if (this.stage == 1 && this.isKeyOnePressed && !this.isKeyTwoPressed) {
	        this.stage = 1;
	    } else if (this.stage == 1 && this.isKeyOnePressed && this.isKeyTwoPressed) {
	        g_score++;
	        achivCounter++;
	        this.stage = 2;
	        getImpulse = true;
	    } else if (this.stage == 2 && this.isKeyOnePressed && this.isKeyTwoPressed) {
	        this.stage = 2;
	    } else if (this.stage == 2 && !this.isKeyOnePressed && this.isKeyTwoPressed) {
	        this.stage = 3;
	    } else if (this.stage == 3 && !this.isKeyOnePressed && this.isKeyTwoPressed) {
	        this.stage = 3;
	    } else if (this.stage == 3 && this.isKeyOnePressed && this.isKeyTwoPressed) {
	        g_score++;
	        achivCounter++;
	        this.stage = 0;
	        getImpulse = true;
	    } else {
	        this.stage = -1;
	        //this.impulse = 0;
	        this.isActive = false;
	    }
	    if (getImpulse) {
	        this.impulse +=  1 - this.impulse * 0.05; //+ (impulse * 0.002); //this.resetImpulse;			
			timeSinceLastCombo = 0;
	        this.isActive = true;
	    } else {
	        if (this.impulse > 0.1) {
	            this.impulse -= 5.5 * dt;// + Math.pow((this.impulse), 2) * 0.0005;
	            this.isActive = true;
	        } else {
	            this.isActive = false;
	            this.impulse = 0;
	        }
	    }

	    this.lastKeyCombo = this.currentKeyCombo;
	    this.wasActive = this.isActive;
	    g_speed = this.impulse;

	    if (achivCounter == (100 * (achivNext + 1))) {
	        switch (achivNext) {
	            case 0:
	                new Achievement().startupAchievement(g_ResourceManager.woodenFingersL,
                        g_ResourceManager.woodenFingersS, "       Wood fingers.");
	                achivNext++;
	                break;
	            case 1:
	                new Achievement().startupAchievement(g_ResourceManager.silverFingerL,
                        g_ResourceManager.silverFingerS, "       Silver fingers.");
	                achivNext++;
	                break;
	            case 2:
	                new Achievement().startupAchievement(g_ResourceManager.goldFingerL,
                        g_ResourceManager.goldFingerS, "        Gold fingers.");
	                break;
	            default:
	        }

	        achivCounter = 0;
	    }
	}
}