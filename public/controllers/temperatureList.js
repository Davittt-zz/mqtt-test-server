
angular.module('SolarApp',[])
	   .controller('ListController', function($scope, $http) {
	
	var list;
    $scope.title = "Temperature List";

	 $http({
        method : "GET",
        url : "http://localhost:3000/getTemperatures"
    }).then(function mySucces(response) {
        $scope.list = response.data;
    }, function myError(response) {
       $scope.list = response.statusText;
    });
	
	 
});
	



