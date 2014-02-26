var Entity	= Class.extend({
	cPos : new Vec2(0, 0),
	cDim : new Vec2(0, 0),

	bIsKilled : false,

	update : function() {
	},

	getPos : function() {
		return this.cPos.clone();
	},

	setPos : function(x, y) {
		this.cPos.x	= x;
		this.cPos.y	= y;
	},

	getDim : function() {
		return this.cDim.clone();
	},

	setDim : function(w, h) {
		this.cDim.x	= w;
		this.cDim.y	= h;
	},

	flagKilled : function() {
		this.bIsKilled	= true;
	},

	getIsKilled : function() {
		return this.bIsKilled;
	}
});