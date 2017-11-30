(function (angular) {
  "use strict";

  angular.module('ionic').provider('hmsSign', HmsSignProvider);

  function HmsSignProvider() {
    this._config = {};
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
