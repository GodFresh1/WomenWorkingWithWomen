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
      .state('about.story', {
        url: '/story',
        templateUrl: 'app/content/about/story/story.html',
        controller: 'AboutCtrl'
      })
      .state('about.board', {
        url: '/board',
        templateUrl: 'app/content/about/board/board.html',
        controller: 'AboutCtrl'
      })
      .state('about.partners', {
        url: '/partners',
        templateUrl: 'app/content/about/partners/partners.html',
        controller: 'AboutCtrl'
      })
      .state('about.testimonials', {
        url: '/testimonials',
        templateUrl: 'app/content/about/testimonials/testimonials.html',
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
      .state('events.upcomingevents', {
        url: '/upcomingevents',
        templateUrl: 'app/content/events/upcomingevents.html',
        controller: 'EventsCtrl'
      })
      .state('events.attendeeinformation', {
        url: '/attendeeinformation',
        templateUrl: 'app/content/events/attendee/attendeeinformation.html',
        controller: 'AttendeeCtrl'
      })
      .state('events.vendorinformation', {
        url: '/vendorinformation',
        templateUrl: 'app/content/events/vendor/vendorinformation.html',
        controller: 'VendorCtrl'
      })
      .state('events.vendorregistration', {
        url: '/vendorregistration',
        templateUrl: 'app/content/events/vendor/vendorregistration.html',
        controller: 'VendorCtrl'
      })
      .state('events.attendeeregistration', {
        url: '/attendeeregistration',
        templateUrl: 'app/content/events/attendee/attendeeregistration.html',
        controller: 'AttendeeCtrl'
      })
      .state('events.attendeeregistration.success', {
        url: '/attendeeregistrationsuccess',
        templateUrl: 'app/content/events/success.html',
        controller: 'AttendeeCtrl'
      })
      .state('events.vendorregistration.success', {
        url: '/vendorregistrationsuccess',
        templateUrl: 'app/content/events/success.html',
        controller: 'VendorCtrl'
      })
      .state('take_action', {
        url: '/take_action',
        templateUrl: 'app/content/take_action/take_action.html',
        controller: 'TakeActionCtrl'
      })
      .state('take_action.volunteer', {
        url: '/volunteer',
        templateUrl: 'app/content/take_action/volunteer.html',
        controller: 'VolunteerCtrl'
      })
      .state('take_action.tutor', {
        url: '/tutor',
        templateUrl: 'app/content/take_action/tutor.html',
        controller: 'TutorCtrl'
      })
      .state('services', {
        url: '/services',
        templateUrl: 'app/content/services/services.html',
        controller: 'ServicesCtrl'
      })
      .state('services.professional', {
        url: '/professional',
        templateUrl: 'app/content/services/professional.html',
        controller: 'ServicesCtrl'
      })
      .state('services.personal', {
        url: '/personal',
        templateUrl: 'app/content/services/personal.html',
        controller: 'ServicesCtrl'
      })
      .state('admin_dash', {
        url: '/admin_dash',
        templateUrl: 'app/content/adminDashboard/adminDash.html',
        controller: 'AdminDashCtrl'
      });
  });
