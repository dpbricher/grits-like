var WeaponInfo	= Class.extend({
	// anim info for muzzle flash
	cFlashAnim : null,

	// b2Vec2 muzzle offset from centre of weapon owner entity, assuming weapon is pointing directly upwards
	cMuzzleOffset : null,

	// projectile info
	cProjInfo : null,

	// image name for the image of the weapon itself
	sImageName : null,

	// name of the weapon's firing sound effect
	sFireSound : null,

	sName : null,

	// forced firing delay between shots, in milliseconds
	iFireDelay : 0,

	init : function(cFlashAnimInfo, cProjInfo, cMuzzleOffset, sImageName, sFireSoundName, sName, iFireDelay) {
		this.cFlashAnim		= cFlashAnimInfo;
		this.cProjInfo		= cProjInfo;
		this.cMuzzleOffset	= cMuzzleOffset;
		this.sImageName		= sImageName;
		this.sFireSound		= sFireSoundName;
		this.sName			= sName;
		this.iFireDelay		= iFireDelay;
	},

	getFlashAnim : function() {
		return this.cFlashAnim;
	},

	getProjInfo : function() {
		return this.cProjInfo;
	},

	getMuzzleOffset : function() {
		return this.cMuzzleOffset.Copy();
	},

	getImageName : function() {
		return this.sImageName;
	},

	getFireSoundName : function() {
		return this.sFireSound;
	},

	getFireDelay : function() {
		return this.iFireDelay;
	}
});