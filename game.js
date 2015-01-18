// fixes an SVG canvas
var fixCard = function(cls, id, color) {
	if(cls === "diamond") {
		fixSVGDiamond(id, color);
	} else if(cls === "oval") {
		fixSVGOval(id, color);
	} else if(cls === "squiggle") {
		fixSVGSquiggle(id, color);
	} else {
		console.log("cls must be diamond, oval, or squiggle. Therefore, I am not fixing anything.");
	}
};

// draws a diamond on an SVG canvas
var fixSVGDiamond = function(id, color) {
	// get the width and height of the SVG div
	var w = $("#"+id).width();
	var h = $("#"+id).height();
	// compute the position of the end points of the diamond
	var pts = (w/2)+",0 "+w+","+(h/2)+" "+(w/2)+","+h+" 0,"+(h/2);
	// check for solid, striped, or open
	var fillColor = checkFilling(id, color);
	var maskColor = checkMask(id);
	// add the diamond to the SVG canvas
	$("#"+id + " svg").html("<polygon points=\""+pts+"\" stroke=\""+color+"\" stroke-width=\"3\" fill=\""+fillColor+"\"  />");
};
// draws a oval on an SVG canvas
var fixSVGOval = function(id, color) {
	// get the width and height of the SVG div
	var w = $("#"+id).width();
	var h = $("#"+id).height();
	// check for solid, striped, or open
	var fillColor = checkFilling(id, color);
	var maskColor = checkMask(id);
	// add the oval to the SVG canvas
	$("#"+id + " svg").html("<rect x=\"0\" y=\"0\" width=\""+w+"\" height=\""+h+"\" rx=\""+(w/2)+"\" rh=\""+(w/2)+"\" stroke=\""+color+"\" stroke-width=\"3\" fill=\""+fillColor+"\"  />");
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
	var innerHTML = "";
	// check for solid, striped, or open
	var fillColor = checkFilling(id, color);
	var maskColor = checkMask(id);
	innerHTML += "<path d=\""+dString+"\" stroke=\""+color+"\" stroke-width=\"3\" fill=\""+fillColor+"\" transform=\"rotate(0,"+(w/2)+","+(h/2)+")\" />";
	// add the squiggle to the SVG canvas
	$("#"+id + " svg").html(innerHTML);
};

// checks whether the filling should be solid, striped, or open
var checkFilling = function(id, color) {
	var fillColor = color;
	if ($("#"+id).hasClass("open")) {
		fillColor = "none";
	} else if($("#"+id).hasClass("striped")) {
		fillColor = ("url(#"+color+"-pattern-stripe)");
	};
	return fillColor;
};
// checks whether we should mask the filling with stripes
var checkMask = function(id) {
	var maskColor = "none";
	if($("#"+id).hasClass("striped")) {
		maskColor = "url(#mask-stripe)";
	};
	return maskColor;
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

// <polygon points="50,0 100,200 50,400 0,200" stroke="red" stroke-width="3" fill="red" mask="url(#mask-stripe)"></polygon>
// <polygon points="47,0 94,147 47,294 0,147" stroke="red" stroke-width="3" fill="red" mask="url(#mask-stripe)"></polygon>
// <polygon points="47,0 94,147 47,294 0,147" stroke="red" stroke-width="3" fill="red" mask="url(#mask-stripe)"></polygon>