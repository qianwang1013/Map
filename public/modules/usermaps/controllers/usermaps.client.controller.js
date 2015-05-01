'use strict';

// Usermaps controller
angular.module('usermaps').controller('UsermapsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Usermaps','Category','$http',
	function($scope, $stateParams, $location, Authentication, Usermaps, test_Category, $http) {
	/*	console.log(test)*/
		$scope.authentication = Authentication;
		$scope.center = {
				lat: 29.6520,
				lng: -82.3250,
				zoom: 12
			};
		$scope.layers = {};
		// Create new Usermap
		$scope.create = function() {
			if(this.new_category !== '' && this.category === 'New Category'){
				this.category = this.new_category;
			}
			// Create new Usermap object
			var usermap = new Usermaps ({
				name: this.name,
				lat: this.lat,
				lng: this.lng,
				description: this.description,
				notes: this.notes,
				link: this.link,
				category: this.category
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
				console.log('category ' + res);
				for(var i = 0; i !== res.length; ++i){
					
					$scope.markers.push({
						lat: res[i].lat,
						lng: res[i].lng,
						layer: res[i].layer
					});
					
				}
				//console.log('successful res ' + res[0].lat + 'my leagth: ' + res.length);
			}).error(function (response) {
				//console.log(response);
			});
		};


		$scope.getCategory = function(){
			$http.post('/usermaps/getCategory').success(function (res) {
			$scope.categoryList = [];
				for(var i = 0; i !== res.length; ++i){
					$scope.categoryList.push(
						res[i]
					);
				}

			$scope.layers.baselayers = [];
			$scope.layers.baselayers = 
			{
            	mapbox_light: {
                    name: 'Mapbox Light',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    type: 'xyz',
                    layerOptions: {
                        apikey: 'pk.eyJ1IjoiYnVmYW51dm9scyIsImEiOiJLSURpX0pnIn0.2_9NrLz1U9bpwMQBhVk97Q',
                        mapid: 'bufanuvols.lia22g09'
                        }
                    }			
            };
			$scope.layers.overlays = [];
			//add layers
			$scope.test_layers = ['Science', 'Foo'];
			angular.forEach($scope.categoryList, function(value){
				$scope.layers.overlays[value] = 
					 {
						name: value,
						type: 'markercluster',
						visible: true					
					};
			});

			console.log($scope.layers);
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
	}
]);
