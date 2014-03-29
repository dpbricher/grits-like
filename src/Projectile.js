var Projectile	= AnimEntity.extend({
	// The entity responsible for the creation of this projectile
	cOwner : null,

	fDamage : 0.0,

	init : function(cB2BodyDef, cAnimInfo, cOwner, fDamage) {
		this._super(cB2BodyDef, cAnimInfo);

		this.cOwner		= cOwner;
		this.fDamage	= fDamage;
	}
});