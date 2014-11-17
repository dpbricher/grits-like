var Game1	= Class.extend({
	cStage : null,

	cInputManager : null,
	cPhysicsManager : null,

	cLoader : null,

	cSoundLoader : null,
	cSoundManager : null,

	cAtlasParser : null,
	cTiledParser : null,

	cAtlasRenderer : null,
	cTiledRenderer : null,

	cPreloader : null,

	cGameEngine : null,
	cInputEngine : null,
	cRenderEngine : null,
	cPhysicsEngine : null,

	cUpHandle : null,

	zRafFunc : null,
	zCancelFunc : null,
	zScopedUpdate : null,

	// time of last update
	iLastUpTime : 0,

	init : function(cStage) {
		this.cStage			= cStage;

		this.cLoader		= new Loader();
		this.cAtlasParser	= new AtlasParser();
		this.cTiledParser	= new TiledParser();

		this.cSoundLoader	= new SoundLoader(this.cLoader, new (Utils.getAudioContextClass())());

		this.cPreloader		= new Preload1(this.cLoader, this.cSoundLoader, this.cAtlasParser, this.cTiledParser);

		this.zRafFunc		= Utils.getRafFunc();
		this.zCancelFunc	= Utils.getCancelFunc();
		this.zScopedUpdate	= Utils.bindFunc(this, this.update);
	},

	start : function() {
		this.cPreloader.startLoading(
			Utils.bindFunc(this, this.onPreloadComplete)
		);
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

	onPreloadComplete : function() {
		this.cAtlasRenderer	= new AtlasRenderer(this.cStage, this.cPreloader.getAtlasImage());
		this.cTiledRenderer	= new CachedTiledRenderer(this.cStage, this.cPreloader.getTiledImage());

		this.cGameEngine	= new GameEngine();
		this.cInputEngine	= new InputEngine();
		this.cRenderEngine	= new RenderEngine();
		this.cPhysicsEngine	= new PhysicsEngine();

		this.iLastUpTime	= Date.now();

		this.update();
	},


	_scheduleUpdate : function() {
		this.cUpHandle		= this.zRafFunc.call(null, this.zScopedUpdate);
	}
});