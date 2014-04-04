
function init() {
	
    //Create stage object - our root level container
    stage = new createjs.Stage("demoCanvas");
    
	// Create the game layers
	bg_layer = new createjs.Container();
	grid_layer = new createjs.Container();
	obj_layer = new createjs.Container();
	ui_layer = new createjs.Container();
	
	stage.addChild(bg_layer, grid_layer, obj_layer, ui_layer);

	loadAssets();
}

function loadAssets() {

	manifest = [
		{src:"http://i.imgur.com/a2HN9MT.jpg", id:"background"},
		{src:"http://i.imgur.com/lahDLd0.png", id:"character"}
	];
			
			
	preload = new createjs.LoadQueue();
	preload.addEventListener("fileload", handleFileLoaded);
	preload.addEventListener("error", handleFileError);
	preload.addEventListener("complete", handleQueueComplete);
	preload.setMaxConnections(5);
	
	preload.loadManifest(manifest);

}

// An error happened on a file
function handleFileError(event) {
	console.log(event.text + " on file with ID " + event.item.id + " and SRC " + event.item.src);
}

// File upload done
function handleFileLoaded(event) {
	console.log("File upload done on file with ID " + event.item.id + " and SRC " + event.item.src);
	
	switch (event.item.id) {
		case "background":
			background = new createjs.Shape(new createjs.Graphics().beginBitmapFill(event.result).drawRect(0,0,2560,1440));
			bg_layer.addChild(background);
			break;
		case "character":
			character = event.result
			// obj_layer.addChild(character);
			Knight_anim = defineSprite(character)
			Knight_anim.gotoAndPlay("se_idle");   
			
			Knight_anim.name = "Knight01";
			Knight_anim.speed = 1;
			Knight_anim.direction = 90;
			Knight_anim.vX = 1;
			Knight_anim.vY = 1;
			Knight_anim.x = 390;
			Knight_anim.y = 500;
			
			stage.addChild(Knight_anim);
			
			createjs.Ticker.setFPS(4);
			createjs.Ticker.addEventListener("tick", stage);

			stage.update();
			break;
	}
}

// File upload complete
function handleQueueComplete(event) {
	console.log("Preload of Queue complete");
	stage.update();
}

function defineSprite (spriteSheeet_img) {
	// Load spritesheet
	var data = {
		images: [spriteSheeet_img],
		frames: {width:128, height:128},
		animations: {
			// South east direction
			ww_idle: [0,3],
			ww_run:[4,11],
			ww_swing:[12,15],
			ww_block:[16,19],
			ww_death:[19,23],
			ww_quiver:[24,27],
			ww_shoot:[28,31],
			
			// North West direction
			nw_idle: [32,35],
			nw_run:[36,43],
			nw_swing:[44,47],
			nw_block:[48,51],
			nw_death:[52,55],
			nw_quiver:[56,59],
			nw_shoot:[60,63],
			
			// North Direction
			nn_idle: [64,67],
			nn_run:[68,75],
			nn_swing:[76,79],
			nn_block:[80,83],
			nn_death:[84,87],
			nn_quiver:[88,91],
			nn_shoot:[92,95],
			
			// North East direction
			ne_idle: [96,99],
			ne_run:[100,107],
			ne_swing:[108,111],
			ne_block:[112,115],
			ne_death:[116,119],
			ne_quiver:[120,123],
			ne_shoot:[124,127],
			
			// East direction
			ee_idle: [128,131],
			ee_run:[132,139],
			ee_swing:[140,143],
			ee_block:[144,147],
			ee_death:[148,151],
			ee_quiver:[152,155],
			ee_shoot:[156,159],
			
			// South East direction
			se_idle: [160,163],
			se_run:[164,171],
			se_swing:[172,175],
			se_block:[176,179],
			se_death:[179,183],
			se_quiver:[184,187],
			se_shoot:[188,191],
			
			// South direction
			ss_idle: [192,195],
			ss_run:[196,203],
			ss_swing:[204,207],
			ss_block:[208,211],
			ss_death:[212,215],
			ss_quiver:[216,219],
			ss_shoot:[220,223],
			
			// South West direction
			sw_idle: [224,227],
			sw_run:[228,235],
			sw_swing:[236,239],
			sw_block:[240,243],
			sw_death:[244,247],
			sw_quiver:[248,251],
			sw_shoot:[252,255]
						
		}
	};
	 
	var ss = new createjs.SpriteSheet(data);
	var testSeq = new createjs.Sprite(ss);
	
	return testSeq;
	// start playing the first sequence:

}