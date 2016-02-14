(function(){Canvas = function () {
  var self = this;
  var svg;

  var createSvg = function() {
    svg = d3.select('#canvas').append('svg')
      .attr('width', 849)
      .attr('height',600);
  };
  createSvg();

  self.clear = function() {
    d3.select('svg').remove();
    createSvg();
  };

  self.draw = function(data) {
    if (data.length < 1) {
      self.clear();
      return;
    }
    if (svg) {

        // Remember to format the data properly in markPoints

        // to draw a circle - 

      svg.selectAll('circle').data(data, function(d) { return d._id; })
      .enter().append('circle')
      .attr('r', function (d) { return d.r;})
      .attr('cx', function (d) { return d.x; })
      .attr('cy', function (d) { return d.y; })
      .style("fill",function (d) { return d.color;});

      //to draw a line
      var line = svg.selectAll('line').data(data, function(d) { return d._id; })
      .enter().append('line')
      .attr('x1', function (d) { return d.x; })
      .attr('y1', function (d) { return d.y; })
      .attr('x2', function (d) { return d.x1; })
      .attr('y2', function (d) { return d.y1; })
      .attr("stroke-width", function (d) { return d.w; })
      .attr("stroke", function (d) { return d.c; })
      .attr("stroke-linejoin", "round")
      .style("stroke-dasharray", function (d) { return Session.get('dash')?("3, 3"):("0,0"); });

      // if(Session.get('dash')){
      //   line.style("stroke-dasharray", ("3, 3"));
      // }
      svg.selectAll('rect').data(data, function(d) { return d._id; })
      .enter().append('rect')
      .attr("x", function (d) { return d.x; })
      .attr("y", function (d) { return d.y; })
      .attr("width", function (d) { return d.width; })
      .attr("height", function (d) { return d.height; })
      .style("fill",function (d) { return d.colorRect;});

    } // end of the if(svg) statement
  }; // end of the canvas.draw function

  // self.exportSvg = function() {

  //   d3.select("#export").on("click", function() {
  //     console.log("drawing.js")
  //     var html = d3.select('svg')
  //       .attr("version", 1.1)
  //       .attr("xmlns", "http://www.w3.org/2000/svg")
  //       .node().parentNode.innerHTML;

  //       console.log(html);
  //       var imgsrc = 'data:image/svg+xml;base64,' + btoa(html);
  //       var img = '<img src="' + imgsrc + '">';
  //       d3.select("#svgdataurl").html(img);

  //       var canvas = document.querySelector("canvas");
  //       context = canvas.getContext("2d");

  //       var image = new Image;
  //       image.src = imgsrc;
  //       image.onload = function() {
  //       context.drawImage(image, 0, 0);

  //       var canvasdata = canvas.toDataURL("image/png");

  //       var a = document.createElement("a");
  //       a.download = "drawing.png";
  //       a.href = canvasdata;
  //       document.body.appendChild(a);
  //       a.click();
  //     };

  //   });
  // };
  
} //end of the canvas function


})();
