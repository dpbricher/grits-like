var AnimTest	= Class.extend({
	cLoader : null,

	aInfoList : null,
	cParser : null,
	cRenderer : null,

	cStage : null,

	init : function() {
		this.cLoader	= new Loader();
		
		this.cLoader.autoLoad("data/grits_effects.json", this.onJsonLoad, this);
	},

	onJsonLoad : function(sJson) {
		this.cParser	= new AtlasParser();

		this.cParser.parse(sJson);

		var aImages		= Object.keys(this.cParser.cImageMap);

		this.aInfoList	= [];

		for (var i in SequenceNames)
		{
			this.aInfoList.push(
				new AnimInfo(aImages, SequenceNames[i])
			);
		}

		this.aInfoList.forEach(function(cItem) {
			console.log(cItem.getFirstName() + " sequence aFrames = " , cItem.aFrames);
		});

		this.cLoader.autoLoad("images/" + this.cParser.getAtlasName(), this.startRenderTest, this);
	},

	startRenderTest : function(cImage) {
		this.cStage			= document.getElementById("stage");

		this.cStage.width	=
		this.cStage.height	= 1000;

		this.cRenderer	= new AtlasRenderer(this.cStage, cImage);

		// do our first tick right now
		this.onTick();

		var cInt	= setInterval(
			Utils.bindFunc(this, this.onTick),
			1000 / 25
		);

		// setTimeout(
		// 	function() {
		// 		clearInterval(cInt);
		// 	},
		// 	3000
		// );
	},

	onTick : function() {
		// clear stage
		this.cStage.width	= this.cStage.width;

		var cData;

		var cNextPos	= new Vec2(50, 50);
		var cInc		= new Vec2(100, 100);

		var zUpdateNext	= function() {
			cNextPos.x	+= cInc.x;

			if (cNextPos.x > this.cStage.width)
			{
				cNextPos.x	%= this.cStage.width;
				cNextPos.y	+= cInc.y;
			}
		};

		for (var i in this.aInfoList)
		{
			cData	= this.cParser.getImageData(
				this.aInfoList[i].getCurrentName()
			);

			this.cRenderer.draw(cData, cNextPos.x, cNextPos.y);

			zUpdateNext.call(this);

			this.aInfoList[i].stepFrames(1);
		}

		// might as well render static images here as well :D
		for (var i in ImageNames)
		{
			cData	= this.cParser.getImageData(ImageNames[i]);

			this.cRenderer.draw(cData, cNextPos.x, cNextPos.y);

			zUpdateNext.call(this);
		}

		var ctx	= this.cStage.getContext("2d");

		// render some grid line to check that each image is in fact centred
		for (var i = 100; i < this.cStage.width; i += 100)
		{
			ctx.beginPath();
			ctx.strokeStyle	= "#0";

			ctx.moveTo(i, 0);
			ctx.lineTo(i, this.cStage.height);

			ctx.stroke();
		}

		for (var i = 100; i < this.cStage.height; i += 100)
		{
			ctx.beginPath();
			ctx.strokeStyle	= "#0";

			ctx.moveTo(0, i);
			ctx.lineTo(this.cStage.width, i);

			ctx.stroke();
		}
	}
});