var Projectile	= AnimEntity.extend({
	// The entity responsible for the creation of this projectile
	cOwner : null,

	// projectile info for this projectile
	cProjInfo : null,

	fDamage : 0.0,

	init : function(cB2BodyDef, cProjInfo, cOwner, fDamage) {
		this.cProjInfo	= cProjInfo;
		this.cOwner		= cOwner;
		this.fDamage	= fDamage;

		this._super(
			cB2BodyDef,
			new AnimState(
				this.cProjInfo.getProjAnim()
			)
		);
	},

	getInfo : function() {
		return this.cProjInfo;
	}
});