(function ( $ ) {
$.fn.fitToWidth=function(maxSize, maxLines){
	$(this).each(function ( i, box ) {
	
	var width = $( box ).width(),
		height = $( box ).height(),
	    line,
		n = parseInt($(box).css("font-size"), 10);

		if (!maxSize)  if ($(box).attr("data-max-size"))  maxSize  = $(box).attr("data-max-size");
		if (!maxLines) if ($(box).attr("data-max-lines")) maxLines = $(box).attr("data-max-lines");

		if (!$("span", box).length){
			line = $(box).wrapInner("<span></span>").children();
		}else{
			line = $("span", box);
		} 	

		if (!maxLines){

			line.css({"white-space":"nowrap","transition":"none"});

			while ( line.outerWidth() > width ) {
				$( box ).css( {"transition": "none","font-size": --n} );
				//console.log(n);
				if (n < 5) break;
			}

			while ( line.outerWidth() < width ) {
				if (maxSize && n > maxSize) break;
				$( box ).css( {"transition": "none","font-size": ++n} );
			}

		}else{

			var t = line.clone().css({"white-space":"nowrap","transition":"none","z-index":"-1"});
			line.parent().append(t);

			var h = t.height() * maxLines;

		}

		
	
	
	});
	};
}( jQuery ));