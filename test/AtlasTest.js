var AtlasTest	= Class.extend({
	cAtlasImage : null,

	sInfoJson : null,

	init : function() {
		var cThis		= this;
		var cXhr 		= new XMLHttpRequest();
		cXhr.open("GET", "../bin/data/grits_effects.json", true);
		cXhr.onload 	= function() {
			cThis.onInfoLoaded(this);
		};
		cXhr.send();
	},

	onInfoLoaded : function(cXhr) {
		var cThis				= this;

		this.sInfoJson			= cXhr.responseText;

		this.cAtlasImage		= new Image();
		this.cAtlasImage.onload = function() {
			cThis.onAtlasLoaded();
		};
		this.cAtlasImage.src	= "../bin/images/grits_effects.png";
	},

	onAtlasLoaded : function() {
		var cParser	= new AtlasParser(this.cAtlasImage);
		cParser.parse(this.sInfoJson);

		alert("test complete!");
	}
});