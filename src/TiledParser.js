var TiledParser	= Class.extend({
	cTiledData : null,

	// Vec2 dimensions of each tile
	cTileDim : null,

	// Vec2 number of rows and colums of tiles
	cTileRC : null,

	aTileSets : null,

	init : function() {
		//
	},

	parse : function(sDataJson) {
		cTiledData	= JSON.parse(sDataJson);

		cTiledDim	= new Vec2(cTiledData.width, cTiledData.height);
		cTiledRC	= new Vec2(cTiledData.tilewidth, cTiledData.tileheight);

		aTileSets	= cTiledData.tilesets;
	},

	getImagePath : function(iSetIndex) {
		return aTileSets[iSetIndex].image;
	},

	getTileAt : function(iSetIndex, i, j) {
		//
	}
});