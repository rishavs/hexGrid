var stage;

function init() {

	// create a new stage and point it at our canvas:
	stage = new createjs.Stage("demoCanvas");

	var data = {
		images: ["assets/sprites/steel_armor.png"],
		frames: {width:128, height:128},
		animations: {
			ww_idle: [0,3,true],
			ww_run:[4,11, true],
			ww_swing:[12,15,true],
			ww_block:[16,19,true],
			ww_death:[19,23,true],
			ww_quiver:[24,27,true],
			ww_shoot:[28,31,true]
		}
	};
	 
	var ss = new createjs.SpriteSheet(data);
	var ww_idle_animation = new createjs.BitmapAnimation(ss);
	var ww_run_animation = new createjs.BitmapAnimation(ss);
	var ww_swing_animation = new createjs.BitmapAnimation(ss);
	var ww_block_animation = new createjs.BitmapAnimation(ss);
	var ww_death_animation = new createjs.BitmapAnimation(ss);
	var ww_quiver_animation = new createjs.BitmapAnimation(ss);
	var ww_shoot_animation = new createjs.BitmapAnimation(ss);



	ww_idle_animation.x = 0;
	ww_idle_animation.y = 0;
	
	ww_run_animation.x = 128;
	ww_run_animation.y = 0;
	
	ww_swing_animation.x = 256;
	ww_swing_animation.y = 0;
	
	ww_block_animation.x = 384;
	ww_block_animation.y = 0;	
	
	ww_death_animation.x = 512;
	ww_death_animation.y = 0;	
	
	ww_quiver_animation.x = 640;
	ww_quiver_animation.y = 0;

	ww_shoot_animation.x = 768;
	ww_shoot_animation.y = 0;
	
	
	stage.addChild(ww_idle_animation);
    ww_idle_animation.gotoAndPlay("ww_idle");
	
		stage.addChild(ww_run_animation);
    ww_run_animation.gotoAndPlay("ww_run");
	
		stage.addChild(ww_swing_animation);
    ww_swing_animation.gotoAndPlay("ww_swing");
	
		stage.addChild(ww_block_animation);
    ww_block_animation.gotoAndPlay("ww_block");
	
		stage.addChild(ww_death_animation);
    ww_death_animation.gotoAndPlay("ww_death");
	
		stage.addChild(ww_quiver_animation);
    ww_quiver_animation.gotoAndPlay("ww_quiver");
	
		stage.addChild(ww_shoot_animation);
    ww_shoot_animation.gotoAndPlay("ww_shoot");

	 
	createjs.Ticker.setFPS(4);
	createjs.Ticker.addEventListener("tick", stage);
}
