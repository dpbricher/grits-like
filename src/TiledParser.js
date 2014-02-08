/**
 * Class for parsing a data json produced by the Tiled appplication.
 * May not be fundamentally correct as I'm not entirely sure how I should be interpreting the data,
 * but should at least function correctly on the data json that I am parsing for this game
 */
var TiledParser	= Class.extend({
	cTiledData : null,

	// Vec2 dimensions of each tile
	cTileDim : null,

	// Vec2 number of rows and columns of tiles
	cTileRC : null,

	aTileSets : null,
	aTileLayers : null,
	aObjectLayers : null,

	iCurrentSet : 0,

	/**
	 * Note : all layers have the same values for the following properties:
     *	"x":0
     *  "y":0
     *  "width":100
	 *	"height":100
     *  "opacity":1
     *  "visible":true
     * I'm also not currently using these values, so not bothering to parse them right now
     */
	parse : function(sDataJson) {
		this.cTiledData		= JSON.parse(sDataJson);

		this.cTileDim		= new Vec2(this.cTiledData.tilewidth, this.cTiledData.tileheight);
		this.cTileRC		= new Vec2(this.cTiledData.width, this.cTiledData.height);

		this.aTileSets		= this.cTiledData.tilesets;

		this.aTileLayers	= [];
		this.aObjectLayers	= [];

		var cLayer;

		for (var i in this.cTiledData.layers)
		{
			cLayer	= this.cTiledData.layers[i];

			switch (cLayer.type)
			{
				case "tilelayer":
					this.aTileLayers.push(cLayer);
					break;

				case "objectgroup":
					this.aObjectLayers.push(cLayer);
					break;

				default:
					console.log("Unknown layer type found in data json : " + cLayer.type);
			}
		}
	},

	getImagePath : function() {
		return this.getCurrentSet().image;
	},

	getTileDataAt : function(i, j) {
		var iIndex	= i + (j * (this.cTileRC.x));

		return this.getTileDataAtIndex(iIndex);
	},

	getTileDataAtIndex : function(iIndex) {
		aData	= [];

		for (var i in this.aTileLayers)
		{
			if (this.aTileLayers[i].data[iIndex] != 0)
			{
				aData.push(
					this.getTileSrcData(
						this.aTileLayers[i].data[iIndex] - this.getCurrentSet().firstgid
					)
				);
			}
		}

		return aData;
	},

	getTileSrcData : function(iTileId) {
		var iSrcRows	= this.getCurrentSet().imagewidth / this.cTileDim.x;

		return new Rect(
			(iTileId % iSrcRows) * this.cTileDim.x,
			Math.floor(iTileId / iSrcRows) * this.cTileDim.y,
			this.cTileDim.x,
			this.cTileDim.y
		);
	},
/*
	getTileAtPos : function(x, y) {
		// find index of tile at this position
		var iIndex	=
			Math.floor(x / this.cTileDim.x) +
			Math.floor(y / this.cTileDim.y) * cTileRC.x;

		// then return data for that index
		return this.getTileAtIndex(iIndex);
	},
*/
	getTilesInArea : function(cRect) {
		// first find all tiles within the given area
		// flooring the area's left and top values and ceil-ing its right and bottom to the nearest multiple of tile width and height should do that
		var cFullArea		= new Rect();
		cFullArea.x			= Math.floor(cRect.x / this.cTileDim.x);
		cFullArea.y			= Math.floor(cRect.y / this.cTileDim.y);
		cFullArea.w			= Math.ceil(cRect.right() / this.cTileDim.x) - cFullArea.x;
		cFullArea.h			= Math.ceil(cRect.bottom() / this.cTileDim.y) - cFullArea.y;

		// console.log("this.cTileDim = " , this.cTileDim);
		
		// console.log("cRect = " , cRect);
		// console.log("cFullArea = " , cFullArea);

		var aData	= [];

		// next build an array of tile data for all the given indexes that this area covers
		for (var i = cFullArea.left(); i <= cFullArea.right(); ++i)
		{
			for (var j = cFullArea.top(); j <= cFullArea.bottom(); ++j)
			{
				aData	= aData.concat(this.getTileDataAt(i, j));
			}
		}

		return aData;
	},

	getCurrentSet : function() {
		return this.aTileSets[this.iCurrentSet];
	},

	setCurrentIndex : function (iIndex) {
		this.iCurrentSet	= iIndex;
	}
});