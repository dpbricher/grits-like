var AtlasParser	= Class.extend({
	cImageMap : {},

	cMetaData : {},

	/*init : function() {
	},*/

	parse : function(sInfoJson) {
		var cInfoObj	= JSON.parse(sInfoJson);

		var cFrames		= cInfoObj.frames;

		this.cMetaData	= cInfoObj.meta;

		for (var sImageName in cFrames)
		{
			this.setImageData(sImageName, cFrames[sImageName]);
		}
	},

	getAtlasName : function() {
		return this.cMetaData.image;
	},

	/**
	 * Data for each image is stored as an object with the following properties:
	 * bounds : a Rect the specifies the image's position in the Atlas
	 * centre : a Vec2 that specifies the centre position of the original (non-cropped) image from the image bounds' top left
	 */
	setImageData : function(sImageName, cDataObj) {
		var cData	= {
			bounds : new Rect(cDataObj.frame.x, cDataObj.frame.y, cDataObj.frame.w, cDataObj.frame.h),
			centre : this._getTrueCentre(cDataObj.spriteSourceSize, cDataObj.sourceSize)
		};

		this.cImageMap[sImageName]	= cData;
	},

	/**
	 * See setImageData function for image data format
	 */
	getImageData : function(sImageName) {
		return this.cImageMap[sImageName];
	},

	/**
	 * Returns an image's original centre position relative to the top left corner of its cropped bounds
	 * cCurrentBounds : An object containing the current bounds (x, y, w, h) of the cropped image
	 * cOriginalSize  : An object containing the width and height (w, h) of the original image
	 */ 
	_getTrueCentre : function(cCurrentBounds, cOriginalSize) {
		return new Vec2(
			cOriginalSize.w / 2 - cCurrentBounds.x,
			cOriginalSize.h / 2 - cCurrentBounds.y
		);
	}
});