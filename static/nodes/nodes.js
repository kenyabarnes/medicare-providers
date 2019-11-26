var nodesSVG = d3.select(".dataNodes svg").append("svg"),
    width = +nodesSVG.attr("width"),
    height = +nodesSVG.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);
  
var radius = d3.scaleSqrt()
    .range([0, 6]);

var simulation = d3.forceSimulation()
    .force("link", 
           d3.forceLink().id(function(d) { return d.id; })
           	.distance(function(d) { return radius(d.source.value / 2) + radius(d.target.value / 2); })
          .strength(function(d) {return 0.75; })
          )
    .force("charge", d3.forceManyBody().strength(-300))
		.force("collide", d3.forceCollide().radius(function(d) { return radius(d.value / 2) + 2; }))
    .force("center", d3.forceCenter(width / 2, height / 2));

var g = nodesSVG.attr("align", "center")
d3.json("static/nodes/dummy2.json", function(error, graph) {
  if (error) throw error;

  var link = g.append("g")
      .attr("class", "links")
    .selectAll("path")
    .data(graph.links)
    .enter().append("svg:path")
      .attr("stroke-width", function(d) { return 1 });

  link.style('fill', 'none')
  		.style('stroke', 'black')
      .style("stroke-width", '2px');

  var node = g.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(graph.nodes)
    .enter().append("g")
  .style('transform-origin', '50% 50%')
   .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
  
  node.append('circle')
      .attr("r", function(d) { return radius(d.value / 2); })
      .attr("fill", function(d) { return color(d.group); })
    
  
  node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name + ":" + d.value; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link.attr("d", function(d) {
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + 
            d.source.x + "," + 
            d.source.y + "A" + 
            dr + "," + dr + " 0 0,1 " + 
            d.target.x + "," + 
            d.target.y;
    });


    /*node.selectAll('circle')
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });*/
    
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}