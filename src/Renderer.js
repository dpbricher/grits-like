var Renderer	= Class.extend({
	cStage : null,
	cCtx : null,
	cImage : null,

	init : function(cStageRef, cImageRef) {
		this.cStage	= cStageRef;
		this.cCtx	= this.cStage.getContext("2d");
		this.cImage	= cImageRef;
	},

	draw : function(cData, x, y, scaleX, scaleY) {
		if (scaleX == null) scaleX	= 1.0;
		if (scaleY == null) scaleY	= 1.0;

		this.cCtx.drawImage(this.cImage, cData.x, cData.y, cData.w, cData.h, x, y, cData.w * scaleX, cData.h * scaleY);
	}
});