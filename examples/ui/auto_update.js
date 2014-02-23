Module("UI.AutoUpdate", function(AutoUpdate){
  AutoUpdate.fn.initialize = function(element) {
    this.element = element;
    this.interval = element.data("update-interval");
  };

  AutoUpdate.fn.setup = function() {
    setInterval(this.update.bind(this), this.interval);
  };

  AutoUpdate.fn.update = function() {
    (this.element.data("_components") || []).forEach(function(component){
      if (component.constructor != AutoUpdate) {
        component.update();
      }
    });
  };
});
