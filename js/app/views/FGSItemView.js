define([
  'underscore',
  'backbone',
  'text!templates/fgsItemView.html'
],function(_,backbone,fgsItemViewTmpl){
  
  var FGSView = Backbone.View.extend({
    tagName: "div",
    className: "fgs-item",

    template: _.template(fgsItemViewTmpl),

    initialize: function(){
      this.listenTo(this.model,'change', this.render);
    },

    events: { 
      // edit the model
      'click':'clickFGSItem'
    },

    clickFGSItem: function(){
      // Not Implemented yet
      console.log("FGS Item Clicked: " + this.model.attributes.name);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return FGSView;

})