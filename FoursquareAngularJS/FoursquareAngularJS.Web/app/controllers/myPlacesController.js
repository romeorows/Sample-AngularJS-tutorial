'use strict';
app.controller('myPlacesController', function ($scope, placesDataService) {

    $scope.myPlaces = [];

    //paging
    $scope.totalRecordsCount = 0;
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    init();

    function init() {
        getUserPlaces();
    }

    function getUserPlaces() {

        var userInCtx = placesDataService.getUserInContext();
       
        //there is a user in the UserInContext then fill our myPlaces model with the returned data
        if(userInCtx){
            placesDataService.getUserPlaces(userInCtx, $scope.currentPage - 1, $scope.pageSize).then(function (results) {
                console.log('data has been retreived')
                $scope.myPlaces = results.data;

                var paginationHeader = angular.fromJson(results.headers("x-pagination"));

                $scope.totalRecordsCount = paginationHeader.TotalCount;

            }, function (error) {
                alert(error, message);

            });
        }

    }

    $scope.pageChanged = function (page) {

        $scope.currentPage = page;
        getUserPlaces();

    };

});