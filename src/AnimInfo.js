/**
 * Stores the information necessary to render a specific animation sequence via the AtlasParser class
 * Also keeps track of that animation
 * Note that frames are 0 indexed
 */
var AnimInfo	= Class.extend({
	aFrames : null,

	iCurrentFrame : 0,

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

	// returns the image name for the current frame
	getCurrentName : function() {
		return this.aFrames[this.iCurrentFrame];
	},

	getCurrentFrame : function() {
		return this.iCurrentFrame;
	},

	getTotalFrames : function() {
		return this.aFrames.length - 1;
	},

	gotoFrame : function(iFrame) {
		this.iCurrentFrame	= Utils.clamp(iFrame, 1, this.getTotalFrames());
	},

	// steps the animation's current frame forward iNumFrames, wrapping around if the current frame goes beyond its bounds
	stepFrames : function(iNumFrames) {
		if (iNumFrames == Number.POSITIVE_INFINITY || iNumFrames == Number.NEGATIVE_INFINITY)
			return;

		var iTargetFrame	= this.getCurrentFrame() + iNumFrames;

		// wrap around if target frame above last frame
		iTargetFrame	%= (this.getTotalFrames() + 1);
		
		// wrap around if target frame is below first frame
		while (iTargetFrame < 0)
			iTargetFrame	+= (this.getTotalFrames() + 1);

		this.iCurrentFrame	= iTargetFrame;
	}
});