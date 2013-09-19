var stage;

function init() {

	// create a new stage and point it at our canvas:
	stage = new createjs.Stage("demoCanvas");

	var data = {
		images: ["http://i.imgur.com/g5WtL7v.png"],
		frames: {width:256, height:256, count:8},
		animations: {
			run:[0,4, true]
		}
	};
	 
	var ss = new createjs.SpriteSheet(data);
	var animation = new createjs.BitmapAnimation(ss);



	animation.x = 100;
	animation.y = 100;
	
	stage.addChild(animation);
    animation.gotoAndPlay("run");
	 
	createjs.Ticker.setFPS(4);
	createjs.Ticker.addEventListener("tick", stage);
}
