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
	 * Can also optionally define the following property:
	 *
	 * cUserData : this can be any desired data, and gets assigned to the created Body's userData property
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

	/**
	 * Takes an object defining box2dweb callback functions, and creates a box2dweb b2ContactListener with those callbacks
	 */
	addContactListener : function (cCallbacks) {
		var cListener	= new b2.ContactListener();

		if (typeof(cCallbacks.PostSolve) == "function")
		{
			/**
			 * According to the udacity course we will want to contruct the callback arguments in the following way.
			 * Will probably look into this myself later, but cba right now :D
			 */
			cListener.PostSolve	= function (contact, impulse) {
				cCallbacks.PostSolve(
					contact.GetFixtureA().GetBody(),
                    contact.GetFixtureB().GetBody(),
                    impulse.normalImpulses[0]
                );
			};
		}

		this.cWorld.SetContactListener(cListener);
	},

	removeBody : function(cBody) {
		this.cWorld.DestroyBody(cBody);
	},

	_registerBody : function(cBodyDef) {
		return this.cWorld.CreateBody(cBodyDef);
	}
});