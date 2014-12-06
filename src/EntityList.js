var EntityList	= Class.extend({
	// walls have physics but no visual representation
	aWallList : [],
	// visual entities have an animation but no physics body
	aVisualList : [],
	// these have both
	aProjList : [],
	aPlayerList: [],

	init : function() {
	},

	addEntity : function(cEntity) {
		switch (cEntity.getType())
		{
			case Projectile.prototype.getType():
				this.aProjList.push(cEntity);
				break;
		
			case PlayerEntity.prototype.getType():
				this.aPlayerList.push(cEntity);
				break;
		
			case PhysicsEntity.prototype.getType():
				this.aWallList.push(cEntity);
				break;
		
			case VisualEntity.prototype.getType():
				this.aVisualList.push(cEntity);
				break;

			default:
				console.error("Unknown entity : ", cEntity);
		}
	},

	getProjectiles : function() {
		return this.aProjList;
	},

	getPlayers : function() {
		return this.aPlayerList;
	},

	getWalls : function() {
		return this.aWallList;
	},

	getVisuals : function() {
		return this.aVisualList;
	},

	getAll : function() {
		return this.aProjList
			.concat(this.aPlayerList)
			.concat(this.aWallList)
			.concat(this.aVisualList);
	}
});