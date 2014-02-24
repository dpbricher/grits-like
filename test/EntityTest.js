var EntityTest	= Class.extend({
	init : function() {
		var cEnt		= new Entity();

		cEnt.setPos(10, 20);
		cEnt.setDim(100, 50);

		console.log("position = " , cEnt.getPos());
		console.log("dimensions = " , cEnt.getDim());
		
		var cFactory	= new EntityFactory();

		var cTestEnt	= Entity.extend({
			cTestProp : "TEST!"
		});

		cFactory.setMapping("entity", Entity);
		cFactory.setMapping("test-entity", cTestEnt);

		var cEntA		= cFactory.getInstanceFromName("entity");
		var cEntB		= cFactory.getInstanceFromName("test-entity");

		console.log("cEntA = " , cEntA);
		console.log("cEntB = " , cEntB);
	}
});