/**
 * TODO: each renderer can currently only renders to the canvas it was inited
 * with -_-; Change this
 */
var RenderEngine	= Class.extend({
	// Rect denoting entire map area
	cMapBounds : null,

	cAtlasParser : null,
	cTiledParser : null,

	cAtlasRenderer : null,
	cTiledRenderer: null,

	cEntityList : null,

	/**
	 * entities to render viewports on
	 * values should have the following properties:
	 * 	cEntity; 	entity to focus viewport on
	 * 	cCanvas;	drawing object to render to
	 * 	cViewport; 	Rect of size of viewport
	 */
	aCameraTargets : [],

	// scale at which to render entities
	fRenderScale : 10.0,

	init : function(cAtlasParser, cTiledParser, cAtlasRenderer, cTiledRenderer,
		cEntityList) {
		this.cAtlasParser	= cAtlasParser;
		this.cTiledParser	= cTiledParser;
		this.cAtlasRenderer	= cAtlasRenderer;
		this.cTiledRenderer	= cTiledRenderer;

		this.cEntityList	= cEntityList;

		this.cMapBounds		= new Rect(0, 0, this.cTiledRenderer.getDim().x,
			this.cTiledRenderer.getDim().y);

		this.cEntityList.getPlayers().forEach(
			this._initPlayer.bind(this)
		);
	},

	update : function(t) {
		var cParams;
		
		this.cEntityList.getPlayers().forEach(
			function(cPlayer) {
				this._updatePlayer(cPlayer, t)
			}.bind(this)
		);

		for (var i in this.aCameraTargets)
		{
			cParams	= this.aCameraTargets[i];

			this._renderViewport(cParams.cCanvas, cParams.cEntity,
				cParams.cViewport.clone());
		}
	},

	addCameraTarget : function(cCanvas, cEntity, cViewport) {
		this.aCameraTargets.push({
			cCanvas : cCanvas,
			cEntity : cEntity,
			cViewport : cViewport
		});
	},


	_initPlayer : function(cPlayer) {
		cPlayer.initLegAnim(
			new AnimInfo(
				Object.keys(this.cAtlasParser.cImageMap),
				SequenceNames.WALK_RIGHT
			)
		);

		cPlayer.setTurretName(ImageNames.TURRET);
	},

	_updatePlayer : function(cPlayer, t) {
		if (cPlayer.getVelocity().LengthSquared() > 0)
			cPlayer.getLegAnim().stepFrames(1);
	},

	_centreContext : function(cCtx, cViewport) {
		cCtx.setTransform(1, 0, 0, 1, -cViewport.x, -cViewport.y);
	},

	_transformContext : function(cCtx, cPos, fRot, cScale) {
		if (cScale == null)
			cScale	= new Vec2(this.fRenderScale, this.fRenderScale);

		cCtx.translate(cPos.x * cScale.x, cPos.y * cScale.y);
		cCtx.rotate(fRot);
	},

	_renderViewport : function(cCanvas, cFocus, cViewport) {
		// clear canvas
		cCanvas.width	= cCanvas.width;

		var cCtx		= cCanvas.getContext("2d");

		// centre viewport on focus target
		cViewport.x	= cFocus.getPos().x * this.fRenderScale - cViewport.w / 2;
		cViewport.y	= cFocus.getPos().y * this.fRenderScale - cViewport.h / 2;

		// clamp to map bounds
		if (cViewport.x < this.cMapBounds.x)
			cViewport.x	= this.cMapBounds.x;

		if (cViewport.y < this.cMapBounds.y)
			cViewport.y	= this.cMapBounds.y;
		
		if (cViewport.right() > this.cMapBounds.right())
			cViewport.x	= this.cMapBounds.right() - cViewport.w;

		if (cViewport.bottom() > this.cMapBounds.bottom())
			cViewport.y	= this.cMapBounds.bottom() - cViewport.h;

		// cCtx.setTransform(1, 0, 0, 1, 0, 0);

		// render bg
		this.cTiledRenderer.draw(cViewport);

		// render entities
		this.cEntityList.getPlayers().forEach(
			function(cPlayer) {
				this._renderPlayer(cCtx, cViewport, cPlayer)
			}.bind(this)
		);

		this.cEntityList.getProjectiles().forEach(
			function(cProj) {
				this._renderProjectile(cCtx, cViewport, cProj)
			}.bind(this)
		);
	},

	_renderProjectile : function(cCtx, cViewport, cProj) {
		this._centreContext(cCtx, cViewport);
		
		this._transformContext(cCtx, cProj.getPos(),
			cProj.getPhysicsBody().GetAngle());

		this.cAtlasRenderer.draw(
			this.cAtlasParser.getImageData(
				cProj.getAnim().getCurrentName()
			)
		);
	},

	_renderPlayer : function(cCtx, cViewport, cPlayer) {
		this._centreContext(cCtx, cViewport);
		this._transformContext(cCtx, cPlayer.getPos(), cPlayer.getLegRot());

		// legs
		this.cAtlasRenderer.draw(
			this.cAtlasParser.getImageData(
				cPlayer.getLegAnim().getCurrentName()
			)
		);

		this._centreContext(cCtx, cViewport);
		this._transformContext(cCtx, cPlayer.getPos(), cPlayer.getTurretRot());

		// turret
		this.cAtlasRenderer.draw(
			this.cAtlasParser.getImageData(
				cPlayer.getTurretName()
			)
		);

		// right weapon
		this.cAtlasRenderer.draw(
			this.cAtlasParser.getImageData(
				cPlayer.getWeaponRight().getInfo().getImageName()
			)
		);

		// left weapon
		this.cAtlasRenderer.draw(
			this.cAtlasParser.getImageData(
				cPlayer.getWeaponLeft().getInfo().getImageName()
			)
		);
	}
});