var PhysicsEntity	= Entity.extend({
	cPhysicsBody : null,

	cVel : null,

	init : function(cB2Body) {
		this.cPhysicsBody	= cB2Body;

		// set physics body user data to this so we can use it in callbacks
		this.cPhysicsBody.SetUserData(this);

		this.cPos			= this.cPhysicsBody.GetPosition();
		this.cHalfDim		= this.cPhysicsBody.GetFixtureList().GetAABB().GetExtents();

		this.cVel			= new b2.Vec2(0, 0);
	},

	getVelocity : function() {
		return this.cVel.Copy();
	},

	setVelocity : function(x, y) {
		this.cVel.Set(x, y);
	},

	update : function() {
		// set velocity on physics body, since we are clearing it every update
		this.cPhysicsBody.SetLinearVelocity(this.cVel);

		this._super();
	}
});