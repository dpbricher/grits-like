var ProjectileInfo	= Class.extend({
	// anim info for projectile itself
	cProjAnim : null,

	// anim info for projectile's impact
	cImpactAnim : null,

	cDim : null,

	// impact sound name
	sImpactSound : null,

	fSpeed : 0.0,
	fDamage : 0.0,

	init : function(cProjAnimInfo, cImpactAnimInfo, cDim, sImpactSoundName, fSpeed, fDamage) {
		this.cProjAnim		= cProjAnimInfo;
		this.cImpactAnim	= cImpactAnimInfo;
		this.cDim			= cDim;
		this.sImpactSound	= sImpactSoundName;
		this.fSpeed			= fSpeed;
		this.fDamage		= fDamage;
	},

	getProjAnim : function() {
		return this.cProjAnim;
	},

	getImpactAnim : function() {
		return this.cImpactAnim;
	},

	getDim : function() {
		return this.cDim.Copy();
	},

	getImpactSoundName : function() {
		return this.sImpactSound;
	},

	getSpeed : function() {
		return this.fSpeed;
	},

	getDamage : function() {
		return this.fDamage;
	}
});