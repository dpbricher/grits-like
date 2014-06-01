var WeaponState	= Class.extend({
	cInfo : null,

	// Time *since* the weapon last fired, in milliseconds
	iLastFireTime : 0,

	iAmmoLeft : 0,

	init : function(cWeaponInfo) {
		this.setInfo(cWeaponInfo);

		this.iLastFireTime	= Number.POSITIVE_INFINITY;
	},

	setInfo : function(cWeaponInfo) {
		this.cInfo	= cWeaponInfo;
	},

	getInfo : function() {
		return this.cInfo;
	},

	setAmmoLeft : function(iRounds) {
		this.iAmmoLeft	= iRounds;
	},

	getAmmoLeft : function() {
		return this.iAmmoLeft;
	},

	/**
	 * Call this function whenever you want the weapon to fire
	 * If the weapon is ready and capable of firing it will update the necessary vars return true
	 * Otherwise will return false
	 */
	tryFire : function() {
		var bSuccess	= false;

		if (this._canFire())
		{
			bSuccess	= true;

			--this.iAmmoLeft;
			this.iLastFireTime	= 0;
		}

		return bSuccess;
	},

	update : function(iTime) {
		this.iLastFireTime	+= iTime;
	},

	_canFire : function() {
		return (this.iLastFireTime >= this.cInfo.getFireDelay() && this.iAmmoLeft > 0);
	}
});