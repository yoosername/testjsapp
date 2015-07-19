define([
  'backbone'
],function(backbone){
  
  var GroupModel = Backbone.Model.extend({
  	defaults: {
	    "type":  "acg",
	    "name":  "default"
	  },

    sync : function(){
      return null
    },

    fetch : function(){
      return null;
    },

    save : function(){
      return null;
    }
  });

  return GroupModel;

})