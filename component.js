Module("Component", function(Component){
  Component.setup = function(html, namespace) {
    Component(html, namespace).setup();
  };

  Component.fn.initialize = function(html, namespace) {
    this.html = $(html);
    this.namespace = namespace;
  };

  Component.fn.containers = function() {
    return this.html.find("[data-component], [data-components]");
  };

  Component.fn.setup = function() {
    this.containers()
      .map(this.prepareComponent.bind(this))
      .map(this.createComponent.bind(this))
    ;
  };

  Component.fn.prepareComponent = function(index, element) {
    element = $(element);

    return {
        element: element
      , constructors: this.getComponentConstructors(element)
    };
  };

  Component.fn.extractNames = function(element) {
    var names = element.data("component") || element.data("components");
    return names.split(/ +/);
  };

  Component.fn.createComponent = function(index, info) {
    info.constructors.forEach(function(constructor){
      var component = constructor(info.element);
      var cache = info.element.data("_components") || [];

      cache.push(component);
      info.element.data("_components", cache);

      component.setup && component.setup();
    });
  };

  Component.fn.getComponentConstructors = function(element) {
    return this
      .extractNames(element)
      .map(this.convertToNameSpace)
      .map(function(name){ return this.namespace[name]; }.bind(this))
      .filter(function(constructor) { return constructor; })
    ;
  };

  Component.fn.convertToNameSpace = function(name) {
    var namespace = name.replace(/([-_].)/, function(match, group){
      return group.substr(1).toUpperCase();
    });

    return namespace[0].toUpperCase() + namespace.substr(1);
  };
});
