var stage;
var hexList = {};


//Load main config
var config = loadJSON('config.json');

// calculate hex width and height. We will use these values to offset neighbouring hexes
var mapHexWidth = Math.sqrt(3)/2 * 2 * config.hex.mapHexSize;
var mapHexHeight = 3/4 * 2 * config.hex.mapHexSize;

function init() {

	// Set canvas size
	var gameArea = document.getElementById('demoCanvas');
	gameArea.width = window.innerWidth-2;
	gameArea.height = window.innerHeight - 50;
	
	//Create background object - separated from stage so that it doest needs to update
	background_stage = new createjs.Stage("demoCanvas");
	
    //Create stage object - our root level container
    stage = new createjs.Stage("demoCanvas");
	
	// Turn on mouseover support
    stage.enableMouseOver();  
	
	//Set basic ticker
	createjs.Ticker.setFPS(4);
	createjs.Ticker.addEventListener("tick", tick);
			
	// Create the game layers
	bg_layer = new createjs.Container();
	grid_layer = new createjs.Container();
	obj_layer = new createjs.Container();
	archi_layer = new createjs.Container();
	ui_layer = new createjs.Container();
	
	stage.addChild(bg_layer, grid_layer, obj_layer, ui_layer);
	
	// Turn on mouseover support
    stage.enableMouseOver();  
    
    // Call the function to create the hex grid
    createMap(config.grid.mapWidthHexNo, config.grid.mapHeightHexNo);
    
    // Show text on top of page
    logTextField = new createjs.Text("Log text gets shown here", "14px Arial", "#ff7700");
    logTextField.x = logTextField.y = 0;
    stage.addChild(logTextField);

    stage.update();
	loadAssets();
	
	//---------------------------
	//Create the temp UI
	
	document.getElementById("M1").onclick = helloAlert;
	document.getElementById("M2").onclick = helloAlert;
	document.getElementById("M3").onclick = helloAlert;
	document.getElementById("M4").onclick = function () { alert('hello!'); };
	
	document.getElementById("F1").onclick = function () { alert('hello!'); };
	document.getElementById("F2").onclick = function () { alert('hello!'); };
	document.getElementById("F3").onclick = function () { alert('hello!'); };
	document.getElementById("F4").onclick = function () { alert('hello!'); };
	
	document.getElementById("A1").onclick = function () { alert('hello!'); };
	document.getElementById("A2").onclick = function () { alert('hello!'); };
	document.getElementById("A3").onclick = function () { alert('hello!'); };
	document.getElementById("A4").onclick = function () { alert('hello!'); };
	
	document.getElementById("S1").onclick = function () { alert('hello!'); };
	document.getElementById("S2").onclick = function () { alert('hello!'); };
	document.getElementById("S3").onclick = function () { alert('hello!'); };
	document.getElementById("S4").onclick = function () { alert('hello!'); };
	
	document.getElementById("F1").onclick = function () { alert('hello!'); };
	document.getElementById("F2").onclick = function () { alert('hello!'); };
	document.getElementById("F3").onclick = function () { alert('hello!'); };
	document.getElementById("F4").onclick = function () { alert('hello!'); };

}

function loadAssets() {

	manifest = [
		{src:"/assets/maps/test/elfland.jpg", id:"background"},
		{src:"/assets/sprites/clothes.png", id:"character"}
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
			bg = new createjs.Shape(new createjs.Graphics().beginBitmapFill(event.result).drawRect(0,0,1920,1080));
			bg_layer.addChild(bg);
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
			Knight_anim.x = 397;
			Knight_anim.y = 285;
			
			stage.addChild(Knight_anim);
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


function createMap (mapSizeX, mapSizeY) {
    for (var i=0;i<config.grid.mapHeightHexNo;i++) {                      // iterate over total number of hex rows
        for (var j=0;j<config.grid.mapWidthHexNo;j++) {                 // iterate over each hex to be created in a single row.
        
            var hexY = config.grid.mapStartY + i * mapHexHeight;
            
            //remember, each alternate row of hexes is offset in the x axis by half the width of the hex
            // so just add an extra half of the width of the hex, to the x axis displacement of rows 1, 3, 5 etc...
            if (i%2 == 0) {
                var hexX = config.grid.mapStartX + j * mapHexWidth;
            }
            else {
                var hexX = config.grid.mapStartX + j * mapHexWidth + 1/2* mapHexWidth;
            }
            
            //call the function to create individual hexes
            createHex (hexX, hexY, config.hex.mapHexSize, i, j);
           
        }       
    }
    
}

function createHex (x,y,size, iterI, iterJ) {

    var hex = new createjs.Shape();
    hex.graphics.beginStroke("#aaa").beginLinearGradientFill(["#eee","#fafafa"], [0, 1], 0, y-20, 0, y+30).drawPolyStar(x,y,size-config.hex.mapHexGap,6,0,30);
	hex.alpha=1; //can be used to set alpha. optional
	
	// calculate and save the axial coordinates
	var cX = iterJ - (iterI - (iterI&1)) / 2;
    var cZ = iterI;
    var cY = -1*(cX+cZ);
    
	hex.id = cX + "x" + cY + "y" + cZ + "z";
    hex.posX = x;
    hex.posY = y;
    // add the hex to our hexList with the id as identifier
    hexList[hex.id] = hex;
    // add events for mouse hover on any hex
    hex.addEventListener("mouseover", mouseOverHex);
    hex.addEventListener("mouseout", mouseOutHex);
    
    stage.addChild(hex);
}

function mouseOverHex(event) {
    debugText ("MouseOver hex id is: (" + event.target.id + "). The Stage Index of the hex is [" + stage.getChildIndex(event.target) + "]. The position is: " + event.target.posX + "x" + event.target.posY +"y");
	event.target.graphics.clear().beginStroke("#888").beginLinearGradientFill(["#fafafa","#fafafa"], [0, 1], 0, event.target.posY-20, 0, event.target.posY+30).drawPolyStar(event.target.posX,event.target.posY,config.hex.mapHexSize - config.hex.mapHexGap - 1,6,0,30);
    stage.update();
}

function mouseOutHex(event) {
    event.target.graphics.clear().beginStroke("#aaa").beginLinearGradientFill(["#eee","#fafafa"], [0, 1], 0, event.target.posY-20, 0, event.target.posY+30).drawPolyStar(event.target.posX,event.target.posY,config.hex.mapHexSize - config.hex.mapHexGap,6,0,30);
    stage.update();
}

// Simple function to show a text label which tells the id of the hex over which mouse is placed
function debugText (textString) {
    logTextField.text = textString.toString();
    stage.update();
}

//Stupid function
function helloAlert() { 
	alert('hello!'); 
}

// Update the stage
function tick(event) {
    stage.update();
}

function loadJSON(path) {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': path,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}