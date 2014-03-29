/**
 * Base class for physics entities that are visually represented by a single animation
 */
var AnimEntity	= PhysicsEntity.extend({
	cAnimState : null,

	init : function(cB2BodyDef, cAnimState) {
		this._super(cB2BodyDef);

		this.setAnim(cAnimState);
	},

	setAnim : function(cAnim) {
		this.cAnimState	= cAnim;
	},

	getAnim : function() {
		return this.cAnimState;
	}
});