(function (angular) {
  'use strict';
  // angular.module('hms.lov', ['hms.lov.service']);

  angular.module('ionic')
    .directive('hmsPhotoView', hmsPhotoViewDirective);

  function hmsPhotoViewDirective(hmsPhotoView) {
    var config = hmsPhotoView.getConfig();
    var templateUrl = config.tplUrl;
    // 编译函数
    var compileFn = function (elem, attrs, transclude) {
      var node = elem[0];

      return {
        // 编译前
        pre: function preLink(scope, elem, attrs, controller) {
          // 初始化配置信息
          // scope.config = config;
          // scope.config.lovId = attrs.lovId;
          // scope.config.lovLabel = attrs.lovLabel;
        },
        // 编译后
        post: function postLink(scope, elem, attrs, controller) {
        }
      };
    };
    // 控制函数
    var controllerFn = function ($scope, $element, $attrs, $timeout, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
      $timeout(function(){
        $ionicSlideBoxDelegate.$getByHandle('slideHandle').slide($scope.slideIndex);
      },100);
      $scope.minmax = {
        'height':config.scrollHeight+'px'
      };
      $scope.bgColor = config.bgColor;
      $scope.minZoom = config.minZoom;
      $scope.maxZoom = config.maxZoom;
      $scope.hasPagePoint = config.hasPagePoint;

      $scope.$watch()

      $scope.slideHasChanged = slideHasChanged; //图片切换完成时
      $scope.reset = reset; //重新设置滚动框大小
      $scope.closeImageModal = closeImageModal; //关闭

      function slideHasChanged(index){
        $ionicScrollDelegate.$getByHandle('scrollHandle'+index).zoomTo($scope.minZoom,false,0,0);
      }

      /*
      * 根据放大的指数计算高度，从而设置滚动区域的高度，解决放大时上下出现空白区域
      *
      * 根据放大的指数计算宽度，从而设置在最左或者最右时进行图片切换，解决图片放大后滚动查看与左右切换查看冲突
      * */
      function reset(index){
        //缩放指数
        var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle'+index).getScrollPosition().zoom;
        //距离左侧以滚动的距离
        var scrolledLeft=$ionicScrollDelegate.$getByHandle('scrollHandle'+index).getScrollPosition().left;
        //缩放的实际宽度
        var zoomWidth=zoomFactor*config.scrollWidth;
        //缩放的图片实际高度
        var imgzoomheight=zoomFactor*document.getElementById('image'+index).offsetHeight;

        //处理缩放时上下出现空白问题
        if(zoomFactor>1){
          if(imgzoomheight<config.scrollHeight){
            document.getElementById('scrollHandle'+index).style.height=imgzoomheight+'px';
          }else{
            document.getElementById('scrollHandle'+index).style.height=config.scrollHeight+'px';
          }
        }else{
          document.getElementById('scrollHandle'+index).style.height=document.getElementById('image'+index).offsetHeight+'px';
        }
        $ionicScrollDelegate.$getByHandle('scrollHandle'+index).resize();//修改滚动组件高度后，需要重置组件大小

        //处理左右滑动冲突问题
        //console.log('zoomFactor：'+zoomFactor+' config.scrollWidth:'+config.scrollWidth+' zoomWidth:'+zoomWidth+' scrolledLeft:'+scrolledLeft);
        if(scrolledLeft+config.scrollWidth>=zoomWidth || scrolledLeft<0){
          $ionicSlideBoxDelegate.$getByHandle('slideHandle').enableSlide(true);
        }else {
          $ionicSlideBoxDelegate.$getByHandle('slideHandle').enableSlide(false);
        }
      };

      function closeImageModal(index){
        $ionicScrollDelegate.$getByHandle('scrollHandle'+index).zoomTo($scope.minZoom,false,0,0);
        $scope.closeModal();
      }
    };

    return {
      restrict: 'E',
      replace: false,
      transclude:false,
      templateUrl: templateUrl,
      scope: {
        imgList: '=imgList',
        slideIndex: '=slideIndex',
        imgUrl: '@imgUrl',
        closeModal: '&closeModal',
        flag: '=flag'
      },
      //compile: compileFn,
      controller: controllerFn,
      link: function (scope, element, attr) {
        console.log('init333');
        console.log('init', scope.flag)

        scope.$watch('flag', function (val) {
          console.log(val)
        })
      }
    };
  }
})(angular);
