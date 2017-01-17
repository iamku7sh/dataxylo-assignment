var app = angular.module('gallery',[]);

app.controller('galleryController', ['$scope', '$http', function($scope, $http){

	var $ = angular.element;

	$scope.data = [];


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

		fd.append("description", $scope.description);

		$http.post('http://localhost:3000/api/gallery',fd,{
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then(function(response){
        	if(response.status === 200){
        	   	$scope.data.push(response.data);
        	}
        	$('#uploadModal').modal('hide');
        	$('#fileFromCpt').value = '';
        	$scope.description = '';
        });

	}  
}]);
