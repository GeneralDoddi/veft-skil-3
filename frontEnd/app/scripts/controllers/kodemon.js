'use strict';

/**
 * @ngdoc function
 * @name kodemonFrontApp.controller:KodemonCtrl
 * @description
 * # KodemonCtrl
 * Controller of the kodemonFrontApp
 */
angular.module('kodemonFrontApp')
  .controller('KodemonCtrl', function ($scope,$http) {
    
   $scope.loadKodemonList = function () {

   		
   		$http.get('localhost:8080/api/').success(function (data) {
			$scope.results = angular.fromJson(data);
			  
   		}).error(function () {
   			alert("error");
   		});
   }

  });
