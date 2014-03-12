var EntityTest	= Class.extend({
	cEntMan : null,

	init : function() {
		var cEnt		= new Entity();

		cEnt.setPos(10, 20);
		cEnt.setDim(100, 50);

		console.log("position = " , cEnt.getPos());
		console.log("dimensions = " , cEnt.getDim());
		
		var cFactory	= new EntityFactory();

		var cTestEnt	= Entity.extend({
			cTestProp : "TEST!",

			init : function(sMsg) {
				console.log("Test class inited with message:\n" + sMsg);
			},

			update : function() {
				console.log("updated!");
				this.flagKilled();
			}
		});

		cFactory.setMapping("entity", Entity);
		cFactory.setMapping("test-entity", cTestEnt);

		var cEntA		= new (cFactory.getMapping("entity"))();
		var cEntB		= new (cFactory.getMapping("test-entity"))("Init test msg");

		console.log("cEntA = " , cEntA);
		console.log("cEntB = " , cEntB);

		this.cEntMan	= new EntityManager();

		this.cEntMan.addEntity(cEntA);
		this.cEntMan.addEntity(cEntB);

		setInterval(
			Utils.bindFunc(this, this.update),
			1000
		);

		console.log("this.cEntMan.cEntityMap = " , this.cEntMan.cEntityMap);

		this.cEntMan.removeEntity(cEntA);
	},

	update : function() {
		console.log("this.cEntMan.cEntityMap = " , this.cEntMan.cEntityMap);

		this.cEntMan.update();
	}
});