var KeyboardManager	= Class.extend({
	cListenerTarget : null,

	// array where indexes of currently held keys are set to "true"
	aKeysDown : [],

	init : function(cListenerRef) {
		this.cListenerTarget	= cListenerRef;

		var cThis	= this;

		this.cListenerTarget.addEventListener("keyup", function(e) { cThis.onKeyUp(e); });
		this.cListenerTarget.addEventListener("keydown", function(e) { cThis.onKeyDown(e); });

		// this.cListenerTarget.addEventListener("blur", function(e) { cThis.wipeHeldKeys(e); });
	},

	onKeyUp : function(e) {
		delete this.aKeysDown[e.keyCode];
	},

	onKeyDown : function(e) {
		this.aKeysDown[e.keyCode]	= true;
	},

	/**
	 * this doesn't work -_- (at least not on the body element...)
	 */
	// wipeHeldKeys : function(e) {
	// 	this.aKeysDown	= [];
	// },

	getHeldKeys : function() {
		return this.aKeysDown.slice();
	}
});