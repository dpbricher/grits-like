/**
 * Base entity class
 */
var Entity	= Class.extend({
	cPos : null,

	// save dimensions as half width / height because that's the values that Box2D uses
	cHalfDim : null,

	// type of entity; Should be redefined by any classes that extend this one
	sType : "Entity",

	bIsKilled : false,

	init : function() {
		this.cPos		= new b2.Vec2(0, 0);
		this.cHalfDim	= new b2.Vec2(0, 0);
	},

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
	},

	getType : function() {
		return this.sType;
	}
});