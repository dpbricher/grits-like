var PlayerEntity	= PhysicsEntity.extend({
	cLegState : null,

	cFireVec : null,

	// weapon states
	cWeaponLeft : null,
	cWeaponRight : null,

	sType : "PlayerEntity",

	sTurrentName : null,

	// Turret and leg rotations, stored in radians
	fLegRot : 0.0,
	fTurretRot : 0.0,

	fHitPoints : 0,

	init : function(cB2Body) {
		this._super(cB2Body);

		this.cFireVec	= new b2.Vec2(0, 0);
	},

	setTurretName : function(sName) {
		this.sTurrentName	= sName;
	},

	getTurretName : function() {
		return this.sTurrentName;
	},

	setFireVec : function(x, y) {
		this.cFireVec.Set(x, y);
	},

	getFireVec : function() {
		return this.cFireVec.Copy();
	},

	setWeaponLeft : function(cState) {
		this.cWeaponLeft	= cState;
	},

	getWeaponLeft : function() {
		return this.cWeaponLeft;
	},

	setWeaponRight : function(cState) {
		this.cWeaponRight	= cState;
	},

	getWeaponRight : function() {
		return this.cWeaponRight;
	},

	setHitPoints : function(iHp) {
		this.fHitPoints	= iHp;
	},

	getHitPoints : function() {
		return this.fHitPoints;
	},

	/**
	 * returns turret rot +180.0, to make the image point in to correct direction
	 */
	getTurretRot : function() {
		return this.fTurretRot + Math.PI;
	},

	/**
	 * Calculates and returns the rotation of the legs based on the current update vector
	 */
	getLegRot : function() {
		return this.fLegRot;
	},

	initLegAnim : function (cAnimInfo) {
		this.cLegState	= new AnimState(cAnimInfo);
	},

	getLegAnim : function() {
		return this.cLegState;
	},

	switchLegInfo : function(cAnimInfo, bNoReset) {
		this.cLegState.cInfo	= cAnimInfo;

		if (!bNoReset)
			this.cLegState.gotoFrame(0);
	},

	damageHitPoints : function(fDamage) {
		this.fHitPoints	-= fDamage;
	},

	update : function(iTime) {
		this._super();

		// Update leg rotation if player is moving
		if (this.cVel.LengthSquared() > 0)
		{
			this.fLegRot	= Math.atan2(this.cVel.y, this.cVel.x);
			this.cPhysicsBody.SetAngle(this.fLegRot);
		}

		// Update turrent rot if player is attempting to fire
		if (this.cFireVec.LengthSquared() > 0)
			this.fTurretRot	= Math.atan2(this.cFireVec.y, this.cFireVec.x);

		this.cWeaponLeft.update(iTime);
		this.cWeaponRight.update(iTime);
	}
});