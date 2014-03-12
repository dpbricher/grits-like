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
		var cScale			= new Vec2(0.1, 0.1);

		var cCachedRenderer	= new CachedTiledRenderer(this.cStage);
		cCachedRenderer.cacheImage(this.cTiledParser, this.cAtlasImage);

		var cMapDim			= cCachedRenderer.getDim();

		this.cStage.width	= cMapDim.x * cScale.x;
		this.cStage.height	= cMapDim.y * cScale.y;
		this.cStage.style.backgroundColor	= "red";

		cCachedRenderer.draw(new Rect(0, 0, cMapDim.x, cMapDim.y), 0, 0, cScale.x, cScale.y);

		// draw collision areas
		var ctx				= this.cStage.getContext("2d");
		ctx.globalAlpha		= 0.3;

		var cCollisionData	= this.cTiledParser.cObjectLayers["collision"];

		if (cCollisionData != null)
		{
			for (var j in cCollisionData.objects)
			{
				var cData		= cCollisionData.objects[j];

				ctx.fillStyle	= (cData.properties.collisionFlags == null) ? "green" : "blue";
				ctx.fillRect(cData.x * cScale.x, cData.y * cScale.y, cData.width * cScale.x, cData.height * cScale.y);
			}
		}

		// draw markers showing positions of environment items
		var cEnvData	= this.cTiledParser.cObjectLayers["environment"];

		if (cEnvData != null)
		{
			ctx.fillStyle	= "red";

			for (var i in cEnvData.objects)
			{
				var cData	= cEnvData.objects[i];

				ctx.fillRect(cData.x * cScale.x, cData.y * cScale.y, cData.width * cScale.x, cData.height * cScale.y);
			}
		}

		ctx.globalAlpha	= 1.0;
	}
});