# hms-ionic-plugin
ionic指令插件


##图片预缩放插件
使用说明：
  1. 在index.html中引入指令的photoView.directive.js与photoView.service.js，也可集成到项目中的js文件中；
  2. 在app.js的config中配置指令的配置参数，也可在单独的控制中配置，配置详情如下：
  ```javascripts
      var config = {
            hasPagePoint: true, //是否需要小圆点,默认为 true
            bgColor: '#000',  //背景颜色，默认黑色
            tplUrl: 'lib/photoView/photoView.tpl.html', //指令html页面，默认 lib/photoView/photoView.tpl.html
            minZoom: 1, //最小缩放程度，默认为1
            maxZoom: 3, //最大缩放程度，默认为3
            scrollWidth: window.screen.width,  //图片预览宽度，默认为手机屏幕宽度
            scrollHeight: window.screen.height  //图片预览高度，默认为手机屏幕高度
      };
      hmsPhotoViewProvider.setConfig($scope.imageConfig);
  ```
  3. 图片预览采用modal的形式弹出，因此页面需要写modal代码，如下：
      <script id="image-modal.html" type="text/ng-template">
        <div class="modal">
          <hms-photo-view img-list="imgList" slide-index="index" img-url="url" close-modal="closeModal()"></hms-photo-view>
        </div>
      </script>
  4. 指令参数说明：
      <hms-photo-view img-list="imgList" slide-index="index" img-url="url" close-modal="closeModal()"></hms-photo-view>
      img-list：存储预览图片的数组
      slide-index：当前预览图片的索引，当点击某张图片时，传入该图片的索引，使指令在第一次加载时顺利切换到该索引的图片，否则会默认展示第一张
      img-url：img-list图片数组中表示图片路径的字段名
      close-modal：关闭图片预览modal框的方法
  5. 页面控制器中的调用注意事项：
      在显示modal的方法中需要调用 $ionicSlideBoxDelegate.slide(index);$ionicSlideBoxDelegate.update(); 这两行代码。
          $ionicSlideBoxDelegate.slide(index)：是用来处理点击某张图片时，指令的slideBox组件顺利切换到当前图片位置，这是因为在modal中指令加载一次之后，
      后续在显示与隐藏modal中不会再重新加载指令，因此指令不会主动调用方法切换图片，故而在显示modal处调用该代码来解决图片定位问题。
          $ionicSlideBoxDelegate.update()：当图片数组涉及到增删改的处理时，modal中的指令对图片的更新未及时响应导致显示错误等问题，
      保险起见，使用该语句对图片预览组件进行更新。（如果图片数组不涉及增删改，则不需要加这条语句。）
      例：
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
