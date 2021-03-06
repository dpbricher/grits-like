/**
 * more convenient namespacing for box2dweb classes
 */
var b2	= {
	Vec2 : Box2D.Common.Math.b2Vec2,
	Mat22 : Box2D.Common.Math.b2Mat22,
	BodyDef : Box2D.Dynamics.b2BodyDef,
	Body : Box2D.Dynamics.b2Body,
	ContactFilter : Box2D.Dynamics.b2ContactFilter,
	ContactListener : Box2D.Dynamics.b2ContactListener,
	FixtureDef : Box2D.Dynamics.b2FixtureDef,
	Fixture : Box2D.Dynamics.b2Fixture,
	World : Box2D.Dynamics.b2World,
	MassData : Box2D.Collision.Shapes.b2MassData,
	PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
	CircleShape : Box2D.Collision.Shapes.b2CircleShape,
	DebugDraw : Box2D.Dynamics.b2DebugDraw,
	RevoluteJointDef : Box2D.Dynamics.Joints.b2RevoluteJointDef
};