var PhysicsManager	= Class.extend({
	UPDATES_PER_SEC : 1.0 / 60.0,
	VELOCITY_ITERATIONS : 10,
	POSITION_ITERATIONS : 10,

	cWorld : null,

	init : function(cGravityVec, bDoSleep) {
		this.cWorld	= new b2.World(cGravityVec, bDoSleep);
	},

	update : function() {
		this.cWorld.Step(this.UPDATES_PER_SEC, this.VELOCITY_ITERATIONS, this.POSITION_ITERATIONS);
		this.cWorld.ClearForces();
	},

	/**
	 * cEntityDef should define the following properties:
	 *
	 * cPos : Vec2 of x and y position
	 * cDim : Vec2 of width and height
	 * sType : "static" or "dynamic"
	 * bIsBouncy : set to true for bouncy fixture
	 *
	 * Currently this function is pretty much just a copy of the udacity implementation...
	 */
	addBody : function(cEntityDef) {		
		var cBodyDef	= new b2.BodyDef();

		switch (cEntityDef.sType)
		{
			case "static":
				cBodyDef.type	= b2.Body.b2_staticBody;
				break;

			default:
				cBodyDef.type	= b2.Body.b2_dynamicBody;
		}

		cBodyDef.position.x		= cEntityDef.cPos.x;
		cBodyDef.position.y		= cEntityDef.cPos.y;

		var cBody				= this._registerBody(cBodyDef);

		var cFixDef				= new b2.FixtureDef();

		if(cEntityDef.bIsBouncy)
		{
            cFixDef.density 	= 1.0;
            cFixDef.friction 	= 0.0;
            cFixDef.restitution	= 1.0;
        }

        cFixDef.shape			= new b2.PolygonShape();
        cFixDef.shape.SetAsBox(cEntityDef.cDim.x / 2, cEntityDef.cDim.y / 2);

        cBody.CreateFixture(cFixDef);

        return cBody;
	},

	removeBody : function(cBody) {
		this.cWorld.DestroyBody(cBody);
	},

	_registerBody : function(cBodyDef) {
		return this.cWorld.CreateBody(cBodyDef);
	}
});