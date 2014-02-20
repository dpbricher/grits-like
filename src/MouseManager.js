var MouseManager	= Class.extend({
	cListenerTarget : null,

	aButtonsHeld : [],

	init : function(cListenerRef) {
		this.cListenerTarget	= cListenerRef;

		var cThis	= this;

		this.cListenerTarget.addEventListener("mouseup", function(e) { cThis.onButtonUp(e); });
		this.cListenerTarget.addEventListener("mousedown", function(e) { cThis.onButtonDown(e); });
	},

	onButtonUp : function(e) {
		delete this.aButtonsHeld[e.button];
	},

	onButtonDown : function(e) {
		this.aButtonsHeld[e.button]	= e;
	},

	getHeldButtons : function() {
		return this.aButtonsHeld.slice();
	}
});