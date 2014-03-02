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
		for (var sKey in this.cEntityMap)
		{
			if (this.cEntityMap[sKey] == cEntity)
			{
				delete this.cEntityMap[sKey];
				break;
			}
		}
	},

	_removeEntityByKey : function(sKey) {
		delete this.cEntityMap[sKey];
	},

	update : function() {
		var cEntity;
		var aKilledKeys	= [];

		for (var sKey in this.cEntityMap)
		{
			cEntity	= this.cEntityMap[sKey];

			cEntity.update();

			if (cEntity.getIsKilled())
			{
				aKilledKeys.push(sKey);
			}
		}

		for (var i in aKilledKeys)
		{
			this._removeEntityByKey(aKilledKeys[i]);
		}
	}
});