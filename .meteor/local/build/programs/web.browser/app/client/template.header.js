(function(){
Template.__checkName("header");
Template["header"] = new Template("Template.header", (function() {
  var view = this;
  return HTML.Raw('<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">\n        <div class="container">\n            <a href="/" class="navbar-brand">Drawing</a>\n        </div>\n    </div>');
}));

})();
