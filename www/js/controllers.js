angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $timeout, $ionicScrollDelegate) {
    //var height=window.screen.height;
    $scope.blue=[]
    for(var i=0;i<15;i++){
      $scope.blue.push('blue');
    }

    $timeout(function(){
      var contentheight=$('.parent').height()-50;
      console.log(contentheight);
      $('.slidbox,.slider').css('height',contentheight+'px');
      $ionicScrollDelegate.freezeScroll(true);
    });

    $('.parent').scroll(function(){
      var _this = $(this);
      var parentHeight = $('.parent').height();
      var scrollTotalHeight = $(this)[0].scrollHeight;
      /*console.log('parentHeight:'+parentHeight);
      console.log('_this.scrollTop():'+_this.scrollTop());
      console.log('scrollTotalHeight:'+scrollTotalHeight);*/
      if((_this.scrollTop()+parentHeight)>=scrollTotalHeight){
        console.log('滚动到底部');
         $('.box,.scroll').css('overflow-y','auto');
      }else{
        $('.box,.scroll').css('overflow-y','hidden');
      }
    })

    $scope.scrollFun = function(){
      var top= $ionicScrollDelegate.getScrollPosition().top;
      var parentHeight = $('.parent').height();
      var scrollTotalHeight = $('.parent')[0].scrollHeight;
      console.log('parentHeight:'+parentHeight);
      console.log('_this.scrollTop():'+top);
      console.log('scrollTotalHeight:'+scrollTotalHeight);
      if((top+parentHeight)>=scrollTotalHeight){
        console.log('滚动到底部');
        $('.box').css('overflow-y','auto');
      }else{
        $('.box').css('overflow-y','hidden');
      }
    }

    $scope.moredata = true;

    $scope.loadMore = function(){
      console.log('上拉加载');
      /*$scope.moredata = false;*/
      for(var i=0;i<2;i++){
        $scope.blue.push('more');
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

  })

  .controller('ChatsCtrl', function ($scope, Chats) {

    $scope.txtCompare = function(){
      var txt1='除非承租方向出租方申请并获得出租方事先书面同意外，在租赁期内，承租方不得以固定物料或不透明物品遮挡商铺橱窗以及面对外街、走廊、行人通道或入口大堂的橱窗玻璃。承租方应以出租方满意的风格和方式布置商铺店面玻璃（如有）及陈列橱窗。承租方在收到出租方对其展示提出反对意见的通知后，立即改变或更换有关摆设。在营业时间内，承租方应保持商铺面向街道及大厦内公用区域的店面玻璃、陈列橱窗以及商店标记的照明，并且允许出租方控制通向店面玻璃、陈列橱窗以及商店标记的电路开关。';
      var txt2='承租方不得以固定物料或不透明物品遮挡商铺橱窗以及面对外街、走廊、行人通道或入口大堂的橱窗玻璃。承租方应以出租方满意的风格和方式布置商铺店面玻璃（如有）及陈列橱窗。除非承租方向出租方申请并获得出租方事先书面同意外，在租赁期外。'

      var txt1Arr=txt1.split('。');
      var txt2Arr=txt2.split('。');
      for(var i=0;i<(txt1Arr.length>txt2Arr.length?txt1Arr.length:txt2Arr.length);i++){    //按分号分

        if(txt1Arr[i]!=undefined && txt2Arr[i]!=undefined){
          var txt1fenhao=txt1Arr[i].split('；');
          var txt2fenhao=txt2Arr[i].split('；');
          //按逗号分
          for(var j=0;j<(txt1fenhao.length>txt2fenhao.length?txt1fenhao.length:txt2fenhao.length);j++){
            //如果两个数组中都有这个下标的数据，则继续细分逗号
            if(txt1fenhao[j]!=undefined && txt2fenhao[j]!=undefined){
              var txt1douhao=txt1fenhao[j].split('，');
              var txt2douhao=txt2fenhao[j].split('，');
              //逗号比对
              for(var k=0;k<(txt1douhao.length>txt2douhao.length?txt1douhao.length:txt2douhao.length);k++){
                //如果两个数组中都有这个下标的数据，则继续细分逗号
                if(txt1douhao[k]!=undefined && txt2douhao[k]!=undefined){
                  if(txt1douhao[k]!=txt2douhao[k]){
                    txt1douhao[k]='<span style="color:red;">'+txt1douhao[k]+'</span>';
                    txt2douhao[k]='<span style="color:red;">'+txt2douhao[k]+'</span>';
                  }
                }else if(txt1douhao[k]==undefined){ //如果第一个数组中没有这个下标数据，则蒋第二个数组中剩下的数据都标红，结束当前循环
                  var remindTxt2=txt2douhao.slice(k);
                  txt2douhao=txt2douhao.slice(0,k);
                  txt2douhao[k]='<span style="color:red;">'+remindTxt2.join(',')+'</span>';
                  break;
                }else if(txt2douhao[k]==undefined){ //如果第二个数组中没有这个下标数据，则蒋第一个数组中剩下的数据都标红，结束当前循环
                  var remindTxt1=txt1douhao.slice(k);
                  txt1douhao=txt1douhao.slice(0,k);
                  txt1douhao[k]='<span style="color:red;">'+remindTxt1.join(',')+'</span>';
                  break;
                }
              }
              txt2fenhao[j]=txt2douhao.join('，');
              txt1fenhao[j]=txt1douhao.join('，');
            }else if(txt1fenhao[j] == undefined){ //如果第一个数组中没有这个下标数据，则蒋第二个数组中剩下的数据都标红，结束当前循环
              var remindTxt2=txt2fenhao.slice(j);
              txt2fenhao=txt2fenhao.slice(0,j);
              txt2fenhao[j]='<span style="color:red;">'+remindTxt2.join('；')+'</span>';
              break;
            }else if(txt1fenhao[j] == undefined){ //如果第二个数组中没有这个下标数据，则蒋第一个数组中剩下的数据都标红，结束当前循环
              var remindTxt1=txt1fenhao.slice(j);
              txt1fenhao=txt1fenhao.slice(0,j);
              txt1fenhao[j]='<span style="color:red;">'+remindTxt1.join('；')+'</span>';
              break;
            }
          }
          txt1Arr[i]=txt1fenhao.join('；');
          txt2Arr[i]=txt2fenhao.join('；');
        }else if(txt1Arr[i]==undefined){
          var remindTxt2=txt2Arr.slice(i);
          txt2Arr=txt2Arr.slice(0,i);
          txt2Arr[i]='<span style="color:red;">'+remindTxt2.join('；')+'</span>';
          break;
        }else if(txt2Arr[i]==undefined){
          var remindTxt1=txt1Arr.slice(i);
          txt1Arr=txt1Arr.slice(0,i);
          txt1Arr[i]='<span style="color:red;">'+remindTxt1.join('；')+'</span>';
          break;
        }
      }
      $('#txt1').append(txt1Arr.join('。'));
      $('#txt2').append(txt2Arr.join('。'));
    }
    $scope.txtCompare();

   /* var txt1='除非承租方向出租方，申请并获得出租方事先书面同意外。';
    var txt2='承租方，申请并获得出租方事先书面同意外。';
    var txtSplit=['。', '；', '，'];
    console.log(txt1.split('。'))
    $scope.txtCompare = function(txt,txtSplit,txtSplitIndex){

      var txt1Arr=txt[0].split(txtSplit[txtSplitIndex]);
      var txt2Arr=txt[1].split(txtSplit[txtSplitIndex]);
      for(var i=0;i<(txt1Arr.length>txt2Arr.length?txt1Arr.length:txt2Arr.length);i++){    //按分号分
        if(txt1Arr[i]!=undefined && txt2Arr[i]!=undefined){
          if(txtSplit.length<=txtSplitIndex+1){ //已经分到最小
            if (txt1Arr[i] != txt2Arr[i]) {
              txt1Arr[i] = '<span style="color:red;">' + txt1Arr[i] + '</span>';
              txt2Arr[i] = '<span style="color:red;">' + txt2Arr[i] + '</span>';
            }
          }else {
            txtSplitIndex++;
            var txtChildArr=[txt1Arr[i],txt2Arr[i]];
            txt=$scope.txtCompare(txtChildArr,txtSplit,txtSplitIndex);
            console.log(txt);
          }
        }else if(txt1Arr[i]==undefined){
          var remindTxt2=txt2Arr.slice(i);
          txt2Arr=txt2Arr.slice(0,i);
          txt2Arr[i]='<span style="color:red;">'+remindTxt2.join(txtSplit[txtSplitIndex])+'</span>';
          break;
        }else if(txt2Arr[i]==undefined){
          var remindTxt1=txt1Arr.slice(i);
          txt1Arr=txt1Arr.slice(0,i);
          txt1Arr[i]='<span style="color:red;">'+remindTxt1.join(txtSplit[txtSplitIndex])+'</span>';
          break;
        }
      }
      txt1Arr=txt1Arr.join(txtSplit[txtSplitIndex]);
      txt2Arr=txt2Arr.join(txtSplit[txtSplitIndex]);
      return [txt1Arr,txt2Arr]
    }

    var txtArr=[txt1,txt2];
    $('#txt1').append(txtArr[0]);
    $('#txt2').append(txtArr[1]);
    console.log(txtArr);
    $scope.txtCompare(txtArr,txtSplit,0);*/
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('PluginCtrl', function ($scope, $http) {

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
  .controller('PluginPhotoViewCtrl', function ($scope, $ionicModal, $ionicSlideBoxDelegate, hmsPhotoView, $timeout) {
    $scope.imgList = [
      {url:'img/adam.jpg'},
      {url:'img/ben.png'},
      {url:'img/mike.png'},
      {url:'img/perry.png'},
      {url:'img/max.png'},
      {url:'img/nature.jpg'}
    ];

    $scope.flag=false;
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

      $timeout(function(){
        $scope.flag=true;
        console.log($scope.flag)
      },3000);
    }

    $scope.closeModal = function(){
      $scope.modal.hide();
      //$scope.modal.remove();
      //$scope.modal=null;
    }
  })

  /*angular延迟*/
  .controller('DeferCtrl', function ($scope, DeferService ,$q) {

    DeferService.funA(8).then(function(success){
      console.log(success);
    },function(err){
      console.log(err);
    });

    DeferService.funA(3).then(function(success){
      console.log(success);
      return DeferService.funB(8);
    },function(err){
      console.log(err);
      return DeferService.funB(8);
    }).then(function(success){
      console.log(success);
      return DeferService.funC(3);
    },function(err){
      console.log(err);
      return DeferService.funC(3);
    }).then(function(success){
      console.log(success);
    },function(err){
      console.log(err); //打印funB()的错误信息
    });


    $q.all(
      {
        funA:DeferService.funA(8), //调用失败
        funB:DeferService.funB(3)  //正常情况下是调用成功，但由于funA调用失败，固该方法也是失败
      })
    .then(function(success){
      console.log(success);
    },function(err){
      console.log(err);
    })

    var val=10;
    $q.when(val)
      .then(function(success){
        console.log(success);
      },function(err){
        console.log(err);
      })
  });
;
