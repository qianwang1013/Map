'use strict';

// Usermaps controller
angular.module('usermaps').controller('UsermapsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Usermaps','$http',
	function($scope, $stateParams, $location, Authentication, Usermaps, $http) {
		$scope.authentication = Authentication;

		// Create new Usermap
		$scope.create = function() {
			// Create new Usermap object
			var usermap = new Usermaps ({
				name: this.name,
				lat: this.lat,
				lng: this.lng,
				description: this.description,
				notes: this.notes,
				link: this.link
			});

			// Redirect after save
			usermap.$save(function(response) {
				$location.path('usermaps/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Usermap
		$scope.remove = function(usermap) {
			if ( usermap ) { 
				usermap.$remove();

				for (var i in $scope.usermaps) {
					if ($scope.usermaps [i] === usermap) {
						$scope.usermaps.splice(i, 1);
					}
				}
			} else {
				$scope.usermap.$remove(function() {
					$location.path('usermaps');
				});
			}
		};

		// Update existing Usermap
		$scope.update = function() {
			var usermap = $scope.usermap;

			usermap.$update(function() {
				$location.path('usermaps/' + usermap._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Usermaps
		$scope.find = function() {
			$scope.usermaps = Usermaps.query();
		};

		$scope.getCoord = function(){
			$http.post('/usermaps/getCoord').success(function (res) {
				$scope.markers = [];
				for(var i = 0; i !== res.length; ++i){
					$scope.markers.push({
						lat: res[i].lat,
						lng: res[i].lng
					});
				}
				//console.log('successful res ' + res[0].lat + 'my leagth: ' + res.length);
			}).error(function (response) {
				//console.log(response);
			});
		};

		// Find existing Usermap
		$scope.findOne = function() {
			$scope.usermap = Usermaps.get({ 
				usermapId: $stateParams.usermapId
			});
		};


		$scope.leaflet_setup = function(){
			$scope.center = {
				lat: 29.6520,
				lng: -82.3250,
				zoom: 12
			};
		};

	}
]);
