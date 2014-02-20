var InputTest	= Class.extend({
	init : function() {
		var cStage	= document.getElementById("stage");

		cStage.width	=
		cStage.height	= 1024;

		var cManager	= new KeyboardManager(cStage);
	}
});