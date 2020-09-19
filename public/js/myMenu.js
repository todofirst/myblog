(function($){

  let myMenu = (function(){

    let Plugin = function(element, options){
      this.element  = $(element) ;
      this.setting  = $.extend({}, $.fn.createMenu.defaults, typeof options === 'object'&&options) ;
      this.continue = true ;
      this.init() ;
    }

    Plugin.prototype  = {

      $preActiveNode: null,
      flag: true,

      init: function(){
        this.createHtml() ;

        if(this.continue){
          this.setStyle() ;
          this.setActive() ;
          this.bindEvent() ;
        }
      },

      // create the content the blog menu by the levelOne and the levelTwo
      createHtml: function(){
        let opts = this.setting ;
        // initial the style of the container

        let idIndex = 0 ;
        let $ul = $('<ul></ul>').addClass('mymenu-display') ;

        this.ul = $ul ;

        // traversing the content
        $('body *').each(function(){
          let ele = this ;
          if(ele.tagName === opts.levelOne.toUpperCase()){
            ele.setAttribute('id', idIndex) ;
            $ul.append($(`<li><a href="#${idIndex}">${ele.innerText}</a></li>`)) ;
            idIndex++ ;
          }else if(ele.tagName === opts.levelTwo.toUpperCase()){
            ele.setAttribute('id', idIndex) ;
            $ul.append($(`<li class="sub"><a href="#${idIndex}">${ele.innerText}</a></li>`)) ;
            idIndex++ ;
          }

        })

        if(Object.keys($ul.children()).length === 3 ){
          return this.continue = false ;
        }
        

        this.element.append($ul) ;

      },

      // set the css style
      setStyle: function(){

        let opts = this.setting ;
        let levelOne_font_size =  opts.fontSize+6 ;
        let levelTwo_font_size = opts.fontSize ;
        
        let height  = (typeof opts.height   === 'number' || typeof opts.height === 'string')&&opts.height ||309;
        let width   = (typeof opts.width    === 'number' || typeof opts.height === 'string')&&opts.width  ||200;
        let padding = (typeof opts.padding  === 'number' || typeof opts.padding === 'string')&&opts.padding||20 ;

        this.element.css({
          'height': height,
          'width':width,
          'padding': padding,
          'overflow': 'auto',
          'max-width': '100%'
        })


        this.ul.children('li:not(.sub)').css({
          'font-size': levelOne_font_size,
        }).siblings('.sub').css({
          'font-size': levelTwo_font_size,
        }) ;
      },

      // set the active status
      setActive: function(ele){
        let $ele = $(ele) ;
        let id = $ele.attr('id') ;
        $ele = $ele.length === 0? $('.mymenu-display li:first-child'):$('.mymenu-display li').eq(id) ;
        $ele.addClass('active').siblings('.active').removeClass('active') ;
        this.element.stop().animate({
          'scrollTop': $ele.offset().top - this.ul.offset().top + this.setting.linePadding 
        }, 100)
      },

      // bind the event
      bindEvent: function(){
        let that = this ;
        let opts = that.setting ;
        let $titleTarget = $(`${opts.levelOne},${opts.levelTwo}`) ;

          $(window).scroll(function(e){
      
            let wsTop = $(this).scrollTop() ;

            let cTop = that.element.get(0).offsetTop
  
            if(cTop-wsTop <= 0){  
  
              that.element.addClass('mymenu-toFixed') ;
  
            }else{

              that.element.removeClass('mymenu-toFixed') ;
             
            }
  
            let flag = true; 
            let $preNode = $titleTarget.eq(0) ;
            $titleTarget.each(function(){
              let $ele = $(this) ; 
              let eTop = $ele.offset().top ;
              if( wsTop + opts.offsetTop >= eTop ){
                  $preNode = $ele ;
                  flag = true ;
              }else if(flag && (wsTop + opts.offsetTop < eTop)){
                that.setActive($preNode) ;
                flag = false ;
              }
  
            })
  
          })



      },


    }

    return Plugin ;

  })() ;

  $.fn.createMenu = function(options){

    new myMenu(this, options) ;

  }


  /**
   * @params offsetTop: the distance of the element to trigger the event
   * @params padding: the padding of the menu area
   * @params height: the height of the menu content
   * @params width: the width of the mnu content
   */
  $.fn.createMenu.defaults = {
    levelOne: 'h2',
    levelTwo: 'h3',
    offsetTop: $(window)/2 ,
    padding: 40,
    height: 400,
    width: 300,
    fontSize: 14,
    linePadding: 10
  }

}
)(jQuery) ;