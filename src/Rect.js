var Rect	= Class.extend({
	x : 0,
	y : 0,
	w : 0,
	h : 0,

	init : function(x, y, w, h) {
		this.x	= x;
		this.y	= y;
		this.w	= w;
		this.h	= h;
	},

	left : function() { return this.x },
	top : function() { return this.y },
	right : function() { return this.x + this.w },
	bottom : function() { return this.y + this.h },

	midPoint : function() {
		return new Vec2(this.x + this.w / 2, this.y + this.h / 2)
	},

	contains : function(x, y) {
		return !(
			this.left() > x ||
			this.right() < x ||
			this.top() > y ||
			this.bottom() < y
		);
	},

	offset : function(x, y) {
		this.x	+= x;
		this.y	+= y;
	},

	clone : function() {
		return new Rect(this.x, this.y, this.w, this.h);
	}
});