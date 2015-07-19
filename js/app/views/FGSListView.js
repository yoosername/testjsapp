define([
  'jquery',
  'underscore',
  'backbone',
  'app/views/FGSItemView'
],function($,_,backbone,FGSItemView){
  
  var FGSListView = Backbone.View.extend({
    el: "#fgsListRegion",
    //tagName: "div",

    initialize:function(){
      // When our attached collection changes add or remove subviews
      console.log("Initialized FGSListView");
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderSingle);
    },
    
    // Called by a reset event on the collection
    // Iterate Collection and attach FGSView for each
    render: function() {
      console.log("Rendering FGSListView");

      // Clear the dom entry for this element
      this.$el.empty()

      // Loop through each item in the collection and render 
      // a view for each model
      this.collection.forEach(this.renderSingle,this);

      return this;
    },

    renderSingle: function (fgsItem) {
        var fgsItemView = new FGSItemView({ 
            model: fgsItem, 
            collection: this.collection
        });
        fgsItemView.render();
        this.$el.append(fgsItemView.el);
    }

  });

  return FGSListView;

})