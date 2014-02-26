var EntityManager	= Class.extend({
	cEntityMap : {},

	iNextId : 0,
/*
	init : function() {
		//
	},
*/
	addEntity : function(cEntity) {
		++this.iNextId;

		var sKey				= this.iNextId.toString();

		this.cEntityMap[sKey]	= cEntity;
	},

	removeEntity : function(cEntity) {
		for (var sKey in cEntityMap)
		{
			if (cEntityMap[sKey] == cEntity)
			{
				delete cEntityMap[sKey];
				break;
			}
		}
	},

	update : function() {
		var cEntity;
		var aKilled	= [];

		for (var sKey in cEntityMap)
		{
			cEntity	= cEntityMap[sKey];

			cEntity.update();

			if (cEntity.getIsKilled())
			{
				aKilled.push(sKey);
			}
		}

		for (var i in aKilled)
		{
			this.removeEntity(aKilled[i]);
		}
	}
});