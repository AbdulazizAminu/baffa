jQuery(document).ready(function($) {

    if ( !$('body').hasClass('page-template-landing-template-page') && !$('body').hasClass('single-issue') && !$('body').hasClass('error404') ) {
        function setHeaderBG() {
            var trigger = $('#pageHeadImg').height() - $('#header').height();
            var pos = $(window).scrollTop();
            if ( pos >= trigger ) {
                $('#header').addClass('filled-bg');
            } else {
                $('#header').removeClass('filled-bg');
            }
        }
        setHeaderBG();
        $(window).on('scroll resize', setHeaderBG);
    }

    if ( $('#video-modal').length ) {

        var modal = $('#video-modal');
        var video = $('#featured-video').get(0);
        modal.find('.custom-modal-overlay').on('click', function() {
            modal.removeClass('animate-modal-body');
            video.pause();
            video.currentTime = 0;
            setTimeout(function() {
                modal.removeClass('custom-modal-overlay-init');
            }, 400);
        });
        modal.find('.modal-close-icon').on('click', function() {
            modal.removeClass('animate-modal-body');
            video.pause();
            video.currentTime = 0;
            setTimeout(function() {
                modal.removeClass('custom-modal-overlay-init');
            }, 400);
        });
        $('#broll-play-button').on('click', function() {
            modal.addClass('custom-modal-overlay-init');
            setTimeout(function() {
                modal.addClass('animate-modal-body');
                video.play();
            }, 300);
        });
    }

    if ( $('body').hasClass('home') ) {
        if ( $('#about') ) {
            function setAboutHeight() {
                $('#about').removeAttr('style');
                $('#about').css('height', $('#about').outerHeight());
            }
            setAboutHeight();
            $(window).resize(setAboutHeight);
        }
    }

    //hamburger menu toggle
    $('.hamburger').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $('.mobile-menu').toggleClass('open');
    });

    function limitWords(str, no_words) {
        var initialLength = str.length;
        var newString = str.split(" ").splice(0, no_words).join(" ");
        var newStringLength = newString.length;

        if (initialLength > newStringLength) {
            newString += ' ...'
        }
        return newString;
    }

    //////////////////////
    //social stream blocks
    //////////////////////
    if ($('.social-lifestream').length) {

        $('.load-more-social').on('click', function(e) {
            e.preventDefault();
			var count = 1;
			$(this).parents('.social-lifestream').find('.social-block.hidden').each(function(index) {
				if ( count <= 6 ) {
					$(this).removeClass('hidden');
				}
				count++;
			});

			if ( $(this).parents('.social-lifestream').find('.social-block.hidden').length <= 0 ) {
				$(this).text('View More on Facebook').unbind('click');
			}
		});

    }

    if ($('body').hasClass('single-issue')) {
		$('.other-issues-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
            infinite: false,
			dots: false,
			centerMode: false,
			arrows: true,
            prevArrow: '<i class="fa fa-angle-left"></i>',
            nextArrow: '<i class="fa fa-angle-right"></i>',
            appendArrows: $('.append-arrows'),
			responsive: [
                {
					breakpoint: 1199,
					settings: {
						slidesToShow: 3
					}
				},
                {
					breakpoint: 991,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	}

    if ( $('#custom-modal').length ) {
        var modal = $('#custom-modal');
        modal.find('.custom-modal-overlay').on('click', function() {
            modal.removeClass('animate-modal-body');
            setTimeout(function() {
                modal.removeClass('custom-modal-overlay-init');
                setTimeout(function() {
                    $('.custom-modal-body').empty();
                }, 200);
            }, 400);
        });
        modal.find('.modal-close-icon').on('click', function() {
            modal.removeClass('animate-modal-body');
            setTimeout(function() {
                modal.removeClass('custom-modal-overlay-init');
                setTimeout(function() {
                    $('.custom-modal-body').empty();
                }, 200);
            }, 400);
        });
        modal.addClass('custom-modal-overlay-init');
        setTimeout(function() {
            modal.addClass('animate-modal-body');
        }, 300);
    }

    //news section
    if ( $('.news-section').length ) {
        var filter = [];
        var toggleButton = $('.category-dropdown-item');
        var activeCategories = $('.active-categories');
        var postsToShow = 6;

        function checkCategory(categories) {
            var returnVal = false;
            filter.forEach(function(i) {
                categories.forEach(function(c) {
                    if ( parseInt(c) == i.id ) {
                        returnVal = true;
                        return false;
                    }
                });
            });
            return returnVal;
        }

        function hideShow(target) {
            var counter = 1;
            target.each(function() {
                if (filter.length < 1) {
                    if (counter <= postsToShow) {
                        $(this).removeClass('hidden');
                    } else {
                        $(this).addClass('hidden');
                    }
                    counter++;
                } else {
                    var hasCategory = checkCategory($(this).attr('data-categories').split(','));
                    if ( hasCategory ) {
                        if ( counter <= postsToShow ) {
                            $(this).removeClass('hidden');
                        } else {
                            $(this).addClass('hidden');
                        }
                        counter++;
                    } else {
                        $(this).addClass('hidden');
                    }
                }
            });

            if ( counter > postsToShow ) {
                $('.load-more-posts').removeClass('hidden');
            } else {
                $('.load-more-posts').addClass('hidden');
            }
        }

        function togglePosts(reset) {
            var html ='';
            filter.forEach(function(i) {
                html += '<div class="category-btn" data-id="'+i.id+'">'+i.name+'<i class="delete-category" data-id="'+i.id+'"></i></div>';
            });
            activeCategories.empty().append(html);

            if ( reset == true ) {
                hideShow($('.news-item'));

            } else {
                hideShow($('.news-item.hidden'));
            }
        }
        toggleButton.on('click', function() {
            var added = false,
                self = $(this),
                id = self.attr('data-id'),
                name = self.attr('data-name');

            filter.forEach(function(f) {
                if ( f.id == id ) {
                    added = true;
                    return false;
                }
            });

            if (!added) {
                filter.push({
                    'id': id,
                    'name': name
                });
            }
            togglePosts(true);
        });

        $(document).on( 'click', '.delete-category', function(){
            var id = $(this).attr('data-id');
            filter.forEach(function(f, i) {
                if ( f.id == id ) {
                    filter.splice(i,1);
                    return false;
                }
            });
            togglePosts(true);
        });

        $('.load-more-posts').on('click', function() {
            togglePosts();
        });

        $.ajax({
            url: wpApiSettings.root + 'api/posts?offset=' + 12,
            method: 'GET'
        }).done(function(res) {
            if ( res.length ) {
                for(var i in res) {
                    $('.news-section-inner').append(res[i]);
                }
            }
        }).fail(function(err) {
            console.log(err);
        });
    }


    // if ( $('body').hasClass('page-template-news-page-php') ) {
    //
    //     $('.post-category-mobile-toggle select').on('change', function() {
    //         window.location.href = $(this).val();
    //     });
    //
	// 	if ( $('#post-data').length ) {
	// 		var data = $('#post-data');
	// 		var categoryType = data.attr('data-category-type');
	// 		var postsPerPage = data.attr('data-posts-per-page');
	// 		$.ajax({
	// 			url: wpApiSettings.root + 'api/posts?category=' + categoryType + '&offset=' + postsPerPage,
	// 			method: 'GET'
	// 		}).done(function(res) {
	// 			for(var i in res) {
	// 				$('.all-posts').append(res[i]);
	// 			}
	// 			$('.load-more-posts').addClass('show-button');
	// 		}).fail(function(err) {
	// 			console.log(err);
	// 		});
    //
	// 		$('.load-more-posts').on('click', function(e) {
	// 			e.preventDefault();
	// 			var self = $(this);
	// 			if ( $('.news-article.hidden').length ) {
	// 				var count = 0;
	// 				$('.news-article.hidden').each(function() {
	// 					if ( count < 2 ) {
	// 						$(this).removeClass('hidden');
	// 					}
	// 					count++;
	// 				});
    //
	// 				if ( !$('.news-article.hidden').length ) {
	// 					self.remove();
	// 				}
	// 			}
	// 		});
    //
	// 	}
	// }

	// $('.gform_wrapper form').on('submit', function() {
	// 	var gformButton = $(this).find('.gform_footer .gform_button');
	// 	gformButton.addClass('submitting')
	// 	gformButton.after('<i class="fa fa-circle-o-notch fa-spin"></i>');
	// });

    if ( $('.stack-horizontal-scroll').length ) {
        if ( $('.stack-horizontal-scroll').hasClass('video-slider') ) {
            $('.stack-horizontal-scroll').on('init', function() {
                var self = $(this);
                setTimeout(function() {
                    self.removeClass('init');
                },200);
            }).on('afterChange', function() {
                var self = $(this);
                if ( self.find('iframe').length ) {
                    var children = self.find('iframe');
                    children.each(function() {
                        $(this).attr('src', $(this).attr('src'));
                    });
                }
            }).slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    }

    function formSubmitFunc(e) {
        console.log(e);
        var self = $(this);
        var gformButton = $(this).find('.gform_footer .gform_button');
        gformButton.wrap('<div class="submitting"></div>');
        var id = $(this).attr('id') + '_button_text';
        var $id = '#' + id;
        if ( !$($id).length ) {
            $(this).before('<span id="'+id+'" data="'+gformButton.val()+'"></span>');
        }
        gformButton.val('Submitting');
    }

	$('.gform_wrapper form').on('submit', formSubmitFunc);

    jQuery(document).on('gform_post_render', function(event, form_id, current_page){

        $('.gform_wrapper form').on('submit', formSubmitFunc);

    });


	jQuery(document).on('gform_confirmation_loaded', function(event, formId){
    	var confirmMessage = '#gform_confirmation_wrapper_' + formId.toString();
		var $confirmMessage = $(confirmMessage);
		$confirmMessage.parent().find('.gform_title').remove();
	});

    //Resize Function
    function resized() {

    }

    var doit;
    $(window).resize(function() {
        clearTimeout(doit);
        doit = setTimeout(resized, 100);
    });

});
