var config = {};
var stage;
var mapData = {};
var hexList = {};
var spriteImg;
var spriteAnimation;
var spriteData;
var entitiesDef; // the entities definitions taken from the data files
var entitiesData = {}; // the super global object where all the entity definition is stored. this of it as the major dictionary or monsterpedia. This object will likely remain server side.
var sceneData; // the second super object where all the map objects are stored. this object will likely remain in both server and client side and will be synced with every cycle.


/*Game steps:
1. define game logic & entities
2. define scene data
3. upload assets
4. render/populate scene data
*/


function init() {

	// Set canvas size
	var gameArea = document.getElementById('demoCanvas');
	// gameArea.width = window.innerWidth-2;
	// gameArea.height = window.innerHeight - 50;	
	gameArea.width = 1898;
	gameArea.height = 1050;

    //Create stage object - our root level container
    stage = new createjs.Stage("demoCanvas");
	//Set basic ticker
	createjs.Ticker.setFPS(4);
	createjs.Ticker.addEventListener("tick", tick);
	
	// Turn on mouseover support
    stage.enableMouseOver();  

		// Create the game layers
	bg_layer = new createjs.Container();
	grid_layer = new createjs.Container();
	obj_layer = new createjs.Container();
	archi_layer = new createjs.Container();
	ui_layer = new createjs.Container();
	
	stage.addChild(bg_layer, grid_layer, obj_layer, ui_layer);
	
	// Show text on top of page
    logTextField = new createjs.Text("Log text gets shown here", "14px Arial", "#ff7700");
    logTextField.x = logTextField.y = 0;
    ui_layer.addChild(logTextField);

	stage.update();

	loadAssets();
	
}

function loadAssets() {

	manifest = [
		{src:"config.json", id:"configJson"},
		{src:"logic/data/entities.json", id:"entitiesJson"},
		{src:"/assets/maps/grassland/grassland.txt", id:"mapData"},
		{src:"/assets/maps/grassland/grassland.jpg", id:"bgImg"},
		{src:"/assets/maps/grassland/objects.json", id:"mapObjectsJson"},
		{src:"/assets/sprites/knight.png", id:"spriteSheet"},
		{src:"/assets/sprites/spriteData.json", id:"spriteData"}
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
		case "configJson":
			config = event.result;
			break;
			
		case "mapData":
			mapData = readTextFileToArray(event.result);
			break;
			
		case "bgImg":
			bg = new createjs.Shape(new createjs.Graphics().beginBitmapFill(event.result).drawRect(0,0,1920,1080));
			bg_layer.addChild(bg);
			break;
			
		case "spriteSheet":
			spriteImg = event.result
			break;
			
		case "spriteData":
			spriteData = event.result;
			break;		
			
		case "entitiesJson":
			entitiesDef = event.result;
			break;

		case "mapObjectsJson":
			sceneData = event.result;
			break;
			

	}
}

// File upload complete
function handleQueueComplete(event) {
	console.log("Preload of Queue complete");

	defineSceneData();
	
	createHexGrid();
	populateSceneData();

	testAnimFunc();

}

function readTextFileToArray(txtFile) {
	textFileInArray = txtFile.split("\n");
	return textFileInArray;
}

function validateMapData() {


}

function createHexGrid () {

	// calculate hex width and height. We will use these values to offset neighbouring hexes
	var mapHexWidth = Math.sqrt(3)/2 * 2 * config.hex.mapHexSize;
	var mapHexHeight = 3/4 * 2 * config.hex.mapHexSize;
	
	for (var i=0;i<mapData.length;i++) {                      // iterate over total number of hex rows
		// remove the "-" character representing the offset from the map data
		mapData[i] = mapData[i].replace(/-/g,"");
		
		for (var j=0;j<mapData[i].length;j++) {                 // iterate over each hex to be created in a single row.
			var hexY = config.grid.mapStartY + i * mapHexHeight;

			if (i%2 == 0) {
				var hexX = config.grid.mapStartX + j * mapHexWidth;
			}
			else {
				var hexX = config.grid.mapStartX + j * mapHexWidth + 1/2* mapHexWidth;
			}
			createHex (hexX, hexY, config.hex.mapHexSize, i, j, mapData[i][j]);
		}       
	}

}

function createHex (x,y,size, iterI, iterJ, type) {

    var hex = new createjs.Shape();
	// the reason why we do the check here instead of the createHexMap function is that we still want to define the hex, just not show  it
	if (type == "O") {
		hex.graphics.beginStroke("#aaa").beginLinearGradientFill(["#eee","#fafafa"], [0, 1], 0, y-20, 0, y+30).drawPolyStar(x,y,size-config.hex.mapHexGap,6,0,30);
		hex.alpha=0.2; //can be used to set alpha. optional
			
		// add events for mouse hover on any hex
		hex.addEventListener("mouseover", mouseOverHex);
		hex.addEventListener("mouseout", mouseOutHex);
	}
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

    grid_layer.addChild(hex);
	
}

function mouseOverHex(event) {
    debugText ("MouseOver hex id is: (" + event.target.id + "). The Stage Index of the hex is [" + grid_layer.getChildIndex(event.target) + "]. The position is: " + event.target.posX + "x" + event.target.posY +"y");
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

// Update the stage
function tick(event) {
    stage.update();
}

// create the loaded entities. entities to have anim data defined for them
function defineEntity(entityType) {
	// add the entity info the entitiesData global object
	var tempEnitityObj = {};   // using temp object to act as buffer while entering into the global object
	// add the animation to the relevant entity in the entitiesData object
	spriteAnim = defineSprite (spriteImg, spriteData);
	tempEnitityObj['animation'] = spriteAnim;
	entitiesData[entityType] = tempEnitityObj;

}

function defineSprite (spriteSheeet_img, SpriteSheet_data) {
	var animData = SpriteSheet_data;
	animData.images = [spriteSheeet_img];
	animData.frames = SpriteSheet_data.frames;
	animData.animations = SpriteSheet_data.animations;
	
	var ss = new createjs.SpriteSheet(animData);
	var animSeq = new createjs.Sprite(ss);
	
	// console.log(animSeq);
	
	return animSeq;
}

function defineSceneData () {

	// defining creatures
	// iterate through the map Objects
	for (var i=0;i<sceneData.creatures.length;i++) { 
		defineEntity(sceneData.creatures[i].type);
	}
	
	// defining artefacts

}

function populateSceneData () {
// may need to merge the define and place scene data later on as they utilize the same loop twice.
// keeping it separate for now as it logically feels cleaner to me atm

	for (var i=0;i<sceneData.creatures.length;i++) { 

		var tempAnimObj = entitiesData[sceneData.creatures[i].type].animation;
		
		tempAnimObj.gotoAndPlay("se_idle");   
		
		tempAnimObj.name = sceneData.creatures[i].id;

		// position offsets to account for sprite size. have to update it later so that the values can be dynamically calculated based on frame size
		tempAnimObj.regX = 64;
		tempAnimObj.regY = 0;

		tempAnimObj.x = hexList[sceneData.creatures[i].position].posX;
		tempAnimObj.y = hexList[sceneData.creatures[i].position].posY;
		
		obj_layer.addChild(tempAnimObj);
		stage.update();
	}
}

function getHexCoords (hexId) {
	// takes hex isoCoords and gives back pixel coords to the centre of the hex
	return [hexList[hexId].posX, hexList[hexId].posY];
}


