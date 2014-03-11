/**
 * Base entity class
 */
var Entity	= Class.extend({
	cPos : new b2.Vec2(0, 0),

	// save dimensions as half width / height because that's the values that Box2D uses
	cHalfDim : new b2.Vec2(0, 0),

	bIsKilled : false,

	update : function() {
	},

	getPos : function() {
		return this.cPos.Copy();
	},

	setPos : function(x, y) {
		this.cPos.x	= x;
		this.cPos.y	= y;
	},

	getDim : function() {
		var cDim	= this.cHalfDim.Copy();
		cDim.Multiply(2);
		return cDim;
	},

	setDim : function(w, h) {
		this.cHalfDim.x	= w / 2;
		this.cHalfDim.y	= h / 2;
	},

	flagKilled : function() {
		this.bIsKilled	= true;
	},

	getIsKilled : function() {
		return this.bIsKilled;
	}
});