function init() {

	// Set canvas size
	var gameArea = document.getElementById('demoCanvas');
	gameArea.width = window.innerWidth - 20;
	gameArea.height = window.innerHeight - 20;
	
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
		{src:"http://i.imgur.com/lahDLd0.png", id:"character"},
		{src:"config.json", id:"config"}
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
			obj_layer.addChild(character);
			break;
		case "config":
			config = event.result;
			console.log(config);
			break;
	}
}

// File upload complete
function handleQueueComplete(event) {
	console.log("preload complete");
	stage.update();
}