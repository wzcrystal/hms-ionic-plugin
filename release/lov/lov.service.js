(function (angular) {
  "use strict";

  angular.module('ionic').provider('hmsLov', HmsLovProvider);

  function HmsLovProvider() {
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
