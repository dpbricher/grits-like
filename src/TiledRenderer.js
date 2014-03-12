var TiledRenderer	= Renderer.extend({
	draw : function(cData, x, y, fScaleX, fScaleY) {
		if (fScaleX == null) fScaleX	= 1.0;
		if (fScaleY == null) fScaleY	= 1.0;

		this.cCtx.drawImage(this.cImage, cData.x, cData.y, cData.w, cData.h, x, y, cData.w * fScaleX, cData.h * fScaleY);
	}
});