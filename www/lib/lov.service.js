(function (angular) {
  "use strict";
  // angular.module('hms.lov.service', []);
  angular.module('ionic')
    .service('hmsLovService', HmsLovService);

  function HmsLovService() {
    var factory = this;
    factory.config = {};
    factory.setConfig = setConfig;
    factory.getConfig = getConfig;

    function setConfig(config) {
      factory.config = config;
    }

    function getConfig() {
      return factory.config;
    }
  }

})(angular);
