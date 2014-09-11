//$scope is the glue between the controller and the view
//we can think of it as the container holding the data that we want 
//to project on the view
app.controller('placesExplorerController', function ($scope, placesExplorerService, placesPhotosService, $filter, $model) {
    //in this line we added a new model "exploreNearby" in the $scope object
    $scope.exploreNearby = "New York";
    $scope.exploreQuery = "";
    $scope.filterValue = "";

    $scope.places = [];
    $scope.filteredPlaces = [];
    $scope.filteredPlacesCount = 0;

    //paging
    $scope.totalRecordsCount = 0;
    $scope.pageSize = 10;
    $scope.currentPage = 1;

    init();

    function init() {
        createWatche();
        getPlaces();
    }

    function getPlaces() {

        var offset = ($scope.pageSize) * ($scope.currentPage - 1);

        //we were able to issue HTTP GET request to the factory we created.
        //arguments is pass by (key, value) pairs. (i.e. near,query, limit)
        placesExplorerService.get({ near: $scope.exploreNearby,query: $scope.exploreQuery, limit: $scope.pageSize, offset: offset },function(placesResult){

            if (placesResult.response.groups) {
                $scope.places = placesResult.response.groups[0].items;
                $scope.totalRecordsCount = placesResult.response.totalResults;
                filterPlaces('');
            }
            else {
                $scope.places = [];
                $scope.totalRecordsCount = 0;
            }
        });
    };

    function filterPlaces(filterInput) {
        $scope.filteredPlaces = $filter("placeNameCategoryFilter")($scope.places, filterInput);
        $scope.filteredPlacesCount = $scope.filteredPlaces.length;
    }

    function createWatche() {
        //added listener for the filterValue attribute
        //this listener gets fired when the filterValue has changed.
        $scope.$watch("filterValue", function (filterInput) {
            filterPlaces(filterInput);
        });
    }

    //will be called on the explore button clicked
    $scope.doSearch = function () {
        $scope.currentPage = 1;
        getPlaces();
    };

    $scope.pageChanged = function (page) {
        $scope.currentPage = page;
        getPlaces();
    };

    $scope.buildCategoryIcon = function (icon) {
        return icon.prefix + '44' + icon.suffix;
    };

    $scope.buildVenueThumbnail = function (photo) {
        return photo.items[0].prefix + '128x128' + photo.items[0].suffix;
    };

    $scope.showVenuePhotos = function (venueId, venueName) {

        placesPhotosService.get({ venueId: venueId }, function (photosResult) {

            var modalInstance = $modal.open({
                templateUrl: 'app/views/placesphotos.html',
                controller: 'placesPhotosController',
                resolve: {
                    venueName: function () {
                        return venueName;
                    },
                    venuePhotos: function () {
                        return photosResult.response.photos.items;
                    }
                }
            });

            modalInstance.result.then(function () {
                //$scope.selected = selectedItem;
            }, function () {
                //alert('Modal dismissed at: ' + new Date());
            });

        });
    };
});