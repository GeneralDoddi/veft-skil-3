'use strict';

/**
 * @ngdoc overview
 * @name kodemonFrontApp
 * @description
 * # kodemonFrontApp
 *
 * Main module of the application.
 */
var app = angular.module( 'kodemonFrontApp', [
                          'ngResource',
                          'ngRoute'

  ]);
 app.config(function($httpProvider) {
      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;

      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });

 
 app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/kodemon', {
        templateUrl: 'views/kodemon.html',
        controller: 'KodemonCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
