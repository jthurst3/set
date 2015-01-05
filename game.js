// correcting the width and height of the diamond
var fixDiamond = function(id) {
	$("#"+id + " .triangle-up").css("border-bottom-width", $("#"+id).height()/2);
	$("#"+id + " .triangle-down").css("border-top-width", $("#"+id).height()/2);
	$("#"+id + " .triangle-up").css("border-left-width", $("#"+id).width()/2);
	$("#"+id + " .triangle-up").css("border-right-width", $("#"+id).width()/2);
	$("#"+id + " .triangle-down").css("border-left-width", $("#"+id).width()/2);
	$("#"+id + " .triangle-down").css("border-right-width", $("#"+id).width()/2);
};
// correcting the width and height of the oval
var fixOval = function(id) {
	$("#"+id + " .oval").css("width", $("#"+id).width());
	$("#"+id + " .oval").css("height", $("#"+id).height());
};
// correcting the width and height of the squiggle
var fixSquiggle = function(id) {
	$("#"+id + " .curve-1").css("width", $("#"+id).width()/2);
	$("#"+id + " .curve-1").css("height", $("#"+id).height()/2);
	$("#"+id + " .curve-2").css("width", $("#"+id).width()/2);
	$("#"+id + " .curve-2").css("height", $("#"+id).height()/2);
};