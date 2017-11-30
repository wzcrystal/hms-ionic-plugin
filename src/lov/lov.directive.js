(function (angular) {
  'use strict';
  // angular.module('hms.lov', ['hms.lov.service']);

  angular.module('ionic')
    .directive('hmsLov', hmsLovDirective);

  function hmsLovDirective(hmsLov) {
    var config = hmsLov.getConfig();
    var templateUrl = config.tplUrl || 'lib/lov.tpl.html';
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
    var controllerFn = function ($scope, $element, $attrs, $transclude, $ionicModal) {

      $scope.loadMoreDataFlag = true; // 加载更多
      $scope.modal = null; // Lov对话框
      $scope.selectItem = null; // 选择值
      $scope.conditionValue = '';
      $scope.rows = [];
      // 从属性取配置
      $scope.config = {
        lovId: $attrs.lovId,
        lovLabel: $attrs.lovLabel,
        pageSize: $attrs.pageSize,
        fieldShow: $attrs.fieldShow,
        page: 0
      };
      $scope.openLov = openLov;
      $scope.closeLov = closeLov;
      $scope.selectValue = selectValue;
      $scope.search = search;
      $scope.loadMore = loadMore;
      // 获取第一页数据
      // $scope.search();

      // 函数定义
      // 根据条件获取数据
      function search() {
        // alert('search');
        $scope.loadMoreDataFlag = true;
        $scope.config.page = 1;

        $scope.data({
          page: 0,
          pageSize: $scope.config.pageSize,
          conditionValue: $scope.conditionValue
        }).then(function (response) {
          $scope.rows = response.rows;
          $scope.$broadcast('scroll.refreshComplete');
        }, function (error) {
          alert(angular.toJson(error, true));
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      function loadMore() {
        // 加载下一页
        $scope.data({
          page: $scope.config.page,
          pageSize: $scope.config.pageSize,
          conditionValue: $scope.conditionValue
        }).then(function (response) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.rows.push.apply($scope.rows, response.rows);
          if (response.rows.length < $scope.config.pageSize) {
            $scope.loadMoreDataFlag = false;
          } else {
            $scope.loadMoreDataFlag = true;
          }
          $scope.config.page++;
        }, function (error) {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          alert(angular.toJson(error, true));
        });

      }

      function openLov() {
        // $scope.loadData();
        if ($scope.modal == null) {
          var modalUrl = config.modalUrl || 'lib/lov.modal.html';
          $ionicModal.fromTemplateUrl(modalUrl, {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
          });
        } else {
          $scope.modal.show();
        }
      }

      function closeLov() {
        $scope.modal.hide();
      }

      function selectValue(item) {
        $scope.selectItem = item;
        $scope.ngModel = item[$scope.config.fieldShow];
        $scope.modal.hide();
      }
    };
    return {
      restrict: 'E',
      replace: true,
      // require: 'ngModel',
      templateUrl: templateUrl,
      scope: {
        ngModel: '=ngModel',
        selectItem: '=selectItem',
        data: '&data'
      },
      compile: compileFn,
      controller: controllerFn,
    };

  }


})(angular);
