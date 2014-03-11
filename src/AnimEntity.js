var AnimEntity	= Entity.extend({
	cAnimState : null,

	setAnim : function(cAnim) {
		this.cAnimState	= cAnim;
	},

	getAnim : function() {
		return this.cAnimState;
	}
});