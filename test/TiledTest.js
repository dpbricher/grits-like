var TiledTest	= Class.extend({
	cAtlasImage : null,
	sInfoJson : null,

	init : function() {
		var cThis	= this;

		xhr	= new XMLHttpRequest();
		xhr.open("GET", "data/map1.json", false);
		xhr.send();

		sInfoJson	= xhr.responseText;

		cAtlasImage	= new Image();
		cAtlasImage.onload	= function() {
			cThis.onAssetsLoaded();
		}
		cAtlasImage.src	= "images/grits_master.png";
	},

	onAssetsLoaded : function() {
		console.log("cAtlasImage = " , cAtlasImage);
		// console.log("sInfoJson = " , sInfoJson);

		var parser	= new TiledParser();
		parser.parse(sInfoJson);

		console.log("set index = " + parser.getImagePath(0));

		// alert("test complete!");
	}
});