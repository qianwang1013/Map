'use strict';

// Usermaps controller
angular.module('usermaps').controller('UsermapsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Usermaps','$http',
	function($scope, $stateParams, $location, Authentication, Usermaps, $http) {
	/*	console.log(test)*/
		$scope.authentication = Authentication;
		$scope.center = {
				lat: 29.6520,
				lng: -82.3250,
				zoom: 14
			};
		$scope.layers = {};
		var markerIcon = [];
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
			console.log($scope.usermap);
			var usermap = $scope.usermap;
			$scope.usermap.category = $scope.new_category;
			usermap.$update(function() {
				$location.path('usermaps');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Usermaps
		$scope.find = function() {
			$scope.usermaps = Usermaps.query();
			myUsermaps($scope.usermaps,$scope.authentication.user._id);
		};

		$scope.getCoord = function(){
			$http.post('/usermaps/getCoord').success(function (res) {
				$scope.markers = [];
				for(var i = 0; i !== res.length; ++i){
					
					console.log(res);
					var thisIcon = markerType(res[i].layer);
					$scope.markers.push({
						lat: res[i].lat,
						lng: res[i].lng,
						layer: res[i].layer,
						icon: thisIcon
					});
/*					console.log(res[i].layer);
					console.log(markerType(res[i].layer));
					$scope.markers.icon = markerType(res[i].layer);*/

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

		var myUsermaps = function(usermaps, LoginID){
/*			console.log(usermaps);
			console.log(LoginID);*/
			$scope.myUserObj = [];
			angular.forEach(usermaps,function(value){
				if(usermaps.user._id === LoginID){
					$scope.myUserObj.push(value);
				}
			});
			console.log($scope.myUserObj);

		};

		var markerType = function(category){
			switch(category) {
			    case 'HandsOn':
					return {
		                    iconUrl: '/modules/core/img/brand/icon.png',
		                    iconSize:     [50, 45], // size of the icon
		                    iconAnchor:   [22, 50], // point of the icon which will correspond to marker's location
		                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor						
		                };	  
		        case 'Physics' :
		        	return {
							type: 'extraMarker',
	               		    icon: 'fa-star',
                  		    markerColor: 'red',
                    		prefix: 'fa',
                    		shape: 'circle'		        		
		        		};
		        case 'Music' :
		        	return {
							type: 'extraMarker',
	               		    icon: 'fa-star',
                  		    markerColor: 'green',
                    		prefix: 'fa',
                    		shape: 'circle'			        		
		        	};
		        case 'Art' :
		        	return{
							type: 'extraMarker',
	               		    icon: 'fa-star',
                  		    markerColor: 'blue-dark',
                    		prefix: 'fa',
                    		shape: 'circle'
		        	};
			    default:
			        return {
			        };
			    }
		}; 
		
	}
]);
