'use strict';

// Usermaps controller
angular.module('usermaps').controller('CommentController', ['$scope', '$stateParams', '$location', 'Authentication', 'Usermaps','Comment','$http',
    function($scope, $stateParams, $location, Authentication, Usermaps, Comment, $http) {
        /*	console.log(test)*/
        $scope.authentication = Authentication;

        $scope.create = function(){
            var comment = new Comment({
                comment: this.comment
            });

            comment.$save(function(response) {
                $location.path('usermaps');
                // Clear form fields
                $scope.comment = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function(comment){
            if ( comment ) {
                comment.$remove();

                for (var i in $scope.comment) {
                    if ($scope.comment [i] === comment) {
                        $scope.comment.splice(i, 1);
                    }
                }
            } else {
                $scope.comment.$remove(function() {
                    $location.path('usermaps');
                });
            }
        };

        $scope.find = function(){
            $scope.comments = Comment.query();
        };
    }
]);
