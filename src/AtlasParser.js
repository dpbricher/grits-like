var AtlasParser	= Class.extend({
	cImageMap : {},
	cAtlasImage : null,

	init : function(cAtlas) {
		this.cAtlasImage	= cAtlas;
	},

	parse : function(sInfoJson) {
		var cInfoObj	= JSON.parse(sInfoJson);

		var cFrames	= cInfoObj.frames;

		for (var sImageName in cFrames)
		{
			this.setImageData(sImageName, cFrames[sImageName]);
		}
	},

	setImageData : function(sImageName, cDataObj) {
		this.cImageMap[sImageName]	= cDataObj.frame;

		console.log("this.cImageMap[" + sImageName + "] = " , this.cImageMap[sImageName]);
	},

	getImageData : function(sImageName) {
		return this.cImageMap[sImageName];
	}
});