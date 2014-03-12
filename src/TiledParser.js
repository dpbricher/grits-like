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

	cTileLayers : null,
	cObjectLayers : null,

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

		this.cTileLayers	= {};
		this.cObjectLayers	= {};

		var cLayer;

		for (var i in this.cTiledData.layers)
		{
			cLayer	= this.cTiledData.layers[i];

			switch (cLayer.type)
			{
				case "tilelayer":
					this.cTileLayers[cLayer.name]	= cLayer;
					break;

				case "objectgroup":
					this.cObjectLayers[cLayer.name]	= cLayer;
					// this.aObjectLayers.push(cLayer);
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

		for (var i in this.cTileLayers)
		{
			if (this.cTileLayers[i].data[iIndex] != 0)
			{
				aData.push(
					this.getTileSrcData(
						this.cTileLayers[i].data[iIndex] - this.getCurrentSet().firstgid
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

	/**
	 * Returns the full dimensions of the current tile set
	 */
	getDim : function () {
		return new b2.Vec2(
			this.cTileRC.x * this.cTileDim.x,
			this.cTileRC.y * this.cTileDim.y
		);
	},

	getCurrentSet : function() {
		return this.aTileSets[this.iCurrentSet];
	},

	setCurrentIndex : function (iIndex) {
		this.iCurrentSet	= iIndex;
	}
});