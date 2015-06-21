'use strict';

//Usermaps service used to communicate Usermaps REST endpoints
angular.module('usermaps').factory('Usermaps', ['$resource',
	function($resource) {
		return $resource('usermaps/:usermapId', { usermapId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('usermaps').factory('Comment',['$resource',
	function($recourse){
		return $recourse('comment',{},
			{
			update:{
				method: 'PUT'
			}
		});
	}
]);

angular.module('usermaps').directive('jHeader',['$window', function($window){
	return{
		restrict: 'AE',
		link: function(scope,el,attr){
			$window.scroll(function(){
				if(el.scrollTop() > 1){
					el.addClass('fixed');
				}
				else{
					el.removeClass('fixed');
				}
			});		
		}	
	};

}
	
]);