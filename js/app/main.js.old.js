define([
        'app/views/GroupsView',
        'app/collections/GroupCollection'
    ],function (GroupsView,GroupCollection) {
    
    console.log("App Starting");

    // Build our initial collection from the groups api
    var groupCollection = window.grps = new GroupCollection();

    // Create our main app views and tie in the collection
    var groupsView = new GroupsView({ collection: groupCollection });

    // Create app router
    var AppRouter = Backbone.Router.extend({

      routes: {
        "":           "showGroups",  // #
        "groups":     "showGroups",  // #groups
      },

      showGroups: function() {
        // Get the latest changes
        // View is set to rerender when collection changes
        console.log("Fetching groupCollection")
        groupCollection.fetch({reset: true});
      }

    });
    
    // Init the router
    var router = new AppRouter;
    
    // Start the history
    console.log("History Started")
    Backbone.history.start();
});