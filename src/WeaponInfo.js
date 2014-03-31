var WeaponInfo	= Class.extend({
	// Anim info for muzzle flash
	cFlashInfo : null,

	// Anim info for projectile
	cProjInfo : null,

	// Anim info for impact
	cImpactInfo : null,

	sName : null,

	// Speed and damage of each projectile
	fProjSpeed : 0.0,
	fProjDamage : 0.0,

	// Forced firing delay between shots, in milliseconds
	iFireDelay : 0,

	init : function(cFlashInfo, cProjInfo, cImpactInfo, sName, fProjSpeed, fProjDamage, iFireDelay) {
		this.cFlashInfo		= cFlashInfo;
		this.cProjInfo		= cProjInfo;
		this.cImpactInfo	= cImpactInfo;
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

	getProjSpeed : function() {
		return this.fProjSpeed;
	},

	getFireDelay : function() {
		return this.iFireDelay;
	}
});