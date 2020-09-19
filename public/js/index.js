
$(function(){
  // 分类栏动画
  $('li.tag').mouseenter(function(){
		let $that = $(this) ;
		$that.stop() ;
		$that.animate({
			'max-height' : '600px'
		}, 2000, 'swing', function(){
			setTimeout(function(){
				$that.animate({
					'max-height' : '40px'
				}, 3000) ;
			})
		})
	})

	// 通过点击点击分类获取文章
	let $article_container = $('.articles') ;
	let getArticlesByCategory = function (url, page){

		let isClick = typeof page=== 'undefined'? true:false;
		page = page||1 ; 

		showLoading() ;
		$.ajax({
			url: url,
			data: {page: page},
			success: function(data){
				let article_list = template.compile(
					'{{each articles}}'+
					'<div class="article">'+
						'<div class="up">'+
							'<h2 class="title">'+
								'{{if $value.type==0}}'+
								'<a href="/article/{{$value.aId}}" class="article-link">'+
									'{{$value.title}}'+
								'</a>'+
								'{{else}}'+
								'<a href="{{$value.aId}}" class="article-link">'+
									'{{$value.title}}'+
								'</a>'+
								'{{/if}}'+
							'</h2>'+
						'</div>'+
						'<div class="down">'+
							'<div class="visit">'+
								'<span>V </span>'+
								'<span class="num">{{$value.vNum}}</span>'+
							'</div>'+
							'<div class="type">'+
								'{{if $value.type==0}}'+
									'原创'+
								'{{else}}'+
									'转载'+
								'{{/if}}'+
							'</div>'+
							'<div class="target">'+
								'<span data-id="{{$value.cId}}" class="link-target">{{$value.cName}}</span>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'{{/each}}')(data) ;

				if(!isClick)
					$article_container.append(article_list) ;
				else
					$article_container.html(article_list) ;

				setTimeout(function(){
					hideLoading() ;
				}, 750) ;
			},
			fail: function(err) {
				console.log('fail') ;
				alert('服务器发生错误') ;
			}
		})
	}

	// 小分类点击
	$('.middle .left .tags .subtitle').on('click', function(){
		let id = $(this).attr('data-id') ;
		let url = '/category/'+id ;
		console.log('点击了') ;
		window.aUrl = url ;
		window.preScrollPosition = 0 ;
		window.page = 1 ;

		$(window).scrollTop(0) ;

		getArticlesByCategory(url) ;

	})

	// 分类标签点击
	$('.articles').on('click', '.article .down .target .link-target', function(){
		let id = $(this).attr('data-id') ;
		let url = '/category/'+id ;

		window.aUrl = url ;
		window.preScrollPosition = 0 ;
		window.page = 1 ;

		$(window).scrollTop(0) ;

		getArticlesByCategory(url) ;
	})


	// 全部分类点击
	$('.middle .left .tags .all').on('click', function(){

		window.aUrl = '/category/allarticle' ;
		window.preScrollPosition = 0 ;
		window.page = 1 ;
		
		$(window).scrollTop(0) ;

		getArticlesByCategory('/category/allarticle') ;

	})


	// 监听窗口滚动事件
	window.aUrl = '/category/allarticle'
	window.preScrollPosition = 0 ;
	window.page = 1 ;
	
	$(window).scroll(function(e){
		let scrollTop = Math.floor($(this).scrollTop()) ;
		let sHeight = Math.round($(window).height()/4) ;

		if((scrollTop > window.preScrollPosition) && (scrollTop-window.preScrollPosition) > sHeight){
			window.page++ ;
			window.preScrollPosition = scrollTop ;
			getArticlesByCategory(window.aUrl, window.page) ;
		}
	})

	// 搜索框聚焦
	$('.middle .up>.search>input').focus(function(){
		$(this).parent().animate({
			'width': '55%'
		}, 800, 'swing') ;
	})

// 搜索框失去焦点
$('.middle .up>.search>input').blur(function(){
	$(this).parent().animate({
		'width': '36%'
	}, 800, 'swing') ;
})

	
})