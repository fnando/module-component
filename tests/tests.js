(function(){
  var output, div;

  // Color component
  Module("UI.Color", function(Color){
    Color.fn.initialize = function(element, data) {
      this.element = element;
      this.color = element.data("color");
      this.data = data;
    };

    Color.fn.setup = function() {
      this.element.css("color", this.color);
    };
  });

  // Lorem ipsum component
  Module("UI.Lorem", function(Lorem){
    Lorem.fn.initialize = function(element) {
      this.element = element;
    };

    Lorem.fn.setup = function() {
      this.element.text("Lorem ipsum");
    };
  });

  // No setup component
  Module("UI.NoSetup", function(NoSetup){
    NoSetup.fn.initialize = function() {

    };
  });

  // Module with multiple words
  Module("UI.SomeNiceModule", function(SomeNiceModule){
    SomeNiceModule.fn.initialize = function(element) {
      this.element = element;
    };

    SomeNiceModule.fn.setup = function() {
      this.element.text("Nice module is nice!");
    };
  });

  module("module-component.js", {setup: function(){
    output = $("#qunit-fixture");
    div = $("<div/>").appendTo(output);
  }});

  test("initialize component using data-component", function(){
    div.attr({"data-component": "color", "data-color": "red"});
    Component.setup(output, UI);

    equal(div.css("color"), "rgb(255, 0, 0)");
  });

  test("initialize multiple components", function(){
    div.attr({"data-components": "color lorem", "data-color": "red"});
    Component.setup(output, UI);

    equal(div.css("color"), "rgb(255, 0, 0)");
    equal(div.text(), "Lorem ipsum");
  });

  test("initialize component using multiple words", function(){
    div.attr({"data-component": "some-nice-module"});
    Component.setup(output, UI);

    equal(div.text(), "Nice module is nice!");
  });

  test("caches initialized components", function(){
    div.attr({"data-components": "color lorem", "data-color": "red"});
    Component.setup(output, UI);

    equal(div.data("_components").length, 2);

    equal(div.data("_components")[0].constructor, UI.Color);
    equal(div.data("_components")[0].element.get(0), div.get(0));

    equal(div.data("_components")[1].constructor, UI.Lorem);
    equal(div.data("_components")[1].element.get(0), div.get(0));
  });

  test("don't execute setup if not available", function(){
    div.attr({"data-component": "no-setup"});
    Component.setup(output, UI);
    ok(true);
  });

  test("return all data attributes but data-component", function(){
    div.attr({
        "data-component": "color"
      , "data-color": "red"
      , "data-interval": 5
    });

    Component.setup(output, UI);

    var dataset = div.data("_components")[0].data;

    equal(Object.keys(dataset).length, 2);
    equal(dataset.color, "red");
    equal(dataset.interval, 5);
  });
})();
