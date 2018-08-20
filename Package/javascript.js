
function storage(){
   var uid = new Date,
    	storage,
    	result;
   try {
   	(storage = window.localStorage).setItem(uid, uid);
   	result = storage.getItem(uid) == uid;
   	storage.removeItem(uid);
   return result && storage;
   } catch(e) {}

}
function findId(parent){
   var child;
   var nextParent;
   var prevParent;
   var nextID;
   var prevID;
   if($(parent).is(':last-child')){
      nextParent = $(parent).parent().parent().next().find('li:first-child');
      child = $(nextParent).find('div.watch');
      nextID = $(child).attr('id');
   }else{
      child = $(parent).next().find('div.watch')
      nextID = $(child).attr('id');
   }
   if($(parent).is(':first-child')){
      if($(parent).is(':first-child')){
         prevParent = $(parent).parent().parent().prev().find('li:last-child');
         child = $(prevParent).find('div.watch');
         prevID = $(child).attr('id');
      }else{
         prevID = "video1_1";
      }
   }else{
      child = $(parent).prev().find('div.watch');
      prevID = $(child).attr('id');
   }

   $('.watch-next-video').attr('data-next', nextID);
   $('.watch-prev-video').attr('data-prev', prevID);
}
function buttons(id){
   
   if($(id).parent().is(':first-child')){
      if($(id).parent().parent().parent().is('#content-1')){
         $('.watch-prev-video').hide();
      }else{ 
         $('.watch-prev-video').show();
         $('.watch-prev-video').empty();
         $('.watch-prev-video').append('Prev chapter');
      }
   } else {
      $('.watch-prev-video').show();
      $('.watch-prev-video').empty();
      $('.watch-prev-video').append('Prev');               
   }  
   if($(id).parent().is(':last-child')){
      if($(id).parent().parent().parent().is('.chapter:last-of-type')){
         $('.watch-next-video').hide();
      }else{
         $('.watch-next-video').show();
         $('.watch-next-video').empty();
         $('.watch-next-video').append('Next chapter');
      }
   } else {
      $('.watch-next-video').show();
      $('.watch-next-video').empty();
      $('.watch-next-video').append('Next');               
   }  

}

$(document).ready(function() {

   		if (storage()){
   		
      	var lastWatched = storage().getItem("last-watched");
         
			
		    $('#' + lastWatched).find('.last-hidden').attr('class', 'last-w');
		    $('#' + lastWatched).find('.last-w').css('display', 'block');
      	}
			
         var haveqt = false;
         if (navigator.plugins) {
             for (i=0; i < navigator.plugins.length; i++ ) {
                 if (navigator.plugins[i].name.indexOf
                 ("QuickTime") >= 0)
                 { haveqt = true; }
             }
         }

         var main_title = $('.inner').find("h1").text();

      	$('#content-main ul.move').roundabout({
      		css3Scale:true,
      		minOpacity: -1,
      		minScale: 1,
      		btnNext: '#main_next',
      		btnPrev: '#main_prev'
      	});
      
      	$('.browse').click(function(e){	
      		group = $(e.target)[0].id;
      		roundabout = $(group + ' ul.move');
      		contenttitle = $(this).parent().find("h1");
      		contentbody = $(this).parent().find("p");
            roundaboutTotal = $(roundabout).children('li').length;

			   $('#content-main ul.move').animate({
      			opacity: 0
      		}, 400);
            $('#content-main ul.move').addClass('hidden');
            $('.left, .right').fadeOut(100);
      		$('.left-bottom, .right-bottom').fadeIn(100);
      		$('.inner h1').empty();
      		$('.inner h1').html($(contenttitle).html());

      		if(roundabout == roundabout){
      			$(roundabout).fadeIn(100);
      		}
            if(roundaboutTotal <= 2) {
               $(roundabout).roundabout({
                  minOpacity: 0.3,
                  minScale: 1,
                  focusBearing: -20,
                  btnNext: '#button-next',
                  btnPrev: '#button-prev'
               });
            } else if(roundaboutTotal <= 4){
               $(roundabout).roundabout({
                  minOpacity: 0.3,
                  minScale: 1,
                  btnNext: '#button-next',
                  btnPrev: '#button-prev'
               });
            } else{
      			$(roundabout).roundabout({
      				minOpacity: -1,
      				minScale: 1,
      				btnNext: '#button-next',
      				btnPrev: '#button-prev'
      		   });
            }
      		$('.back').show();
      		$(group).fadeIn(900);
      		$('.last-hidden').css('display', 'none');
      	});

   		$('.left').mouseenter(function() {
   		    $('#main_prev').show();      		
   		    }).mouseleave(function (){
   		    $('#main_prev').hide();
   		});
   		$('.left-bottom').mouseenter(function() {
   		    $('#button-prev').show();      		
   		    }).mouseleave(function (){
   		    $('#button-prev').hide();
   		});
   		$('.right').mouseenter(function() {
   		    $('#main_next').show();  		
   		    }).mouseleave(function (){
   		    $('#main_next').hide();
   		});
   		$('.right-bottom').mouseenter(function() {
   		    $('#button-next').show();  		
   		    }).mouseleave(function (){
   		    $('#button-next').hide();
   		});

	      $('.back').click(function(){
      		$(roundabout).fadeOut(100);
            $('#content-main ul').removeClass('hidden');
      		$('#content-main ul').animate({
      			opacity: 1
      		}, 400);		
      		$('.left, .right').fadeIn(100);
      		$('.left-bottom, .right-bottom').fadeOut(100);
      		$('.inner h1').empty();
      		$('.inner h1').append(main_title);
      	});
      	$('.watch').click(function(f){
      		var video = $(f.target)[0].id,
      		videotitle = $(this).parent().find("h1"),
      		videobody = $(this).parent().find("span"),
      		videolink = $(this).attr("data-video"),
      		videoposter = $(this).attr("data-poster"),
      		videowatched = $(this).attr("data-watched");
            buttons(this);
      		if (storage()){
      			storage().setItem("last-watched", $(this).attr('id'));
               lastWatched = storage().getItem("last-watched");
      		}else{
      			$.cookie('last-watched', $(this).attr('id'));
               lastWatched = $.cookie('last-watched');
      		}

            if($(this).parent().is(':last-child')){
               if($(this).parent().parent().parent().is(':last-child')){
                  $('.watch-next-video').hide();
               }else{
                  $('.watch-next-video').show().empty().append('Next chapter');
               }
            } else if($(this).parent().is(':first-child')){
               if($(this).parent().parent().parent().is(':first-child')){
                  $('.watch-prev-video').hide();
               }else{
                  $('.watch-prev-video').empty().append('Prev chapter');          
               }
                   
            } else {
               $('.watch-prev-video').show();
               $('.watch-prev-video, .watch-next-video').empty();
               $('.watch-prev-video').append('Prev');   
               $('.watch-next-video').append('Next');               
            }

            var parent = $(this).parent();
            findId(parent);

            if($.browser.mozilla || $.browser.opera){ 
               if(haveqt){
                  $('#video-wrapper #largerqt').show();
                  $('#video-player').append('<EMBED class="quicktime-vid" SRC="'+ videolink +'" HEIGHT="264" WIDTH="585" scale="aspect" bgcolor="000000" TYPE="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" />');
                  $('#video-player').css({
                     width: '640px',
                     margin: '0px auto',
                     backgroundColor: '#000'
                  });
               } else{
                  $('#video-player').append('<div class="fallback-img"><a href="'+ videolink +'"  target="_blank"><img src="'+ videoposter +'" alt="Video Image" /></a></div>');      
               }
            } else if($.browser.msie){
               if($.browser.version == '8.0' || $.browser.version == '7.0' || $.browser.version == '6.0'){
                  if(haveqt){
                  $('#video-wrapper #largerqt').show();
                  $('#video-player').append('<EMBED class="quicktime-vid" SRC="'+ videolink +'" HEIGHT="264" WIDTH="585" scale="aspect" bgcolor="000000" TYPE="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" />');
                  $('#video-player').css({
                     width: '640px',
                     margin: '0px auto',
                     backgroundColor: '#000'
                  });                  
               } else{
                     $('#video-player').append('<div class="fallback-img"><a href="'+ videolink +'"  target="_blank"><img src="'+ videoposter +'" alt="Video Image" /></a></div>');         
                  }
               }else{
                  $('#video-player').append('<video id="video" class="video-js vjs-default-skin" controls preload="none" width="640" height="264" poster="'+ videoposter +'"requestFullScreen="true" data-setup=\"{}\"><source src="'+videolink+'" type="video/mp4" /></video>');   
               }
            } else if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
               if(haveqt){
                  $('#video-wrapper #largerqt').show();
                  $('#video-player').append('<EMBED class="quicktime-vid" SRC="'+ videolink +'" HEIGHT="264" WIDTH="585" scale="aspect" bgcolor="000000" TYPE="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" />');
                  $('#video-player').css({
                     width: '640px',
                     margin: '0px auto',
                     backgroundColor: '#000'
                  });               
               } else{
                  $('#video-player').append('<div class="fallback-img"><a href="'+ videolink +'"  target="_blank"><img src="'+ videoposter +'" alt="Video Image" /></a></div>');      
               }
            } else {
               $('#video-player').append('<video id="video" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"poster="'+ videoposter +'"requestFullScreen="true" data-setup=\"{}\"><source src="'+videolink+'" type="video/mp4" /></video>');
            }

      		$("#video-wrapper h1").html($(videotitle).html());     
      		$("#video-wrapper span").html($(videobody).html());    
           
      		$('#content-main').fadeOut(200);
      		$(group).fadeOut(200);
      		$('#video-wrapper').fadeIn(200);
      		$('.back, .right-bottom, .left-bottom').hide();
      		$('.back-video').show();

      		$('.last-w').attr('class', 'last-hidden');
			   $('.last-hidden').css('display', 'none');

			   $('#'+lastWatched).parent().find('.last-hidden').attr('class', 'last-w');
			   $('#'+lastWatched).parent().find('.last-w').css('display', 'block');

			
      		return false;      		
      	});
      	$('.watch-next-video').click(function(event){
      		event.preventDefault();
            $('#video-player video').remove();
            $('#video-player').empty();
      		$('#video-wrapper h1').empty();
      		$('#video-wrapper span').empty();
            $('#largerqt').hide();

      		var nextVideo = $(this).attr("data-next"),
      		nextVideoLink = $('#'+nextVideo).data("video"),
      		nextVideoPoster = $('#'+nextVideo).data("poster"),
			   nextvideotitle = $('#'+nextVideo).parent().find("h1").text(),
      		nextvideobody = $('#'+nextVideo).parent().find('span'),
            chapter = $('#' + nextVideo).parents('.chapter').attr('id').replace('content-', '');

            $('.inner h1').empty().append($('#content-main .move > li').eq(chapter - 1).children('h1').html());
            if (storage()){
               storage().setItem("last-watched", $('#'+nextVideo).attr('id'));
               lastWatched = storage().getItem("last-watched");
            }else{
               $.cookie('last-watched', $('#'+nextVideo).attr('id'));
               lastWatched = $.cookie('last-watched');
            }

			   $('.last-w').attr('class', 'last-hidden');
			   $('.last-hidden').css('display', 'none');

			   $('#'+lastWatched).parent().find('.last-hidden').attr('class', 'last-w');
			   $('#'+lastWatched).parent().find('.last-w').css('display', 'block');


            if($.browser.mozilla || $.browser.opera){ 
               if(haveqt){
                  $('#video-wrapper #largerqt').show();
                  $('#video-player').append('<EMBED class="quicktime-vid" SRC="'+ nextVideoLink +'" HEIGHT="264" WIDTH="585" scale="aspect" bgcolor="000000" TYPE="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" />');
                  $('#video-player').css({
                     width: '640px',
                     margin: '0px auto',
                     backgroundColor: '#000'
                  });               
               } else{
                  $('#video-player').append('<div class="fallback-img"><a href="'+ nextVideoLink +'"  target="_blank"><img src="'+ nextVideoPoster +'" alt="Video Image" /></a></div>');
                  // window.open(nextVideoLink);
               }  
            } else if($.browser.msie){

               if($.browser.version == '8.0' || $.browser.version == '7.0' || $.browser.version == '6.0'){
                  if(haveqt){
                     $('#video-wrapper #largerqt').show();
                     $('#video-player').append('<EMBED class="quicktime-vid" SRC="'+ nextVideoLink +'" HEIGHT="264" WIDTH="585" scale="aspect" bgcolor="000000" TYPE="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" />');
                     $('#video-player').css({
                        width: '640px',
                        margin: '0px auto',
                        backgroundColor: '#000'
                     }); 
                  } else{
                     $('#video-player').append('<div class="fallback-img"><a href="'+ nextVideoLink +'"  target="_blank"><img src="'+ nextVideoPoster +'" alt="Video Image" /></a></div>');
                     // window.open(nextVideoLink);
                  }  
               }else{
                $('#video-player').append('<video id="video" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"poster="'+ nextVideoPoster +'"requestFullScreen="true" data-setup=\"{}\"><source src="'+nextVideoLink+'" type="video/mp4" /></video>');             
               }
            } else if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
               if(haveqt){
                  $('#video-wrapper #largerqt').show();
                  $('#video-player').append('<EMBED class="quicktime-vid" SRC="'+ nextVideoLink +'" HEIGHT="264" WIDTH="585" scale="aspect" bgcolor="000000" TYPE="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" />');
                  $('#video-player').css({
                     width: '640px',
                     margin: '0px auto',
                     backgroundColor: '#000'
                  });                
               } else{
                  $('#video-player').append('<div class="fallback-img"><a href="'+ nextVideoLink +'"  target="_blank"><img src="'+ nextVideoPoster +'" alt="Video Image" /></a></div>');
                  // window.open(nextVideoLink);
               }
            } else {
                $('#video-player').append('<video id="video" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"poster="'+ nextVideoPoster +'"requestFullScreen="true" data-setup=\"{}\"><source src="'+nextVideoLink+'" type="video/mp4" /></video>');
            }

      		$('#video-wrapper h1').text(nextvideotitle);
            $("#video-wrapper span").html($(nextvideobody).html());    

            var parent = $('#'+nextVideo).parent();
            findId(parent);

            buttons('#'+nextVideo); 
      	});

      	$('.watch-prev-video').click(function(event){
      		event.preventDefault();
            $('#video-player video').attr('src', '').remove();
            $('#video-player').empty();
      		$('#video-wrapper h1').empty();
      		$('#video-wrapper span').empty();
            $('#largerqt').hide();

      		var prevVideo = $(this).attr("data-prev"),
      		prevVideoLink = $('#'+prevVideo).data('video'),
      		prevVideoPoster = $('#'+prevVideo).data('poster'),
			   prevvideotitle = $('#'+prevVideo).parent().find("h1").text(),
      		prevvideobody = $('#'+prevVideo).parent().find('span') 
            chapter = $('#' + prevVideo).parents('.chapter').attr('id').replace('content-', '');
            $('.inner h1').empty().append($('#content-main .move > li').eq(chapter - 1).children('h1').html());

            if (storage()){
               storage().setItem("last-watched", $('#'+prevVideo).attr('id'));
               lastWatched = storage().getItem("last-watched");
            }else{
               $.cookie('last-watched', $('#'+prevVideo).attr('id'));
               lastWatched = $.cookie('last-watched');
            }

            $('.last-w').attr('class', 'last-hidden');
            $('.last-hidden').css('display', 'none');

            $('#'+lastWatched).parent().find('.last-hidden').attr('class', 'last-w');
            $('#'+lastWatched).parent().find('.last-w').css('display', 'block');
            

            
            if($.browser.mozilla || $.browser.opera){ 
               if(haveqt){
                  $('#video-wrapper #largerqt').show();
                  $('#video-player').append('<EMBED class="quicktime-vid" SRC="'+ prevVideoLink +'" HEIGHT="264" WIDTH="585" scale="aspect" bgcolor="000000" TYPE="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" />');
                  $('#video-player').css({
                     width: '640px',
                     margin: '0px auto',
                     backgroundColor: '#000'
                  });                
               } else{
                  $('#video-player').append('<div class="fallback-img"><a href="'+ prevVideoLink +'"  target="_blank"><img src="'+ prevVideoPoster +'" alt="Video Image" /></a></div>');
                  // window.open(prevVideoLink);
               }  
            } else if($.browser.msie){

               if($.browser.version == '8.0' || $.browser.version == '7.0' || $.browser.version == '6.0'){
                  if(haveqt){
                     $('#video-wrapper #largerqt').show();
                     $('#video-player').append('<EMBED class="quicktime-vid" SRC="'+ prevVideoLink +'" HEIGHT="264" WIDTH="585" scale="aspect" bgcolor="000000" TYPE="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" />');
                     $('#video-player').css({
                        width: '640px',
                        margin: '0px auto',
                        backgroundColor: '#000'
                     });                    
                  } else{
                     $('#video-player').append('<div class="fallback-img"><a href="'+ prevVideoLink +'"  target="_blank"><img src="'+ prevVideoPoster +'" alt="Video Image" /></a></div>');
                     // window.open(prevVideoLink);
                  }  
               }else{
                $('#video-player').append('<video id="video" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"poster="'+ prevVideoPoster +'"requestFullScreen="true" data-setup=\"{}\"><source src="'+prevVideoLink+'" type="video/mp4" /></video>');             
               }
            } else if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1){
               if(haveqt){
                  $('#video-wrapper #largerqt').show();
                  $('#video-player').append('<EMBED class="quicktime-vid" SRC="'+ prevVideoLink +'" HEIGHT="264" WIDTH="585" scale="aspect" bgcolor="000000" TYPE="video/quicktime" PLUGINSPAGE="http://www.apple.com/quicktime/download/" />');
                  $('#video-player').css({
                     width: '640px',
                     margin: '0px auto',
                     backgroundColor: '#000'
                  });                 
               } else{
                  $('#video-player').append('<div class="fallback-img"><a href="'+ prevVideoLink +'"  target="_blank"><img src="'+ prevVideoPoster +'" alt="Video Image" /></a></div>');
                  // window.open(prevVideoLink);
               }
            } else {
                $('#video-player').append('<video id="video" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"poster="'+ prevVideoPoster +'"requestFullScreen="true" data-setup=\"{}\"><source src="'+prevVideoLink+'" type="video/mp4" /></video>');
            }


            $('#video-wrapper h1').text(prevvideotitle);
            $("#video-wrapper span").html($(prevvideobody).html());

            var parent = $('#'+prevVideo).parent();
            findId(parent);

            buttons('#'+prevVideo);

      	});

      	$('.back-video').click(function(f){
      		$('#video-player, #video-wrapper h1, #video-wrapper p').empty();
                                    $('#largerqt').hide();
            $('#content-main ul').removeClass('hidden');  
      		$('#content-main, .intro, '+group).fadeIn(200);
      		$('#video-wrapper').fadeOut(200);
      		$('.back, .right-bottom, .left-bottom').show();
      		$('.back-video').hide();
      	});
         $('#main-menu').click(function(){
            $('#video-player, #video-wrapper h1, #video-wrapper p').empty();
            $('#largerqt').hide();
            $('#video-wrapper, '+group).fadeOut(200);
            $('.left-bottom, .right-bottom').hide();
            $('#content-main ul').removeClass('hidden').animate({  
               opacity: 1
            }, 400);
            $('#content-main, .left, .right').fadeIn(200);
            $('.inner h1').empty().append(main_title);

         });
         $('.navig').hover(function(){
            var backgroundWidth = $(this).parent().find('div').attr("data-horiz"),
            bgPos = backgroundWidth + " -27px";
            bgPosBack = backgroundWidth + " 0px"

            $(this).animate({ opacity: 1 }, 200);
            if(!$(this).parent().find('div').hasClass('orange')) {
               $(this).parent().find('div').css("background-position", bgPos);
            }
         },
         function () {
               $(this).animate({ opacity: 0.5 }, 200);
               if(!$(this).parent().find('div').hasClass('orange')) {
               $(this).parent().find('div').css("background-position", bgPosBack); 
            } 
               
         });

         $(document).on('click', '#largerqt', function(e){
            e.preventDefault();
            embed = $('#video-player').find('embed');
            width = $(window).width()-50;
            height = $(window).height()-50;

            $('#video-player').empty();
            $('.quicktime-full').fadeIn(400);
            $('.quicktime-full').find('.full-player').append(embed)
            .append('<a href="#" id="closeqt">close</a>');

            $('.quicktime-full').find('.full-player').css({
               'width': width,
               'height': height
            });
            $('.quicktime-full').find('.full-player embed').attr('width', width).attr('height', height);
         });
         $(document).on('click', '#closeqt, .quicktime-full', function(e){
            e.preventDefault();
            embed = $('.quicktime-full embed').detach();
            $('.quicktime-full .full-player').empty();
            $('.quicktime-full').hide();
            $('#video-player').append(embed);
            $('#video-player embed').attr('width', '585px').attr('height', '264px');

         });      
});
		