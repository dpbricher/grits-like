var AtlasRenderer	= Class.extend({
	cStage : null,
	cCtx : null,
	cAtlasImage : null,

	init : function(cStageRef, cAtlasRef) {
		this.cStage			= cStageRef;
		this.cCtx			= this.cStage.getContext("2d");
		this.cAtlasImage	= cAtlasRef;
	},

	draw : function(cData, x, y, scaleX = 1.0, scaleY = 1.0) {
		this.cCtx.drawImage(this.cAtlasImage, cData.x, cData.y, cData.w, cData.h, x, y, cData.w * scaleX, cData.h * scaleY);
	}
});