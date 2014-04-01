var Projectile	= AnimEntity.extend({
	// The entity responsible for the creation of this projectile
	cOwner : null,

	// weapon info for the weapon that created this projectile
	cCreatorInfo : null,

	fDamage : 0.0,

	init : function(cB2BodyDef, cCreatorInfo, cOwner, fDamage) {
		this.cCreatorInfo	= cCreatorInfo;
		this.cOwner			= cOwner;
		this.fDamage		= fDamage;

		this._super(
			cB2BodyDef,
			new AnimState(
				this.cCreatorInfo.getProjInfo()
			)
		);
	},

	getCreatorInfo : function() {
		return this.cCreatorInfo;
	}
});