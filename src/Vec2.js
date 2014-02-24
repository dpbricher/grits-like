var Vec2	= Class.extend({
	x : 0.0,
	y : 0.0,

	init : function(x, y) {
		this.x	= x;
		this.y	= y;
	},

	clone : function() {
		return new Vec2(this.x, this.y);
	}
});