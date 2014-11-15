var Game1	= Class.extend({
	cGameEngine : null,
	cInputEngine : null,
	cRenderEngine : null,
	cPhysicsEngine : null,

	zRafFunc : null,
	zCancelFunc : null,
	zScopedUpdate : null,

	cUpHandle : null,

	// time of last update
	iLastUpTime : 0,

	init : function() {
		this.cGameEngine	= new GameEngine();
		this.cInputEngine	= new InputEngine();
		this.cRenderEngine	= new RenderEngine();
		this.cPhysicsEngine	= new PhysicsEngine();

		this.iLastUpTime	= Date.now();

		this.zRafFunc		= Utils.getRafFunc();
		this.zCancelFunc	= Utils.getCancelFunc();
		this.zScopedUpdate	= Utils.bindFunc(this, this.update);
	},

	start : function() {
		this.update();
	},

	stop : function() {
		this.zCancelFunc(this.cUpHandle);

		this.cUpHandle		= null;
	},

	update : function(fTimeStamp) {
		var iNow			= Date.now();
		var t				= iNow - this.iLastUpTime;

		this.cGameEngine.update(t);
		this.cInputEngine.update(t);
		this.cRenderEngine.update(t);
		this.cPhysicsEngine.update(t);

		this.iLastUpTime	= iNow;

		this._scheduleUpdate();
	},


	_scheduleUpdate : function() {
		this.cUpHandle		= this.zRafFunc.call(null, this.zScopedUpdate);
	}
});