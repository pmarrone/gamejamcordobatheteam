/**
    A class to represent the level
    @author <a href="mailto:matthewcasperson@gmail.com">Matthew Casperson</a>
    @class
*/
function Level()
{
    this.blocks = new Array();
    this.powerups = new Object;
    this.blockWidth = 64;
    this.blockHeight = 48;

    /**
        Initialises this object
    */
    this.startupLevel = function(canvasWidth, canvasHeight)
    {
		var i = 0;
		var totalBlocks = 30;
		for (i=0;i<=totalBlocks;i++)
		{
			this.blocks[i] = 2;
		}

        this.powerups['1'] = 'Gem';
        this.powerups['6'] = 'Gem';
		this.powerups['8'] = 'Wall';
        this.powerups['10'] = 'Gem';
        //~ this.powerups['14'] = 'LevelEndPost';

        this.addBlocks(canvasWidth, canvasHeight);
        this.addPowerups(canvasWidth, canvasHeight);

        return this;
    }

    /**
        Adds the blocks to the screen by creating VisualGameObjects
    */
    this.addBlocks = function(canvasWidth, canvasHeight)
    {
        for (var x = 0; x < this.blocks.length; ++x)
        {
            for (var y = 0; y < this.blocks[x]; ++y)
            {
                new VisualGameObject().startupVisualGameObject(g_ResourceManager.block, x * this.blockWidth, canvasHeight - (y + 1) * this.blockHeight, 4);
            }
        }
    }

    this.addPowerups = function(canvasWidth, canvasHeight)
    {
        for (var x = 0; x < this.blocks.length; ++x)
        {
            if (this.powerups[x])
            {
                var xPosition = x * this.blockWidth + this.blockWidth / 2;
                var yPosition = canvasHeight - this.groundHeight(x);

                switch(this.powerups[x])
                 {
                    case 'Gem':
                        new Powerup().startupPowerup(10, g_ResourceManager.gem, xPosition - g_ResourceManager.gem.width / 2, yPosition - g_ResourceManager.gem.height, 4, 1, 1);
                        break;
					case 'Wall':
                        new Wall().startupWall(10, g_ResourceManager.wall, xPosition - g_ResourceManager.wall.width / 2, yPosition - g_ResourceManager.wall.height);
                        break;                        
                    case 'LevelEndPost':
                        new LevelEndPost().startupLevelEndPost(g_ResourceManager.portal, xPosition - g_ResourceManager.portal.width / 2 / 4, yPosition - g_ResourceManager.portal.height, 4);
                        break;
                 }
            }
        }
    }

    /**
        @return     The block under the specified x position
        @param x    The x position to test
    */
    this.currentBlock = function(x)
    {
        return parseInt( x / this.blockWidth);
    }
    
    /**
        @return             The hieght of the ground under the specified block
        @param blockIndex   The block number
    */
    this.groundHeight = function(blockIndex)
    {
        if (blockIndex < 0 || blockIndex > this.blocks.length) return 0;

        return this.blocks[blockIndex] *  this.blockHeight;
    }
}
