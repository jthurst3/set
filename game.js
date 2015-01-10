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

// draws a diamond on an SVG canvas
var fixSVGDiamond = function(id, color) {
	// get the width and height of the SVG div
	var w = $("#"+id).width();
	var h = $("#"+id).height();
	// compute the position of the end points of the diamond
	var pts = (w/2)+",0 "+w+","+(h/2)+" "+(w/2)+","+h+" 0,"+(h/2);
	// add the diamond to the SVG canvas
	$("#"+id + " .diamond").html("<polygon points=\""+pts+"\" style=\"fill:"+color+";\" />");
};
// draws a oval on an SVG canvas
var fixSVGOval = function(id, color) {
	// get the width and height of the SVG div
	var w = $("#"+id).width();
	var h = $("#"+id).height();
	// add the oval to the SVG canvas
	$("#"+id + " .ovalshape").html("<rect x=\"0\" y=\"0\" width=\""+w+"\" height=\""+h+"\" rx=\""+(w/2)+"\" rh=\""+(w/2)+"\" style=\"fill:"+color+";\" />");
};
// draws a squiggle on an SVG canvas
var fixSVGSquiggle = function(id, color) {
	// get the width and height of the SVG div
	var w = $("#"+id).width();
	var h = $("#"+id).height();
	// the start and end point
	var start = [10, 10];
	// the array of bezier curve points
	var curves = [[50, -20, 125, 30, 75, 115], [65, 150, 75, 165, 90, 175], [90, 175, 98, 185, 95, 190], [20, 220, 0, 150, 10, 125], [40, 80, 40, 20, 10, 20], [7, 20, 7, 10, 10, 10]];
	// scale the points by the width and height of the card
	shrink(curves, w/100, h/200);
	// compute the main string in the <path /> element
	var dString = "M "+(start[0]*w/100)+" "+(start[1]*h/200);
	for (var i = 0; i < curves.length; i++) {
		dString += " C";
		for (var j = 0; j < curves[i].length; j++) {
			dString += (" "+curves[i][j]);
		};
	};
	var innerHTML = "<path d=\""+dString+"\" stroke=\""+color+"\" stroke-width=\"3\" fill=\""+color+"\" />";
	// add the squiggle to the SVG canvas
	$("#"+id + " .squiggleshape").html(innerHTML);
};

// scales points in a 2D bezier curve array by the scaling factor
var shrink = function(points, wShrink, hShrink) {
	for (var i = 0; i < points.length; i++) {
		for (var j = 0; j < points[i].length; j++) {
			if (j % 2 === 0) {
				points[i][j] = points[i][j] * wShrink;
			} else {
				points[i][j] = points[i][j] * hShrink;
			};
		};
	};
};

