var RenderEngine	= Class.extend({
	/**
	 * entities to render viewports on
	 * values should have the following properties:
	 * 	entity; 	entity to focus viewport on
	 * 	canvas;		drawing object to render to
	 * 	viewport; 	Rect of size of viewport
	 */
	cCameraTargets : null,

	cAtlasParser : null,
	cTiledParser : null,

	cAtlasRenderer : null,
	cTiledRenderer: null,

	/**
	 * also need references of all renderable entities here
	 * need to think about how to go about it...
	 */

	init : function(cAtlasParser, cTiledParser, cAtlasRenderer, cTiledRenderer) {
		this.cAtlasParser	= cAtlasParser;
		this.cTiledParser	= cTiledParser;
		this.cAtlasRenderer	= cAtlasRenderer;
		this.cTiledRenderer	= cTiledRenderer;
	},

	update : function(t) {
	}
});