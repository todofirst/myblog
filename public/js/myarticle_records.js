
$(function(){

  // 侧边栏点击事件
  $('.middle .tags .tag:not(:first-child)').click(function(){
    $(this).addClass('active').siblings().removeClass('active') ;
  })

  // 分页点击
  $('.page-divide .page').click(function(){
    let $index = parseInt($(this).text()) ;

    updateArticlesRecords($index) ;

  })

  // 回到第一页
  $('.page-divide .first').click(function(){
    // updateArticlesRecords(-Infinity) ;
  })

  // 回到最后一页
  $('.page-divide .last').click(function(){
    // updateArticlesRecords(Infinity) ;
  })

  // 上一页
  $('.page-divide  .pre').click(function(){
    // let $index = parseInt($('.page-divide .pages .current').text())-1 ;
    // updateArticlesRecords($index) ;
  })

  // 下一页
  $('.page-divide .next').click(function(){
    // let $index = parseInt($('.page-divide .pages .current').text())+1 ;
    // updateArticlesRecords($index) ;
  })

})

// 更新分页内容
let updateDividePage = function(index, total){



  let pages = $('.page-divide .page') ;

  if(index<=5){
    $(pages[index-1]).addClass('current').siblings('.current').removeClass('current') ;
  }else{
    $(pages[4]).addClass('current').siblings('.current').removeClass('current') ;
  }

  let left, right ;
  if( index>5 && total >= (index+3)){
    left = index - 4 ;
    right = index+3 ;
  }else if(index>5 && total < (index+3)){
    left = total-7 ;
    right = total ;
  }else{
    left = 1 ;
    right = total>=8? 8: total ;
  }

  let i=left ;
  let start = 0 ;
  for( ; i <= right; i++){
    pages[start++].innerText = i ;
  }

}

// 更新文章记录内容
let updateArticlesRecords = function(index){

  let d = $('.tags .active').hasClass('drafts')? 1:0 ;
  $.ajax({
    url: `/article/my?page=${index}&d=${d}`,
    success: function(data) {
      let total = data.total ;
      let articleRecords = data.articleRecords ;
      
         // 主要是处理上一页和下一页的问题
      // index = index>=total ? total:index ;
      // index = index<=1 ? 1:index ;

      // 文章记录部分的渲染
      let recordsTemplate = template.compile(
        ` {{ each articleRecords}}
          <div class="tr">
            <div class="td">
              <a href="/article/{{$value.aId}}">{{$value.aId}}</a>
            </div>
            <div class="td">
              <a href="/article/edit/{{$value.aId}}">{{$value.title}}</a>
            </div>
            <div class="td">{{$value.type===0? '原创':'转载'}}</div>
            <div class="td">{{$value.cName}}</div>
            <div class="td">{{$value.vNum}}</div>
            <div class="td">{{$value.create_time}}</div>
            <div class="td">{{$value.modify_time}}</div>
            <div class="td del" data-id="{{$value.aId}}">
                删除
            </div>
          </div>
          {{ /each }}`
        )({articleRecords: articleRecords})

        let $tbody = $('.tbody') ;
        $tbody.children('.tr').remove()
        $tbody.children('.thead').after(recordsTemplate)


      // 分页更新
      updateDividePage(index, total) ;

    }
  })

}