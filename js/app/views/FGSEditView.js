define([
  'jquery',
  'underscore',
  'backbone',
  'typeahead',
  'bloodhound',
  'app/views/GroupView',
  'text!templates/fgsEditView.html'
],function($,_,backbone,typeahead,bloodhound,GroupView,fgsEditViewTmpl){
  
  // FGSGroupCollection holds all the groups that make up the FGS Rule
  var FGSEditView = Backbone.View.extend({
    el: "#fgsEditRegion",

    template: _.template(fgsEditViewTmpl),

    initialize:function(){
      // When our attached collection changes add or remove subviews
      console.log("Initialized FGSEditView");
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'add', this.renderSingle);
    },
    
    // Called by a collection reset event. 
    // Loop through models and attach View for each dependent on type
    render: function() {
      console.log("Rendering FGSEditView");

      // Start by parsing our template for the layout
      this.$el.html(this.template());

      // Loop through each item in the collection and inject relevant view
      this.collection.forEach(this.renderSingle,this);

      // Configure Automcomplete
      var that = this;
      this.availableGroups.fetch({
        success:function(){
          console.log("success");
          that.configureAutoComplete();
        }
      });

      return this;
    },

    configureAutoComplete(){

      console.log("Configuring Autocomplete");
      var that = this;
      var groups = [];
      var map = {};

      this.$el.find(".tags-input").typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'groups',
        source: function(query, process){

          $.each(that.availableGroups.toJSON(), function(i, group){
            map[group.name] = group;
            groups.push(group.name);
          });

          process(groups);
        }
      });

      // Handle selected
      $('.tags-input').on('typeahead:selected', function (e, datum) {
        that.collection.add(map[datum]);
        $('.tags-input').val("");
      });

    },

    renderSingle: function (group) {
        // Not impemented yet
        // If group.type = 'acg' then inject new TagView into acgs... etc
        // If group.type = 'nat' then based on nat check relevent checkbox
        console.log("Loading FGSEdit Model");

        if(group.attributes.type == "acg"){
          console.log("type is acg");
          var acgGroup = new GroupView({model:group,collection:this.collection});
          this.$el.find("#acgtags").append(acgGroup.render().$el)
        }
    }

  });

  return FGSEditView;

})