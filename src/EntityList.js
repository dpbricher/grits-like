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
				aProjList.push(cEntity);
				break;
		
			case PlayerEntity.prototype.getType():
				aPlayerList.push(cEntity);
				break;
		
			case PhysicsEntity.prototype.getType():
				aWallList.push(cEntity);
				break;
		
			case VisualEntity.prototype.getType():
				aVisualList.push(cEntity);
				break;

			default:
				console.error("Unknown entity : ", cEntity);
		}
	},

	getProjectiles : function() {
		return aProjList;
	},

	getPlayers : function() {
		return aPlayerList;
	},

	getWalls : function() {
		return aWallList;
	},

	getVisuals : function() {
		return aVisualList;
	},

	getAll : function() {
		return aProjList
			.concat(aPlayerList)
			.concat(aWallList)
			.concat(aVisualList);
	}
});