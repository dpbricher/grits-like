/**
 * Class for mapping entity names to their corresponding classes
 */
var EntityFactory	= Class.extend({
	// map of entity classes
	cClassMap : {},

	setMapping : function(sName, cClass) {
		this.cClassMap[sName]	= cClass;
	},

	getMapping : function(sName) {
		return this.cClassMap[sName];
	}
});