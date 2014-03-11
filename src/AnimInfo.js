/**
 * Stores the information necessary to render a specific animation sequence via the AtlasParser class
 */
var AnimInfo	= Class.extend({
	aFrames : null,

	/**
	 * Params:
	 * aSearchList : an array containing the names of *all* images in the Atlas
	 * sFirst : the name of the first image in the sequence
	 */
	init : function(aSearchList, sFirst) {
		// regex for stripping the frame number from an image name
		var cNumStrip	= /\d+(\.[^\.]+$)/;

		var zStripFunc	= function(sInput) {
			return sInput.replace(cNumStrip, "$1");
		};

		var sBaseName	= zStripFunc(sFirst);

		this.aFrames	= aSearchList.filter(function(sItem) {
			return sBaseName == zStripFunc(sItem);
		});
	},

	getFirstName : function() {
		return this.aFrames[0];
	},

	getNameAt : function(iIndex) {
		return this.aFrames[iIndex];
	},

	getLastFrame : function() {
		return this.aFrames.length - 1;
	}
});