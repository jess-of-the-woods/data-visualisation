var d3 = require('d3')


module.exports = function(data, root) {
  var color = d3.scale.category20b() // sets the color palette

  var svg = d3.select(root).append('svg') // select root element (div where it will append), append svg element
      .attr("width", 400)
      .attr("height", 400) // sets width/height of svg element
      .append("g")
      .attr("transform", "translate(" + 200 + "," + 200 + ")"); // translates (shifts) chart (g element) to middle of svg element

  var arc = d3.svg.arc() // defines the radius of the chart
      .outerRadius(200 - 10)
      .innerRadius(90); // anything greater than 0 will make it a 'donut' chart

  var pie = d3.layout.pie()
      .sort(null) // disable sorting the data ( it is already sorted )
      .value(function(d) { return d.count; }); // this section defines the start & end angles of the segments

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.hashtag); });
}
