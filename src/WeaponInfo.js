var WeaponInfo	= Class.extend({
	cAnimInfo : null,

	sName : null,

	// Speed and damage of each projectile
	fProjSpeed : 0.0,
	fProjDamage : 0.0,

	// Forced firing delay between shots, in milliseconds
	iFireDelay : 0,

	init : function(cAnimInfo, sName, fProjSpeed, fProjDamage, iFireDelay) {
		this.cAnimInfo		= cAnimInfo;
		this.sName			= sName;
		this.fProjSpeed		= fProjSpeed;
		this.fProjDamage	= fProjDamage;
		this.iFireDelay		= iFireDelay;
	},

	getFireDelay : function() {
		return this.iFireDelay;
	},

	getAnimInfo : function() {
		return this.cAnimInfo;
	},

	getProjSpeed : function() {
		return this.fProjSpeed;
	}
});