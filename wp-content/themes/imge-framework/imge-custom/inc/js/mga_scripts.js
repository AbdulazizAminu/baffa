$ = jQuery;


var sss_disabled = false;



//Hex to RGB
function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
                rgb: parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16)
            } : null;
        }


jQuery(document).ready(function ($){


	//Detect Touch device
	if (Modernizr.touch) { 
		$("body").toggleClass("touch", true);
	}


	//Fix z-index youtube video embedding

	var selectors = [
        "iframe[src^='//www.youtube.com']",
        "iframe[src^='http://www.youtube.com']", 
        "iframe[src^='https://www.youtube.com']"
      ];

    var $allVideos = $("html").find(selectors.join(','));
	
	$allVideos.each(function() {
	  var url = $(this).attr("src");
	  if (!$(this).parent().hasClass("embed-container")){
	  	 if ($(this).attr("src").indexOf("?") > 0) {
			$(this).attr({
			  "src" : url + "&wmode=transparent",
			  "wmode" : "Opaque"
			});
		  }
		  else {
			$(this).attr({
			  "src" : url + "?wmode=transparent",
			  "wmode" : "Opaque"
			});
		  }
	  }
	 
	});



	
	//Video Shortcode Attributes
	if ($(".mga_video").length || $(".imge_video").length || $(".fitvidsignore").length){
		$(".mga_video, .imge_video, .fitvidsignore").each(function(){
			
			var qString = "";
			
			$.each($(this).data(), function(key, val){
				qString += '&'+key+'='+val;
			})

			var url = $(this).find(selectors.join(',')).attr("src");
			url = url+qString;

			// $(this).find(selectors.join(',')).attr("src", url);

			if (($(this).data("w") || $(this).data("h")) && $(this).hasClass("fitvidsignore")){
				if ($(this).data("w")) $(this).find("iframe").attr("width", $(this).data("w"));
				if ($(this).data("h")) $(this).find("iframe").attr("height", $(this).data("h"));
			}

		})
	}
	

	//youTubeChannel Init
	if ($(".imge_youTubeChannel").length){
		var userName = $(".imge_youTubeChannel").data("channel");
		$(".imge_youTubeChannel").youTubeChannel({user:userName});
	}

	
	//Stop Video Autoplay in Slider
	$(".mgaSlider").bind("DOMNodeInserted",function(){
	    setTimeout(function(){
	    	$(".cycle-sentinel").find("iframe").remove();
	    },200);
	});


	//Slide Link
	$("*[data-slidelink]").click(function(){
		var url = $(this).attr("data-slidelink");
		window.location.href = url;
	});

	// Slick Slider
	if ( $(".imge_slick_slider").length ) {
		
		$(".imge_slick_slider").slick();

		$('.imge_slick_slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			var active_slide = $(slick.$slides[nextSlide]);

			if ( $('.video-slide.playing').length ){
				$('.video-slide.playing').data('player').pauseVideo();
			}

			if ( active_slide.hasClass('video-slide') && active_slide.parents( '.imge_slick_slider' ).data( 'vid_autoplay' ) ) {
				active_slide.data('player').playVideo();
			}
		});
	}

	//Phone Popover
	$(function(){

		$("a[rel=popover_tel]").each(function(){
			var pn = $(this).attr("href"),
				pop_wrap = $( '<div/>', { 'class': 'popover' } ),
				pop_arrow = $( '<div/>', { 'class': 'arrow' } ),
				pop_h3 = $( '<h3/>', { 'class': 'popover-title' } ),
				pop_a = $( '<a/>', { 'class': 'popover-content', 'href': pn } );

			pop_arrow.appendTo( pop_wrap );
			pop_h3.appendTo( pop_wrap );
			pop_a.appendTo( pop_wrap );

			$(this).popover({
		      	placement: 'auto',
		      	viewport: 'body',
		      	template: pop_wrap[0].outerHTML,
		      })
			.click(function(e) {
		        e.preventDefault(); 
		      });
		})
		
	});


	//Countdown
	
	if ($(".imge_countdown").length) $(".imge_countdown").each(function(){ initTimer($(this)) });


	function initTimer(elem){
		
		var start = (elem.data("start")) ? elem.data("start") : null,
			end = (elem.data("end")) ? elem.data("end") * 1000 : null,
			units = null,
			max = (elem.data("max")) ? elem.data("max") : null,
			digits = null;

		elem.append("<div class='htmlStr'></div>");

	    var countdownTimer = window.setInterval(function(){

	        var cd = countdown(start, end, units, max, digits);

	        elem.find(".unitType").each(function(){
	        	var _this = $(this),
	        		 unit = _this.attr("class").split(" ")[1],
	        		_html,
	        		eval_unit = unit,
	        		zero = "";


	        	if (cd[unit] == 1) eval_unit = eval_unit.slice(0, -1);

	        	_html = '<span class="time_val">'+cd[unit]+'</span>';
	        	
	        	if (elem.hasClass("showunits")) _html += '<span class="time_unit">'+eval_unit+'</span>';

	        	_this.html(_html);

	        	if (!cd[unit] && unit != "seconds") {
	        		
	        		_this.html("").attr("data-val", 0);
	        	}else{
	        		if (cd[unit] == undefined){
	        			_this.html("").attr("data-val", 0);
	        		}else{
	        			_this.html(_html).attr("data-val", cd[unit]);
	        		}
	        		
	        	} 

	        	// $(".htmlStr").html(cd.toString());
	        })
	        

	        if ($(".unitType", elem).length == $(".unitType[data-val=0]", elem).length || new Date() >= end){
	        	
	        	if (typeof imge_countdown_end == 'function') { 
				  imge_countdown_end(elem); 
				}else{
					elem.html("");
				}

				clearInterval(countdownTimer);

				return;
	        } 

	        if (!elem.hasClass("active")) elem.toggleClass("active", true);






	    }, 1000);
	
	}
	
	
	
	//Custom Logo Link
	if ($(".customLogoLink").length){
		if ($(".customLogoLink").attr("data-custom_logo_img")){
			$("#logo a img").removeAttr("src");
			$("#logo a img").attr("src", $(".customLogoLink").attr("data-custom_logo_img"));
			setTimeout(function(){$('body').toggleClass('customLogoLoaded', true);}, 400);
		} 
		
		if ($(".customLogoLink").attr("data-custom_logo_link")) $("#logo a").attr("href", $(".customLogoLink").attr("data-custom_logo_link"));
		if ($(".customLogoLink").attr("data-custom_logo_target")) $("#logo a").attr("target", $(".customLogoLink").attr("data-custom_logo_target"));
		
		$(".customLogoLink").remove();
	} 

	//Parallax
	parallaxIni();
	
	//Add Active Class to Accordion Header
	$(".panel-primary").each(function(){
		if (!$(".collapse", this).hasClass("in")){
			$(".accordion-toggle", this).addClass("collapsed");
		}
	});

	//Set Up Sticky Menu
	if ($(".sectionMenu:not(.external)").length) {
		var sectionMenu = "<ul class='container'>";
		$(".homepage-section").each(function(){
			if ($(this).attr("data-section-menu-label")){
				sectionMenu += '<li onClick="scrollToSection(\''+$(this).attr("id")+'\',\'id\')">'+$(this).attr("data-section-menu-label")+'</li>';
			}
		});
		sectionMenu += "</ul>";

		$(".sectionMenu").append(sectionMenu);
	}

	//Gravity Form Submit Callback

	$(document).on('gform_confirmation_loaded', function(e, form_id){
		if (typeof gform_submit_func == 'function') { 
		  gform_submit_func(form_id); 
		}
	});

	//Gravity Form Scroll to Validation Error

	$(document).bind("DOMNodeInserted",function(e){
		var element = e.target;

		if ($(".validation_error", element).length){
			scrollToSection("validation_error","class");
		}
	});

	//scroll to anchor on load
	setTimeout(function(){
		var hash = location.hash.slice(1);
		if( hash.indexOf('?') !== -1 ) {
	        hash = hash.slice(0, ( hash.indexOf('?') ) );
	    }
	  	if ($("#"+hash).length) scrollToSection(hash,"id");
	},125);


	//scroll to anchor on click	
	$(".imge_anchor_scroll a:first-child").click(function(e){
		e.preventDefault();
		var hash = $(this).attr("href");
		hash = hash.slice((hash.indexOf("#")+1));

		if ($("#"+hash).length) scrollToSection(hash, "id");
	});

	//scroll to anchor on click without hashchange - add data-scrolltosection="[ #id or .class ]"
	$(document).on("click", "[data-scrolltosection]", function(e){
		e.preventDefault();
		var theData = $(this).data("scrolltosection"),
			fChar = theData.substring(0,1),
			type = (fChar == "#") ? "id" : "class",
			elem = theData.substring(1,theData.length);

			scrollToSection(elem, type);

	})


	//Ajax Pagination
	if ($(".imge_ajax_load").length){
		
		$(document).on("click", ".imge_ajax_load .previous", function(){
		// $(".imge_ajax_load .previous").click(function(){

			if ($("#paginationData").attr("data-paged") == 1) return;

			var page = parseInt($("#paginationData").attr("data-paged")) - 2;

			$("#paginationData").attr("data-paged", page);

			loadData(null, ajaxPagination);
		})

		$(document).on("click", ".imge_ajax_load .next", function(){

			if ($("#paginationData").attr("data-paged") == $("#paginationData").attr("data-max_num_pages")) return;

			loadData(null, ajaxPagination);

		})
	}


	// imge_modal

	setTimeout(function(){showModal()}, 200);

	function showModal(){

		if (!$(".imge_modal_wrap").length) return;

		var modal=getCookie("imge_modal");
		var modal_id = $(".imge_modal_wrap").data("modal-id");
		var modal_views = $(".imge_modal_wrap").data("modal-views");
		var modal_data_str = modal_id;
		var modal_data_arr;

		// If modal is set to always show, show it and get out
		if (modal_views == "-1"){
			// Show Modal
           $(".imge_modal_wrap .modal").modal('show');

           return;
		}
	    
	    // If cookie doesn't exist at all
	    if (modal == "") {

	    	modal_data_str += ",1";
	                 
           // Set cookie
           setCookie("imge_modal", modal_data_str, 30);

           // Show Modal
           $(".imge_modal_wrap .modal").modal('show');

           return;
	       
	    }
	    // If cookie exists
	    else{
	    	
	    	//Split modal to access parameters
	    	modal_data_arr = modal.split(",");

	    	var inc = modal_data_arr[1];

	    	//If modal id matches and views are less than set views
	    	if (modal_data_arr[0] == modal_id && parseInt(inc) < parseInt(modal_views)){
	    		
	    		// increment view count
	    		var v = parseInt( inc ) + 1;
	    		v = v.toString();

	    		// append to data string
	    		modal_data_str += ","+v;

	    		// set cookie
	    		setCookie("imge_modal", modal_data_str, 30);

	    		// Show Modal
           		$(".imge_modal_wrap .modal").modal('show');

           		return;

	    	}

	    	// If modal id doesn't match (meaning it's a new modal) set the cookie and show the modal
	    	if (modal_data_arr[0] != modal_id){

				modal_data_str += ",1";
				     
				// Set cookie
				setCookie("imge_modal", modal_data_str, 30);

				// Show Modal
				$(".imge_modal_wrap .modal").modal('show');

				return;

	    	}
	    }  

	}


	function setCookie(cname,cvalue,exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires=" + d.toGMTString();
	    document.cookie = cname+"="+cvalue+"; "+expires;
	}


	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) != -1) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

	// end imge_modal

	//tboot_modal 

	var $src;

	$('.tboot_modal').on('show.bs.modal', function (e) {
		if ( $(this).attr('data-autoplay') == 1 ) {
			$src = $(this).find('iframe').attr("src");
			var q = ($src.indexOf("?") == -1) ? "?" : "&";
			$(this).find('iframe').attr("src", $src + q + 'autoplay=1');
		}
	});

	$('.tboot_modal').on('hidden.bs.modal', function () {
		if ( $(this).attr('data-autoplay') == 1 ){
			$(this).find('iframe').attr("src", $src);
		}else if ( $(".mga_video", this).length ){
			$src = $(this).find('iframe').attr("src");
			$(this).find('iframe').attr("src", $src);
		}

	});
	
	
	//Resize Function
	
	function resizedw(){

		if (!$(".ie6").length || !$(".ie7").length){
			parallaxIni();
			$(".mga_ellipsis").ellipsis();
			$(".mga_fitwidth").fitToWidth();

		}

	   
	}
	
	var doit;
	$(window).resize(function(){
	  clearTimeout(doit);
	  doit = setTimeout(resizedw, 100);
	});		


	//Hashchange Function

	$(window).on('hashchange', function(e) {
		e.preventDefault();
		var hash = location.hash.slice(1);
		if( hash.indexOf('?') !== -1 ) {
			hash = hash.slice(0, ( hash.indexOf('?') ) );
		}
		if ($("#"+hash).length) scrollToSection(hash,"id");
		console.log(hash);
	});
		
		
		
});


// this function fires when the page has fully loaded!
$(window).bind("load", function() {

	setTimeout(function(){
		
		//Fit Embedded Slide Videos
		$(".mgaSlide, .mga_video").each(function(){
			if (!$(this).hasClass("fitvidsignore")){
				$(this).fitVids();
			}
		})

		//Ellipsis
		$(".mga_ellipsis").ellipsis();

		//Fit to Width
		$(".mga_fitwidth").fitToWidth();

	}, 100);

	



	if ($(".ie6").length || $(".ie7").length){
		$(function() {
		   var zIndexNumber = 5000;
		   // Put your target element(s) in the selector below!
		   $("header, header *").each(function() {
		           $(this).css('zIndex', zIndexNumber);
		           if (zIndexNumber >= 20){
						zIndexNumber -= 10;
						}else{
						zIndexNumber = 5000;
						}
		          
		   });
		});

	}	


	});


//Scroll To Section Function scrollToSection(elementName,type[class or id])



function scrollToSection(str,type){
		if (sss_disabled == true) return false;
		type2 = (type == "class") ? "." : "#";
		var navHeight = ($("#header .navbar-default").hasClass("navbar-fixed-top")) ? $(".navbar").outerHeight() : 0;
		var num = $(type2+str).offset().top - navHeight;
		
		$('html, body').animate({
			
        scrollTop: num
    }, 900, 'swing', function () {
    	var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    		if (y != num){
    			num = $(type2+str).offset().top - navHeight;
				$('html, body').animate({scrollTop: num}, 100, 'swing');
	        }
	        
	    });	
    }



$(window).scroll(function () {



var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
var w = $(window).height();
var dH = $(document).height();

	//Add Shrink Nav Class

	if (y >= ($("#wrapper").offset().top - $(".navbar").outerHeight())) {		
		if (!$(".shrinkNav").length)
		$('body').toggleClass("shrinkNav", true).trigger("shrinkAdded");
	}else{
		if ($(".shrinkNav").length)
		$('body').toggleClass("shrinkNav", false).trigger("shrinkRemove");
	}

	var t = dH - (dH*.3);

	if (y+w >= t){
		if ($("#paginationData").length && $("#paginationData").data("pagination_type") != 'paged'){
			loadData();
		}
	}




});


function ajaxPagination(data){
	// $("#paginationData").parent().find("article").fadeOut("slow").remove();
	// $("#paginationData").parent().find(".le-archivePost").fadeOut("slow").remove();
	$("#paginationData").parent().find(".post_wrap").html(data);
	// $(data).insertBefore("#paginationData");
}


function loadData(elem, callback){

			var theClass;

			theClass =  (elem) ? elem : $("#paginationData");

			var paged = parseInt(theClass.attr("data-paged"));
			var increment = parseInt(theClass.attr("data-max_num_pages"));
			var loading = parseInt(theClass.attr("data-loading"));

			var params2 = theClass.data();
			

            if(loading) return true;
            if(!loading) {

            		if (paged<increment){
						paged+=1;
					

					theClass.attr("data-loading",1);
						var params = theClass.data();
						params.paged = paged;
						params.action = "imge_load_more";
						params.security = load_more_object.ajax_nonce;
						

					$.post(load_more_object.ajaxurl,params,function(data){
	                    if(data){
							
							theClass.attr("data-loading",0);
							theClass.attr("data-paged",paged);

							if (callback){
								callback(data);
							}else{
								


								if ((theClass).parent().find(".post_wrap").length){
									(theClass).parent().find(".post_wrap").append(data);
								}else{
									$(data).insertBefore(theClass);
								}


								
							}

							
	                    }

	                });

	                }
        //now load more content
		  
		}	
}

function onYouTubeIframeAPIReady() {

	if ( !$ ) return;

	// Slick Video Slide Init
	$('.video-slide').each(function(){
		var t = $(this),
			iframe = $('iframe', t);

		iframe.parent().data('player', new YT.Player( iframe.attr('id'), {
			events: {
				'onReady': check_for_autoplay,
				'onStateChange': toggle_state_classes
			}
		}));
	});

	function check_for_autoplay(event){
		var t = event.target,
			parent = $(t.a).parent();

		if ( parent.parents('.imge_slick_slider').data('vid_autoplay') ){
			if ( parent.hasClass('slick-active') ) {
				t.playVideo();
			}
		}
	}

	function toggle_state_classes(event){
		var status = event.data,
			t = event.target,
			parent = $(t.a).parent();

		if ( 1 === status ) {
			parent.toggleClass( 'playing', true ).toggleClass( 'paused', false );
		} else if ( 2 === status ) {
			parent.toggleClass( 'playing', false ).toggleClass( 'paused', true );
		}


	}

				

}
