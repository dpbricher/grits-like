var AtlasTest	= Class.extend({
	cStage : null,

	cAtlasImage : null,

	sInfoJson : null,

	init : function() {
		cStage			= document.getElementById("stage");

		cStage.width	= 1024;
		cStage.height	= 1024;

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

		// draw out some anims as a test here
		var cData;
		var sNextNum;
		var ctx		= cStage.getContext("2d");

		var nextX	= 0;
		var nextY	= 0;

		for (var i = 0; true; ++i)
		{
			sNextNum	= i.toString();
			if (sNextNum.length < 2) sNextNum	= "0" + sNextNum;

			cData	= cParser.getImageData("walk_up_00" + sNextNum + ".png");

			if (cData == null) break;

			ctx.drawImage(cParser.cAtlasImage, cData.x, cData.y, cData.w, cData.h, nextX, nextY, cData.w, cData.h);

			nextX	+= cData.w;

			if (nextX > cStage.width)
			{
				nextX	= 0;
				nextY	+= cData.h;
			}
		}
	}
});