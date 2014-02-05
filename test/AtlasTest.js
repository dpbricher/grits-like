/**
 * Test for both AtlasParser and AtlasRenderer
 */
var AtlasTest	= Class.extend({
	cStage : null,
	cAtlasImage : null,

	sInfoJson : null,

	init : function() {
		this.cStage			= document.getElementById("stage");

		this.cStage.width	= 1024;
		this.cStage.height	= 1024;

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
		var cParser		= new AtlasParser(this.cAtlasImage);
		cParser.parse(this.sInfoJson);

		var cRenderer	= new AtlasRenderer(this.cStage, this.cAtlasImage);

		// draw out some anims as a test here
		var cData;
		var sNextNum;

		var nextX	= 0;
		var nextY	= 0;

		var scaleX	= 0.9;
		var scaleY	= 0.9;

		for (var i = 0; true; ++i)
		{
			sNextNum	= i.toString();
			if (sNextNum.length < 2) sNextNum	= "0" + sNextNum;

			cData	= cParser.getImageData("walk_up_00" + sNextNum + ".png");

			if (cData == null) break;

			cRenderer.draw(cData, nextX, nextY, scaleX, scaleY);

			nextX	+= cData.w * scaleX;

			if (nextX > this.cStage.width)
			{
				nextX	= 0;
				nextY	+= cData.h * scaleY;
			}
		}
	}
});