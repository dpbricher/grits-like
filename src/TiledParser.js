/**
 * Class for parsing a data json produced by the Tiled appplication.
 * May not be fundamentally correct as I'm not entirely sure how I should be interpreting the data,
 * but should at least function correctly on the data json that I am parsing for this game
 */
var TiledParser	= Class.extend({
	cTiledData : null,

	// Vec2 dimensions of each tile
	cTileDim : null,

	// Vec2 number of rows and colums of tiles
	cTileRC : null,

	aTileSets : null,
	aTileLayers : null,
	aObjectLayers : null,

	iCurrentSet : 0,

	/*init : function() {
		//
	},*/

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

		this.cTiledDim		= new Vec2(this.cTiledData.width, this.cTiledData.height);
		this.cTiledRC		= new Vec2(this.cTiledData.tilewidth, this.cTiledData.tileheight);

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

	getTileAt : function(iIndex) {
		for (var i in this.aTileLayers)
		{
			if (this.aTileLayers[i].data[iIndex] != 0)
			{
				console.log("layer " + i + " has data at index " + iIndex);
			}
		}
	},

	// getTilesInArea : function(cRect) {
	// 	//
	// },

	getCurrentSet : function() {
		return this.aTileSets[this.iCurrentSet];
	},

	setCurrentIndex : function (iIndex) {
		this.iCurrentSet	= iIndex;
	}
});