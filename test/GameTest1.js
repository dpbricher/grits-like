var GameTest1	= Class.extend({
	IMAGE_JSON_NAME : "grits_effects.json",

	cUpdateHandle : null,

	cPlayer : null,

	cAtlasParser : null,
	cAtlasRenderer : null,

	// cEntityManager : null,
	aProjList : [],
	aAnimList : [],
	aWallList : null,

	cInputManager : null,

	cLoader : null,

	cPhysicsManager : null,

	cSoundLoader : null,
	cSoundManager : null,

	cStage : null,

	cMapBounds : null,
	cViewRect : null,

	cBgImage : null,

	zRafFunc : null,

	/**
	 * Amount to scale up all entity positions and dimensions by when rendering.
	 * This is necessary because box2d requires units too be in meters/kilograms/seconds
	 */
	fGlobalScale : 10.0,

	iLastUpdate : 0,

	init : function() {
		// get game update function
		this.zRafFunc		= Utils.getRafFunc();

		// init stage for this test
		this.cStage			= document.getElementById("stage");

		// view rect
		this.cViewRect		= new Rect(0, 0, 25.6, 25.6);

		// arbitrary width and height
		this.cStage.width	= this.cViewRect.w * this.fGlobalScale;
		this.cStage.height	= this.cViewRect.h * this.fGlobalScale;

		// full map bounds
		this.cMapBounds		= new Rect(0, 0, 51.2, 51.2);

		// create a background image
		this.cBgImage			= document.createElement("canvas");
		this.cBgImage.width		= this.cMapBounds.w * this.fGlobalScale;
		this.cBgImage.height	= this.cMapBounds.h * this.fGlobalScale;

		var cCtx				= this.cBgImage.getContext("2d");
		cCtx.fillStyle		 	= cCtx.createLinearGradient(0, 0, this.cBgImage.width, this.cBgImage.height);
		cCtx.fillStyle.addColorStop(0, "blue");
		cCtx.fillStyle.addColorStop(1, "yellow");
		cCtx.fillRect(0, 0, this.cBgImage.width, this.cBgImage.height);

		// first define all managers that have no prerequisites
		this.cLoader			= new Loader();
		// this.cEntityManager		= new EntityManager();
		this.cInputManager		= new InputManager(
			new KeyboardManager(document.body),
			new MouseManager(this.cStage)
		);
		this.cPhysicsManager	= new PhysicsManager(new b2.Vec2(0, 0), false);

		this.cPhysicsManager.addContactListener({
			PostSolve : this.onContact
		});

		// add key bindings
		this.cInputManager.bindAction(KeyCodes.W, Actions.MOVE_UP);
		this.cInputManager.bindAction(KeyCodes.A, Actions.MOVE_LEFT);
		this.cInputManager.bindAction(KeyCodes.S, Actions.MOVE_DOWN);
		this.cInputManager.bindAction(KeyCodes.D, Actions.MOVE_RIGHT);
		
		this.cInputManager.bindAction(KeyCodes.ARROW_UP, Actions.FIRE_UP);
		this.cInputManager.bindAction(KeyCodes.ARROW_LEFT, Actions.FIRE_LEFT);
		this.cInputManager.bindAction(KeyCodes.ARROW_DOWN, Actions.FIRE_DOWN);
		this.cInputManager.bindAction(KeyCodes.ARROW_RIGHT, Actions.FIRE_RIGHT);

		// first load data files that tell us where other assets can be found
		this.cLoader.queue("data/" + this.IMAGE_JSON_NAME);

		// start loading
		this.cLoader.startQueue(this.onDataLoaded, this);
	},

	onDataLoaded : function(cData) {
		// console.log("cData = " , cData);

		// parse data
		this.cAtlasParser	= new AtlasParser();
		this.cAtlasParser.parse(cData[this.IMAGE_JSON_NAME]);

		// determine image assets to be loaded
		this.cLoader.queue("images/" + this.cAtlasParser.getAtlasName());

		// start loading
		this.cLoader.startQueue(this.onImagesLoaded, this);
	},

	onImagesLoaded : function(cData) {
		// init atlas renderer
		this.cAtlasRenderer	= new AtlasRenderer(this.cStage, cData[this.cAtlasParser.getAtlasName()]);

		// define sound loader
		this.cSoundLoader	= new SoundLoader(this.cLoader, new (Utils.getAudioContextClass())());

		// start loading
		this.cSoundLoader.loadSounds(
			[
				// "sounds/" + SoundNames.BG_GAME,
				"sounds/" + SoundNames.MACH_GUN,
				"sounds/" + SoundNames.GRENADE
			],
			Utils.bindFunc(this, this.onSoundsLoaded)
		);
	},

	onSoundsLoaded : function() {
		// define sound manager
		this.cSoundManager	= new SoundManager(this.cSoundLoader);

		// start game
		this.startGame();
	},

	startGame : function() {
		console.log("start game!");

		// Apparently I decided I have to create the sounds first :s
		this.cSoundManager.createSoundList(this.cSoundLoader.cSoundMap);

		// start BG music
		// this.cSoundManager.getSound(SoundNames.BG_GAME).setVolume(0.1);
		// this.cSoundManager.loopSound(SoundNames.BG_GAME, 0);

		// init player
		this.cPlayer	= new PlayerEntity(
			this.cPhysicsManager.addBody({
				cPos : new b2.Vec2(this.cMapBounds.w / 4, this.cMapBounds.h / 4),
				cDim : new b2.Vec2(5.0, 5.0)
			})
		);

		this.cPlayer.initLegAnim(
			new AnimInfo(
				Object.keys(this.cAtlasParser.cImageMap),
				SequenceNames.WALK_RIGHT
			)
		);

		var cFlashAnim, cProjAnim, cImpactAnim;
		var aSequenceList	= Object.keys(this.cAtlasParser.cImageMap);

		cFlashAnim	= new AnimInfo(aSequenceList, SequenceNames.MACHGUN_MUZZLE);
		cProjAnim	= new AnimInfo(aSequenceList, SequenceNames.MACHGUN_PROJECTILE);
		cImpactAnim	= new AnimInfo(aSequenceList, SequenceNames.MACHGUN_IMPACT);
		
		var cMachGun		= new WeaponInfo(cFlashAnim, cProjAnim, cImpactAnim, ImageNames.MACHGUN, "machgun", 6.0 * 10, 1.0, 200);

		cFlashAnim	= new AnimInfo(aSequenceList, SequenceNames.ROCKET_MUZZLE);
		cProjAnim	= new AnimInfo(aSequenceList, SequenceNames.ROCKET_PROJECTILE);
		cImpactAnim	= new AnimInfo(aSequenceList, SequenceNames.ROCKET_IMPACT);

		var cRocketLauncher	= new WeaponInfo(cFlashAnim, cProjAnim, cImpactAnim, ImageNames.ROCKET_LAUNCHER, "rocket_launcher", 6.0 * 8, 10.0, 1000);

		this.cPlayer.setWeaponLeft(
			new WeaponState(cRocketLauncher)
		);
		this.cPlayer.setWeaponRight(
			new WeaponState(cMachGun)
		);
		this.cPlayer.getWeaponLeft().setAmmoLeft(Number.POSITIVE_INFINITY);
		this.cPlayer.getWeaponRight().setAmmoLeft(Number.POSITIVE_INFINITY);

		this.cPlayer.setTurretName(ImageNames.TURRET);
		this.cPlayer.setMoveSpeed(6.0 * 5);

		this.createWalls();

		// start update loop
		this.iLastUpdate	= Date.now();
		this.update();
	},

	createWalls : function() {
		var fThickness	= 1.0;

		var cLeft	= new PhysicsEntity(
			this.cPhysicsManager.addBody({
				cPos : new b2.Vec2(this.cMapBounds.left(), this.cMapBounds.bottom() / 2),
				cDim : new b2.Vec2(fThickness, this.cMapBounds.bottom()),
				sType : "static"
			})
		);

		var cRight	= new PhysicsEntity(
			this.cPhysicsManager.addBody({
				cPos : new b2.Vec2(this.cMapBounds.right(), this.cMapBounds.bottom() / 2),
				cDim : new b2.Vec2(fThickness, this.cMapBounds.bottom()),
				sType : "static"
			})
		);

		var cTop	= new PhysicsEntity(
			this.cPhysicsManager.addBody({
				cPos : new b2.Vec2(this.cMapBounds.right() / 2, this.cMapBounds.left()),
				cDim : new b2.Vec2(this.cMapBounds.right(), fThickness),
				sType : "static"
			})
		);

		var cBottom	= new PhysicsEntity(
			this.cPhysicsManager.addBody({
				cPos : new b2.Vec2(this.cMapBounds.right() / 2, this.cMapBounds.bottom()),
				cDim : new b2.Vec2(this.cMapBounds.right(), fThickness),
				sType : "static"
			})
		);

		this.aWallList	= [cLeft, cRight, cTop, cBottom];
	},

	updateInput : function() {
		var cActionMap	= this.cInputManager.getLiveActions();

		// movement
		var cMoveVec	= new b2.Vec2(0, 0);

		if (cActionMap[Actions.MOVE_UP])	cMoveVec.y	-= 1.0;
		if (cActionMap[Actions.MOVE_DOWN]) 	cMoveVec.y	+= 1.0;
		if (cActionMap[Actions.MOVE_LEFT]) 	cMoveVec.x	-= 1.0;
		if (cActionMap[Actions.MOVE_RIGHT])	cMoveVec.x	+= 1.0;

		cMoveVec.Normalize();
		cMoveVec.Multiply(this.cPlayer.getMoveSpeed());

		this.cPlayer.setVelocity(cMoveVec.x, cMoveVec.y);

		// firing
		var cFireVec	= new b2.Vec2(0, 0);

		if (cActionMap[Actions.FIRE_UP])	cFireVec.y	-= 1.0;
		if (cActionMap[Actions.FIRE_DOWN]) 	cFireVec.y	+= 1.0;
		if (cActionMap[Actions.FIRE_LEFT]) 	cFireVec.x	-= 1.0;
		if (cActionMap[Actions.FIRE_RIGHT])	cFireVec.x	+= 1.0;

		cFireVec.Normalize();

		this.cPlayer.setFireVec(cFireVec.x, cFireVec.y);
	},

	updatePlayer : function(iTime) {
		this.cPlayer.update(iTime);

		if (this.cPlayer.getVelocity().LengthSquared() > 0)
			this.cPlayer.getLegAnim().stepFrames(1);

		if (this.cPlayer.getFireVec().LengthSquared() > 0)
		{
			var cWeaponState	= this.cPlayer.getWeaponLeft();

			if (cWeaponState.tryFire())
			{
				// play bullet sound
				this.cSoundManager.startSound(SoundNames.MACH_GUN, 0);

				// create muzzle flash
				var cFlash	= new VisualEntity(
					new AnimState(
						cWeaponState.getInfo().getFlashInfo()
					)
				);

				cFlash.setPos(this.cPlayer.getPos().x, this.cPlayer.getPos().y);
				cFlash.setRot(this.cPlayer.getTurretRot());

				this.aAnimList.push(cFlash);

				// create projectile outside of owner's bounds, otherwise it will hit them...
				// should look at improving this later.
				var cPos	= this.cPlayer.getPos();
				var cOffset	= this.cPlayer.getFireVec();

				cOffset.Multiply(this.cPlayer.getDim().x + 0.3);
				cPos.Add(cOffset);

				var cProj	= new Projectile(
					this.cPhysicsManager.addBody({
						cPos : cPos,
						cDim : new b2.Vec2(0.2, 0.2)
					}),
					cWeaponState.getInfo(),
					this.cPlayer,
					0.0
				);

				cProj.getPhysicsBody().SetBullet(true);
				cProj.getPhysicsBody().SetAngle(this.cPlayer.getTurretRot());

				cProj.setOnContact(
					Utils.bindFunc(this, this.onProjContact, cProj)
				);

				var cVel	= this.cPlayer.getFireVec();
				cVel.Multiply(cWeaponState.getInfo().getProjSpeed());

				cProj.setVelocity(cVel.x, cVel.y);

				this.aProjList.push(cProj);
			}
		}
	},

	onProjContact : function(cProj, cOtherEnt) {
		cProj.flagKilled();
		this.playSound(SoundNames.GRENADE, cProj.getPos());

		// create impact anim
		var cAnim	= new VisualEntity(
			new AnimState(
				cProj.getCreatorInfo().getImpactInfo()
			)
		);
		cAnim.setPos(cProj.getPos().x, cProj.getPos().y);
		cAnim.setRot(cProj.getPhysicsBody().GetAngle());

		this.aAnimList.push(cAnim);
	},

	updateAnims : function() {
		var cAnim;

		for (var i in this.aAnimList)
		{
			cAnim	= this.aAnimList[i];

			if (cAnim.getAnim().getCurrentFrame() < cAnim.getAnim().getAnimInfo().getLastFrame())
				cAnim.getAnim().stepFrames(1);
			else
				cAnim.flagKilled();
		}

		this.aAnimList	= this.aAnimList.filter(function(cItem) {
			return !cItem.getIsKilled();
		});
	},

	playSound : function(sName, cPos) {
		var fVol;
		var fDist;
		
		// calculate distance from player to sound
		cPos.Subtract(this.cPlayer.getPos());

		fDist	= cPos.LengthSquared();

		// calculate volume based on distance
		var fMaxDist	= (this.cViewRect.w * this.cViewRect.w + this.cViewRect.h * this.cViewRect.h) * 2;
		fVol			= 1.0 - (fDist / fMaxDist);

		// play sound
		this.cSoundManager.getSound(sName).setVolume(fVol);
		this.cSoundManager.startSound(sName, 0);		
	},

	render : function() {
		// clear stage
		this.cStage.width	= this.cStage.width;
		// get context
		var cCtx			= this.cStage.getContext("2d");

		// clone a copy of the view rect for this render iteration
		var cViewRect		= this.cViewRect.clone();

		// update view rect position to centre on player
		var cViewCentre		= new b2.Vec2(
			cViewRect.midPoint().x,
			cViewRect.midPoint().y
		);
		var cOffset			= this.cPlayer.getPos();
		cOffset.Subtract(cViewCentre);

		cViewRect.offset(cOffset.x, cOffset.y);
		
		// clamp view rect to map area
		var cCorrection		= new b2.Vec2(0, 0);

		if (cViewRect.left() < this.cMapBounds.left())		cCorrection.x	= this.cMapBounds.left() - cViewRect.left();
		if (cViewRect.right() > this.cMapBounds.right())	cCorrection.x	= this.cMapBounds.right() - cViewRect.right();
		if (cViewRect.top() < this.cMapBounds.top())		cCorrection.y	= this.cMapBounds.top() - cViewRect.top();
		if (cViewRect.bottom() > this.cMapBounds.bottom())	cCorrection.y	= this.cMapBounds.bottom() - cViewRect.bottom();

		cViewRect.offset(cCorrection.x, cCorrection.y);

		// scale up view rect to global scale
		cViewRect.scale(this.fGlobalScale, this.fGlobalScale);

		// define a funtion that resets context position to the position of our viewing rect
		var zResetContext	= function() {
			cCtx.setTransform(1, 0, 0, 1, -cViewRect.x, -cViewRect.y);
		};

		var fGlobalScale	= this.fGlobalScale;
		var zApplyTransform	= function(cPos, fRot) {
			cCtx.translate(cPos.x * fGlobalScale, cPos.y * fGlobalScale);
			cCtx.rotate(fRot);
		};

		// draw bg
		cCtx.setTransform(1, 0, 0, 1, 0, 0);

		cCtx.drawImage(this.cBgImage, cViewRect.x, cViewRect.y, cViewRect.w, cViewRect.h, 0, 0, cViewRect.w, cViewRect.h);

		zResetContext();

		// draw player
		// legs

		var cPos	= this.cPlayer.getPos();
		var fRot	= this.cPlayer.getLegRot();

		zApplyTransform(cPos, fRot);

		this.cAtlasRenderer.draw(
			this.cAtlasParser.getImageData(
				this.cPlayer.getLegAnim().getCurrentName()
			)
		);

		zResetContext();
		
		// body
		fRot		= this.cPlayer.getTurretRot();

		zApplyTransform(cPos, fRot);

		this.cAtlasRenderer.draw(
			this.cAtlasParser.getImageData(
				this.cPlayer.getTurretName()
			)
		);

		// right weapon
		this.cAtlasRenderer.draw(
			this.cAtlasParser.getImageData(
				this.cPlayer.getWeaponRight().getInfo().getImageName()
			)
		);

		// left weapon
		cCtx.rotate(Math.PI);
		cCtx.scale(-1.0, -1.0);

		this.cAtlasRenderer.draw(
			this.cAtlasParser.getImageData(
				this.cPlayer.getWeaponLeft().getInfo().getImageName()
			)
		);

		zResetContext();

		// draw anims
		var cAnim;

		for (var i in this.aAnimList)
		{
			cAnim	= this.aAnimList[i];

			zApplyTransform(cAnim.getPos(), cAnim.getRot());

			this.cAtlasRenderer.draw(
				this.cAtlasParser.getImageData(
					cAnim.getAnim().getCurrentName()
				)
			);

			zResetContext();
		}

		// draw projectiles
		var cProj;

		for (var i in this.aProjList)
		{
			cProj	= this.aProjList[i];

			zApplyTransform(cProj.getPos(), cProj.getPhysicsBody().GetAngle());

			this.cAtlasRenderer.draw(
				this.cAtlasParser.getImageData(
					cProj.getAnim().getCurrentName()
				)
			);

			zResetContext();
		}

		var cArea;

		// draw player hit rect
		cArea	= new Rect(this.cPlayer.getPos().x, this.cPlayer.getPos().y, this.cPlayer.getDim().x, this.cPlayer.getDim().y);
		cArea.offset(-this.cPlayer.getDim().x / 2, -this.cPlayer.getDim().y / 2);

		zApplyTransform(cArea.midPoint(), this.cPlayer.getLegRot());

		cArea.scale(this.fGlobalScale, this.fGlobalScale);

		cCtx.beginPath();
		cCtx.strokeStyle	= "green";
		cCtx.strokeRect(-cArea.w / 2, -cArea.h / 2, cArea.w, cArea.h);
		cCtx.closePath();

		zResetContext();

		// draw walls
		var cItem;

		for (var i in this.aWallList)
		{
			cItem	= this.aWallList[i];
			cArea	= new Rect(cItem.getPos().x, cItem.getPos().y, cItem.getDim().x, cItem.getDim().y);			
			cArea.offset(-cItem.getDim().x / 2, -cItem.getDim().y / 2);
			cArea.scale(this.fGlobalScale, this.fGlobalScale);

			cCtx.beginPath();
			cCtx.fillStyle	= "red";
			cCtx.fillRect(cArea.x, cArea.y, cArea.w, cArea.h);
			cCtx.closePath();
		}
	},

	onContact : function(cBodyA, cBodyB, aImpulses) {
		// console.log("cBodyA = " , cBodyA);
		// console.log("cBodyB = " , cBodyB);
		// console.log("aImpulses = " , aImpulses);

		var cEntA	= cBodyA.GetUserData();
		var cEntB	= cBodyB.GetUserData();

		cEntA.onContact(cEntB);
		cEntB.onContact(cEntA);
	},

	update : function() {
		// update logic here
		var iTimeNow	= Date.now();
		var iTime		= iTimeNow - this.iLastUpdate;

		this.updateInput();
		this.cPhysicsManager.update();

		this.updatePlayer(iTime);
		this.updateAnims();

		this.aProjList.forEach(function(cItem) {
			cItem.update();
		});

		for (var i = this.aProjList.length - 1; i >= 0; --i)
		{
			if (this.aProjList[i].getIsKilled())
			{
				// console.log("Die!!!");

				this.cPhysicsManager.removeBody(
					this.aProjList[i].getPhysicsBody()
				);
				this.aProjList.splice(i, 1);
			}
		}

		this.render();

		this.iLastUpdate	= iTimeNow;

		// create next update handle here
		this.cUpdateHandle	= this.zRafFunc.call(null, Utils.bindFunc(this, this.update));
	}
});