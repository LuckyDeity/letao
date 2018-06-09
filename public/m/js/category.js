$(function () {
	var letao = new Letao();
	// 通过乐淘对象初始化区域滚动
	letao.initScroll();
	//调用获取左侧分类的函数
	letao.getCategoryLeft();
	//调用获取右侧分类数据的函数
	letao.getCategoryRight();
});

//Letao的构造函数
var Letao = function () {
	
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
	//获取左侧分类的数据
	getCategoryLeft:function () {
		// 1. 发送请求获取左侧分类的数据
		$.ajax({
			url:'/category/queryTopCategory',
			success:function (backData) {
				// console.log(backData);
				var html = template('cateogoryLeftTmp',backData);
				// console.log(html);
				$('.main-left ul').html(html);				
			}
		})
	},
	//点击左侧获取右侧品牌数据
	getCategoryRight:function () {
		getRightData(1);
		$('.main-left ul').on('click','a',function (e) {
			$(e.target.parentNode).addClass('active').siblings().removeClass('active');
			var id = e.target.dataset['id'];
			getRightData(id);
		});

		function getRightData(id){
			// 5. 根据左侧id来请求API获取右侧品牌数据
			$.ajax({
				url:'/category/querySecondCategory',
				data:{id:id},//右侧API需要传递参数
				success:function (data) {
					// 6. 调用右侧分类的模板生成html
					var html = template('categoryRightTmp',data);
					if(html){					
						// 7. 把html渲染到右侧的mui-row里面
						$('.main-right .mui-row').html(html);
					}else{
						// 8. 提示没有数据
						$('.main-right .mui-row').html('<h6>再下实在给不更多了</h6>');
					}
				}
			});
		}
	}
}