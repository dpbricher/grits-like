var KeyboardManager	= Class.extend({
	cListenerTarget : null,

	// map where indexes of currently held keys are set to "true"
	cKeysDown : {},

	bBlockDefaults : true,

	init : function(cListenerRef) {
		this.cListenerTarget	= cListenerRef;

		var cThis	= this;

		this.cListenerTarget.addEventListener("keyup", function(e) { cThis.onKeyUp(e); });
		this.cListenerTarget.addEventListener("keydown", function(e) { cThis.onKeyDown(e); });
	},

	onKeyUp : function(e) {
		if (this.bBlockDefaults)
			e.preventDefault();

		delete this.cKeysDown[e.keyCode];
	},

	onKeyDown : function(e) {
		if (this.bBlockDefaults)
			e.preventDefault();

		this.cKeysDown[e.keyCode]	= true;
	},

	setBlockDefaults : function(bBlock) {
		this.bBlockDefaults	= bBlock;
	},

	getBlockDefaults : function() {
		return this.bBlockDefaults;
	},

	getHeldKeys : function() {
		return this.cKeysDown;
	}
});