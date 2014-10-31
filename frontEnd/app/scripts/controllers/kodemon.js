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
    
   $scope.loadKeyList = function () {

   		
   		$http.get('http://localhost:8080/api/allKeys').success(function (data) {
        
			$scope.keys = data;
      console.log($scope.keys);
			  
   		}).error(function (a,b,data) {
   			alert(data);
   		});
   }

   $scope.loadExecutionTimes = function (key) {

      console.log(key);
      $http.get('http://localhost:8080/api/executionTimes/'+key).success(function (data) {
        
      $scope.execTimes = data;
      console.log($scope.execTimes);
        
      }).error(function (a,b,data) {
        alert(data);
      });
   }

   $scope.loadKeyFromDates = function (key,date1,date2) {

      console.log(key);
      $http.get('http://localhost:8080/api/executionTimes/'+key+'/from/'+date1+'/to/'+date2).success(function (data) {
        
      $scope.execTimesFromRange = data;
      console.log($scope.execTimesFromRange);
        
      }).error(function (a,b,data) {
        alert(data);
      });
   }

  });
