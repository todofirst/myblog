

window.onload = function(){
  let lazyload = lazy() ;
  lazyload() ;
  $(window).on('scroll', throunce(lazyload, 1000)) ;
  $(window).on('resize', throunce(lazyload, 1000)) ;
  $(window).on('orientationChange', throunce(lazyload, 1000)) ;

  // 是否显示完全
  let $content = $('.content') ;
  let complete = parseInt($content.height()*1/4) >=2600? false:true ;
  
  if(!complete){
    $content.addClass('content-hide') ;
    $content.append($('<div>查看更多</div>').addClass('content-hide-bar')) ;
  }

  // 查看更多
  $('.content .content-hide-bar').click(function(){
    $(this).remove() ;
    $('.content-hide').removeClass('content-hide') ;
  })

}

let lazy = function(){
  let $imgs = $('.content img') ;
  let prePosition = 0 ;
  let wTop = $(window).height() ;
  return function(){
    let sTop = $(window).scrollTop() ;
    $imgs.each(function(i){
      let offsetTop = $(this).offset().top ;

      if(sTop>=prePosition && sTop+wTop>=offsetTop){
        prePosition = sTop ;
        (function($that){
          $that.attr('src', $that.attr('data-src')) ;
        })($(this)) ;
        
      }

  
    })
  }

}

// 防抖&节流
let throunce = function(fun, time){

  let timer = null ;
  let pre   = new Date().getTime() ; 

  return ()=>{
    
    let now = new Date().getTime() ;

    if(now-pre <= time){

      if(timer){
        clearTimeout(timer) ;
      }

      timer = setTimeout(fun, time) ;

    }else{

      fun() ;
      pre = now ;    

    }
  }

}

