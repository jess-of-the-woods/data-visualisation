var d3 = require('d3')


module.exports = function(data, root) {
  var color = d3.scale.category20()

  var arc = d3.svg.arc()
      .outerRadius(200 - 10)
      .innerRadius(90);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.count; });

  var svg = d3.select(root).append('svg')
      .attr("width", 400)
      .attr("height", 400)
      .append("g")
      .attr("transform", "translate(" + 200 + "," + 200 + ")");

    var g = svg.selectAll(".arc")
          .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          .style("fill", function(d) { return color(d.data.hashtag); });
}
