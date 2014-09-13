/*$http built in Angular service to make an http request*/
/*toaster a javascript non blocking notification service. this service will
display a notification when the user bookmark a place.*/
'use strict';
app.factory('placesDataService', function ($http, toaster) {

    var serviceBase = '/api/places/';
    var placesDataFactory = {};
    var userInContext = null; //this variable will decide if there is a user to bookmark places or not.

    var _getUserInCtx = function () {
        return userInContext;
    };

    var _setUserInCtx = function (userInCtx) {
        userInContext = userInCtx;
    };

    //responsible to issue a HTTP Post request to our RESTful API
    var _savePlace = function (venue) {
        //process venue to take needed properties
        
        var miniVenue = {
            userName: userInContext,
            venueID: venue.id,
            venueName: venue.name,
            address: venue.location.address,
            category: venue.categories[0].shortName,
            rating: venue.rating
        };
        //.then to manipulate and access the returned response directly to the service
        //Note: notification message should be in controller.
        return $http.post(serviceBase, miniVenue).then(
            function (results) {
                toaster.pop('success', "Bookmarked Successfully", "Place saved to your bookmark!");
            },
            function (results) {
                if (results.status == 304) {
                    toaster.pop('note', "Already Bookmarked", "Already bookmarked for user: " + miniVenue.userName);
                }
                else {
                    toaster.pop('error', "Failed to Bookmark", "Something went wrong while :-(");
                }
                return results;
            });
    };

    var _getUserPlaces = function (userName, pageIndex, pageSize) {
        return $http.get(serviceBase + userName, { params: { page: pageIndex, pageSize: pageSize } }).then(function (results) {
        });
    };

    var _userExists = function (userName) {
        return $http.get("/api/users/" + userName).then(function (results) {
            return results.data;
        });
    };

    placesDataFactory.getUserInContext = _getUserInCtx;
    placesDataFactory.getUserInContext = _setUserInCtx;
    placesDataFactory.getUserPlaces = _getUserPlaces;
    placesDataFactory.userExists = _userExists;
    placesDataFactory.savePlace = _savePlace;

    return placesDataFactory
});