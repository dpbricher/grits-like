/**
 * Provides the information necessary to keep track of 1 instance of an animation
 * Note that frames are 0 indexed
 */
var AnimState	= Class.extend({
	cInfo : null,

	iCurrentFrame : 0,

	init : function(cInfo) {
		this.cInfo	= cInfo;
	},

	// returns the image name for the current frame
	getCurrentName : function() {
		return cInfo.getNameAt(this.iCurrentFrame);
	},

	getCurrentFrame : function() {
		return this.iCurrentFrame;
	},

	gotoFrame : function(iFrame) {
		if (!isNaN(iFrame))
			this.iCurrentFrame	= Utils.clamp(iFrame, 0, cInfo.getLastFrame());
	},

	// steps the animation's current frame forward iNumFrames, wrapping around if the current frame goes beyond its bounds
	stepFrames : function(iNumFrames) {
		var iTargetFrame	= this.getCurrentFrame() + iNumFrames;

		// wrap around if target frame exceeds total frames
		iTargetFrame	%= (cInfo.getLastFrame() + 1);
		
		// wrap around if target frame is below first frame
		if (iTargetFrame < 0)
			iTargetFrame	+= (cInfo.getLastFrame() + 1);

		this.gotoFrame(iTargetFrame);
	}
});