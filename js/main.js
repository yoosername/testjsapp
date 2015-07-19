requirejs.config({
    baseUrl: 'js/lib',
    paths: {
    	text: "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min",
    	jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min",
    	jqueryui: "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min",
    	bootstrap: "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min",
    	underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",
    	backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.1/backbone-min",
    	typeahead: "typeahead.bundle",
        app: '../app',
        templates: '../../templates'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        bootstrap:{
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        typeahead: {
        	deps: ['jquery']
        },
        bloodhound:{
            exports: 'Bloodhound'
        }
    }
});

// Start bootstrap for theme and main app
requirejs(['jquery','bootstrap','app/main']);