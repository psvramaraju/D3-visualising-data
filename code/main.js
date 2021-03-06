// Load the data.
d3.json("nations.json", function(nations) {


	// Create the SVG container inside chart element.
	var chart_area = d3.select("#chart_area");
	var frame = chart_area.append("svg");


	// Set margins, width, and height.
	var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
	var frame_width = 960;
	var frame_height = 350;
	var canvas_width = frame_width - margin.left - margin.right;
	var canvas_height = frame_height - margin.top - margin.bottom;

	// innerHeight and innerWidth are how much axes will be shifted in so there is


	// Set svg attributes width and height.
	frame.attr("width", frame_width);
	frame.attr("height", frame_height);


	// Create chart inside svg element.
	var canvas = frame.append("g");


	// Shift the chart and make it slightly smaller than the svg canvas.
	canvas.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	// Various scales. These domains make assumptions of data, naturally.
	var xScale = d3.scale.log(); // income
	xScale.domain([300, 1e5]);
	xScale.range([0, canvas_width]);  

    
    // d3 has a subobject called scale. within scale, there are a number of functions to create scales.
    // e.g. log, linear, sqrt, category10 (e.g. 10 different colours)... 
    // we set the domain based on our data - min and max of the data
    // we set the range - range on the page
    // domain, range, log scale all determing data values are mapped to graph positions.

    var yScale = d3.scale.linear().domain([10, 85]).range([canvas_height, 0]);  // life expectancy

    // an alternative notation that d3 offers is to chain everything together using the dot-syntax 
    // (you'll see this a lot). The order is mostly arbitrary. 


	// Creating the x & y axes.
	var xAxis = d3.svg.axis().orient("bottom").scale(xScale);
    var yAxis = d3.svg.axis().scale(yScale).orient("left");


    // Next step: push the axes into the chart


	// Add the x-axis.
	canvas.append("g")
	.attr("class", "x axis")
    .attr("transform", "translate(0," + canvas_height + ")")
    .call(xAxis);

    // .call is the bit where the properties we just set are pushed to the object
    // attribures are added to make it look pretty (class is used in the css file)


	// Add the y-axis.
	canvas.append("g")
    .attr("class", "y axis")
    .call(yAxis);



//////////////////////AXES CREATED//////////////////////////



//////////////////////FILL IN DATA//////////////////////////


var data_2009 = nations.map( function(nation) {
	return {
		x : nation.income[nation.income.length-1][1],
		y : nation.lifeExpectancy[nation.lifeExpectancy.length-1][1]
	}
});


var dot = frame.append("g")
      .attr("class", "dots")
    .selectAll(".dot")
      .data(data_2009) // each of the points has the data_2009 element bound to it.
    .enter().append("circle")
    	.attr("cx", function(d) { return xScale(d.x); }) // this is why attr knows to work with the data
    	.attr("cy", function(d) { return yScale(d.y); })
    	.attr("r", 5 );
  




});