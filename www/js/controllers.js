angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $q) {

  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('PluginCtrl', function ($scope) {
  })
  .controller('PluginLovCtrl', function ($scope, DataService) {
    $scope.modal;
    $scope.address = '长沙';
    $scope.item;
    $scope.getAddressLov = getAddressLov;

    function getAddressLov(page, pageSize, conditionValue) {
      return DataService.getData(page, pageSize, conditionValue);
    }
  })
  .controller('PluginSignCtrl', function ($scope, DataService) {
    $scope.signData = 'null';
  })
  .controller('PluginPhotoViewCtrl', function ($scope, $ionicModal, $ionicSlideBoxDelegate, hmsPhotoView, DataService) {
    $scope.imgList = [
      {url:'img/adam.jpg'},
      {url:'img/ben.png'},
      {url:'img/mike.png'},
      {url:'img/perry.png'},
      {url:'img/max.png'},
      {url:'img/nature.jpg'}
    ];

    $scope.imageConfig = {
      hasPagePoint: false, //是否需要小圆点
      bgColor: '#ccc',  //背景颜色
      tplUrl: 'lib/photoView/photoView.tpl.html', //指令html页面
      minZoom: 1, //最小缩放程度
      maxZoom: 2, //最大缩放程度
      scrollWidth: window.screen.width,  //图片浏览器宽度
      scrollHeight: window.screen.height  //图片浏览器高度
    };
    hmsPhotoView.setConfig($scope.imageConfig);

    $scope.index = 0;
    $scope.showImg = function(index){
      $scope.index = index;
      if($scope.modal == null){
        $ionicModal.fromTemplateUrl('image-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;
          $scope.modal.show();
          $ionicSlideBoxDelegate.slide(index);
          $ionicSlideBoxDelegate.update();
        });
      }else{
        $scope.modal.show();
        $ionicSlideBoxDelegate.slide(index);
        $ionicSlideBoxDelegate.update();
      }
    }

    $scope.closeModal = function(){
      $scope.modal.hide();
      //$scope.modal.remove();
      //$scope.modal=null;
    }
  })
;
