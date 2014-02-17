var AtlasRenderer	= Renderer.extend({
	draw : function(cData, x, y, scaleX, scaleY) {
		if (scaleX == null) scaleX	= 1.0;
		if (scaleY == null) scaleY	= 1.0;

		this.cCtx.drawImage(
			this.cImage,
			cData.bounds.x,
			cData.bounds.y,
			cData.bounds.w,
			cData.bounds.h,
			x - cData.centre.x,
			y - cData.centre.y,
			cData.bounds.w * scaleX,
			cData.bounds.h * scaleY
		);
	}
});