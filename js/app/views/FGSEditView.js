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

    events: {
      'click #fgs-create':'submitForm'
    },
    
    // Called by a collection reset event. 
    // Loop through models and attach View for each dependent on type
    render: function() {
      console.log("Rendering FGSEditView");

      // Start by parsing our template for the layout
      this.$el.html(this.template());

      // Loop through each item in the collection and inject relevant view
      this.collection.forEach(this.renderSingle,this);

      // Configure Automcomplete after fetching collection to use
      var that = this;
      this.availableGroups.fetch({
        success:function(){
          console.log("AutoComplete collection fetched");
          that.configureACGAutoComplete();
          that.configureLabelAutoComplete();
        }
      });

      return this;
    },

    submitForm: function(){
      // Submit the JSON from the collection to the server
      console.log("Form Submitted: NOT IMPLEMENTED YET");
    },

    configureACGAutoComplete: function(){

      console.log("Configuring Autocomplete for acgs");
      var that = this;
      var groups = [];
      var map = {};

      this.$el.find("#acgs").typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'groups',
        source: function(query, process){

          $.each(that.availableGroups.toJSON(), function(i, group){
            if(group.type == "acg"){
              map[group.name] = group;
              groups.push(group.name);
            }
          });

          process(groups);
        }
      });

      // Handle selected
      $('#acgs').on('typeahead:selected', function (e, datum) {
        that.collection.add(map[datum]);
        $('#acgs').typeahead('val', '')
      });

    },

    configureLabelAutoComplete: function(){

      console.log("Configuring Autocomplete for labels");
      var that = this;
      var groups = [];
      var map = {};

      this.$el.find("#labels").typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'groups',
        source: function(query, process){

          $.each(that.availableGroups.toJSON(), function(i, group){
            if(group.type == "label"){
              map[group.name] = group;
              groups.push(group.name);
            }
          });

          process(groups);
        }
      });

      // Handle selected
      $('#labels').on('typeahead:selected', function (e, datum) {
        that.collection.add(map[datum]);
        $('#labels').typeahead('val', '')
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

        if(group.attributes.type == "label"){
          console.log("type is label");
          var labelGroup = new GroupView({model:group,collection:this.collection});
          this.$el.find("#labeltags").append(labelGroup.render().$el)
        }
    }

  });

  return FGSEditView;

})