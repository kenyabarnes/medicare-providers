var width = 960, 
    height = 500,
    centered;
        
var projection = d3.geo.albersUsa()
        .scale(1070)
        .translate([width / 2, height / 2]);
        
var path = d3.geo.path()
            .projection(projection);
        
var svg = d3.select(".states")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        
svg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height)
            .on("click", clicked);
        
var g = svg.append("g");
        
d3.json("static/states/us.json", function(error, us) {
    if (error) throw error;
    g.append("g")
        .attr("id", "states")
    .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
        .attr("d", path)
        .on("click", clicked);

    g.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("id", "state-borders")
        .attr("d", path);
});

function clicked(d) {
    var x, y, k;

    if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
    } else {
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
    }

    g.selectAll("path")
        .classed("active", centered && function(d) { return d === centered; });

    g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");

    var year = document.getElementById("year").innerHTML;
    if (year !== undefined && year.length != 0) {
        resetDataWithYear(d.id, year)
    } else {
        resetData(d.id)
    }
    
}

function resetData(stateId) {
    state_url = "data/stateById?stateId=" + stateId;
    stateInfo = $.get(state_url, function(data) {
        getStateUrl = "data/dataByState?state=" + data.result.abbr;
        document.getElementById('stateName').innerHTML = data.result.stateName;
        d3.json(getStateUrl, function(error, graph) {
        
        tableData = [{
            field1: graph.nodes[0].value,
            field2: graph.nodes[1].value,
            field3: graph.nodes[2].value
        }]
        
        dynamicTable.load(tableData)
        //     if (error) throw error;
        //     //d3.select(".dataNodes").remove();
        //     svg = d3.select(".dataNodes")
        //     var link = svg.append("g")
        //         .attr("class", "links")
        //         .selectAll("path")
        //         .data(graph.links)
        //         .enter()
        //         .append("svg:path")
        //         .attr("stroke-width", function(d) { return 1 });

        //     link.style('fill', 'none')
        //         .style('stroke', 'black')
        //         .style("stroke-width", '2px');
      
        //     var node = svg.append("g")
        //         .attr("class", "nodes")
        //         .selectAll("g")
        //         .data(graph.nodes)
        //         .enter()
        //         .append("g")
        //         .style('transform-origin', '50% 50%')
        //         .call(d3.drag()
        //             .on("start", dragstarted)
        //             .on("drag", dragged)
        //             .on("end", dragended));
            
        //     node.append('circle')
        //         .attr("r", function(d) { return radius(d.value / 2); })
        //         .attr("fill", function(d) { return color(d.group); })

        //         node.append("text")
        //         .attr("dy", ".35em")
        //         .attr("text-anchor", "middle")
        //         .text(function(d) { return d.name + ":" + d.value; });
          
        //     simulation
        //         .nodes(graph.nodes)
        //         .on("tick", ticked);
          
        //     simulation.force("link")
        //         .links(graph.links);
          
        //     function ticked() {
        //       link.attr("d", function(d) {
        //           var dx = d.target.x - d.source.x,
        //               dy = d.target.y - d.source.y,
        //               dr = Math.sqrt(dx * dx + dy * dy);
        //           return "M" + 
        //               d.source.x + "," + 
        //               d.source.y + "A" + 
        //               dr + "," + dr + " 0 0,1 " + 
        //               d.target.x + "," + 
        //               d.target.y;
        //       });
        //     }
        //     node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        })
    })
}

function resetDataWithYear(stateId, year) {
    state_url = "data/stateById?stateId=" + stateId;
    stateInfo = $.get(state_url, function(data) {
        getStateUrl = "data/dataByStateAndYear?state=" + data.result.abbr + "&year=" + year;
        document.getElementById('stateName').innerHTML = data.result.stateName;
        d3.json(getStateUrl, function(error, graph) {
        
        tableData = [{
            field1: graph.nodes[0].value,
            field2: graph.nodes[1].value,
            field3: graph.nodes[2].value
        }]
        
        dynamicTable.load(tableData)
        //     if (error) throw error;
        //     //d3.select(".dataNodes").remove();
        //     svg = d3.select(".dataNodes")
        //     var link = svg.append("g")
        //         .attr("class", "links")
        //         .selectAll("path")
        //         .data(graph.links)
        //         .enter()
        //         .append("svg:path")
        //         .attr("stroke-width", function(d) { return 1 });

        //     link.style('fill', 'none')
        //         .style('stroke', 'black')
        //         .style("stroke-width", '2px');
      
        //     var node = svg.append("g")
        //         .attr("class", "nodes")
        //         .selectAll("g")
        //         .data(graph.nodes)
        //         .enter()
        //         .append("g")
        //         .style('transform-origin', '50% 50%')
        //         .call(d3.drag()
        //             .on("start", dragstarted)
        //             .on("drag", dragged)
        //             .on("end", dragended));
            
        //     node.append('circle')
        //         .attr("r", function(d) { return radius(d.value / 2); })
        //         .attr("fill", function(d) { return color(d.group); })

        //         node.append("text")
        //         .attr("dy", ".35em")
        //         .attr("text-anchor", "middle")
        //         .text(function(d) { return d.name + ":" + d.value; });
          
        //     simulation
        //         .nodes(graph.nodes)
        //         .on("tick", ticked);
          
        //     simulation.force("link")
        //         .links(graph.links);
          
        //     function ticked() {
        //       link.attr("d", function(d) {
        //           var dx = d.target.x - d.source.x,
        //               dy = d.target.y - d.source.y,
        //               dr = Math.sqrt(dx * dx + dy * dy);
        //           return "M" + 
        //               d.source.x + "," + 
        //               d.source.y + "A" + 
        //               dr + "," + dr + " 0 0,1 " + 
        //               d.target.x + "," + 
        //               d.target.y;
        //       });
        //     }
        //     node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        })
    })
}
$(document).ready(function() {
    dynamicTable.config("dataTable",
    ['field1', 'field2', 'field3'],
    ["GOVERNMENT", "PROPRIETARY", "NON-PROFIT"],
    "There are no items to show..."
)
})
var dynamicTable = (function() {
    
    var _tableId, _table, 
        _fields, _headers, 
        _defaultText;
    
    /** Builds the row with columns from the specified names. 
     *  If the item parameter is specified, the memebers of the names array will be used as property names of the item; otherwise they will be directly parsed as text.
     */
    function _buildRowColumns(names, item) {
        var row = '<tr>';
        if (names && names.length > 0)
        {
            $.each(names, function(index, name) {
                var c = item ? item[name+''] : name;
                row += '<td>' + c + '</td>';
            });
        }
        row += '</tr>';
        return row;
    }
    
    /** Builds and sets the headers of the table. */
    function _setHeaders() {
        // if no headers specified, we will use the fields as headers.
        _headers = (_headers == null || _headers.length < 1) ? _fields : _headers; 
        var h = _buildRowColumns(_headers);
        if (_table.children('thead').length < 1) _table.prepend('<thead></thead>');
        _table.children('thead').html(h);
    }
    
    function _setNoItemsInfo() {
        if (_table.length < 1) return; //not configured.
        var colspan = _headers != null && _headers.length > 0 ? 
            'colspan="' + _headers.length + '"' : '';
        var content = '<tr class="no-items"><td ' + colspan + ' style="text-align:center">' + 
            _defaultText + '</td></tr>';
        if (_table.children('tbody').length > 0)
            _table.children('tbody').html(content);
        else _table.append('<tbody>' + content + '</tbody>');
    }
    
    function _removeNoItemsInfo() {
        var c = _table.children('tbody').children('tr');
        if (c.length == 1 && c.hasClass('no-items')) _table.children('tbody').empty();
    }
    
    return {
        /** Configres the dynamic table. */
        config: function(tableId, fields, headers, defaultText) {
            _tableId = tableId;
            _table = $('#' + tableId);
            _fields = fields || null;
            _headers = headers || null;
            _defaultText = defaultText || 'No items to list...';
            _setHeaders();
            _setNoItemsInfo();
            return this;
        },
        /** Loads the specified data to the table body. */
        load: function(data, append) {
            if (_table.length < 1) return; //not configured.
            _setHeaders();
            _removeNoItemsInfo();
            if (data) {
                var rows = '';
                $.each(data, function(index, item) {
                    rows += _buildRowColumns(_fields, item);
                });
                var mthd = append ? 'append' : 'html';
                _table.children('tbody')[mthd](rows);
            }
            else {
                _setNoItemsInfo();
            }
            return this;
        },
        /** Clears the table body. */
        clear: function() {
            _setNoItemsInfo();
            return this;
        }
    };
}());

