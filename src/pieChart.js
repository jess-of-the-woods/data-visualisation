var d3 = require('d3')


module.exports = function(data, root) {
  var color = d3.scale.category20b() // sets the color palette

  var svg = d3.select(root).append('svg') // select root element (div where it will append), append svg element
      .attr("width", 400)
      .attr("height", 400) // sets width/height of svg element
      .append("g")
      .attr("transform", "translate(" + 200 + "," + 200 + ")"); // translates (shifts) chart (g element) to middle of svg element
      var width = 400, height = 400, radius = Math.min(width, height) / 2;

  var arc = d3.svg.arc() // defines the radius of the chart
      .outerRadius(160 - 10)
      .innerRadius(70); // anything greater than 0 will make it a 'donut' chart

  var outerArc = d3.svg.arc()
      .outerRadius(250)
      .innerRadius(150)

  var pie = d3.layout.pie()
      .sort(null) // disable sorting the data ( it is already sorted )
      .value(function(d) { return d.count; }); // this section defines the start & end angles of the segments

console.log(pie(data))

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.hashtag); });

    function midAngle(d){
    		return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

      g.append('polyline')
          .attr('points', function(d){
            // pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
            return [
              arc.centroid(d),
              outerArc.centroid(d)
              // pos
            ]
          })

}
