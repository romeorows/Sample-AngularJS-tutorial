
//ngRoute used for mapping view template to a controller
var app = angular.module('FoursquareApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);

//$routeProvider responsible for wiring the controller, view and the url location in the browser
app.config(function ($routeProvider) {

    //mapped "/explore" URL to the placesresults.html view.
    //so when the user request http://localhost/index.html#/explore angular will match it with the route
    //we configured and load placesresults.html then invokes placesExplorerController
    $routeProvider.when("/explore", {
        controller: "placesExplorerController",
        templateUrl: "/app/views/placesresults.html"
    });

    //return URL "/explore" when ever it did not find any matching url
    $routeProvider.otherwise({redirectTo:"/explore"});
});