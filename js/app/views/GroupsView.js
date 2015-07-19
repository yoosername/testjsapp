define([
  'jquery',
  'underscore',
  'backbone',
  'app/views/GroupView'
],function($,_,backbone,GroupView){
  
  var GroupsView = Backbone.View.extend({
    el: "#groups",
    //tagName: "div",

    initialize:function(){
      // When our attached collection changes add or remove subviews
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderSingle);
    },
    
    // Called by a reset event. Loop through models and attach GroupView for each
    render: function() {
      console.log("Rendering groupsView");

      // Clear the dom entry for this element
      this.$el.empty()

      // Loop through each item in the collection and render 
      // a view for each model
      this.collection.forEach(this.renderSingle,this);

      return this;
    },

    renderSingle: function (group) {
        var groupView = new GroupView({ 
            model: group, 
            collection: this.collection
        });
        groupView.render();
        this.$el.append(groupView.el);
    }

  });

  return GroupsView;

})