var PlayerEntity	= PhysicsEntity.extend({
	cLegState : null,

	cFireVec : null,

	cWeaponState : null,

	sTurrentName : null,

	// Turret and leg rotations, stored in radians
	fLegRot : 0.0,
	fTurretRot : 0.0,

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

	setWeaponState : function(cState) {
		this.cWeaponState	= cState;
	},

	getWeaponState : function() {
		return this.cWeaponState;
	},

	/**
	 * returns turret rot -90.0, since the image points to the right of the screen at rotation 0
	 */
	getTurretRot : function() {
		return this.fTurretRot;
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

		this.cWeaponState.update(iTime);
	}
});