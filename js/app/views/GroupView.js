define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/groupView.html'
],function($,_,backbone,groupViewTemplate){
  
  var GroupView = Backbone.View.extend({
    tagName: "div",
    className: "btn-group",

    template: _.template(groupViewTemplate),

    initialize: function(){
      this.listenTo(this.model,'remove', this.remove);
    },

    events: { 
      // This is a handler for the remove icon on the view
      'click .destroy':'removeView'
    },

    removeView: function(){
      // User clicked the remove icon so remove our model from the collection
      this.collection.remove(this.model);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return GroupView;

})