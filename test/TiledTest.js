var TiledTest	= Class.extend({
	cAtlasImage : null,
	cTiledParser : null,
	// sInfoJson : null,

	init : function() {
		var cThis	= this;

		xhr	= new XMLHttpRequest();
		xhr.open("GET", "data/map1.json", false);
		xhr.send();

		this.cTiledParser	= new TiledParser();
		this.cTiledParser.parse(xhr.responseText);
		// sInfoJson	= xhr.responseText;

		this.cAtlasImage	= new Image();
		this.cAtlasImage.onload	= function() {
			cThis.onAssetsLoaded();
		}
		this.cAtlasImage.src	= "images/" + this.cTiledParser.getImagePath();
	},

	onAssetsLoaded : function() {
		// console.log("cAtlasImage = " , cAtlasImage);
		// console.log("sInfoJson = " , sInfoJson);

		// for (var i = 200; i <= 250; ++i)
		// {
		// 	this.cTiledParser.getTileAtIndex(i);
		// }

		this.cTiledParser.getTilesInArea(
			new Rect(
				0,
				0,
				5 * this.cTiledParser.cTileDim.x,
				5 * this.cTiledParser.cTileDim.y
			)
		);

		// alert("test complete!");
	}
});