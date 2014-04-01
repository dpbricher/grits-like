var WeaponInfo	= Class.extend({
	// anim info for muzzle flash
	cFlashInfo : null,

	// anim info for projectile
	cProjInfo : null,

	// anim info for impact
	cImpactInfo : null,

	// image name for the image of the weapon itself
	sImageName : null,

	sName : null,

	// speed and damage of each projectile
	fProjSpeed : 0.0,
	fProjDamage : 0.0,

	// forced firing delay between shots, in milliseconds
	iFireDelay : 0,

	init : function(cFlashInfo, cProjInfo, cImpactInfo, sImageName, sName, fProjSpeed, fProjDamage, iFireDelay) {
		this.cFlashInfo		= cFlashInfo;
		this.cProjInfo		= cProjInfo;
		this.cImpactInfo	= cImpactInfo;
		this.sImageName		= sImageName;
		this.sName			= sName;
		this.fProjSpeed		= fProjSpeed;
		this.fProjDamage	= fProjDamage;
		this.iFireDelay		= iFireDelay;
	},

	getFlashInfo : function() {
		return this.cFlashInfo;
	},

	getProjInfo : function() {
		return this.cProjInfo;
	},

	getImpactInfo : function() {
		return this.cImpactInfo;
	},

	getImageName : function() {
		return this.sImageName;
	},

	getProjSpeed : function() {
		return this.fProjSpeed;
	},

	getFireDelay : function() {
		return this.iFireDelay;
	}
});