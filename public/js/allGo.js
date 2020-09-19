


$(function(){

	
	// tabBar点击效果
	$('div.head-tab').on('click',function(){
		let $index = $(this).index() ;
		$(this).parents('.head').attr('style', `--active-index:${$index};`) ;
	})

	// 登陆框选项点击
	$('.l-r-container .op-pannel .tip-bar .tip').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active')
		.parents('.tip-bar').siblings('.show-bar').children().toggle() ;
		
	})

	// 使得登陆框出现
	$('div.login-or-reg').on('click', function(){
		$('div.login-register').show() ;
	})

	// 使登陆注册框消失
	$('div.l-r-container').on('click', function(e){
		$(this).parent().hide() ;
	})

	// 阻止子类点击事件传递到父类
	$('div.l-r-container .op-pannel').on('click', function(e){
		e.stopPropagation() ;
	})
  
  // 登陆验证
  $('div.l-r-container .login form').submit(function(){

    let url = $(this).attr('action') ;
    let $serForm = $(this).serialize() ;
    $(this).children('input').val('') ;

    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      data: $serForm,
      timeout: 30000,
      success: function(data){
        if(data.code == 2){
          return window.location.reload() ;
        }

				showMsg(data.message) ;
        
      },
      fail: function(err) {
        alert('服务器发生错误了') ;
      }

    })

    return false ;
	})
	
	// 注册
	$('div.l-r-container .register form').submit(function(e){
		let $serForm = $(this).serializeArray() ;
		console.log($serForm) ;
		if($serForm[1].value !== $serForm[2].value){
			showMsg('两次密码不一致') ;
			return false ;
		}
		let url = $(this).attr('action') ;
		$(this).children('input').val('') ;
		$serForm.splice(2, 1) ;

    $.ajax({
      url: url,
      type: 'post',
      dataType: 'json',
      data: $serForm,
      timeout: 30000,
      success: function(data){
        if(data.code == 2){
          return window.location.href = '/' ;
        }else{
					showMsg(data.errMessage)
				}
        
      },
      fail: function(err) {
        alert('服务器发生错误了') ;
      }

    })

    return false ;
	})


 
	// 信息栏显示
	$('.user').mouseenter(function(){
		$(this).children('.jump-bar').show() ;
	})
	// 信息栏消失
	$('.user').mouseleave(function(){
		$(this).children('.jump-bar').hide() ;
	})
      
	
	// 加载显示
	window.showLoading = function(){
		$('.load-end .end').hide() ;
		$('.load-end .loading').show() ;
	}

	// 取消加载
	window.hideLoading = function(){
		$('.load-end .end').show() ;
		$('.load-end .loading').hide() ;
	}
	
	$('.web-name').click(function(){
		$(this).stop().animate({
			'fontSize': '27px',
			'opacity': 0
		}, 1000, 'swing', function(){
			$(this).animate({
				'fontSize': '24px',
				'opacity': 1
			}, 2000)
		})

	})
})

let showMsg = function(text){
	let $msg = $('div.l-r-container .op-pannel .msg') ;
	$msg.text(text) ;
	$msg.fadeIn() ;
	setTimeout(function(){
		$msg.fadeOut() ;
	},2000) ;
}

let isLogin = function(){
	return $('.head-container>.siteMark').next().hasClass('user') ;
}

let showLogin = function(){
	$('div.login-register').show() ;
}
