'use strict';

angular.module('womenWorkingWithWomenApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
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
      })
      .state('donations', {
        url: '/donations',
        templateUrl: 'app/content/donations/donations.html',
        controller: 'DonationsCtrl'
      })
      .state('gallery', {
        url: '/gallery',
        templateUrl: 'app/content/gallery/gallery.html',
        controller: 'GalleryCtrl'
      })
      .state('events', {
        url: '/events',
        templateUrl: 'app/content/events/events.html',
        controller: 'EventsCtrl'
      })
      .state('take_action', {
        url: '/take_action',
        templateUrl: 'app/content/take_action/take_action.html',
        controller: 'TakeActionCtrl'
      })
      .state('services', {
        url: '/services',
        templateUrl: 'app/content/services/services.html',
        controller: 'ServicesCtrl'
      });
  });
