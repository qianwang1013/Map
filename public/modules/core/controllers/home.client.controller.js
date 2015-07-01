'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Users', '$location', '$http', '$modal', '$log',
	function($scope, Authentication, Users, $location, $http, $modal, $log) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.findUser = function(){
			$scope.isCollapsed = false;
			$scope.requestUsers = [];
			$scope.allUser = [];	
			var users = $scope.users = Users.query();	
			users.$promise.then(function success(data) {
			  angular.forEach(data, function(value){
			  		$scope.allUser.push(value);
				if(value.isUser === 0){
					console.log(value);
				  	$scope.requestUsers.push(value);
				}
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
				/* jshint ignore: start  */
				toastr.success( 'User successfully accept');
				/* jshint ignore: end */
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


		/*Modal*/

		  $scope.items = ['item1', 'item2', 'item3'];

		  $scope.animationsEnabled = true;

		  $scope.showUser = function (size) {

		    var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'modules/core/views/show.users.client.view.html',
		      controller: 'HomeController',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });
		  };

		  $scope.toggleAnimation = function () {
		    $scope.animationsEnabled = !$scope.animationsEnabled;
		  };

		  $scope.pushAll = function(allUser, emailContent){
		  		var emailList = [];
			    angular.forEach(allUser, function(user){
			    	if(emailList.indexOf(user.email) === -1){
						emailList.push(user.email);	    		
			    	}

				});
			    var req = {};
			    req.list = emailList;
			    req.content = emailContent;
			    console.log(req);
		  		$http.post('core/sent', req).success(function(res){

		  		});
		  };


	}
]);
