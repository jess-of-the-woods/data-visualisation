var d3 = require('d3')
var searchByAssociatedHashtag = require('./searchByAssociatedHashtag')

module.exports = function(data, root) {
  var color = d3.scale.category20b() // sets the color palette

  var svg = d3.select(root).append('svg') // select root element (div where it will append), append svg element
      .attr("width", 600)
      .attr("height", 450) // sets width/height of svg element
      .append("g")
      .attr("transform", "translate(" + 225 + "," + 225 + ")"); // translates (shifts) chart (g element) to middle of svg element
       var width = 600, height = 450, radius = Math.min(width, height) / 2;

  var arc = d3.svg.arc() // defines the radius of the chart
      .outerRadius(130 - 10)
      .innerRadius(50); // anything greater than 0 will make it a 'donut' chart

  var outerArc = d3.svg.arc()
      .outerRadius(160)
      .innerRadius(140)

  var pie = d3.layout.pie()
      .sort(null) // disable sorting the data ( it is already sorted )
      .value(function(d) { return d.count; }); // this section defines the start & end angles of the segments

// console.log(pie(data))

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
          .attr("class", "arc");

      g.append("path")
          .attr("d", arc)
          // .attr("d", )
          .style("fill", function(d) { return color(d.data.hashtag); });

      g.append('polyline')
          .attr('points', function(d){
            var pos = outerArc.centroid(d)
            // console.log(pos)
            if (pos[0] < 0) {
              pos[0] -= 14
            }
            else {
              pos[0] += 14
            }
            return [
              arc.centroid(d),
              outerArc.centroid(d),
              pos
            ]
      })

      var text = svg.select(".labels").selectAll("text")
		    .data(pie(data));

      g.append('text')
        .attr("x", function(d){
          var pos = outerArc.centroid(d)
          return pos[0] < 0 ? pos[0] - 15 : pos[0] + 15
        })
        .attr("y", function(d){
          var pos = outerArc.centroid(d)
          return pos[1]
        })
        .attr("dy", ".35em")
        .style('text-anchor', function(d){
          var pos = outerArc.centroid(d)
          if (pos[0] > 0){
            return 'start'
          }
          else {
            return 'end'
          }
        })
        .text(function(d) {
          return d.data.hashtag;
        });

        g.on('click', function(d){
          // console.log('d.data.hashtag: ', d.data.hashtag)
          searchByAssociatedHashtag(d.data.hashtag)
        })
}
