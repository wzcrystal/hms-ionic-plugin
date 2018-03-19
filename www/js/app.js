// Ionic Starter App
// var hmsModule =  angular.module('hmsModule', []);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, hmsLovProvider, hmsSignProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.plugin', {
        url: '/plugin',
        views: {
          'tab-plugin': {
            templateUrl: 'templates/tab-plugin.html',
            controller: 'PluginCtrl'
          }
        }
      })
      .state('tab.plugin-lov', {
        url: '/lov',
        views: {
          'tab-plugin': {
            templateUrl: 'templates/plugins/plugin-lov.html',
            controller: 'PluginLovCtrl'
          }
        }
      })
      .state('tab.plugin-sign', {
        url: '/sign',
        views: {
          'tab-plugin': {
            templateUrl: 'templates/plugins/plugin-sign.html',
            controller: 'PluginSignCtrl'
          }
        }
      })
      .state('tab.plugin-photoView', {
        url: '/photoView',
        views: {
          'tab-plugin': {
            templateUrl: 'templates/plugins/plugin-photoView.html',
            controller: 'PluginPhotoViewCtrl'
          }
        }
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })
      .state('defer', {
        url: '/defer',
        templateUrl: 'templates/angular_defer/angular_defer.html',
        controller: 'DeferCtrl'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/plugin');
    var lovConfig = {modalUrl: 'lib/lov/lov.modal.html', tplUrl: 'lib/lov/lov.tpl.html'};
    hmsLovProvider.setConfig(lovConfig);

    var signConfig = {
      modalUrl: 'lib/sign/sign.modal.html',
      tplUrl: 'lib/sign/sign.tpl.html',
      bgColor: '', // 设置画布的背景颜色
      brushSize: 3,//设置画笔的粗细
      brushColor: ''//设置画笔的颜色
    };
    hmsSignProvider.setConfig(signConfig);
    // hmsLovProvider.thingFromConfig = 'This was set in config()';
  });
