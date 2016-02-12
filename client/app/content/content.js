'use strict';

angular.module('womenWorkingWithWomenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/content/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'app/content/about/about.html',
        controller: 'AboutCtrl'
      })
      .state('contact_us', {
        url: '/contact_us',
        templateUrl: 'app/content/contact_us/contact_us.html',
        controller: 'ContactUsCtrl'
      });
  });
