var TiledTest	= Class.extend({
	cStage : null,
	cAtlasImage : null,
	cTiledParser : null,

	init : function() {
		var cThis	= this;
		this.cStage	= document.getElementById("stage");

		xhr	= new XMLHttpRequest();
		xhr.open("GET", "data/map1.json", false);
		xhr.send();

		this.cTiledParser	= new TiledParser();
		this.cTiledParser.parse(xhr.responseText);

		this.cAtlasImage	= new Image();
		this.cAtlasImage.onload	= function() {
			cThis.onAssetsLoaded();
		}
		this.cAtlasImage.src	= "images/" + this.cTiledParser.getImagePath();
	},

	onAssetsLoaded : function() {
		var cScale	= new Vec2(0.1, 0.1);

		this.cStage.width	= this.cTiledParser.cTileDim.x * this.cTiledParser.cTileRC.x * cScale.x;
		this.cStage.height	= this.cTiledParser.cTileDim.y * this.cTiledParser.cTileRC.y * cScale.y;
		this.cStage.style.backgroundColor	= "red";

		var ctx	= this.cStage.getContext("2d");

		for (var i = this.cTiledParser.cTileRC.x - 1; i >= 0; --i)
		{
			for (var j = this.cTiledParser.cTileRC.y - 1; j >= 0; --j)
			{
				var aData	= this.cTiledParser.getTileDataAt(i, j);

				for (var k = 0; k < aData.length; ++k)
				{
					var cSrcRect	= aData[k];

					ctx.drawImage(
						this.cAtlasImage,
						cSrcRect.x,
						cSrcRect.y,
						cSrcRect.w,
						cSrcRect.h,
						i * this.cTiledParser.cTileDim.x * cScale.x,
						j * this.cTiledParser.cTileDim.y * cScale.y,
						this.cTiledParser.cTileDim.x * cScale.x,
						this.cTiledParser.cTileDim.y * cScale.y
					);
				}
			}
		}
	}
});