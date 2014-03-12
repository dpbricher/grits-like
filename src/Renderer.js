var Renderer	= Class.extend({
	cStage : null,
	cCtx : null,
	cImage : null,

	init : function(cStageRef, cImageRef) {
		this.cStage	= cStageRef;
		this.cCtx	= this.cStage.getContext("2d");
		this.cImage	= cImageRef;
	},

	draw : function() {
	}
});