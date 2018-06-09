$(function() {
    var letao = new Letao();
    // 通过letao对象的初始化轮播图
    letao.initSlide();
    // 通过乐淘对象初始化区域滚动
    letao.initScroll();
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
	}
}