var letao;
$(function(){
  letao = new Letao();
  letao.initScroll();
  letao.xialashuaxin();
  letao.searchClick();
  letao.skipdata();
  letao.datasort();
})

var searchVal;
var page = 1;
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
                    letao.commodityAjax({
                      proName: searchVal
                    },function(backData){
                      var result = template("commodity",backData);
                      $("#sport-area .mui-row").html(result);
                      mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                      
                    })
                  },1500)
              }
              //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          },
          up: {
              callback: function() {//上拉加载的回调函数
                setTimeout(function(){
                  letao.commodityAjax({
                    proName: searchVal,
                    page: ++page
                  },function(backData){
                      var result = template("commodity",backData);
                      $("#sport-area .mui-row").html(result);
                      if(backData.data.length > 0){
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();                    
                      }else {
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                      }
                  })
                },1500)
              }
          }
      }
    });
  },
  // 点击搜索
  searchClick:function(){
    $(".seek").on("tap",function(){
      searchVal = $(".search input").val();
      letao.commodityAjax({
        proName: searchVal
      },function(backData){
        var result = template("commodity",backData);
        $("#sport-area .mui-row").html(result);
      });
    })
  },
  // 商品的数据获取和渲染
  commodityAjax:function(obj,answer){
    $.ajax({
      url:"/product/queryProduct",
      data:{
        page: obj.page || 1,
        pageSize: 2,
        proName: obj.proName,
        price: obj.price,
        num: obj.num
      },
      success:function(backData){
        if(answer) {
          answer(backData);
        }
      }
    })
  },
  skipdata:function(){
    searchVal = getQueryString("name");
    letao.commodityAjax({
        proName: searchVal
      },function(backData){
        var result = template("commodity",backData);
        $("#sport-area .mui-row").html(result);
      });
  },
  datasort:function(){
    $(".orderBar a").on("tap",function(){
      var genre = $(this).attr("genre");
      var sort = $(this).attr("sort");
      if(sort == 1) {
        sort = 2;
      }else if(sort == 2) {
        sort = 1;
      }
      $(this).attr("sort",sort);
      if(genre == "price") {
        letao.commodityAjax({
          proName: searchVal,
          price: sort
        },function(backData){
          var result = template("commodity",backData);
          $("#sport-area .mui-row").html(result);
        });
      }else if(genre == "num"){
        letao.commodityAjax({
          proName: searchVal,
          num: sort
        },function(backData){
          var result = template("commodity",backData);
          $("#sport-area .mui-row").html(result);
        });
      }
    })
  }
}

//获取url地址栏的参数的函数 网上找的  name就是url参数名
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if ( r != null ){
       return decodeURI(r[2]);
    }else{
       return null;
    } 
 }