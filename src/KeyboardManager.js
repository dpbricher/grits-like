var KeyboardManager	= Class.extend({
	cListenerTarget : null,

	aKeysDown : [],

	init : function(cListenerRef) {
		this.cListenerTarget	= cListenerRef;

		this.cListenerTarget.addEventListener("keyup", this.onKeyUp);
		this.cListenerTarget.addEventListener("keydown", this.onKeyDown);
	},

	onKeyUp : function(e) {
		console.log("key " + e.keyID + " up!");
	},

	onKeyDown : function(e) {
		console.log("key " + e.keyID + " down!");
	}
});