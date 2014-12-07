var GameEngine	= Class.extend({
	cPlayer1 : null,
	cPlayer2 : null,

	cAtlasParser : null,

	cPhysicsManager : null,

	cEntityList : null,

	init : function(cPlayer1, cPlayer2, cEntityList, cAtlasParser,
		cPhysicsManager) {
		this.cPlayer1			= cPlayer1;
		this.cPlayer2			= cPlayer2;
		
		this.cAtlasParser		= cAtlasParser;

		this.cPhysicsManager	= cPhysicsManager;

		this.cEntityList		= cEntityList;

		// init players
		var cFlashAnim, cProjAnim, cImpactAnim;
		var aSequenceList	= Object.keys(this.cAtlasParser.cImageMap);

		cFlashAnim	= new AnimInfo(aSequenceList,
			SequenceNames.MACHGUN_MUZZLE);
		cProjAnim	= new AnimInfo(aSequenceList,
			SequenceNames.MACHGUN_PROJECTILE);
		cImpactAnim	= new AnimInfo(aSequenceList,
			SequenceNames.MACHGUN_IMPACT);
		
		var cMachProj		= new ProjectileInfo(cProjAnim, cImpactAnim,
			new b2.Vec2(0.2, 0.2), SoundNames.GRENADE, 6.0 * 10, 1.0);
		var cMachGun		= new WeaponInfo(cFlashAnim, cMachProj,
			new b2.Vec2(this.cPlayer1.getDim().x * 0.35,
			-this.cPlayer1.getDim().y / 2), ImageNames.MACHGUN,
			SoundNames.MACH_GUN, "machgun", 200);

		cFlashAnim	= new AnimInfo(aSequenceList, SequenceNames.ROCKET_MUZZLE);
		cProjAnim	= new AnimInfo(aSequenceList,
			SequenceNames.ROCKET_PROJECTILE);
		cImpactAnim	= new AnimInfo(aSequenceList, SequenceNames.ROCKET_IMPACT);

		var cRocketProj		= new ProjectileInfo(cProjAnim, cImpactAnim,
			new b2.Vec2(0.4, 0.4), SoundNames.EXPLODE, 6.0 * 8, 10.0);
		var cRocketLauncher	= new WeaponInfo(cFlashAnim, cRocketProj,
			new b2.Vec2(this.cPlayer1.getDim().x / 4,
				-this.cPlayer1.getDim().y / 2), ImageNames.ROCKET_LAUNCHER,
			SoundNames.ROCKET, "rocket_launcher", 1000);

		this.cPlayer1.setWeaponLeft(
			new WeaponState(cRocketLauncher)
		);
		this.cPlayer1.setWeaponRight(
			new WeaponState(cMachGun)
		);
		this.cPlayer1.getWeaponLeft().setAmmoLeft(Number.POSITIVE_INFINITY);
		this.cPlayer1.getWeaponRight().setAmmoLeft(Number.POSITIVE_INFINITY);

		this.cPlayer1.setMoveSpeed(6.0 * 5);
		this.cPlayer1.setHitPoints(100);

		this.cEntityList.addEntity(this.cPlayer1);
	},

	update : function(t) {
		this._updatePlayer(this.cPlayer1, t);
	},

	_updatePlayer : function(cPlayer, t) {
		cPlayer.update(t);
		
		if (cPlayer.getHitPoints() <= 0)
			cPlayer.flagKilled();

		/*if (cPlayer.getFireVec().LengthSquared() > 0)
		{
			var cWeaponState;
			var aWeapons		= [
				cPlayer.getWeaponLeft(),
				cPlayer.getWeaponRight()
			];

			for (var i in aWeapons)
			{
				cWeaponState	= aWeapons[i];

				if (cWeaponState.tryFire())
				{
					// play weapon fire sound
					// this.cSoundManager.startSound(cWeaponState.getInfo().getFireSoundName(), 0);

					// create muzzle flash
					var cFlash	= new VisualEntity(
						new AnimState(
							cWeaponState.getInfo().getFlashAnim()
						)
					);

					cFlash.setPos(cPlayer.getPos().x, cPlayer.getPos().y);
					cFlash.setRot(cPlayer.getTurretRot());

					// this.aAnimList.push(cFlash);
					this.cEntityList.addEntity(cFlash);

					// create projectile
					var cPos	= cPlayer.getPos();
					var cOffset	= cWeaponState.getInfo().getMuzzleOffset();

					// muzzle offsets are for the right weapon facing upwards, so flip sides if for the left weapon
					if (cWeaponState == cPlayer.getWeaponLeft())
						cOffset.x	= -cOffset.x;

					// offset projectile's pos by its height
					cOffset.y	-= cWeaponState.getInfo().getProjInfo().getDim().y;

					// rotate pos around player based on turret facing
					var cRotMat	= new b2.Mat22();
					cRotMat.Set(cPlayer.getTurretRot() - Math.PI / 2);

					cOffset.MulM(cRotMat);

					cPos.Add(cOffset);

					var cProj	= new Projectile(
						this.cPhysicsManager.addBody({
							cPos : cPos,
							cDim : cWeaponState.getInfo().getProjInfo().getDim()
						}),
						cWeaponState.getInfo().getProjInfo(),
						cPlayer,
						0.0
					);

					cProj.getPhysicsBody().SetBullet(true);
					cProj.getPhysicsBody().SetAngle(cPlayer.getTurretRot());

					cProj.setOnContact(
						Utils.bindFunc(this, this.onProjContact, cProj)
					);

					var cVel	= cPlayer.getFireVec();
					cVel.Multiply(cWeaponState.getInfo().getProjInfo().getSpeed());

					cProj.setVelocity(cVel.x, cVel.y);

					// this.aProjList.push(cProj);
					this.cEntityList.addEntity(cProj);
				}
			}
		}*/
	}
});