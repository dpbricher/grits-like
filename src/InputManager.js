var InputManager	= Class.extend({
	cKeyManager : null,
	cMouseManager : null,

	cBindingsMap : {},

	cActionsList : {},

	init : function(cKeyManager, cMouseManager) {
		this.cKeyManager	= cKeyManager;
		this.cMouseManager	= cMouseManager;
	},

	bindAction : function(iKeyCode, sAction) {
		this.cBindingsMap[iKeyCode]	= sAction;
	},

	unbindAction : function(iKeyCode) {
		delete this.cBindingsMap[iKeyCode];
	},

	clearBindings : function() {
		this.cBindingsMap	= {};
	},

	getLiveActions : function() {
		this._updateActions();
		return this.cActionsList;
	},

	_updateActions : function() {
		var sAction;
		var cHeldKeys	= this.cKeyManager.getHeldKeys();
		var cHeldMbs	= this.cMouseManager.getHeldButtons();

		for (var sCode in this.cBindingsMap)
		{
			sAction	= this.cBindingsMap[sCode];

			if (cHeldKeys[sCode] != null || cHeldMbs[sCode] != null)
			{
				this.cActionsList[sAction]	= true;
			}
			else
			{
				delete this.cActionsList[sAction];
			}
		}
	}
});