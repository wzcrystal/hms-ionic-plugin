(function (angular) {
  "use strict";

  angular.module('ionic').provider('hmsPhotoView', HmsPhotoViewProvider);

  function HmsPhotoViewProvider() {
    this._config = {
      hasPagePoint: true, //是否需要小圆点
      bgColor: '#000',  //背景颜色
      tplUrl: 'lib/photoView/photoView.tpl.html', //指令html页面
      minZoom: 1, //最小缩放程度
      maxZoom: 3, //最大缩放程度
      scrollWidth: window.screen.width,  //图片浏览器宽度
      scrollHeight: window.screen.height  //图片浏览器高度
    };

    this.setConfig = function(config){
      this._config = config;
    }
    this.getConfig = function(){
      return this._config;
    }
    this.$get = function () {
      return this;
    }
  }
})(angular);
