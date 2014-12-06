var Game1	= Class.extend({
	cStage : null,

	cEntityList : null,

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

	cPlayer1 : null,

	cGameEngine : null,
	cInputEngine : null,
	cRenderEngine : null,
	cPhysicsEngine : null,

	cUpHandle : null,

	zRafFunc : null,
	// request animation frame cancel function
	zCancelFunc : null,
	zScopedUpdate : null,

	// time of last update
	iLastUpTime : 0,

	init : function(cStage) {
		this.cStage			= cStage;

		this.cStage.width	= 512.0;
		this.cStage.height	= 512.0;

		this.cLoader		= new Loader();
		this.cAtlasParser	= new AtlasParser();
		this.cTiledParser	= new TiledParser();

		this.cEntityList	= new EntityList();

		this.cSoundLoader	= new SoundLoader(this.cLoader,
			new (Utils.getAudioContextClass())());

		this.cPreloader		= new Preload1(this.cLoader, this.cSoundLoader,
			this.cAtlasParser, this.cTiledParser);

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

		this.cPlayer1.update(t);

		this.cGameEngine.update(t);
		this.cInputEngine.update(t);
		this.cRenderEngine.update(t);
		this.cPhysicsEngine.update(t);

		this.iLastUpTime	= iNow;

		this._scheduleUpdate();
	},

	onPreloadComplete : function() {
		var cInputListener		= this.cStage;

		this.cPhysicsManager	= new PhysicsManager(new b2.Vec2(0, 0), false);

		this.cPlayer1			= new PlayerEntity(
			this.cPhysicsManager.addBody({
				cPos : new b2.Vec2(0, 0),
				cDim : new b2.Vec2(5.0, 5.0)
			})
		);

		var cFlashAnim, cProjAnim, cImpactAnim;
		var aSequenceList	= Object.keys(this.cAtlasParser.cImageMap);

		cFlashAnim	= new AnimInfo(aSequenceList, SequenceNames.MACHGUN_MUZZLE);
		cProjAnim	= new AnimInfo(aSequenceList, SequenceNames.MACHGUN_PROJECTILE);
		cImpactAnim	= new AnimInfo(aSequenceList, SequenceNames.MACHGUN_IMPACT);
		
		var cMachProj		= new ProjectileInfo(cProjAnim, cImpactAnim, new b2.Vec2(0.2, 0.2), SoundNames.GRENADE, 6.0 * 10, 1.0);
		var cMachGun		= new WeaponInfo(cFlashAnim, cMachProj,
			new b2.Vec2(this.cPlayer1.getDim().x * 0.35, -this.cPlayer1.getDim().y / 2), ImageNames.MACHGUN,
			SoundNames.MACH_GUN, "machgun", 200);

		cFlashAnim	= new AnimInfo(aSequenceList, SequenceNames.ROCKET_MUZZLE);
		cProjAnim	= new AnimInfo(aSequenceList, SequenceNames.ROCKET_PROJECTILE);
		cImpactAnim	= new AnimInfo(aSequenceList, SequenceNames.ROCKET_IMPACT);

		var cRocketProj		= new ProjectileInfo(cProjAnim, cImpactAnim, new b2.Vec2(0.4, 0.4), SoundNames.EXPLODE, 6.0 * 8, 10.0);
		var cRocketLauncher	= new WeaponInfo(cFlashAnim, cRocketProj,
			new b2.Vec2(this.cPlayer1.getDim().x / 4, -this.cPlayer1.getDim().y / 2), ImageNames.ROCKET_LAUNCHER,
			SoundNames.ROCKET, "rocket_launcher", 1000);

		this.cPlayer1.setWeaponLeft(
			new WeaponState(cRocketLauncher)
		);
		this.cPlayer1.setWeaponRight(
			new WeaponState(cMachGun)
		);
		this.cPlayer1.getWeaponLeft().setAmmoLeft(Number.POSITIVE_INFINITY);
		this.cPlayer1.getWeaponRight().setAmmoLeft(Number.POSITIVE_INFINITY);

		this.cPlayer1.setMoveSpeed(60.0 * 50);
		this.cPlayer1.setHitPoints(100);

		this.cEntityList.addEntity(this.cPlayer1);

		this.cAtlasRenderer	= new AtlasRenderer(this.cStage,
			this.cPreloader.getAtlasImage());

		this.cTiledRenderer	= new CachedTiledRenderer(this.cStage);
		this.cTiledRenderer.cacheImage(this.cTiledParser,
			this.cPreloader.getTiledImage());

		this.cInputManager	= new InputManager(
			new KeyboardManager(document.body),
			new MouseManager(cInputListener)
		);

		this.cGameEngine	= new GameEngine();
		this.cInputEngine	= new InputEngine(this.cPlayer1,
			this.cInputManager);
		this.cRenderEngine	= new RenderEngine(this.cAtlasParser,
			this.cTiledParser, this.cAtlasRenderer, this.cTiledRenderer,
			this.cEntityList);
		this.cPhysicsEngine	= new PhysicsEngine(this.cPhysicsManager);

		this.cRenderEngine.addCameraTarget(this.cStage, this.cPlayer1,
			new Rect(0, 0, 512.0, 512.0));

		this.iLastUpTime	= Date.now();

		this.update();
	},


	_scheduleUpdate : function() {
		this.cUpHandle		= this.zRafFunc.call(null, this.zScopedUpdate);
	}
});