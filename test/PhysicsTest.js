var PhysicsTest	= Class.extend({
	cPhysicsMan : null,
	cTestEntA : null,
	cTestEntB : null,

	init : function() {
		this.cPhysicsMan	= new PhysicsManager(
			new b2.Vec2(0.0, 0.0),
			false
		);

		var cBody	= this.cPhysicsMan.addBody({
			sType : "static",
			cPos : new Vec2(0.0, 0.0),
			cDim : new Vec2(1.0, 1.0),
			bIsBouncy : true
		});

		this.cPhysicsMan.removeBody(cBody);

		this.cPhysicsMan.addContactListener({
			PostSolve : function(cBodyA, cBodyB, fImpulse) {
				console.log("collision post-solve!");
				var cEntA	= cBodyA.GetUserData();
				var cEntB	= cBodyB.GetUserData();

				cEntA.onTouch(cEntB, fImpulse);
				cEntB.onTouch(cEntA, fImpulse);
			}
		});

		this.entityPhysicsTest();

		setInterval(
			Utils.bindFunc(this, this.update),
			1000
		);
	},

	entityPhysicsTest : function() {
		var cPhysicsMan	= this.cPhysicsMan;

		var TestEnt	= Entity.extend({
			cPhysBody : null,
			cVel : null,

			sName : null,

			init : function(sName) {
				this.sName	= sName;

				this.cVel	= new b2.Vec2(0, 0);
			},

			initPhysics : function(cPos, cDim) {
				this.cPhysBody	= cPhysicsMan.addBody({
					cPos : cPos,
					cDim : cDim,
					cUserData : this
				});
			},

			onTouch : function(cOtherEnt, fImpulse) {
				console.log(this.sName + " is touching " + cOtherEnt.sName);
				//console.log("...and impulse = " + fImpulse);
			},

			update : function() {
				var cPosNow	= this.cPhysBody.GetPosition();

				this.cPos.x	= cPosNow.x;
				this.cPos.y	= cPosNow.y;

				//console.log(this.sName + " : cVel = " , this.cVel);
				this.cPhysBody.SetLinearVelocity(this.cVel);

				//console.log("update!");
				console.log(this.sName + " : cPos = " , this.cPos);

				this._super();
			}
		});

		this.cTestEntA	= new TestEnt("A");
		this.cTestEntA.initPhysics(new Vec2(0, 0), new Vec2(2.0, 2.0));
		
		this.cTestEntB	= new TestEnt("B");
		this.cTestEntB.initPhysics(new Vec2(5.0, 1.0), new Vec2(1.0, 1.0));

		this.cTestEntA.cVel.x	= 60.0;
		this.cTestEntB.cVel.x	= 0.0;
	},

	update : function() {
		this.cPhysicsMan.update();

		this.cTestEntA.update();
		this.cTestEntB.update();
	}
});