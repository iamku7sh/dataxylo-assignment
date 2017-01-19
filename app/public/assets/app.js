var app = angular.module('gallery',['ngRoute']);


app.controller('MainController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
 });

app.controller('galleryController', ['$scope', '$http', function($scope, $http){

	var $ = angular.element;

	$scope.data = [];
	$scope.fileFromURL = '';


	$scope.removeImage = function(id){
		for (var i = 0; i < $scope.data.length; i++) {
			if($scope.data[i].id == id){
				$scope.data.splice(i,1);
				return;
			} 
		}
	}

	$('#fileFromCpt').change(function(e){
        $scope.fileFromCpt = e.target.files[0];
    });
	
	$scope.uploadFile = function(){
		// console.log($scope.fileFromCpt);
		// console.log($scope.fileFromURL);
		// console.log($scope.description);

		var fd = new FormData();

		fd.append("file",$scope.fileFromCpt);
		fd.append("url", $scope.fileFromURL ? $scope.fileFromURL : false);
		fd.append("description", $scope.description);

		$http.post('http://localhost:3000/api/gallery',fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then(function(response){
        	if(response.status === 201){
        	   	$scope.data.push(response.data);
        	}
        	$('#uploadModal').modal('hide');
        	$('#fileFromCpt').value = '';
        	$scope.description = '';
        });

	}

	$scope.saveCollection = function(){
		var params = { collectionName: $scope.collectionName, data: $scope.data};
		params = angular.toJson(params);

		var fd = new FormData();
		fd.append("data", params);
		
		$http
			.post('http://localhost:3000/api/collection',fd,{
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
        	})
			.then(function(response){ 
				$('#saveModal').modal('hide');
	        	$scope.collectionName = '';
			});
	}
}]);


app.controller("galleryCollectionController",['$scope', '$http', '$location', '$routeParams' ,function($scope, $http, $location, $routeParams){
	$scope.init = function(){
		console.log($routeParams);
		var collectionName = $routeParams.collectionName;
		console.log(collectionName);
		$http.get('http://localhost:3000/api/collection/'+collectionName)
			.then(function(response){
				if(response.status == 200){
					$scope.data = response.data;
				}
			});
	}


}]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.
	when('/', {templateUrl: 'partials/gallery.html',   controller: 'galleryController'}).
	when('/:collectionName', {templateUrl: 'partials/collection.html', controller: 'galleryCollectionController'}).
	otherwise({redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);
