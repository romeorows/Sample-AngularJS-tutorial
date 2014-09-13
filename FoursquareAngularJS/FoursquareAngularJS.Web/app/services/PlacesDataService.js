'use strict';
app.factory('placesDataService', function ($http, toaster) {

    var serviceBase = '/api/places/';
    var placesDataFactory = {};
    var userInContext = null;

    var _getUserInCtx = function (userInCtx) {
        userInContext = userInCtx;
    };

    var _savePlace = function (venue) {
    }

});