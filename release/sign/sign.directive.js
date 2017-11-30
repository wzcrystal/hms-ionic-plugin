(function (angular) {
  "use strict";

  angular.module('ionic')
    .directive('hmsSign', hmsSignDirective);

  function hmsSignDirective(hmsSign) {
    var config = hmsSign.getConfig();
    var templateUrl = config.tplUrl || 'lib/sign.tpl.html';
    var modalUrl = config.modalUrl || 'lib/sign.modal.html';
    // 背景canvas
    var global = {
      // intervalId:0,
      width: 0,//获取画布的宽度
      height: 0,//获取画布的高度
      canvas: '',
      context: '',
      point: {x: 0, y: 0},// 当前位置
      nextPoint: {x: 0, y: 0},// 下一个位置
      cut: 0
    };
    var signNode = null;

    function setPoint(x, y) {
      var newPoint = {};
      newPoint.x = x;
      newPoint.y = y;
      return newPoint;
    }

    function updatePoint(point) {
      if (!global.nextPoint) {
        global.nextPoint = setPoint(0, 0);
      } else {
        global.nextPoint = setPoint(point.x, point.y);
      }
    }

    function loopPoint(e) {
      // console.log('loopPoint:('+global.point.x+','+global.point.y+')');
      updatePoint(global.point);
    }


    //触摸滑动事件
    function touchMove() {
      var e = event.touches[0];
      // console.log('touchMove');
      global.point = setPoint(e.clientX, e.clientY);
      //$pos_display.innerHTML = '你上一点鼠标的位置为(' + point.x + ',' + point.x + ').<br/>你当前鼠标的位置为(' + next_point.x + ',' + next_point.x + ')';//更新当前鼠标点击的位置
      draw(global.context);
      global.cut++;
    }

    //触摸开始事件
    function touchStart() {
      // var e = event.touches[0];
      // global.point = setPoint(e.clientX, e.clientY);
      // console.log('touchStart.config' + angular.toJson(config, true));
      var canvas = document.createElement('canvas');
      signNode.appendChild(canvas);
      // canvas.id = 'canvas'+global.cut;
      canvas.width = global.width;
      canvas.height = global.height;
      canvas.addEventListener('touchstart', touchStart, false);
      canvas.addEventListener('touchmove', touchMove, false);
      canvas.addEventListener('touchend', touchEnd, false);

      global.canvas = canvas;
      global.context = canvas.getContext('2d');
      draw(global.context);
      global.cut = 1;
    }

    //触摸结束时间
    function touchEnd() {
      console.log('touchEnd');
      global.context.save();
    }

    function draw(context) {
      if (global.cut > 1) {
        console.log('draw');
        //context.save;//保存当前绘画状态
        context.fillStyle = config.brushColor;//设置填充的背景颜色
        context.lineWidth = config.brushSize;//设置画笔的大小
        context.lineCap = 'round';//设置线条，让线条更加的圆润
        context.beginPath();

        context.moveTo(global.point.x, global.point.y);
        context.lineTo(global.nextPoint.x, global.nextPoint.y);
        console.log('move (' + global.point.x + ',' + global.point.y + ')->(' + global.nextPoint.x + ',' + global.nextPoint.y + ')');

        context.stroke();

        /****
         *context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
         *参数 x,y表示圆心
         *radius半径
         *startAngle起始弧度
         *endAngle终止弧度
         *anticlockwise是否为逆时针方向
         ***/
        context.restore();//回复绘画状态
      }
    }

    // 编译函数
    var compileFn = function (elem, attrs, transclude) {

      return {
        // 编译前
        pre: function preLink(scope, elem, attrs, controller) {
          // 函数声明

        },
        // 编译后
        post: function postLink(scope, elem, attrs, controller) {

        }
      };
    };

    var controllerFn = function ($scope, $element, $attrs, $transclude, $ionicModal) {
      // 变量初始化
      $scope.modal = null;
      $scope.intervalId = null;
      // 函数声明
      $scope.openSign = openSign;
      $scope.closeSign = closeSign;
      $scope.save = save; // 保存
      $scope.redo = redo; // 撤销
      $scope.redraw = redraw; // 重画
      // var node = $element[0];
      // 初始化配置信息
      // var signNode = $scope.modal.getElementsByClassName('hms-sign-cav')[0];


      /*
       位置记录
       setInterval 每隔一定时间调用一次这个方法
       clearInterval方法：清除对setInterval的调用
       */
      function openSign() {
        if ($scope.modal == null) {
          $ionicModal.fromTemplateUrl(modalUrl, {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
            initModal();
          });
        } else {
          $scope.modal.show();
          initModal();
        }
      }
      function initModal(){
        var content = $scope.modal.el.getElementsByTagName('ion-content')[0];
        global.canvas = $scope.modal.el.getElementsByClassName('hms-sign-cav-bg')[0];
        signNode = $scope.modal.el.getElementsByClassName('hms-sign-cav')[0];
        global.context = global.canvas.getContext('2d');//获取画布上下文
        global.width = global.canvas.width = content.clientWidth;//获取画布的宽度'375';//
        global.height = global.canvas.height = content.clientHeight;//获取画布的高度'579';//
        config.bgColor = config.bgColor || '#FFFFFF'; // 设置画布的背景颜色
        config.brushSize = config.brushSize || 3;//设置画笔的粗细
        config.brushColor = config.brushColor || '#000000';//设置画笔的颜色
        //设置背景填充颜色
        global.context.fillStyle = config.bgColor;
        //设置画布背景
        global.context.fillRect(0, 0, global.width, global.height);
        // 背景画布添加监听
        global.canvas.addEventListener('touchstart', touchStart, false);
        global.canvas.addEventListener('touchmove', touchMove, false);
        global.canvas.addEventListener('touchend', touchEnd, false);
        $scope.intervalId = setInterval(loopPoint, 10);
      }
      function closeSign(){
        $scope.modal.hide();
        clearInterval($scope.intervalId);
      }
      function drawImg(context, img) {
        return context.drawImage(img, 0, 0);
      }

      function save() {
        var allCanvas = $scope.modal.el.getElementsByTagName('canvas');
        var canvas = $scope.modal.el.getElementsByClassName('hms-sign-cav-bg')[0];
        var context = canvas.getContext('2d');
        var canvasLength = allCanvas.length - 1;
        for (var i = canvasLength; i > 0; i--) {
          drawImg(context, allCanvas[i]);
          signNode.removeChild(allCanvas[i]);
        }
        var data = canvas.toDataURL();
        $scope.ngModel = data;
        closeSign();
      }

      // 撤销
      function redo() {
        var allCanvas = signNode.getElementsByTagName('canvas');
        var canvasLength = allCanvas.length - 1;
        if (canvasLength > 0) {
          signNode.removeChild(allCanvas[canvasLength]);
        }
      }

      // 重画
      function redraw() {
        var allCanvas = signNode.getElementsByTagName('canvas');
        var canvasLength = allCanvas.length - 1;
        for (var i = canvasLength; i > 0; i--) {
          signNode.removeChild(allCanvas[i]);
        }
      }
    };
    return {
      restrict: "EA",
      replace: false,
      templateUrl: templateUrl,
      scope: {
        ngModel: '=ngModel'
      },
      compile: compileFn,
      controller: controllerFn
    };

  }


})(angular);
