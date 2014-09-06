//$scope is the glue between the controller and the view
//we can think of it as the container holding the data that we want 
//to project on the view
app.controller('placesExplorerController', function ($scope) {
    //in this line we added a new model "exploreNearby" in the $scope object
    $scope.exploreNearby = "New York";
});