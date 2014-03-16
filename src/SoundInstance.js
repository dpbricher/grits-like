/**
 * Represents the data required to play a single sound.
 *
 * TODO : We can't currently have the same sound playing more than once at the exact same time.
 * Sadly however there are valid situations for this occurring (e.g. 2 explosions that happen to be perfectly synchronised).
 * So should look at a way to accommodate this at some point.
 */
var SoundInstance	= Class.extend({
	cContext : null,
	cBuffer : null,
	cGain : null,

	// map of the sound sources currently playing
	cSourceMap : {},

	init : function(cBuffer, cContext) {
		this.cBuffer		= cBuffer;

		this.cContext		= cContext;
		this.cGain			= this.cContext.createGain(0);
		
		this.setVolume(1.0);
	},

	connect : function(cTarget) {
		this.cGain.connect(cTarget);
	},

	// AudioBufferSourceNode.start(when, offset, duration);
	start : function(fDelay) {
		var fContextTime	= this._getTimeFromDelay(fDelay);

		/**
		 * If we already have this sound playing at the specified time then we don't need it again
		 * Plus our source map uses start times as keys, so in that situation we'd lose a ref to one of them :s
		 *
		 * Therefore before creating our source check if one at that exact time already exists,
		 * and do not create another if it does
		 */
		var cSource	= this.cSourceMap[fContextTime];
		
		if (cSource == null)
		{
			cSource	= this._initSource();

			cSource.connect(this.cGain);
			cSource.start(fContextTime);

			this._addSourceRef(cSource, fContextTime);
		}

		return cSource;
	},

	// AudioBufferSourceNode.stop(when);
	stop : function(fDelay) {
		for (var sKey in this.cSourceMap)
		{
			this.cSourceMap[sKey].stop(
				this._getTimeFromDelay(fDelay)
			);
		}
	},

	loop : function(fDelay) {
		var cSource		= this.start(fDelay);
		cSource.loop	= true;
	},

	setVolume : function(fVolume) {
		this.cGain.gain.value	= Utils.clamp(fVolume, 0.0, 1.0);
	},

	getVolume : function() {
		return this.cGain.gain.value;
	},

	_initSource : function() {
		var cSource		= this.cContext.createBufferSource();
		cSource.buffer	= this.cBuffer;

		return cSource;
	},

	// returns the the AudioContext time fDelay seconds from now
	_getTimeFromDelay : function(fDelay) {
		if (fDelay == null || fDelay <= 0.0)
			fDelay	= 0.0;

		return this.cContext.currentTime + fDelay;
	},

	/**
	 * Store a reference to the passed source so that it can be stopped if desired
	 */
	_addSourceRef : function(cSource, fStartTime) {
		// add onended callback to remove this sound from the map once it has finished
		cSource.onended	= Utils.bindFunc(this, this._removeSourceRef, fStartTime);

		this.cSourceMap[fStartTime.toString()]	= cSource;
	},

	/**
	 * Remove a source reference from the map; Should only do this once the sound has finished
	 */
	_removeSourceRef : function(fStartTime) {
		delete this.cSourceMap[fStartTime.toString()];
	}
});