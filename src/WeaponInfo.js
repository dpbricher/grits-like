var WeaponInfo	= Class.extend({
	sName : null,

	sAnimInfo : null,

	// Speed and damage of each projectile
	fProjSpeed : 0.0,
	fProjDamage : 0.0,

	// Forced firing delay between shots, in milliseconds
	iFireDelay : 0,

	init : function(sName, sAnimInfo, fProjSpeed, fProjDamage, iFireDelay) {
		this.sName			= sName;
		this.sAnimInfo		= sAnimInfo;
		this.fProjSpeed		= fProjSpeed;
		this.fProjDamage	= fProjDamage;
		this.iFireDelay		= iFireDelay;
	},

	getFireDelay : function() {
		return this.iFireDelay;
	}
});