/*
 * AppController.j
 * NewApplication
 *
 * Created by You on July 5, 2009.
 * Copyright 2009, Your Company All rights reserved.
 */

@import <Foundation/CPObject.j>


@implementation AppController : CPObject
{
	CPWindow window;
	CPView contentView;
	CPImageView background;
	CPTimer timer;
	CPInteger currentDisplay;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
    currentDisplay = 0;
	window = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
    contentView = [window contentView];
		
	background = [[CPImageView alloc] initWithFrame:CGRectMake(0, 0, 480, 200)];
	[background setImage:[[CPImage alloc] initWithContentsOfFile:"Resources/item1.png"]];
	[contentView addSubview:background];
	
	[self createButton:CGRectMake(20, 160, 25, 20) title:"1"];
	[self createButton:CGRectMake(50, 160, 25, 20) title:"2"];
	[self createButton:CGRectMake(80, 160, 25, 20) title:"3"];
	
	timer = [CPTimer scheduledTimerWithTimeInterval:5 target:self selector:@selector(switchImage:) userInfo:null repeats:YES];
	
	[window orderFront:self];
}

- (void)createButton:(CGRect)aRect title:(CPString)aTitle
{
	var button = [[CPButton alloc] initWithFrame:aRect];
	[button setTitle:aTitle];
	[button setTarget:self];
	[button setAction:@selector(buttonClicked:)];
	[contentView addSubview:button];
}

- (void)buttonClicked:(id)sender
{
	if ([sender title]=="1")
	{
		currentDisplay = 0;
		[self setImage:0];
	}
	else if ([sender title]=="2")
	{
		currentDisplay = 1;
		[self setImage:1];
	}
	else if ([sender title]=="3")
	{
		currentDisplay = 2;
		[self setImage:2];
	}
}

-(void)switchImage:(CPTimer)aTimer
{
	++currentDisplay;
	currentDisplay%=3;
	[self setImage:currentDisplay];		
}

-(void)setImage:(CPInteger)aImage
{
	if (aImage==0)
		[background setImage:[[CPImage alloc] initWithContentsOfFile:"Resources/item1.png"]];
	else if (aImage==1)
		[background setImage:[[CPImage alloc] initWithContentsOfFile:"Resources/item2.png"]];
	else if (aImage==2)
		[background setImage:[[CPImage alloc] initWithContentsOfFile:"Resources/item3.png"]];
}

@end
