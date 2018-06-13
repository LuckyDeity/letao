var letao;
$(function(){
  letao = new Letao();
  letao.searchData();
  letao.searchApply();
  letao.searchDelete();
  letao.searchClear();
})

var Letao = function(){

};
Letao.prototype = {
  // 保存数据
  searchData:function(){
    $(".seek").on("click",function(){
      var val = $(".search input").val();
      // 跳转页面
      window.location.href = 'productist.html?name='+val;

      var jsonArr = window.localStorage.getItem("searchData");
      var id = 0;
      if(jsonArr && JSON.parse(jsonArr).length > 0){
        jsonArr = JSON.parse(jsonArr);
        id = jsonArr[jsonArr.length-1].id+1;
      }else {
        jsonArr = [];
        id = 0;
      }
      if(!val.trim()){
        return;
      }
      var flag = false;
      for (var i = 0; i < jsonArr.length; i++) {
        if(jsonArr[i].search == val){
          flag = true;
        }
      };
      if(flag == false){
        jsonArr.push({
          "search":val,
          "id":id
        });
      }
      var json = JSON.stringify(jsonArr);
      var result = window.localStorage.setItem("searchData",json);
      letao.searchApply();

      
    })
  },
  //调用模板引擎渲染页面
  searchApply:function(){
    var jsonArr = window.localStorage.getItem("searchData");
      if(jsonArr && JSON.parse(jsonArr).length > 0){
        jsonArr = JSON.parse(jsonArr);
      }else {
        jsonArr = [];
      }
      var result = template("historyContent",{'rows': jsonArr});
      $(".history-content ul").html(result);
  },
  // 单个删除
  searchDelete:function(){
    $(".history-content ul").on("click","span",function(){
      var id = $(this).attr("data-id");
      var jsonArr = window.localStorage.getItem("searchData");
      if(jsonArr && JSON.parse(jsonArr).length > 0){
        jsonArr = JSON.parse(jsonArr);
      }else {
        jsonArr = [];
      }
      for (var i = 0; i < jsonArr.length; i++) {
        if(id == jsonArr[i].id){
          jsonArr.splice(i,1);
        }
      };
      window.localStorage.setItem("searchData",JSON.stringify(jsonArr));
      letao.searchApply();
    })
  },
  //清空记录
  searchClear:function(){
    $("span.search-clear").click(function(){
      var jsonArr = window.localStorage.setItem("searchData","");
      letao.searchApply();
    })
  }
}