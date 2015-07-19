define([
  'app/models/GroupModel'
],function(GroupModel){
  
	var GroupCollection = Backbone.Collection.extend({

		model: GroupModel,
   
	});

	return GroupCollection;

})