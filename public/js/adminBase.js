
$(function(){

  // 侧边栏点击事件
  $('.middle .tags .tag:not(:first-child)').click(function(){
    $(this).addClass('active').siblings().removeClass('active') ;
  })



  // 回到第一页
  $('.middle-container .right .page-divide .first').click(function(){

  })

  // 回到最后一页
  $('.middle-container .right .page-divide .last').click(function(){

  })

  // 上一页
  $('.middle-container .right .page-divide .pre').click(function(){

  })

  // 下一页
  $('.middle-container .right .page-divide .next').click(function(){

  })

})