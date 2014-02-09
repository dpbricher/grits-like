var Loader	= Class.extend({
	// aLoadQueue : null,

	init : function() {
		// this.aLoadQueue	= [];
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