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

angular.module('usermaps').factory('Category', ['$resource',
	function($resource){
		var obj = $resource('/usermaps/getCategory');
		console.log('I really want to know obj: ' + obj);
		return obj;
	}
]);

angular.module('usermaps').directive('jScroll',['',
	
]);