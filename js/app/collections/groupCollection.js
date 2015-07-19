define([
  'app/models/GroupModel'
],function(GroupModel){
  
	var GroupCollection = Backbone.Collection.extend({
		url: "js/app/data/groups.json",
		model: GroupModel,
		
		// For testing need datatype = text because server sends incorrect header
		fetch: function(options){
		    options = _.extend(options || {}, {
		      dataType: 'text'
		    });
		    this.constructor.__super__.fetch.call(this, options);
		},

		// We only want the groups array
		parse : function(response){
        	//console.log($.parseJSON(response))
        	return $.parseJSON(response);  
   		}    
	});

	return GroupCollection;

})