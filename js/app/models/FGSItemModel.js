define([
  'backbone'
],function(backbone){
  
  var FGSItemModel = Backbone.Model.extend({
  	defaults: {
	    "id":  "default",
	    "name":  "default",
      "owner": "default",
      "groups": []
	  }
  });

  return FGSItemModel;

})