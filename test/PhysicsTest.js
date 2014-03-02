var PhysicsTest	= Class.extend({
	cPhysicsMan : null,

	init : function() {
		this.cPhysicsMan	= new PhysicsManager(
			new b2.Vec2(0.0, 0.0),
			false
		);

		var cBody	= this.cPhysicsMan.addBody({
			sType : "static",
			cPos : new Vec2(0.0, 0.0),
			cDim : new Vec2(1.0, 1.0),
			bIsBouncy : true
		});

		this.cPhysicsMan.removeBody(cBody);

		setInterval(
			Utils.bindFunc(this, this.update),
			1000
		);
	},

	update : function() {
		this.cPhysicsMan.update();
	}
});