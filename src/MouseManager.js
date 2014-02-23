var MouseManager	= Class.extend({
	cListenerTarget : null,

	cButtonsHeld : {},

	init : function(cListenerRef) {
		this.cListenerTarget	= cListenerRef;

		var cThis	= this;

		this.cListenerTarget.addEventListener("mouseup", function(e) { cThis.onButtonUp(e); });
		this.cListenerTarget.addEventListener("mousedown", function(e) { cThis.onButtonDown(e); });
	},

	onButtonUp : function(e) {
		delete this.cButtonsHeld[e.button];
	},

	onButtonDown : function(e) {
		this.cButtonsHeld[e.button]	= e;
	},

	getHeldButtons : function() {
		return this.cButtonsHeld;
	}
});