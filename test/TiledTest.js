var TiledTest	= Class.extend({
	cAtlasImage : null,
	cInfoJson : null,

	init : function() {
		var cThis	= this;

		xhr	= XMLHttpRequest();
		xhr.open("GET", "data/map1.json", false);
		xhr.send();

		cInfoJson	= JSON.parse(xhr.responseText);

		cAtlasImage	= new Image();
		cAtlasImage.onload	= function() {
			cThis.onAssetsLoaded();
		}
		cAtlasImage.src	= "images/grits_master.png";
	},

	onAssetsLoaded : function() {
		console.log("cAtlasImage = " , cAtlasImage);
		console.log("cInfoJson = " , cInfoJson);

		alert("test complete!");
	}
});