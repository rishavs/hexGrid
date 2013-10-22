var stage;

function init() {

	// create a new stage and point it at our canvas:
	stage = new createjs.Stage("demoCanvas");
	
	stage_canvas = document.getElementById("demoCanvas");
	stage_canvas.addEventListener("click", mouseLClick);
	
	// Load spritesheet
	spriteSheeet_img = new Image();
	spriteSheeet_img.src = "assets/sprites/steel_armor.png";
	spriteSheeet_img.onerror = handleImageError;

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

	// start playing the first sequence:
	testSeq.gotoAndPlay("ss_idle");     
	
	
	testSeq.name = "Knight01";
	testSeq.speed = 1;
	testSeq.direction = 90;
	testSeq.vX = 1;
	testSeq.vY = 1;
	testSeq.x = 16;
	testSeq.y = 32;
	
	stage.addChild(testSeq);
	
	createjs.Ticker.setFPS(4);
	createjs.Ticker.addEventListener("tick", stage);
	
	// Show text on top of page
    logTextField = new createjs.Text("SRC coords are: " + testSeq.x + " & " + testSeq.y + ".", "14px Arial");
    logTextField.x = logTextField.y = 0;
    stage.addChild(logTextField);

    stage.update();
}

//called if there is an error loading the image (usually due to a 404)
function handleImageError(e) {
	console.log("Error Loading Image : " + e.target.src);
}

		
function tick() {
	
	console.log(testSeq.x);
    // Hit testing the screen width, otherwise our sprite would disappear
    if (testSeq.x >= screen_width - 16) {
        // We've reached the right side of our screen
        // We need to walk left now to go back to our initial position
        testSeq.direction = -90;
    }
 
    if (testSeq.x < 16) {
        // We've reached the left side of our screen
        // We need to walk right now
        testSeq.direction = 90;
    }
 
    // Moving the sprite based on the direction & the speed
    if (testSeq.direction == 90) {
        testSeq.x += testSeq.vX;
        testSeq.y += testSeq.vY;
    }
    else {
        testSeq.x -= testSeq.vX;
        testSeq.y -= testSeq.vY;
    }
 
    // update the stage:
    stage.update();
}

function mouseLClick(event, srcX, srcY) {
	var x = new Number();
	var y = new Number();
	var canvas = document.getElementById("demoCanvas");

	if (event.x != undefined && event.y != undefined)
	{
	  x = event.x;
	  y = event.y;
	}
	else // Firefox method to get the position
	{
	  x = event.clientX + document.body.scrollLeft +
		  document.documentElement.scrollLeft;
	  y = event.clientY + document.body.scrollTop +
		  document.documentElement.scrollTop;
	}

	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	debugText ("SRC coords are: " + x + " & " + y + ".          DST coords are: " + x + " & " + y + ".");
}

// Simple function to show a text label which tells the id of the hex over which mouse is placed
function debugText (textString) {
    logTextField.text = textString.toString();
    stage.update();
}