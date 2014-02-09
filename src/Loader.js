var Loader	= Class.extend({
	aLoadQueue : null,

	init : function() {
		this.aLoadQueue	= [];
	},

	queue : function(sUri) {
		this.aLoadQueue.push(sUri);
	},

	/**
	 * copies and empties the current queue, then loads each queued asset in order.
	 * Once loading is complete calls the passed callback function with a dictionary of the loaded assets.
	 * returns : a dictionary, keys = the asset's filename, values = that loaded asset
	 */
	startQueue : function(zCallback, cScope) {
		var cThis		= this;
		var cLoaded		= {};

		var aQueue		= this.aLoadQueue.splice(0);
		var iNext		= 0;

		var zOnLoaded, zLoadNext;

		zOnLoaded		= function(xAsset) {
			var sName		= aQueue[iNext].substr(aQueue[iNext].lastIndexOf("/") + 1);
			cLoaded[sName]	= xAsset;

			++iNext;
			zLoadNext();
		};

		zLoadNext		= function() {
			if (iNext < aQueue.length)
			{
				cThis.autoLoad(aQueue[iNext], zOnLoaded, cThis);
			}
			else
			{
				zCallback.call(cScope, cLoaded);
			}
		};

		zLoadNext();
	},

	autoLoad : function(sUri, zCallback, cScope) {
		var zLoadFunc;
		var sExt	= sUri.substr(sUri.lastIndexOf(".") + 1);

		switch (sExt)
		{
			case "txt":
			case "json":
				zLoadFunc	= this.loadText;
				break;

			case "jpg":
			case "png":
			case "webp":
				zLoadFunc	= this.loadImage;
				break;

			case "ogg":
			case "aac":
				zLoadFunc	= this.loadBuffer;
				break;

			default:
				zLoadFunc	= function() {
					console.log("failed to auto load asset of type : " + sExt);
				};
		}

		zLoadFunc.call(this, sUri, zCallback, cScope);
	},

	loadImage : function(sUri, zCallback, cScope) {
		var cImage		= new Image();
		cImage.onload	= function() {
			zCallback.call(cScope, cImage);
		};
		cImage.src		= sUri;
	},

	loadText : function(sUri, zCallback, cScope) {
		var xhr		= new XMLHttpRequest();
		xhr.open("GET", sUri, true);
		xhr.onload	= function() {
			zCallback.call(cScope, xhr.responseText);
		};
		xhr.send();
	},

	loadBuffer : function(sUri, zCallback, cScope) {
		var xhr				= new XMLHttpRequest();
		xhr.open("GET", sUri, true);
		xhr.onload			= function() {
			zCallback.call(cScope, xhr.response);
		};
		xhr.responseType	= "arraybuffer";
		xhr.send();
	}
});