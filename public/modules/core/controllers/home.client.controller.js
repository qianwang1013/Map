'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Users', '$location', '$http',
	function($scope, Authentication, Users, $location, $http) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


		$scope.findUser = function(){
			$scope.requestUsers = [];
			var users = $scope.users = Users.query();	
			users.$promise.then(function success(data) {
			  angular.forEach(data, function(value){
			  	$scope.requestUsers.push(value);
			  });
			}, function error(msg) {
			  console.error(msg);
			});	
		};

		$scope.accept = function(id){
			var arg = {
				'id': id
			};

			$http.post('/users/acce', arg).success(function (res) {
				console.log(res);
				$location.path('/');
				toastr.success( 'User successfully accept');
			});
		};

		$scope.deleUser = function(id){
			var arg = {
				'id': id
			};

			$http.post('/users/deleUser', arg).success(function(res){
				console.log(res);
				$location.path('/');

				/* jshint ignore:start */
				toastr.success( 'User successfully delete');
				/* jshint ignore:end */

			});
		};
	}
]);
