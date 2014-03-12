/**
 * Renderer that draws an entire Tiled set to a reference canvas, so that it can then draw from that to its render target
 */
var CachedTiledRenderer	= Renderer.extend({
	init : function(cStageRef) {
		this._super(cStageRef, document.createElement("canvas"));
	},

	cacheImage : function(cTiledParser, cAtlasImage) {
		this.cImage.width	= cTiledParser.getDim().x;
		this.cImage.height	= cTiledParser.getDim().y;

		var cRenderer		= new TiledRenderer(this.cImage, cAtlasImage);

		// draw map to cache canvas
		for (var i = cTiledParser.cTileRC.x - 1; i >= 0; --i)
		{
			for (var j = cTiledParser.cTileRC.y - 1; j >= 0; --j)
			{
				var aData	= cTiledParser.getTileDataAt(i, j);

				for (var k = 0; k < aData.length; ++k)
				{
					cRenderer.draw(aData[k], i * cTiledParser.cTileDim.x, j * cTiledParser.cTileDim.y, 1.0, 1.0);
				}
			}
		}
	},

	getDim : function() {
		return new b2.Vec2(this.cImage.width, this.cImage.height);
	},

	/**
	 * Draws the specified source area from the full map image to the render canvas
	 * Requires cacheImage to have been called once first
	 */
	draw : function(cAreaRect, x, y, fScaleX, fScaleY) {
		if (x == null) x = 0;
		if (y == null) y = 0;
		if (fScaleX == null) fScaleX	= 1.0;
		if (fScaleY == null) fScaleY	= 1.0;

		this.cCtx.drawImage(
			this.cImage,
			cAreaRect.x,
			cAreaRect.y,
			cAreaRect.w,
			cAreaRect.h,
			x,
			y,
			cAreaRect.w * fScaleX,
			cAreaRect.h * fScaleY
		);
	}
});