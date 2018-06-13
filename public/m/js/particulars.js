var letao;
$(function() {
    letao = new Letao();
    // 通过乐淘对象初始化区域滚动
    letao.initScroll();
    letao.slideshow();
    letao.sizeplate();
    letao.joinCart();
})


var Letao = function(){

}

Letao.prototype = {
    // 初始化轮播图插件
    initSlide:function(){
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；  让轮播图支持自动轮播
        });
    },
    //初始化区域滚动
  initScroll:function () {
    //初始化区域滚动
    var options = {
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏  值越大滚动越慢
        bounce: true //是否启用回弹
    };
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll(options);
  },
  // 动态添加轮播图
  slideshow:function(){
    var id = getQueryString("id");
    $.ajax({
      url:"/product/queryProductDetail",
      data:{
        id:id
      },
      success:function(backData){
        var result = template("slideshow",backData);
        $("#slide .mui-slider").html(result);
        $("#main .name span").html(backData.proName);
        $("#main .price .present").html(backData.price);
        $("#main .price .original").html(backData.oldPrice);

        // 通过letao对象的初始化轮播图
        letao.initSlide();
      }
    })
  },
  sizeplate:function(){
    var id = getQueryString("id");
    $.ajax({
      url:"/product/queryProductDetail",
      data:{
        id:id
      },
      success:function(backData){
        var arr = backData.size.split("-");
        var arr1 = [];
        for(var i = arr[0];i <= arr[1];i++){
          arr1.push(+i);
        }
        backData.size = arr1;
        var result = template("sizeplate",backData);
        $("#main .size").html(result);

        // 点击高亮
        $('.size').on("click","span",function(){
          $(this).addClass('actice').siblings().removeClass('actice');
        })
      }
    })
  }, 
  joinCart:function(){
    $(".cart").on("click",function(){
      var actice = $('.size').children().attr("class");
      var numbox = mui(".mui-numbox").numbox().getValue();
      var id = getQueryString("id");
      if(actice == ""){
        if(numbox <= 0) {
          mui.toast('请选择数量',{ duration:'short', type:'div' });
          return;
        }
      }else {
        mui.toast('请选择尺码',{ duration:'short', type:'div' });
        return;
      }
      $.ajax({
        url:"/cart/addCart",
        type:"post",
        data:{
          productId:id,
          num: numbox,
          size: actice
        },
        success:function(backData){
          console.log(backData)
          if(!backData.message){
            mui.confirm( "添加成功,是购物车看看?", "温馨提示", ["是","否"], function(e){
              $(".mui-backdrop").show(); 
              if(e.index == 0){
                window.location.href = "shopping.html";
              }else if(e.index == 1){
                
              }
            });
          }else {
            window.location.href = "login.html";
          }
        }
      })
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