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
	 *
	 * Can also optionally define the following property:
	 *
	 * cUserData : this can be any desired data, and gets assigned to the created Body's userData property
	 * sType 	 : "static" or "dynamic"
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

		cBodyDef.userData		= cEntityDef.cUserData;

		var cBody				= this._registerBody(cBodyDef);

		var cFixDef				= new b2.FixtureDef();

        cFixDef.density 		= 1.0;
        cFixDef.friction 		= 0.0;
        cFixDef.restitution		= (cEntityDef.bIsBouncy) ? 1.0 : 0.0;

        cFixDef.shape			= new b2.PolygonShape();
        cFixDef.shape.SetAsBox(cEntityDef.cDim.x / 2, cEntityDef.cDim.y / 2);

        cBody.CreateFixture(cFixDef);

        return cBody;
	},

	/**
	 * Takes an object defining box2dweb callback functions, and creates a box2dweb b2ContactListener with those callbacks
	 */
	addContactListener : function (cCallbacks) {
		var cListener	= new b2.ContactListener();

		if (typeof(cCallbacks.PostSolve) == "function")
		{
			cListener.PostSolve	= function (contact, impulse) {
				var cEntA	= contact.GetFixtureA().GetBody().GetUserData();
				var cEntB	= contact.GetFixtureB().GetBody().GetUserData();
				
				cCallbacks.PostSolve(cEntA, cEntB, impulse.normalImpulses[0]);
			};
		}

		this.cWorld.SetContactListener(cListener);
	},

	/**
	 * Similar to addContactListener, but with a b2ContactFilter
	 */
	addContactFilter : function (cCallbacks) {
		var cFilter	= new b2.ContactFilter();

		if (typeof(cCallbacks.ShouldCollide) == "function")
		{
			cFilter.ShouldCollide	= function(cFixA, cFixB) {
				var cEntA	= cFixA.GetBody().GetUserData();
				var cEntB	= cFixB.GetBody().GetUserData();
				
				return cCallbacks.ShouldCollide(cEntA, cEntB);
			};
		}

		this.cWorld.SetContactFilter(cFilter);
	},

	removeBody : function(cBody) {
		this.cWorld.DestroyBody(cBody);
	},

	_registerBody : function(cBodyDef) {
		return this.cWorld.CreateBody(cBodyDef);
	}
});