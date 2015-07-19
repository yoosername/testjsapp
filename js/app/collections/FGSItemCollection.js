define([
  'app/models/FGSItemModel'
],function(FGSItemModel){
  
	var FGSItemCollection = Backbone.Collection.extend({
		url: "js/app/data/fgs.json",
		model: FGSItemModel,
		
		// For testing need datatype = text because server sends incorrect header
		fetch: function(options){
		    options = _.extend(options || {}, {
		      dataType: 'text'
		    });
		    this.constructor.__super__.fetch.call(this, options);
		},

		// If json doesnt return an array then return the real array here
		parse : function(response){
        	//console.log($.parseJSON(response))
        	return $.parseJSON(response);  
   		}    
	});

	return FGSItemCollection;

})