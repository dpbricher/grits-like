var PlayerEntity	= PhysicsEntity.extend({
	cLegState : null,

	sTurrentName : null,

	fLegRot : 0.0,
	fTurretRot : 0.0,
/*
	init : function(cB2Body) {
		this._super(cB2Body);
	},
*/
	setTurretName : function(sName) {
		this.sTurrentName	= sName;
	},

	getTurretName : function() {
		return this.sTurrentName;
	},

	setTurretRot : function(fRot) {
		this.fTurretRot	= fRot;
	},

	/**
	 * returns turret rot -90.0, since the image points to the right of the screen at rotation 0
	 */
	getTurretRot : function() {
		return (this.fTurretRot - 90.0);
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

	update : function() {
		this._super();

		// Update leg rotation if player is moving
		if (this.cVel.Length() != 0)
			this.fLegRot	= Math.atan2(this.cVel.y, this.cVel.x) / Math.PI * 180.0 + 90.0;
	}
});