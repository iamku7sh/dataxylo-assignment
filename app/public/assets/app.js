var app = angular.module('galary',[]);

app.controller('gallaryController', ['$scope', function($scope){
	$scope.data = [{
		id : 12234,
		url : './img/pallu.png',
		description : 'pallu  tu toh h  pagal'
	},{
		id : 80853,
		url : './img/vinaykipanti.png',
		description : 'vinay toh gayo'
	},{
		id : 099809,
		url : './img/recoverykeyapple.png',
		description : 'apple ka page h bhai'
	}];


	$scope.removeImage = function(id){
		for (var i = 0; i < $scope.data.length; i++) {
			if($scope.data[i].id == id){
				$scope.data.splice(i,1);
				return;
			} 
		}
	}

	$scope.uploadFile = function(){
		console.log("working");
	}  
}]);
