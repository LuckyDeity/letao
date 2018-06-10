$(function(){
  var letao = new Letao();
  letao.initScroll();
  letao.xialashuaxin();
})
var Letao = function(){

}
Letao.prototype = {
  //初始化区域滚动
  initScroll:function () {
    //初始化区域滚动
    var options = {
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏  值越大滚动越慢
        bounce: true //是否启用回弹
    };
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll(options);
  },
  // 初始化下拉刷新
  xialashuaxin:function(){
    mui.init({
      pullRefresh: {
          container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
          down: {
              height: 50, //可选,默认50.触发下拉刷新拖动距离,
              auto: false, //可选,默认false.首次加载自动下拉刷新一次
              contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
              contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
              contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
              callback: function(){
                  setTimeout(function(){
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                  },1500)
              }
              //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          },
          up: {
              callback: function() {//上拉加载的回调函数
                setTimeout(function(){
                  mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                },1500)
              }
          }
      }
    });
  }
}