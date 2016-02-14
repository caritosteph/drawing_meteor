(function(){
Template.body.addContent((function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("header")), "\n    ", Spacebars.include(view.lookupTemplate("home")), HTML.Raw("\n    <!-- {{> wall}} -->\n    "), HTML.SCRIPT({
    type: "text/javascript"
  }, '\n    d3.select("#export").on("click", function() {\n        var html = d3.select(\'svg\')\n        .attr("version", 1.1)\n        .attr("xmlns", "http://www.w3.org/2000/svg")\n        .node().parentNode.innerHTML;\n\n        var imgsrc = \'data:image/svg+xml;base64,\' + btoa(html);\n        var img = \'', HTML.IMG({
    src: "' + imgsrc + '"
  }), '\';\n        d3.select("#svgdataurl").html(img);\n\n        var canvas = document.querySelector("canvas");\n        context = canvas.getContext("2d");\n\n        var image = new Image;\n        image.src = imgsrc;\n        image.onload = function() {\n        context.drawImage(image, 0, 0);\n\n        var canvasdata = canvas.toDataURL("image/png");\n\n        var a = document.createElement("a");\n        a.download = "drawing.png";\n        a.href = canvasdata;\n        document.body.appendChild(a);\n        a.click();\n      };\n\n    });\n') ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("wall");
Template["wall"] = new Template("Template.wall", (function() {
  var view = this;
  return HTML.DIV({
    "class": "container"
  }, "\n        ", HTML.DIV({
    "class": "row"
  }, "\n            ", HTML.Raw('<div class="col-md-3">\n            <div id="download"></div>\n                <button class="clear btn btn-warning btn-md">Clear</button>\n                <button class="download btn btn-success btn-md" id="export">Export</button><br><br>\n                <p><strong>Choose shape: </strong></p>\n                <button class="line btn btn-info btn-md">Line</button>\n                <button class="rect btn btn-info btn-md">Rectangle</button>\n                <button class="circle btn btn-info btn-md">Circle</button><br><br>\n                <p><strong>Choose drawing methods: </strong></p>\n                <button class="thicker btn btn-Thicker btn-md" id="Thicker">Thicker</button>\n                <button class="thinner btn btn-Thinner btn-md" id="Thinner">Thinner</button><br><br>\n                <button class="dash btn btn-Thinner btn-md" disabled="true" id="Dashes">Dashes</button>\n                <button class="lines btn btn-Thinner btn-md" disabled="true" id="Line">Line</button><br><br>\n                <p><strong>Choose color: </strong></p>\n                <button class="red btn btn-danger btn-md">Red</button>\n                <button class="blue btn btn-blue btn-md">Blue</button>\n                <button class="green btn btn-success btn-md">Green</button><br><br>\n                <button class="black btn btn-md btn-black">Black</button>\n                <button class="white btn btn-md btn-white">White</button>\n                <button class="beige btn btn-md btn-Beige">Beige</button><br><br>\n                <button class="yellow btn btn-md btn-Yellow">Yellow</button>\n                <button class="orange btn btn-md btn-Orange">Orange</button>\n                <button class="pink btn btn-md btn-Pink">Pink</button><br><br>\n                <button class="brown btn btn-md btn-Brown">Brown</button>\n                <button class="cyan btn btn-md btn-Cyan">Cyan</button>\n                <button class="gray btn btn-md btn-Gray">Gray</button><br><br>\n                <button class="violet btn btn-md btn-Violet">Violet</button>\n                <button class="aqua btn btn-md btn-Aqua">Aqua</button>\n                <button class="skyblue btn btn-md btn-Skyblue">Sky blue</button><br><br>\n                <button class="fuchsia btn btn-md btn-Fuchsia">Fuchsia</button>\n            </div>'), "\n            ", HTML.DIV({
    "class": "col-md-9"
  }, "\n              ", HTML.DIV({
    "class": "canvas"
  }, "\n                  ", Spacebars.include(view.lookupTemplate("canvas")), "\n              "), "\n            "), "\n            ", HTML.Raw('<canvas width="849" height="600" style="display:none"></canvas>'), "\n        "), "\n    ");
}));

Template.__checkName("canvas");
Template["canvas"] = new Template("Template.canvas", (function() {
  var view = this;
  return HTML.Raw('<div id="canvas"></div>');
}));

})();
