define([
        'app/views/FGSListView',
        'app/views/FGSEditView',
        'app/collections/FGSItemCollection',
        'app/collections/FGSGroupCollection',
        'app/collections/AvailableGroupCollection'
    ],function (FGSListView,FGSEditView,FGSItemCollection,FGSGroupCollection,AvailableGroupCollection) {
    
    console.log("App Starting");

    // Fetch our initial collection of fgs rules from server
    window.App = {};
    var fgsItemCollection = window.App.fgs = new FGSItemCollection();
    var fgsGroupCollection = window.App.groups = new FGSGroupCollection();
    var availableGroupCollection = window.App.availableGroups = new AvailableGroupCollection();

    // Create our routed app views
    var fgsListView = new FGSListView({ collection: fgsItemCollection });
    var fgsEditView = new FGSEditView({ collection: fgsGroupCollection});
    fgsEditView.availableGroups = availableGroupCollection;

    // Create app router
    var AppRouter = Backbone.Router.extend({

      routes: {
        "":             "displayFGSList",  // #
        "fgs":          "displayFGSList",  // #
        "fgs/create":   "displayFGSCreate",  // #groups
      },

      displayFGSList: function() {
        // fetch collection and toggle the view container
        console.log("Fetching FGSItemCollection")
        $(".region").hide();
        fgsItemCollection.fetch({reset: true}); // view rerenders on collection change event
        fgsListView.$el.show();
      },

      displayFGSCreate: function() {
        // toggle the view container
        $(".region").hide();
        fgsEditView.render().$el.show();
      }

    });
    
    // Init the router
    var router = new AppRouter;
    
    // Start the history
    console.log("History Started")
    Backbone.history.start();
});