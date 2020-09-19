
$(function() {

  let editor = editormd("editormd", {
    width   : "90%",
    height  : 580,
    emoji :true,
    syncScrolling : "single",
    imageUpload : true,
    imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],  
    imageUploadURL : "/uimg",  
    saveHTMLToTextarea : true,
    path: '../../nodeModules/editor.md/lib/',
    
  })


  let aId = $('.write_container .articleid').val() ;

  if(aId !==''){
    $.ajax({
      url: '/article/edit/'+aId +'?op=1',
      dataType: 'json',
      success: function(data){
        console.log('data', data) ;
        editor.setMarkdown(data.content) ;
        $('.inputTitle input').val(data.title) ;
      },

      fail: function(err) {
        alert('发生错误了') ;
        setTimeout(function(){
          window.location.href = '/' ;
        }, 1000) ;
        
      }
    })

  }

  // 返回
  $('.header .back').click(function(){
    window.location.href('/person') ;
  })
  
  // 分类选项卡隐藏
  $('.mask').click(function(){
    toggleMask() ;
  })

  // 阻止选项卡的冒泡事件
  $('.mask .show').click(function(e){
    e.stopPropagation() ;
  })

  let toggleCateList = function(cateObj){

    let toggleChildren = function(father){
      let children = '' ;
      cateObj[father].forEach(function(child){
        children += `<option value="${child._id}">${child.name}</option>`
      })
      return children ;

    }

    return toggleChildren ;
  }

  let toggleChildren ;
  // 显示分类选项
  $('.saveAsArticle button').click(function(e){

    $.ajax({
      url: '/category/allCategory',
      dataType: 'json',
      success: function(data){

        toggleChildren = toggleCateList(data) ;

        let fathers = '' ;
        let children = '' ;

        let fatherList = Object.keys(data) ;

        fatherList.forEach(function(item){
          fathers += `<option value="${item}">${item}</option>` ;
        })

        children = toggleChildren(fatherList[0]) ;


        $('.mask .show .row #fathers').html(fathers) ;
        $('.mask .show .row #children').html(children) ;
        
      },
      fail: function(err) {
        console.error(err) ;
        alert('出错了') ;
      }
    })
    
    toggleMask() ;
    return false ;
  })

  // 父类选择，转换子类
  $('.mask .show .row #fathers').change(function(){

    let father   = $(this).children('option:selected').val() ;
    let children = toggleChildren(father) ;
    console.log(father, children) ;
    $('.mask .show .row #children').html(children) ;

  })

  // 保存草稿
  $('.saveAsDraft button, .mask .row .draft').click(function(e){

    $('form').trigger('submit',[1]) ;
    return false ;

  }) 

  // 发布文章
  $('form').submit(function(e, isDraft){

    isDraft = isDraft===1? 1:0 ;

    let url = $(this).attr('action') ;
    let $serForm = $(this).serializeArray() ;
    $serForm.splice(2,1) ;
    $serForm.push({name: 'isDraft', value: isDraft}) ;
    $serForm.push({name: '_id', value: aId})

    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      data: $serForm,
      timeout: 30000,
      success: function(data){
        if(data.code === 2){
          alert(data.errMessage) ;
          if(isDraft === 0) 
            toggleMask() ;
        }
        
      },
      fail: function(err) {
        alert('服务器发生错误了') ;
      }

    })

    return false ;

  })


  });


  function toggleMask(){
    $('.mask').toggle() ;
  }

  