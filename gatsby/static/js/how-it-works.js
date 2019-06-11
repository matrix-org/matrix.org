$(document).ready(function() {

var width = 680,
    height = 480;

var color = {
    'a': '#e77',
    'b': '#7e7',
    'c': '#77e',
    'a1': '#faa',
    'b1': '#afa',
    'c1': '#aaf',
}

var plinthColor = {
    'a': '#fdd',
    'b': '#dfd',
    'c': '#ddf',
}

var messageColor = {};

var csDistance = 75;
var ssDistance = 150;
var cRadius = 10;
var sRadius = 50;

var network = {
    nodes: [
        {id: "a",  name: "matrix.alice.com",            type: "hs", // 0
            fixed: true,
            x: width/2 - .433*ssDistance,
            y: height/2,
        },
        {id: "b",  name: "matrix.bob.com",              type: "hs", // 1
            fixed: true,
            x: width/2 + .433*ssDistance,
            y: height/2 - .5*ssDistance,
        },
        {id: "c",  name: "matrix.charlie.com",          type: "hs", // 2
            fixed: false,
            x: width/2 + .433*ssDistance,
            y: height/2 + .5*ssDistance
        },
        {id: "a1", name: "@alice:alice.com",     type: "client"}, // 3
        {id: "b1", name: "@bob:bob.com",         type: "client"}, // 4
        {id: "c1", name: "@charlie:charlie.com", type: "client"}, // 5
    ],
    links: [
        // source's ID always needs to be lexicographically less than target's
        {source: 0, target: 1},
        {source: 1, target: 2},
        {source: 0, target: 2},
        {source: 0, target: 3, leaf: true},
        {source: 1, target: 4, leaf: true},
        {source: 2, target: 5, leaf: true},
    ],
};

var graph;
var forceSvg;

var stepIndex;
var pendingStages;
var stageIndex;
var animations;
var unveiled = false;


var steps = [
    [], // step 0
    [
        { sid: 1, id: "m1", type: "msg", source: "a1", target: "a", msg: "1", pause: true },
    ],
    [
        { sid: 2, id: "m1", type: "msg", source: "a", target: "b", target2: "b1", msg: "1", pause: true },
        { sid: 3, id: "m1", type: "msg", source: "a", target: "c", target2: "c1", msg: "1", pause: true },
    ],
    [
        { sid: 4, id: "m2", type: "msg", source: "b1", target: "b", msg: "2", parents: ["m1"] },
    ],
    [
        { sid: 5, id: "m3", type: "msg", source: "c1", target: "c", msg: "3", parents: ["m1"] },
    ],
    [
        { sid: 6, id: "m2", type: "msg", source: "b", target: "a", target2: "a1", msg: "2", parents: ["m1"] },
        { sid: 7, id: "m2", type: "msg", source: "b", target: "c", target2: "c1", msg: "2", parents: ["m1"] },
    ],
    [
        { sid: 8, id: "m3", type: "msg", source: "c", target: "a", target2: "a1", msg: "3", parents: ["m1"] },
        { sid: 9, id: "m3", type: "msg", source: "c", target: "b", target2: "b1", msg: "3", parents: ["m1"] },
    ],
    [
        { sid: 10, id: "m4", type: "msg", source: "a1", target: "a", msg: "4", parents: ["m2","m3"] },
    ],
    [
        { sid: 11, id: "m4", type: "msg", source: "a", target: "b", target2: "b1", msg: "4", parents: ["m2", "m3"] },
        { sid: 12, id: "m4", type: "msg", source: "a", target: "c", target2: "c1", msg: "4", parents: ["m2", "m3"] },
    ],
];

function unveil() {
    if (unveiled) return;
    var $e = $("#diagram");
    if ($e.length == 0) return;
    var th = 100;

    var wt = $(window).scrollTop(),
        wb = wt + $(window).height(),
        et = $e.offset().top,
        eb = et + $e.height();

    if (eb >= wt - th && et <= wb + th) {
        initNetwork();
        unveiled = true;
    }
}

$(window).on("scroll.unveil resize.unveil lookup.unveil", unveil);
unveil();

function initNetwork() {

    // reset state
    graph = {};

    // the animation is broken down into steps, then substeps, and then stages (which happen if you pause)
    stepIndex = 0;
    pendingStages = [];
    stageIndex = 0;
    animations = 0;

    var force = d3.layout.force()
        .charge(-2000)
        .friction(0.75)
        .size([width, height]);

    var svg = d3.select("#diagram");
    if (!svg) return;

    $('.legendNav').click(nextStage);

    force
        .nodes(network.nodes)
        .links(network.links)
        .gravity(-0.0)
        .linkDistance(function(d) { return (d.leaf ? csDistance : ssDistance) })
        .start();

    forceSvg = svg.append("g");

   function resize() {
      newWidth = $("#diagram").width();
      newHeight = (height * newWidth / width)|0;
      svg.attr("width", newWidth).attr("height",newHeight);
      forceSvg.attr("transform", "scale(" + newWidth / width + ")");
   }

   $(window).resize(resize);
   resize();

    var link = forceSvg.selectAll(".networkLink")
        .data(network.links)
        .enter().append("path")
            .attr("class", "networkLink")
            .attr("id", function(d) { return "link_" + d.source.id + "_" + d.target.id });

    var node = forceSvg.selectAll(".networkNode")
        .data(network.nodes)
        .enter().append("g")
            .attr("class", "networkNode")
            .each(createGraph)
            .call(force.drag);

    node.append("circle")
            .attr("r", function(d) { return (d.type == "hs" ? 0 : 20 ); } )
            .style("fill", function(d) { return color[d.id] })

    node.append("title")
        .text(function(d) { return d.name; });

    node.append("text")
        .attr("dx", function(d) { return ((d.id == "a1" ? -1 : 1) * (cRadius + 14)); } )
        .attr("dy", 0)
        .style("fill", function(d) { return d3.rgb(color[d.id]).darker(1) })
        .attr("text-anchor", function(d) { return (d.id == "a1" ? "end" : "") })
        .text(function(d) { return d.type == "client" ? d.name : "" })

    force.on("tick", function(e) {
        //console.log("main: " + e.alpha);

        // link.attr("x1", function(d) { return d.source.x; })
        //     .attr("y1", function(d) { return d.source.y; })
        //     .attr("x2", function(d) { return d.target.x; })
        //     .attr("y2", function(d) { return d.target.y; });

        link.attr("d", function(d) {
            return "M" + d.source.x + "," + d.source.y
                + " " + d.target.x + "," + d.target.y;
        });

        // node.attr("cx", function(d) { return d.x; })
        //     .attr("cy", function(d) { return d.y; });

        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    });

    nextStage();
}

function translateAlong(path, backwards) {
    var node = path.node();
    return function(d, i, a) {
        return function(t) {
            t = backwards ? (1.0 - t) : t;
            var l = node.getTotalLength();
            var p = node.getPointAtLength(t * l);
            return "translate(" + p.x + "," + p.y + ")";
        };
    };
}

function transition(message, path, backwards) {
    return message.transition()
        .duration(1000)
        .attrTween("transform", translateAlong(path, backwards));
}

function sendMessage(source, target, msg, id, sid) {
    console.log("sendMessage " + source + " " + target + " " + msg);
    var backwards = false;
    if (source > target) { // we're going backwards
        backwards = true;
        var tmp = source;
        source = target;
        target = tmp;
    }

    // reuse previous message if this is a two-step
    var message = forceSvg.select("#m_" + sid);

    if (message.size() == 0) {
        message = forceSvg.append("g")
            .attr("id", "m_" + sid)
            .attr("class", "message");

        message.append("circle")
            .attr("r", 5)
            .style("stroke", messageColor[id]);

        message.append("text")
            .attr("dx", "8px")
            .attr("dy", "-8px")
            .text(msg);
    }

    var path = forceSvg.select("#link_" + source + "_" + target);
    animations++;
    return transition(message, path, backwards);
//      .remove();
//      .each("end", function() { message.remove() });
}

function createGraph(d) {
    if (d.id.length != 1) return; // only put graphs in servers(!)

    var id = d.id;

    graph[id] = {
        layout : {},
        svg: {},
        nodes: [],
        links: [],
        nodeMap: {},
        nodeSel: {},
        linkSel: {},
    };

    graph[id].layout = d3.layout.force()
	    .size([sRadius * 2, sRadius * 2])
	    .on("tick", function(e) {
	        //console.log(id + ": " + e.alpha);

	        //updateGraph(id);

            graph[id].linkSel.attr("x1", function(d) { return d.source.x; })
                             .attr("y1", function(d) { return d.source.y; })
                             .attr("x2", function(d) { return d.target.x; })
                             .attr("y2", function(d) { return d.target.y; });

            graph[id].nodeSel.attr("transform",
                function(d) { return "translate(" + d.x + "," + d.y +")"; });
	    });

    graph[id].svg = d3.select(this).append("g")
        .attr("transform", "translate(-" + sRadius + ", -" + sRadius + ")");

    var server = graph[id].svg.append("circle")
        .attr("cx", sRadius)
        .attr("cy", sRadius)
        .attr("r",  sRadius)
        .style("fill", plinthColor[id]);

    graph[id].svg.append("text")
        .attr("dx", function(d) {
            return d.id == "c" ? sRadius*2.5 :
                   d.id == "b" ? sRadius/2 : sRadius;
        })
        .attr("dy", -10)
        .style("fill", function(d) { return d3.rgb(color[d.id]).darker(1) })
        .attr("text-anchor", "middle")
        .text(d.name);

    graph[id].linkSel = graph[id].svg.selectAll(".graphLink");
    graph[id].nodeSel = graph[id].svg.selectAll(".graphNode");
}

function updateGraph(id) {
    // Restart the force layout.
    graph[id].layout
        .nodes(graph[id].nodes)
        .links(graph[id].links)
        .linkDistance(35)
        .charge(-100)
        .start();

    // cache for convenience
    var linkSel = graph[id].linkSel;
    var nodeSel = graph[id].nodeSel;

    // Update the links…
    linkSel = linkSel.data(graph[id].links);

    // Exit any old links.
    linkSel.exit().remove();

    // Enter any new links.
    var enter = linkSel.enter().insert("line", ".graphNode")
        .attr("class", "graphLink")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .style("opacity", 1e-6)
            .transition()
            .duration(250)
            .style("opacity", 1);

    // Update the nodes…
    nodeSel = nodeSel.data(graph[id].nodes);

    // Exit any old nodes.
    nodeSel.exit().remove();

    // Enter any new nodes.
    var g = nodeSel.enter().append("svg:g")
                   .attr("class", "graphNode")
                   .attr("transform",
                        function(d) { return "translate(" + d.x + "," + d.y +")"; });

    g.style("opacity", 1e-6)
        .transition()
        .duration(250)
        .style("opacity", 1);

    // special case to add a magical leading edge to the first node
    if (nodeSel.size() == 1) {
        g.append("line")
        .attr("class", "danglingGraphLink")
        .attr("x1", function(d) { return 0; })
        .attr("y1", function(d) { return 0; })
        .attr("x2", function(d) { return 0; })
        .attr("y2", function(d) { return -19; })
        .style("opacity", 1e-6)
            .transition()
            .duration(250)
            .style("opacity", 1);
    }

    g.append("circle")
        .attr("r", 5)
        .style("stroke", function(d) { return messageColor[d.id]; } )
        .call(graph[id].layout.drag);

    g.append("text")
        .attr("dx", "10px")
        .attr("dy", ".35em")
        .text(function(d) { return d.value; })
        .style("fill-opacity", 1);

    graph[id].linkSel = linkSel;
    graph[id].nodeSel = nodeSel;
}

function updateState(graphId, nodeId, msg, parents) {

    // whenever we update state we don't want any other message bubbles hanging around
    forceSvg.selectAll(".message").remove();

    var node = {
        id: nodeId,
        value: msg,
    };

    if (nodeId == "m1") {
        node.fixed = true;
        node.x = sRadius + 0;
        node.y = sRadius - 30;
    }
    else if (nodeId == "m4") {
        node.fixed = true;
        node.x = sRadius + 0;
        node.y = sRadius + 30;
    }
    else {
        node.x = 0;
        node.y = 0;
    }

    graph[graphId].nodes.push(node);
    graph[graphId].nodeMap[nodeId] = node;

    if (parents) {
        for (var i=0; i<parents.length; i++) {
            graph[graphId].links.push({
                source: graph[graphId].nodeMap[parents[i]],
                target: node,
            });
        }
    }

    updateGraph(graphId);
}

function performSubStep(subStep) {
    // assign these all to local variables to capture them in the scope of this fn
    var source =  subStep.source;
    var target =  subStep.target;
    var target2 = subStep.target2;
    var msg =     subStep.msg;
    var parents = subStep.parents;
    var id =      subStep.id;
    var pause =   subStep.pause;
    var sid =     subStep.sid;

    if (!messageColor[id]) {
        messageColor[id] = color[target];
    }

    function performUpdateState() {
        updateState(target, id, msg, parents);
        if (target2) { // 2nd hop
            if (pause) {
                pendingStages.push(performSecondHop);
            }
            else {
                performSecondHop();
            }
        }
    }

    function performSecondHop() {
        console.log("2nd hop: " + target + " " + target2 + " " + msg);
        sendMessage(target, target2, msg, id, sid).each("end", function() { animations--; });
    }

    sendMessage(source, target, msg, id, sid)
        .each("end", function () {
            animations--;
            if (pause) {
                pendingStages.push(performUpdateState);
            }
            else {
                performUpdateState();
            }
        });
}

function nextStage() {
    if (animations) return;

    var dissolveTime = 500;

    d3.select("#legend" + stageIndex).style("opacity", 1)
        .transition()
        .duration(dissolveTime)
        .style("opacity", 1e-6);
    d3.select("#legend" + (stageIndex + 1)).style("opacity", 1e-6)
        .transition()
        .duration(dissolveTime)
        .style("opacity", 1);

    if (pendingStages.length > 0) {
        var c = pendingStages.length;
        console.log("starting c=" + c);
        for (i=0; i < c; i++) {
            console.log("i=" + i + ", len=" + pendingStages.length);
            pendingStages[0]();
            pendingStages.shift();
        }
    }
    else {
        var step = steps[stepIndex];

        if (steps[stepIndex]) {
            // clean up messages from previous step
            console.log("cleaning up messages");
            forceSvg.selectAll(".message").remove();

            for (var i=0; i < step.length; i++) {
                performSubStep(step[i]);
            }

            if (stepIndex == steps.length - 1) {
                d3.select(".legendNav").html("Start over");
            }
        }
        else {
            d3.select(".legendNav").html("Next");
            forceSvg.selectAll("*").remove();
            initNetwork();
            return;
        }
        stepIndex++;
    }
    stageIndex++;
}

});