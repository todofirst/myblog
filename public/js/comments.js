$(function(){

  // cast the markdown content to Html
  editormd.markdownToHTML("content") ;

  $('#menu').createMenu({
    levelOne: 'h2',
    levelTwo: 'h3',
    offsetTop: $(window).height()*3/4 ,
    padding: 20,
    height: 200,
    width: 300,
    fontSize: 14,
  }) ;

  // article id
  let aid = $('.comment-container>input[type=hidden]').val() ;

  // get the comments of the article
  $.ajax({
    type: 'GET',
    url: '/comments',
    dataType: 'json',
    data: {
      aid: aid
    },
    success: function(comments){
   
      let commentList = template.compile(
      `{{each comments comment}}
        <div class="comment">
        <div class="left">
          <div class="avatar">
            <img src="{{comment.avatar}}" alt="">
          </div>
        </div>
        <div class="right">
          <div class="username">{{comment.username}}</div>
          <div class="content">{{comment.content}}</div>
          <div class="time">
            <div class="show-time">
              {{comment.time}}
            </div>
            <div class="funs">
              <div class="good" data-id="{{comment._id}}">
                <svg data-v-6aebcf4a="" aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon like-icon"><g data-v-6aebcf4a="" fill="none" fill-rule="evenodd"><path data-v-6aebcf4a="" d="M0 0h20v20H0z"></path> <path data-v-6aebcf4a="" stroke="#8A93A0" stroke-linejoin="round" d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"></path></g></svg>
                <span>{{comment.good}}</span>
              </div>
              <div class="rinfo">
                <svg data-v-6aebcf4a="" aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon comment-icon"><g data-v-6aebcf4a="" fill="none" fill-rule="evenodd"><path data-v-6aebcf4a="" d="M0 0h20v20H0z"></path> <path data-v-6aebcf4a="" stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g></svg>
                回复
              </div>
            </div>
          </div>
          <div class="input-comment" data-rid="{{comment._id}}" data-rname="{{comment.username}}" style="display:none;">
            <input type="text" placeholder="回复{{comment.username}}">
            <div class="cbtn">评论</div>
          </div>
          <div class="reply-container">

            {{each comment.replylist reply}}
              <div class="reply">

                <div class="reply-left">
                  <div class="avatar">
                    <img src="{{reply.ravatar}}" alt="">
                  </div>
                </div>
                
                <div class="reply-right">
                  <div class="username" >{{reply.rname}}</div>
                  <div class="content">回复<a href="{{reply.redid}}" style="color:inherit;">{{reply.redname}}</a>：
                  {{reply.content}}</div>
                  <div class="time">
                    <div class="show-time">
                      {{reply.time}}
                    </div>
                    <div class="funs">
                      <div class="good" data-id={{reply._id}}>
                        <svg data-v-6aebcf4a="" aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon like-icon"><g data-v-6aebcf4a="" fill="none" fill-rule="evenodd"><path data-v-6aebcf4a="" d="M0 0h20v20H0z"></path> <path data-v-6aebcf4a="" stroke="#8A93A0" stroke-linejoin="round" d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"></path></g></svg>
                        <span>{{reply.good}}</span>
                      </div>
                      <div class="rinfo">
                        <svg data-v-6aebcf4a="" aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon comment-icon"><g data-v-6aebcf4a="" fill="none" fill-rule="evenodd"><path data-v-6aebcf4a="" d="M0 0h20v20H0z"></path> <path data-v-6aebcf4a="" stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g></svg>
                        回复
                      </div>
                    </div>
                  </div>
                  <div class="input-comment" data-rid="{{reply.rid}}" data-rname="{{reply.rname}}" style="display:none;">
                    <input type="text" placeholder="回复{{reply.rname}}">
                    <div class="cbtn" >评论</div>
                  </div>
                </div>


              </div>
            {{/each}}
          </div>
        </div>
      </div>
      {{/each}}
      `)({comments:comments}) ;
      

      $('.middle>.show_content>.comment-container>.comments').append(commentList) ;

    },
    fail: function(err) {
      
    }
  })

  // 总评论框点击事件
  $('.comment-container>.input-comment input').on('focus', function(e){
    e.stopPropagation() ;
    if(!isLogin())
      return showLogin() ;
    $(this).next().show() ;
    
  })


  // 点击"回复"
  $('.comments').on('click','.comment .rinfo', function(e){
    e.stopPropagation() ;
    if(!isLogin())
    return showLogin() ;
    $(this).parents('.time').next('.input-comment').toggle() ;
    $(this).parents('.time').next().children('input').focus() ;
    console.log($(this).parents('.time').next().children('input')) ;
  })

  // 回复框隐藏
  $(document).on('click', function(e){
    $('.comments .comment .input-comment').hide() ;
    $('.comment-container>.input-comment>.cbtn').hide() ;
  })

  // 阻止父类点击事件
  $('.comments').on('click', '.input-comment', function(e){
    e.stopPropagation() ;

  })

  $('.comment-container>.input-comment').on('click', function(e){
    e.stopPropagation() ;
  })

  // 创建回复
  $('.comments').on('click','.input-comment>.cbtn', function(e){
    e.stopPropagation() ;
    let inputObj = $(this).prev() ;
    let rObj = [] ;
    rObj.push(aid) ;
    rObj.push(inputObj.val()) ;
    rObj.push($(this).parent().attr('data-rid')) ;
    let uid = $(this).parents('.reply-container').siblings('.input-comment').attr('data-rid') ;
    uid = uid? uid:$(this).parent().attr('data-rid') ;
    rObj.push(uid) ;
    
    $.ajax({
      url:'/reply',
      type: 'post',
      data: {reply:rObj},
      dataType: 'json',
      success: data => {
        if(data.code===2){
          inputObj.val('') ;
          let reply = data.reply ;
          reply.content = rObj[1] ;
          reply.good = 0 ;
          reply.redid = rObj[2] ;
          reply.redname = $(this).parent().attr('data-rname') ;
          reply.uid = rObj[3] ;
          console.log(reply) ;
          let replyTemp = template.compile(
            `<div class="reply">

              <div class="reply-left">
                <div class="avatar">
                  <img src="{{reply.ravatar}}" alt="">
                </div>
              </div>
              
              <div class="reply-right">
                <div class="username" >{{reply.rname}}</div>
                <div class="content">回复<a href="{{reply.redid}}" style="color:inherit;">{{reply.redname}}</a>：
                {{reply.content}}</div>
                <div class="time">
                  <div class="show-time">
                    {{reply.time}}
                  </div>
                  <div class="funs">
                    <div class="good" data-id={{reply._id}}>
                      <svg data-v-6aebcf4a="" aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon like-icon"><g data-v-6aebcf4a="" fill="none" fill-rule="evenodd"><path data-v-6aebcf4a="" d="M0 0h20v20H0z"></path> <path data-v-6aebcf4a="" stroke="#8A93A0" stroke-linejoin="round" d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"></path></g></svg>
                      <span>{{reply.good}}</span>
                    </div>
                    <div class="rinfo">
                      <svg data-v-6aebcf4a="" aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon comment-icon"><g data-v-6aebcf4a="" fill="none" fill-rule="evenodd"><path data-v-6aebcf4a="" d="M0 0h20v20H0z"></path> <path data-v-6aebcf4a="" stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g></svg>
                      回复
                    </div>
                  </div>
                </div>
                <div class="input-comment" data-rid="{{reply.rid}}" data-rname="{{reply.rname}}" style="display:none;">
                  <input type="text" placeholder="回复{{reply.rname}}">
                  <div class="cbtn" >评论</div>
                </div>
              </div>


          </div>`
          )({reply: reply}) ;
          let replyContaner = $(this).parents('.comment').find('.reply-container') ;
          replyContaner = replyContaner? replyContaner:$(this).parent().next() ;
          replyContaner.prepend(replyTemp) ;
          alert(data.message) ;
        }



      },
      fail: function(err){

      }
    })
  })

  // 创建评论
  $('.comment-container>.input-comment>.cbtn').click(function(e){
    e.stopPropagation() ;
    let cObj = [] ;
    let inputObj = $(this).prev() ;
    cObj.push(aid) ;
    cObj.push(inputObj.val()) ;
    $.ajax({
      url:'/comment',
      type: 'post',
      data: {comment:cObj},
      dataType: 'json',
      success: function(data){
        if(data.code===2){
          alert(data.message) ;
          inputObj.val('') ;
          
          let comment = data.comment ;
          comment.content = cObj[1] ;
          comment.aid = aid ;
          comment.good = 0 ;
          comment.replylist = [] ;

          let commentList = template.compile(
            `{{each comments comment}}
              <div class="comment">
              <div class="left">
                <div class="avatar">
                  <img src="{{comment.avatar}}" alt="">
                </div>
              </div>
              <div class="right">
                <div class="username">{{comment.username}}</div>
                <div class="content">{{comment.content}}</div>
                <div class="time">
                  <div class="show-time">
                    {{comment.time}}
                  </div>
                  <div class="funs">
                    <div class="good" data-id="{{comment._id}}">
                      <svg data-v-6aebcf4a="" aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon like-icon"><g data-v-6aebcf4a="" fill="none" fill-rule="evenodd"><path data-v-6aebcf4a="" d="M0 0h20v20H0z"></path> <path data-v-6aebcf4a="" stroke="#8A93A0" stroke-linejoin="round" d="M4.58 8.25V17h-1.4C2.53 17 2 16.382 2 15.624V9.735c0-.79.552-1.485 1.18-1.485h1.4zM11.322 2c1.011.019 1.614.833 1.823 1.235.382.735.392 1.946.13 2.724-.236.704-.785 1.629-.785 1.629h4.11c.434 0 .838.206 1.107.563.273.365.363.84.24 1.272l-1.86 6.513A1.425 1.425 0 0 1 14.724 17H6.645V7.898C8.502 7.51 9.643 4.59 9.852 3.249A1.47 1.47 0 0 1 11.322 2z"></path></g></svg>
                      <span>{{comment.good}}</span>
                    </div>
                    <div class="rinfo">
                      <svg data-v-6aebcf4a="" aria-hidden="true" width="16" height="16" viewBox="0 0 20 20" class="icon comment-icon"><g data-v-6aebcf4a="" fill="none" fill-rule="evenodd"><path data-v-6aebcf4a="" d="M0 0h20v20H0z"></path> <path data-v-6aebcf4a="" stroke="#8A93A0" stroke-linejoin="round" d="M10 17c-4.142 0-7.5-2.91-7.5-6.5S5.858 4 10 4c4.142 0 7.5 2.91 7.5 6.5 0 1.416-.522 2.726-1.41 3.794-.129.156.41 3.206.41 3.206l-3.265-1.134c-.998.369-2.077.634-3.235.634z"></path></g></svg>
                      回复
                    </div>
                  </div>
                </div>
                <div class="input-comment" data-rid="{{comment._id}}" style="display:none;">
                  <input type="text" placeholder="回复{{comment.username}}">
                  <div class="cbtn">评论</div>
                </div>
                <div class="reply-container">
      
                </div>
              </div>
            </div>
            {{/each}}
            `)({comments:[comment]}) ;
            
      
            $('.middle>.show_content>.comment-container>.comments').prepend(commentList) ;
      }
      },
      fail: function(err){
        
      }
    })
  })

  // 评论点赞
  $('.comments').on('click','.comment>.right>.time .good', function(e){
    e.stopPropagation() ;
    if(!isLogin())
      return showLogin() ;
    console.log(100) ;
    let uid = $(this).attr('data-id') ;
    console.log(uid) ;
    $.ajax({
      url: '/good/comment',
      dataType: 'json',
      data: {
        where: [aid, uid]
      },
      success: data => {
        if(data.code===2){
          let good = parseInt($(this).text());
          $(this).children('span').text(++good) ;
        }
      },
      fail: err => {

      }

    })
  })

  // 回复点赞
  $('.comments').on('click','.comment>.right>.reply-container .good', function(e){
    e.stopPropagation() ;

    if(!isLogin())
      return showLogin() ;

    let id = $(this).attr('data-id') ;
    
    $.ajax({
      url: '/good/reply',
      dataType: 'json',
      data: {
        where: [id]
      },
      success: data => {
        if(data.code===2){
          let good = parseInt($(this).text().trim()) ;
          $(this).children('span').text(++good) ;
        }
      },
      fail: err => {

      }

    })
  })


}) 