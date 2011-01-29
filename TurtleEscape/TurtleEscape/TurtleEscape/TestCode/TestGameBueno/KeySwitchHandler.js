function KeySwitchHandler(keyOne,keyTwo){
	this.keyOne = keyOne;
	this.keyTwo = keyTwo;
	
	this.lastKeyUpCode = 0;
    this.lastKeyDownCode = 0;	    
    this.currentKeyDownCode = 0;
	
	this.currentKeyCombo = 0;
	this.lastKeyCombo = 0;
	
     
	this.impulse = 0;
	this.resetImpulse = 20;
	this.currentKeyTime;
	
	//User is switching keys on time
	this.isActive = false;
	this.wasActive = false;
	 
	this.onKeyUp = function (event){
		this.lastKeyUpCode = event.keyCode;
	}
	
	this.onKeyDown = function(event){
		this.lastKeyDownCode = this.currentKeyDownCode;
		this.currentKeyDownCode = event.keyCode;
		
		if (this.lastKeyDownCode == this.keyTwo 
			&& this.currentKeyDownCode == this.keyOne) {
			this.currentKeyCombo = 1;
		}
			
		if (this.lastKeyDownCode == this.keyOne 
			&& this.currentKeyDownCode == this.keyTwo){
			this.currentKeyCombo = 2;
		}
		
		keyPressedIsDifferent = (this.lastKeyDownCode != this.currentKeyDownCode);
		//Check if user is switching keys
						
	}
	
	this.update = function()
	{
		if (this.currentKeyCombo != this.lastKeyCombo) {
			this.impulse = this.resetImpulse;
			this.isActive = true;
		} 
		this.lastKeyCombo = this.currentKeyCombo;
	
		this.wasActive = this.isActive;
		if ( this.impulse > 0.1 ){			
			this.impulse -= this.impulse / 10;
			this.isActive = true;
		} else {
			this.isActive = false;
			this.impulse = 0;
		}
	}
}