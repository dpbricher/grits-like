var PhysicsEngine	= Class.extend({
	cPhysicsManager : null,

	init : function(cPhysicsManager) {
		this.cPhysicsManager	= cPhysicsManager;
	},

	update : function(t) {
		this.cPhysicsManager.update();
	}
});