/**
 * Parallax Scrolling Tutorial
 * For Smashing Magazine
 * July 2011
 *   
 * Author: Richard Shepherd
 * 		   www.richardshepherd.com
 * 		   @richardshepherd   
 */

// On your marks, get set...
function parallaxIni(){

(function($) {
//$(document).ready(function(){	

	// Cache the Window object
	$window = $(window);
	
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
		$(this).data('type', $(this).attr('data-type'));
		
	});
	
	
	// For each element that has a data-type attribute
	//$('[data-type]').each(function(){
	$('[data-type="background"]').each(function(){
	
	
		// Store some variables based on where we are
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top,
			pctPos = 50,
			ltPos = 50,
			lastScrollTop = 0,
			speed = $self.data('speed');

		$self.toggleClass("imge_parallax",true);
		
		// When the window is scrolled...
	    $(window).scroll(function() {

	    	if (Modernizr.touch) { 
				// return;
				// speed = speed * 1.05;
				// ltPos = 0;
			}

			var l = (topOffset + $self.height()) + parseInt($window.height());
		
			// If this section is in view
			//if ( parseInt($window.scrollTop()) > (topOffset)  &&  parseInt($window.scrollTop()) < l)  {

				if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {

				console.log("in view");

				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -($window.scrollTop() / speed); 
				//var yOff = ($window.scrollTop() - topOffset);
				
//				if (pctPos < 180){
//					pctPos += 1;	
//				}else{
//					pctPos -= 1;
//				}
				
				var st = $(this).scrollTop();
			   if (st > lastScrollTop){
				   if (pctPos < 130 && pctPos > -40) {
				   pctPos += 2/speed;
				   }else{
					 pctPos = 50;  
				   }
			   } else {
				   if (pctPos < 130 && pctPos > -40) {
				  pctPos -= 2/speed;
				   }else{
					  pctPos = 50; 
				   }
			   }
			   lastScrollTop = st;
				
				
				// Put together our final background position
				//var coords = '50% '+ yPos + 'px';
				var coords = ltPos+'% '+ Math.floor(pctPos) + '%';
				//var coords = '50% '+ yPos2 + 'px';
				
				

				// Move the background
				if ($self.data('type') == "background") {
				//$self.css('background-image', bgImg );
				$self.css('background-position', coords );
				}else{
				// $self.css({ top: yPos*(-1) + 'px' });
					
				}
				
//				console.log("bgImg = "+bgImg);
//				console.log("coords = "+coords);
				
				
				
				
				//$self.css('background-repeat', 'no-repeat' );
			    //$self.css('background', bgImg+' '+coords);
				
				
				
				// Check for other sprites in this section	
				$('[data-type="sprite"]', $self).each(function() {
					
					// Cache the sprite
					var $sprite = $(this);
					
					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -($window.scrollTop() / $sprite.data('speed'));					
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
					
					$sprite.css({ backgroundPosition: coords });													
					
				}); // sprites
			
				// Check for any Videos that need scrolling
				$('[data-type="video"]', $self).each(function() {
					
					// Cache the video
					var $video = $(this);
					
					// There's some repetition going on here, so 
					// feel free to tidy this section up. 
					var yPos = -($window.scrollTop() / $video.data('speed'));					
					var coords = (yPos + $video.data('offsetY')) + 'px';
	
					$video.css({ top: coords });
																	
					
				}); // video	
			
			}; // in view
	
		}); // window scroll
			
	});	// each data-type

//}); // document ready
})(window.jQuery);
}
// if (!Modernizr.touch) { 
	parallaxIni();
// }