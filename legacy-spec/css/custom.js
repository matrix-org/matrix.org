(function($){
	jQuery.fn.reverse = [].reverse;
	$.et_pb_simple_slider = function(el, options) {
		var settings = $.extend( {
			slide         			: '.et-slide',				 	// slide class
			arrows					: '.et-pb-slider-arrows',		// arrows container class
			prev_arrow				: '.et-pb-arrow-prev',			// left arrow class
			next_arrow				: '.et-pb-arrow-next',			// right arrow class
			controls 				: '.et-pb-controllers a',		// control selector
			carousel_controls 		: '.et_pb_carousel_item',		// carousel control selector
			control_active_class	: 'et-pb-active-control',		// active control class name
			previous_text			: 'Previous',					// previous arrow text
			next_text				: 'Next',						// next arrow text
			fade_speed				: 500,							// fade effect speed
			use_arrows				: true,							// use arrows?
			use_controls			: true,							// use controls?
			manual_arrows			: '',							// html code for custom arrows
			append_controls_to		: '',							// controls are appended to the slider element by default, here you can specify the element it should append to
			controls_below			: false,
			controls_class			: 'et-pb-controllers',				// controls container class name
			slideshow				: false,						// automattic animation?
			slideshow_speed			: 7000,							// automattic animation speed
			show_progress_bar		: false,							// show progress bar if automattic animation is active
			tabs_animation			: false,
			use_carousel			: false
		}, options );

		var $et_slider 			= $(el),
			$et_slide			= $et_slider.find( settings.slide ),
			et_slides_number	= $et_slide.length,
			et_fade_speed		= settings.fade_speed,
			et_active_slide		= 0,
			$et_slider_arrows,
			$et_slider_prev,
			$et_slider_next,
			$et_slider_controls,
			$et_slider_carousel_controls,
			et_slider_timer,
			controls_html = '',
			carousel_html = '',
			$progress_bar = null,
			progress_timer_count = 0,
			$et_pb_container = $et_slider.find( '.et_pb_container' ),
			et_pb_container_width = $et_pb_container.width();

			$et_slider.et_animation_running = false;

			$.data(el, "et_pb_simple_slider", $et_slider);

			$et_slide.eq(0).addClass( 'et-pb-active-slide' );

			if ( ! settings.tabs_animation ) {
				if ( !$et_slider.hasClass('et_pb_bg_layout_dark') && !$et_slider.hasClass('et_pb_bg_layout_light') ){
					$et_slider.addClass( et_get_bg_layout_color( $et_slide.eq(0) ) );
				}
			}

			if ( settings.use_arrows && et_slides_number > 1 ) {
				if ( settings.manual_arrows == '' )
					$et_slider.append( '<div class="et-pb-slider-arrows"><a class="et-pb-arrow-prev" href="#">' + '<span>' +settings.previous_text + '</span>' + '</a><a class="et-pb-arrow-next" href="#">' + '<span>' + settings.next_text + '</span>' + '</a></div>' );
				else
					$et_slider.append( settings.manual_arrows );

				$et_slider_arrows 	= $( settings.arrows );
				$et_slider_prev 	= $et_slider.find( settings.prev_arrow );
				$et_slider_next 	= $et_slider.find( settings.next_arrow );

				$et_slider_next.click( function(){
					if ( $et_slider.et_animation_running )	return false;

					$et_slider.et_slider_move_to( 'next' );

					return false;
				} );

				$et_slider_prev.click( function(){
					if ( $et_slider.et_animation_running )	return false;

					$et_slider.et_slider_move_to( 'previous' );

					return false;
				} );
			}

			if ( settings.use_controls && et_slides_number > 1 ) {
				for ( var i = 1; i <= et_slides_number; i++ ) {
					controls_html += '<a href="#"' + ( i == 1 ? ' class="' + settings.control_active_class + '"' : '' ) + '>' + i + '</a>';
				}

				controls_html =
					'<div class="' + settings.controls_class + '">' +
						controls_html +
					'</div>';

				if ( settings.append_controls_to == '' )
					$et_slider.append( controls_html );
				else
					$( settings.append_controls_to ).append( controls_html );

				if ( settings.controls_below )
					$et_slider_controls	= $et_slider.parent().find( settings.controls );
				else
					$et_slider_controls	= $et_slider.find( settings.controls );

				$et_slider_controls.click( function(){
					if ( $et_slider.et_animation_running )	return false;

					$et_slider.et_slider_move_to( $(this).index() );

					return false;
				} );
			}

			if ( settings.use_carousel && et_slides_number > 1 ) {
				for ( var i = 1; i <= et_slides_number; i++ ) {
					slide_id = i - 1;
					image_src = ( $et_slide.eq(slide_id).data('image') !== undefined ) ? 'url(' + $et_slide.eq(slide_id).data('image') + ')' : 'none';
					carousel_html += '<div class="et_pb_carousel_item ' + ( i == 1 ? settings.control_active_class : '' ) + '" data-slide-id="'+ slide_id +'">' +
						'<div class="et_pb_video_overlay" href="#" style="background-image: ' + image_src + ';">' +
							'<div class="et_pb_video_overlay_hover"><a href="#" class="et_pb_video_play"></a></div>' +
						'</div>' +
					'</div>';
				}

				carousel_html =
					'<div class="et_pb_carousel">' +
					'<div class="et_pb_carousel_items">' +
						carousel_html +
					'</div>' +
					'</div>';
				$et_slider.after( carousel_html );

				$et_slider_carousel_controls = $et_slider.siblings('.et_pb_carousel').find( settings.carousel_controls );
				$et_slider_carousel_controls.click( function(){
					if ( $et_slider.et_animation_running )	return false;

					var $this = $(this);
					$et_slide.eq( $this.data('slide-id') ).find('.et_pb_video_overlay').css('display', 'none');
					$et_slider.et_slider_move_to( $this.data('slide-id') );

					return false;
				} );
			}

			if ( settings.slideshow && et_slides_number > 1 ) {
				$et_slider.hover( function() {
					$et_slider.addClass( 'et_slider_hovered' );

					if ( typeof et_slider_timer != 'undefined' ) {
						clearInterval( et_slider_timer );
					}
				}, function() {
					$et_slider.removeClass( 'et_slider_hovered' );

					et_slider_auto_rotate();
				} );
			}

			et_slider_auto_rotate();

			function et_slider_auto_rotate(){
				if ( settings.slideshow && et_slides_number > 1 && ! $et_slider.hasClass( 'et_slider_hovered' ) ) {
					et_slider_timer = setTimeout( function() {
						$et_slider.et_slider_move_to( 'next' );
					}, settings.slideshow_speed );
				}
			}

			function et_stop_video( active_slide ) {
				var $et_video, et_video_src;

				// if there is a video in the slide, stop it when switching to another slide
				if ( active_slide.has( 'iframe' ).length ) {
					$et_video = active_slide.find( 'iframe' );
					et_video_src = $et_video.attr( 'src' );

					$et_video.attr( 'src', '' );
					$et_video.attr( 'src', et_video_src );

				} else if ( active_slide.has( 'video' ).length ) {
					$et_video = active_slide.find( 'video' );

					$et_video[0].pause();
				}
			}

			function et_fix_slider_content_images() {
				var $this_slider           = $et_slider,
					$slide_image_container = $this_slider.find( '.et-pb-active-slide .et_pb_slide_image' );
					$slide                 = $slide_image_container.closest( '.et_pb_slide' ),
					$slider                = $slide.closest( '.et_pb_slider' ),
					slide_height           = $slider.innerHeight(),
					image_height           = parseInt( slide_height * 0.8 );

				$slide_image_container.find( 'img' ).css( 'maxHeight', image_height + 'px' );

				if ( $slide.hasClass( 'et_pb_media_alignment_center' ) ) {
					$slide_image_container.css( 'marginTop', '-' + parseInt( $slide_image_container.height() / 2 ) + 'px' );
				}

				$slide_image_container.find( 'img' ).addClass( 'active' );
			}

			function et_get_bg_layout_color( $slide ) {
				if ( $slide.hasClass( 'et_pb_bg_layout_dark' ) ) {
					return 'et_pb_bg_layout_dark';
				}

				return 'et_pb_bg_layout_light';
			}

			$et_window.load( function() {
				et_fix_slider_content_images();
			} );

			$et_window.resize( function() {
				if ( et_pb_container_width !== $et_pb_container.width() ) {
					et_pb_container_width = $et_pb_container.width();

					et_fix_slider_content_images();
				}
			} );

			$et_slider.et_slider_move_to = function ( direction ) {
				var $active_slide = $et_slide.eq( et_active_slide ),
					$next_slide;

				$et_slider.et_animation_running = true;

				if ( direction == 'next' || direction == 'previous' ){

					if ( direction == 'next' )
						et_active_slide = ( et_active_slide + 1 ) < et_slides_number ? et_active_slide + 1 : 0;
					else
						et_active_slide = ( et_active_slide - 1 ) >= 0 ? et_active_slide - 1 : et_slides_number - 1;

				} else {

					if ( et_active_slide == direction ) {
						$et_slider.et_animation_running = false;
						return;
					}

					et_active_slide = direction;

				}

				if ( typeof et_slider_timer != 'undefined' )
					clearInterval( et_slider_timer );

				$next_slide	= $et_slide.eq( et_active_slide );

				$et_slide.each( function(){
					$(this).css( 'zIndex', 1 );
				} );
				$active_slide.css( 'zIndex', 2 ).removeClass( 'et-pb-active-slide' );
				$next_slide.css( { 'display' : 'block', opacity : 0 } ).addClass( 'et-pb-active-slide' );

				et_fix_slider_content_images();

				if ( settings.use_controls )
					$et_slider_controls.removeClass( settings.control_active_class ).eq( et_active_slide ).addClass( settings.control_active_class );

				if ( settings.use_carousel )
					$et_slider_carousel_controls.removeClass( settings.control_active_class ).eq( et_active_slide ).addClass( settings.control_active_class );

				if ( ! settings.tabs_animation ) {
					$next_slide.animate( { opacity : 1 }, et_fade_speed );
					$active_slide.addClass( 'et_slide_transition' ).css( { 'display' : 'list-item', 'opacity' : 1 } ).animate( { opacity : 0 }, et_fade_speed, function(){
						var active_slide_layout_bg_color = et_get_bg_layout_color( $active_slide ),
							next_slide_layout_bg_color = et_get_bg_layout_color( $next_slide );

						$(this).css('display', 'none').removeClass( 'et_slide_transition' );

						et_stop_video( $active_slide );

						$et_slider
							.removeClass( active_slide_layout_bg_color )
							.addClass( next_slide_layout_bg_color );

						$et_slider.et_animation_running = false;
					} );
				} else {
					$next_slide.css( { 'display' : 'none', opacity : 0 } );

					$active_slide.addClass( 'et_slide_transition' ).css( { 'display' : 'block', 'opacity' : 1 } ).animate( { opacity : 0 }, et_fade_speed, function(){
						$(this).css('display', 'none').removeClass( 'et_slide_transition' );

						$next_slide.css( { 'display' : 'block', 'opacity' : 0 } ).animate( { opacity : 1 }, et_fade_speed, function() {
							$et_slider.et_animation_running = false;
						} );
					} );
				}

				et_slider_auto_rotate();
			}
	}

	$.fn.et_pb_simple_slider = function( options ) {
		return this.each(function() {
			new $.et_pb_simple_slider(this, options);
		});
	}

	var et_hash_module_seperator = '||',
		et_hash_module_param_seperator = '|';

	function process_et_hashchange( hash ) {
		if ( ( hash.indexOf( et_hash_module_seperator, 0 ) ) !== -1 ) {
			modules = hash.split( et_hash_module_seperator );
			for ( var i = 0; i < modules.length; i++ ) {
				var module_params = modules[i].split( et_hash_module_param_seperator );
				var element = module_params[0];
				module_params.shift();
				if ( $('#' + element ).length ) {
					$('#' + element ).trigger({
						type: "et_hashchange",
						params: module_params
					});
				}
			}
		} else {
			module_params = hash.split( et_hash_module_param_seperator );
			var element = module_params[0];
			module_params.shift();
			if ( $('#' + element ).length ) {
				$('#' + element ).trigger({
					type: "et_hashchange",
					params: module_params
				});
			}
		}
	}

	function et_set_hash( module_state_hash ) {
		module_id = module_state_hash.split( et_hash_module_param_seperator )[0];
		if ( !$('#' + module_id ).length ) {
			return;
		}

		if ( window.location.hash ) {
			var hash = window.location.hash.substring(1), //Puts hash in variable, and removes the # character
				new_hash = [];

			if( ( hash.indexOf( et_hash_module_seperator, 0 ) ) !== -1 ) {
				modules = hash.split( et_hash_module_seperator );
				var in_hash = false;
				for ( var i = 0; i < modules.length; i++ ) {
					var element = modules[i].split( et_hash_module_param_seperator )[0];
					if( element === module_id ) {
						new_hash.push( module_state_hash );
						in_hash = true;
					} else {
						new_hash.push( modules[i] );
					}
				}
				if ( !in_hash ) {
					new_hash.push( module_state_hash );
				}
			} else {
				module_params = hash.split( et_hash_module_param_seperator );
				var element = module_params[0];
				if ( element !== module_id ) {
					new_hash.push( hash );
				}
				new_hash.push( module_state_hash );
			}

			hash = new_hash.join( et_hash_module_seperator );
		} else {
			hash = module_state_hash;
		}

		var yScroll = document.body.scrollTop;
		window.location.hash = hash;
		document.body.scrollTop = yScroll;
	}

	$.et_pb_simple_carousel = function(el, options) {
		var settings = $.extend( {
			slide_duration	: 500,
		}, options );

		var $et_carousel 			= $(el),
			$carousel_items 		= $et_carousel.find('.et_pb_carousel_items'),
			$the_carousel_items 	= $carousel_items.find('.et_pb_carousel_item');

		$et_carousel.et_animation_running = false;

		$et_carousel.addClass('container-width-change-notify').on('containerWidthChanged', function( event ){
			set_carousel_columns( $et_carousel );
			set_carousel_height( $et_carousel );
		});

		$carousel_items.data('items', $the_carousel_items.toArray() );
		$et_carousel.data('columns_setting_up', false );

		$carousel_items.prepend('<div class="et-pb-slider-arrows"><a class="et-pb-slider-arrow et-pb-arrow-prev" href="#">' + '<span>Previous</span>' + '</a><a class="et-pb-slider-arrow et-pb-arrow-next" href="#">' + '<span>Next</span>' + '</a></div>');

		set_carousel_columns( $et_carousel );
		set_carousel_height( $et_carousel );

		$et_carousel_next 	= $et_carousel.find( '.et-pb-arrow-next' );
		$et_carousel_prev 	= $et_carousel.find( '.et-pb-arrow-prev'  );

		$et_carousel_next.click( function(){
			if ( $et_carousel.et_animation_running ) return false;

			$et_carousel.et_carousel_move_to( 'next' );

			return false;
		} );

		$et_carousel_prev.click( function(){
			if ( $et_carousel.et_animation_running ) return false;

			$et_carousel.et_carousel_move_to( 'previous' );

			return false;
		} );

		function set_carousel_height( $the_carousel ) {
			var carousel_items_width = $the_carousel_items.width(),
				carousel_items_height = $the_carousel_items.height();

			$carousel_items.css('height', carousel_items_height + 'px' );
		}

		function set_carousel_columns( $the_carousel ) {
			var columns,
				$carousel_parent = $the_carousel.parents('.et_pb_column'),
				carousel_items_width = $carousel_items.width(),
				carousel_item_count = $the_carousel_items.length;

			if ( $carousel_parent.hasClass('et_pb_column_4_4') || $carousel_parent.hasClass('et_pb_column_3_4') || $carousel_parent.hasClass('et_pb_column_2_3') ) {
				if ( $et_window.width() < 768 ) {
					columns = 3;
				} else {
					columns = 4;
				}
			} else if ( $carousel_parent.hasClass('et_pb_column_1_2') || $carousel_parent.hasClass('et_pb_column_3_8') || $carousel_parent.hasClass('et_pb_column_1_3') ) {
				columns = 3;
			} else if ( $carousel_parent.hasClass('et_pb_column_1_4') ) {
				if ( $et_window.width() > 480 && $et_window.width() < 980 ) {
					columns = 3;
				} else {
					columns = 2;
				}
			}

			if ( columns === $carousel_items.data('columns') ) {
				return;
			}

			if ( $the_carousel.data('columns_setting_up') ) {
				return;
			}

			$the_carousel.data('columns_setting_up', true );

			// store last setup column
			$carousel_items.removeClass('columns-' + $carousel_items.data('columns') );
			$carousel_items.addClass('columns-' + columns );
			$carousel_items.data('columns', columns );

			// kill all previous groups to get ready to re-group
			if ( $carousel_items.find('.et-carousel-group').length ) {
				$the_carousel_items.appendTo( $carousel_items );
				$carousel_items.find('.et-carousel-group').remove();
			}

			// setup the grouping
			var the_carousel_items = $carousel_items.data('items'),
				$carousel_group = $('<div class="et-carousel-group active">').appendTo( $carousel_items );

			$the_carousel_items.data('position', '');
			if ( the_carousel_items.length <= columns ) {
				$carousel_items.find('.et-pb-slider-arrows').hide();
			} else {
				$carousel_items.find('.et-pb-slider-arrows').show();
			}

			for ( position = 1, x=0 ;x < the_carousel_items.length; x++, position++ ) {
				if ( x < columns ) {
					$( the_carousel_items[x] ).show();
					$( the_carousel_items[x] ).appendTo( $carousel_group );
					$( the_carousel_items[x] ).data('position', position );
					$( the_carousel_items[x] ).addClass('position_' + position );
				} else {
					position = $( the_carousel_items[x] ).data('position');
					$( the_carousel_items[x] ).removeClass('position_' + position );
					$( the_carousel_items[x] ).data('position', '' );
					$( the_carousel_items[x] ).hide();
				}
			}

			$the_carousel.data('columns_setting_up', false );

		} /* end set_carousel_columns() */

		$et_carousel.et_carousel_move_to = function ( direction ) {
			var $active_carousel_group 	= $carousel_items.find('.et-carousel-group.active'),
				items 					= $carousel_items.data('items'),
				columns 				= $carousel_items.data('columns');

			$et_carousel.et_animation_running = true;

			var left = 0;
			$active_carousel_group.children().each(function(){
				$(this).css({'position':'absolute', 'left': left });
				left = left + $(this).outerWidth(true);
			});

			if ( direction == 'next' ) {
				var $next_carousel_group,
					current_position = 1,
					next_position = 1,
					active_items_start = items.indexOf( $active_carousel_group.children().first()[0] ),
					active_items_end = active_items_start + columns,
					next_items_start = active_items_end,
					next_items_end = next_items_start + columns;

				$next_carousel_group = $('<div class="et-carousel-group next" style="display: none;left: 100%;position: absolute;top: 0;">').insertAfter( $active_carousel_group );
				$next_carousel_group.css({ 'width': $active_carousel_group.innerWidth() }).show();

				// this is an endless loop, so it can decide internally when to break out, so that next_position
				// can get filled up, even to the extent of an element having both and current_ and next_ position
				for( x = 0, total = 0 ; ; x++, total++ ) {
					if ( total >= active_items_start && total < active_items_end ) {
						$( items[x] ).addClass( 'changing_position current_position current_position_' + current_position );
						$( items[x] ).data('current_position', current_position );
						current_position++;
					}

					if ( total >= next_items_start && total < next_items_end ) {
						$( items[x] ).data('next_position', next_position );
						$( items[x] ).addClass('changing_position next_position next_position_' + next_position );

						if ( !$( items[x] ).hasClass( 'current_position' ) ) {
							$( items[x] ).addClass('container_append');
						} else {
							$( items[x] ).clone(true).appendTo( $active_carousel_group ).hide().addClass('delayed_container_append_dup').attr('id', $( items[x] ).attr('id') + '-dup' );
							$( items[x] ).addClass('delayed_container_append');
						}

						next_position++;
					}

					if ( next_position > columns ) {
						break;
					}

					if ( x >= ( items.length -1 )) {
						x = -1;
					}
				}

				var sorted = $carousel_items.find('.container_append, .delayed_container_append_dup').sort(function (a, b) {
					var el_a_position = parseInt( $(a).data('next_position') );
					var el_b_position = parseInt( $(b).data('next_position') );
					return ( el_a_position < el_b_position ) ? -1 : ( el_a_position > el_b_position ) ? 1 : 0;
				});

				$( sorted ).show().appendTo( $next_carousel_group );

				var left = 0;
				$next_carousel_group.children().each(function(){
					$(this).css({'position':'absolute', 'left': left });
					left = left + $(this).outerWidth(true);
				});

				$active_carousel_group.animate({
					left: '-100%'
				}, {
					duration: settings.slide_duration,
					complete: function() {
						$carousel_items.find('.delayed_container_append').each(function(){
							left = $( '#' + $(this).attr('id') + '-dup' ).css('left');
							$(this).css({'position':'absolute', 'left': left });
							$(this).appendTo( $next_carousel_group );
						});

						$active_carousel_group.removeClass('active');
						$active_carousel_group.children().each(function(){
							position = $(this).data('position');
							current_position = $(this).data('current_position');
							$(this).removeClass('position_' + position + ' ' + 'changing_position current_position current_position_' + current_position );
							$(this).data('position', '');
							$(this).data('current_position', '');
							$(this).hide();
							$(this).css({'position': '', 'left': ''});
							$(this).appendTo( $carousel_items );
						});

						$active_carousel_group.remove();

					}
				} );

				next_left = $active_carousel_group.width() + parseInt( $the_carousel_items.first().css('marginRight').slice(0, -2) );
				$next_carousel_group.addClass('active').css({'position':'absolute', 'top':0, left: next_left });
				$next_carousel_group.animate({
					left: '0%'
				}, {
					duration: settings.slide_duration,
					complete: function(){
						$next_carousel_group.removeClass('next').addClass('active').css({'position':'', 'width':'', 'top':'', 'left': ''});

						$next_carousel_group.find('.changing_position').each(function( index ){
							position = $(this).data('position');
							current_position = $(this).data('current_position');
							next_position = $(this).data('next_position');
							$(this).removeClass('container_append delayed_container_append position_' + position + ' ' + 'changing_position current_position current_position_' + current_position + ' next_position next_position_' + next_position );
							$(this).data('current_position', '');
							$(this).data('next_position', '');
							$(this).data('position', ( index + 1 ) );
						});

						$next_carousel_group.children().css({'position': '', 'left': ''});
						$next_carousel_group.find('.delayed_container_append_dup').remove();

						$et_carousel.et_animation_running = false;
					}
				} );

			} else if ( direction == 'previous' ) {
				var $prev_carousel_group,
					current_position = columns,
					prev_position = columns,
					columns_span = columns - 1,
					active_items_start = items.indexOf( $active_carousel_group.children().last()[0] ),
					active_items_end = active_items_start - columns_span,
					prev_items_start = active_items_end - 1,
					prev_items_end = prev_items_start - columns_span;

				$prev_carousel_group = $('<div class="et-carousel-group prev" style="display: none;left: 100%;position: absolute;top: 0;">').insertBefore( $active_carousel_group );
				$prev_carousel_group.css({ 'left': '-' + $active_carousel_group.innerWidth(), 'width': $active_carousel_group.innerWidth() }).show();

				// this is an endless loop, so it can decide internally when to break out, so that next_position
				// can get filled up, even to the extent of an element having both and current_ and next_ position
				for( x = ( items.length - 1 ), total = ( items.length - 1 ) ; ; x--, total-- ) {

					if ( total <= active_items_start && total >= active_items_end ) {
						$( items[x] ).addClass( 'changing_position current_position current_position_' + current_position );
						$( items[x] ).data('current_position', current_position );
						current_position--;
					}

					if ( total <= prev_items_start && total >= prev_items_end ) {
						$( items[x] ).data('prev_position', prev_position );
						$( items[x] ).addClass('changing_position prev_position prev_position_' + prev_position );

						if ( !$( items[x] ).hasClass( 'current_position' ) ) {
							$( items[x] ).addClass('container_append');
						} else {
							$( items[x] ).clone(true).appendTo( $active_carousel_group ).addClass('delayed_container_append_dup').attr('id', $( items[x] ).attr('id') + '-dup' );
							$( items[x] ).addClass('delayed_container_append');
						}

						prev_position--;
					}

					if ( prev_position <= 0 ) {
						break;
					}

					if ( x == 0 ) {
						x = items.length;
					}
				}

				var sorted = $carousel_items.find('.container_append, .delayed_container_append_dup').sort(function (a, b) {
					var el_a_position = parseInt( $(a).data('prev_position') );
					var el_b_position = parseInt( $(b).data('prev_position') );
					return ( el_a_position < el_b_position ) ? -1 : ( el_a_position > el_b_position ) ? 1 : 0;
				});

				$( sorted ).show().appendTo( $prev_carousel_group );

				var left = 0;
				$prev_carousel_group.children().each(function(){
					$(this).css({'position':'absolute', 'left': left });
					left = left + $(this).outerWidth(true);
				});

				$active_carousel_group.animate({
					left: '100%'
				}, {
					duration: settings.slide_duration,
					complete: function() {
						$carousel_items.find('.delayed_container_append').reverse().each(function(){
							left = $( '#' + $(this).attr('id') + '-dup' ).css('left');
							$(this).css({'position':'absolute', 'left': left });
							$(this).prependTo( $prev_carousel_group );
						});

						$active_carousel_group.removeClass('active');
						$active_carousel_group.children().each(function(){
							position = $(this).data('position');
							current_position = $(this).data('current_position');
							$(this).removeClass('position_' + position + ' ' + 'changing_position current_position current_position_' + current_position );
							$(this).data('position', '');
							$(this).data('current_position', '');
							$(this).hide();
							$(this).css({'position': '', 'left': ''});
							$(this).appendTo( $carousel_items );
						});

						$active_carousel_group.remove();
					}
				} );

				prev_left = (-1) * $active_carousel_group.width() - parseInt( $the_carousel_items.first().css('marginRight').slice(0, -2) );
				$prev_carousel_group.addClass('active').css({'position':'absolute', 'top':0, left: prev_left });
				$prev_carousel_group.animate({
					left: '0%'
				}, {
					duration: settings.slide_duration,
					complete: function(){
						$prev_carousel_group.removeClass('prev').addClass('active').css({'position':'', 'width':'', 'top':'', 'left': ''});

						$prev_carousel_group.find('.delayed_container_append_dup').remove();

						$prev_carousel_group.find('.changing_position').each(function( index ){
							position = $(this).data('position');
							current_position = $(this).data('current_position');
							prev_position = $(this).data('prev_position');
							$(this).removeClass('container_append delayed_container_append position_' + position + ' ' + 'changing_position current_position current_position_' + current_position + ' prev_position prev_position_' + prev_position );
							$(this).data('current_position', '');
							$(this).data('prev_position', '');
							position = index + 1;
							$(this).data('position', position );
							$(this).addClass('position_' + position );
						});

						$prev_carousel_group.children().css({'position': '', 'left': ''});
						$et_carousel.et_animation_running = false;
					}
				} );
			}
		}
	}

	$.fn.et_pb_simple_carousel = function( options ) {
		return this.each(function() {
			new $.et_pb_simple_carousel(this, options);
		});
	}

	var $et_pb_slider  = $( '.et_pb_slider' ),
		$et_pb_tabs    = $( '.et_pb_tabs' ),
		$et_pb_tabs_li = $et_pb_tabs.find( '.et_pb_tabs_controls li' ),
		$et_pb_video_section = $('.et_pb_section_video_bg'),
		$et_pb_newsletter_button = $( '.et_pb_newsletter_button' ),
		$et_pb_filterable_portfolio = $( '.et_pb_filterable_portfolio' ),
		$et_pb_fullwidth_portfolio = $( '.et_pb_fullwidth_portfolio' ),
		$et_pb_gallery = $( '.et_pb_gallery' ),
		$et_pb_countdown_timer = $( '.et_pb_countdown_timer' ),
		$et_post_gallery = $( '.et_post_gallery' ),
		$et_lightbox_image = $( '.et_pb_lightbox_image'),
		$et_pb_map    = $( '.et_pb_map_container' ),
		$et_pb_circle_counter = $( '.et_pb_circle_counter' ),
		$et_pb_number_counter = $( '.et_pb_number_counter' ),
		$et_pb_parallax = $( '.et_parallax_bg' ),
		et_is_mobile_device = navigator.userAgent.match( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/ ),
		et_is_ipad = navigator.userAgent.match( /iPad/ ),
		$et_container = $( '.container' ),
		et_container_width = $et_container.width(),
		et_is_fixed_nav = $( 'body' ).hasClass( 'et_fixed_nav' ),
		$main_container_wrapper = $( '#page-container' ),
		$et_window = $(window),
		etRecalculateOffset = false,
		et_header_height,
		et_header_modifier,
		et_header_offset,
		et_primary_header_top;

	$(document).ready( function(){
		var $et_top_menu = $( 'ul.nav' ),
			$et_search_icon = $( '#et_search_icon' );

		$et_top_menu.find( 'li' ).hover( function() {
			if ( ! $(this).closest( 'li.mega-menu' ).length || $(this).hasClass( 'mega-menu' ) ) {
				$(this).addClass( 'et-show-dropdown' );
				$(this).removeClass( 'et-hover' ).addClass( 'et-hover' );
			}
		}, function() {
			var $this_el = $(this);

			$this_el.removeClass( 'et-show-dropdown' );

			setTimeout( function() {
				if ( ! $this_el.hasClass( 'et-show-dropdown' ) ) {
					$this_el.removeClass( 'et-hover' );
				}
			}, 200 );
		} );

		if ( $('ul.et_disable_top_tier').length ) {
			$("ul.et_disable_top_tier > li > ul").prev('a').attr('href','#');
		}

		if ( et_is_mobile_device ) {
			$( '.et_pb_section_video_bg' ).each( function() {
				var $this_el = $(this);

				$this_el.css( 'visibility', 'hidden' ).closest( '.et_pb_preload' ).removeClass( 'et_pb_preload' )
			} );

			$( 'body' ).addClass( 'et_mobile_device' );

			if ( ! et_is_ipad ) {
				$( 'body' ).addClass( 'et_mobile_device_not_ipad' );
			}
		}

		$et_search_icon.click( function() {
			var $this_el = $(this),
				$form = $this_el.siblings( '.et-search-form' );

			if ( $form.hasClass( 'et-hidden' ) ) {
				$form.css( { 'display' : 'block', 'opacity' : 0 } ).animate( { opacity : 1 }, 500 );
			} else {
				$form.animate( { opacity : 0 }, 500 );
			}

			$form.toggleClass( 'et-hidden' );
		} );

		if ( $et_pb_video_section.length ){
			$et_pb_video_section.find( 'video' ).mediaelementplayer( {
				pauseOtherPlayers: false,
				success : function( mediaElement, domObject ) {
					mediaElement.addEventListener( 'canplay', function() {
						et_pb_resize_section_video_bg( $(domObject) );
						et_pb_center_video( $(domObject) );
					} );
				}
			} );
		}

		if ( $et_post_gallery.length ) {
			$et_post_gallery.each(function() {
				$(this).magnificPopup( {
					delegate: 'a',
					type: 'image',
					removalDelay: 500,
					gallery: {
						enabled: true,
						navigateByImgClick: true
					},
					mainClass: 'mfp-fade',
					zoom: {
						enabled: true,
						duration: 500,
						opener: function(element) {
							return element.find('img');
						}
					}
				} );
			} );
		}

		if ( $et_lightbox_image.length ) {
			$et_lightbox_image.magnificPopup( {
				type: 'image',
				removalDelay: 500,
				mainClass: 'mfp-fade',
				zoom: {
					enabled: true,
					duration: 500,
					opener: function(element) {
						return element.find('img');
					}
				}
			} );
		}

		if ( $et_pb_slider.length ){
			$et_pb_slider.each( function() {
				var $this_slider = $(this),
					et_slider_settings = {
						fade_speed 		: 700,
						slide			: '.et_pb_slide'
					}

				if ( $this_slider.hasClass('et_pb_slider_no_arrows') )
					et_slider_settings.use_arrows = false;

				if ( $this_slider.hasClass('et_pb_slider_no_pagination') )
					et_slider_settings.use_controls = false;

				if ( $this_slider.hasClass('et_slider_auto') ) {
					var et_slider_autospeed_class_value = /et_slider_speed_(\d+)/g;

					et_slider_settings.slideshow = true;

					et_slider_autospeed = et_slider_autospeed_class_value.exec( $this_slider.attr('class') );

					et_slider_settings.slideshow_speed = et_slider_autospeed[1];
				}

				if ( $this_slider.parent().hasClass('et_pb_video_slider') ) {
					et_slider_settings.controls_below = true;
					et_slider_settings.append_controls_to = $this_slider.parent();
				}

				if ( $this_slider.hasClass('et_pb_slider_carousel') )
					et_slider_settings.use_carousel = true;

				$this_slider.et_pb_simple_slider( et_slider_settings );

			} );
		}

		$et_pb_carousel  = $( '.et_pb_carousel' );
		if ( $et_pb_carousel.length ){
			$et_pb_carousel.each( function() {
				var $this_carousel = $(this),
					et_carousel_settings = {
						fade_speed 		: 1000
					};

				$this_carousel.et_pb_simple_carousel( et_carousel_settings );
			} );
		}

		if ( $et_pb_fullwidth_portfolio.length ) {

			function set_fullwidth_portfolio_columns( $the_portfolio, carousel_mode ) {
				var columns,
					$portfolio_items = $the_portfolio.find('.et_pb_portfolio_items'),
					portfolio_items_width = $portfolio_items.width(),
					$the_portfolio_items = $portfolio_items.find('.et_pb_portfolio_item'),
					portfolio_item_count = $the_portfolio_items.length;

				// calculate column breakpoints
				if ( portfolio_items_width >= 1600 ) {
					columns = 5;
				} else if ( portfolio_items_width >= 1024 ) {
					columns = 4;
				} else if ( portfolio_items_width >= 768 ) {
					columns = 3;
				} else if ( portfolio_items_width >= 480 ) {
					columns = 2;
				} else {
					columns = 1;
				}

				// set height of items
				portfolio_item_width = portfolio_items_width / columns;
				portfolio_item_height = portfolio_item_width * .75;

				if ( carousel_mode ) {
					$portfolio_items.css({ 'height' : portfolio_item_height });
				}

				$the_portfolio_items.css({ 'height' : portfolio_item_height });

				if ( columns === $portfolio_items.data('columns') ) {
					return;
				}

				if ( $the_portfolio.data('columns_setting_up') ) {
					return;
				}

				$the_portfolio.data('columns_setting_up', true );

				var portfolio_item_width_percentage = ( 100 / columns ) + '%';
				$the_portfolio_items.css({ 'width' : portfolio_item_width_percentage });

				// store last setup column
				$portfolio_items.removeClass('columns-' + $portfolio_items.data('columns') );
				$portfolio_items.addClass('columns-' + columns );
				$portfolio_items.data('columns', columns );

				if ( !carousel_mode ) {
					return $the_portfolio.data('columns_setting_up', false );
				}

				// kill all previous groups to get ready to re-group
				if ( $portfolio_items.find('.et_pb_carousel_group').length ) {
					$the_portfolio_items.appendTo( $portfolio_items );
					$portfolio_items.find('.et_pb_carousel_group').remove();
				}

				// setup the grouping
				var the_portfolio_items = $portfolio_items.data('items' ),
					$carousel_group = $('<div class="et_pb_carousel_group active">').appendTo( $portfolio_items );

				$the_portfolio_items.data('position', '');
				if ( the_portfolio_items.length <= columns ) {
					$portfolio_items.find('.et-pb-slider-arrows').hide();
				} else {
					$portfolio_items.find('.et-pb-slider-arrows').show();
				}

				for ( position = 1, x=0 ;x < the_portfolio_items.length; x++, position++ ) {
					if ( x < columns ) {
						$( the_portfolio_items[x] ).show();
						$( the_portfolio_items[x] ).appendTo( $carousel_group );
						$( the_portfolio_items[x] ).data('position', position );
						$( the_portfolio_items[x] ).addClass('position_' + position );
					} else {
						position = $( the_portfolio_items[x] ).data('position');
						$( the_portfolio_items[x] ).removeClass('position_' + position );
						$( the_portfolio_items[x] ).data('position', '' );
						$( the_portfolio_items[x] ).hide();
					}
				}

				$the_portfolio.data('columns_setting_up', false );

			}

			function et_carousel_auto_rotate( $carousel ) {
				if ( 'on' === $carousel.data('auto-rotate') && $carousel.find('.et_pb_portfolio_item').length > $carousel.find('.et_pb_carousel_group .et_pb_portfolio_item').length && ! $carousel.hasClass( 'et_carousel_hovered' ) ) {

					et_carousel_timer = setTimeout( function() {
						$carousel.find('.et-pb-arrow-next').click();
					}, $carousel.data('auto-rotate-speed') );

					$carousel.data('et_carousel_timer', et_carousel_timer);
				}
			}

			$et_pb_fullwidth_portfolio.each(function(){
				var $the_portfolio = $(this),
					$portfolio_items = $the_portfolio.find('.et_pb_portfolio_items');

					$portfolio_items.data('items', $portfolio_items.find('.et_pb_portfolio_item').toArray() );
					$the_portfolio.data('columns_setting_up', false );

				if ( $the_portfolio.hasClass('et_pb_fullwidth_portfolio_carousel') ){
					// add left and right arrows
					$portfolio_items.prepend('<div class="et-pb-slider-arrows"><a class="et-pb-arrow-prev" href="#">' + '<span>Previous</span>' + '</a><a class="et-pb-arrow-next" href="#">' + '<span>Next</span>' + '</a></div>');

					set_fullwidth_portfolio_columns( $the_portfolio, true );

					et_carousel_auto_rotate( $the_portfolio );

					$the_portfolio.hover(
						function(){
							$(this).addClass('et_carousel_hovered');
							if ( typeof $(this).data('et_carousel_timer') != 'undefined' ) {
								clearInterval( $(this).data('et_carousel_timer') );
							}
						},
						function(){
							$(this).removeClass('et_carousel_hovered');
							et_carousel_auto_rotate( $(this) );
						}
					);

					$the_portfolio.data('carouseling', false );

					$the_portfolio.on('click', '.et-pb-slider-arrows a', function(e){
						var $the_portfolio = $(this).parents('.et_pb_fullwidth_portfolio'),
							$portfolio_items = $the_portfolio.find('.et_pb_portfolio_items'),
							$the_portfolio_items = $portfolio_items.find('.et_pb_portfolio_item'),
							$active_carousel_group = $portfolio_items.find('.et_pb_carousel_group.active'),
							slide_duration = 700,
							items = $portfolio_items.data('items'),
							columns = $portfolio_items.data('columns'),
							item_width = $active_carousel_group.innerWidth() / columns, //$active_carousel_group.children().first().innerWidth(),
							original_item_width = ( 100 / columns ) + '%';

						e.preventDefault();

						if ( $the_portfolio.data('carouseling') ) {
							return;
						}

						$the_portfolio.data('carouseling', true);

						$active_carousel_group.children().each(function(){
							$(this).css({'width': $(this).innerWidth() + 1, 'position':'absolute', 'left': ( $(this).innerWidth() * ( $(this).data('position') - 1 ) ) });
						});

						if ( $(this).hasClass('et-pb-arrow-next') ) {
							var $next_carousel_group,
								current_position = 1,
								next_position = 1,
								active_items_start = items.indexOf( $active_carousel_group.children().first()[0] ),
								active_items_end = active_items_start + columns,
								next_items_start = active_items_end,
								next_items_end = next_items_start + columns;

							$next_carousel_group = $('<div class="et_pb_carousel_group next" style="display: none;left: 100%;position: absolute;top: 0;">').insertAfter( $active_carousel_group );
							$next_carousel_group.css({ 'width': $active_carousel_group.innerWidth() }).show();

							// this is an endless loop, so it can decide internally when to break out, so that next_position
							// can get filled up, even to the extent of an element having both and current_ and next_ position
							for( x = 0, total = 0 ; ; x++, total++ ) {
								if ( total >= active_items_start && total < active_items_end ) {
									$( items[x] ).addClass( 'changing_position current_position current_position_' + current_position );
									$( items[x] ).data('current_position', current_position );
									current_position++;
								}

								if ( total >= next_items_start && total < next_items_end ) {
									$( items[x] ).data('next_position', next_position );
									$( items[x] ).addClass('changing_position next_position next_position_' + next_position );

									if ( !$( items[x] ).hasClass( 'current_position' ) ) {
										$( items[x] ).addClass('container_append');
									} else {
										$( items[x] ).clone(true).appendTo( $active_carousel_group ).hide().addClass('delayed_container_append_dup').attr('id', $( items[x] ).attr('id') + '-dup' );
										$( items[x] ).addClass('delayed_container_append');
									}

									next_position++;
								}

								if ( next_position > columns ) {
									break;
								}

								if ( x >= ( items.length -1 )) {
									x = -1;
								}
							}

							sorted = $portfolio_items.find('.container_append, .delayed_container_append_dup').sort(function (a, b) {
								var el_a_position = parseInt( $(a).data('next_position') );
								var el_b_position = parseInt( $(b).data('next_position') );
								return ( el_a_position < el_b_position ) ? -1 : ( el_a_position > el_b_position ) ? 1 : 0;
							});

							$( sorted ).show().appendTo( $next_carousel_group );

							$next_carousel_group.children().each(function(){
								$(this).css({'width': item_width, 'position':'absolute', 'left': ( item_width * ( $(this).data('next_position') - 1 ) ) });
							});

							$active_carousel_group.animate({
								left: '-100%'
							}, {
								duration: slide_duration,
								complete: function() {
									$portfolio_items.find('.delayed_container_append').each(function(){
										$(this).css({'width': item_width, 'position':'absolute', 'left': ( item_width * ( $(this).data('next_position') - 1 ) ) });
										$(this).appendTo( $next_carousel_group );
									});

									$active_carousel_group.removeClass('active');
									$active_carousel_group.children().each(function(){
										position = $(this).data('position');
										current_position = $(this).data('current_position');
										$(this).removeClass('position_' + position + ' ' + 'changing_position current_position current_position_' + current_position );
										$(this).data('position', '');
										$(this).data('current_position', '');
										$(this).hide();
										$(this).css({'position': '', 'width': '', 'left': ''});
										$(this).appendTo( $portfolio_items );
									});

									$active_carousel_group.remove();

									et_carousel_auto_rotate( $the_portfolio );

								}
							} );

							$next_carousel_group.addClass('active').css({'position':'absolute', 'top':0, left: '100%'});
							$next_carousel_group.animate({
								left: '0%'
							}, {
								duration: slide_duration,
								complete: function(){
									setTimeout(function(){
										$next_carousel_group.removeClass('next').addClass('active').css({'position':'', 'width':'', 'top':'', 'left': ''});

										$next_carousel_group.find('.delayed_container_append_dup').remove();

										$next_carousel_group.find('.changing_position').each(function( index ){
											position = $(this).data('position');
											current_position = $(this).data('current_position');
											next_position = $(this).data('next_position');
											$(this).removeClass('container_append delayed_container_append position_' + position + ' ' + 'changing_position current_position current_position_' + current_position + ' next_position next_position_' + next_position );
											$(this).data('current_position', '');
											$(this).data('next_position', '');
											$(this).data('position', ( index + 1 ) );
										});

										$next_carousel_group.children().css({'position': '', 'width': original_item_width, 'left': ''});

										$the_portfolio.data('carouseling', false);
									}, 100 );
								}
							} );

						} else {
							var $prev_carousel_group,
								current_position = columns,
								prev_position = columns,
								columns_span = columns - 1,
								active_items_start = items.indexOf( $active_carousel_group.children().last()[0] ),
								active_items_end = active_items_start - columns_span,
								prev_items_start = active_items_end - 1,
								prev_items_end = prev_items_start - columns_span;

							$prev_carousel_group = $('<div class="et_pb_carousel_group prev" style="display: none;left: 100%;position: absolute;top: 0;">').insertBefore( $active_carousel_group );
							$prev_carousel_group.css({ 'left': '-' + $active_carousel_group.innerWidth(), 'width': $active_carousel_group.innerWidth() }).show();

							// this is an endless loop, so it can decide internally when to break out, so that next_position
							// can get filled up, even to the extent of an element having both and current_ and next_ position
							for( x = ( items.length - 1 ), total = ( items.length - 1 ) ; ; x--, total-- ) {

								if ( total <= active_items_start && total >= active_items_end ) {
									$( items[x] ).addClass( 'changing_position current_position current_position_' + current_position );
									$( items[x] ).data('current_position', current_position );
									current_position--;
								}

								if ( total <= prev_items_start && total >= prev_items_end ) {
									$( items[x] ).data('prev_position', prev_position );
									$( items[x] ).addClass('changing_position prev_position prev_position_' + prev_position );

									if ( !$( items[x] ).hasClass( 'current_position' ) ) {
										$( items[x] ).addClass('container_append');
									} else {
										$( items[x] ).clone(true).appendTo( $active_carousel_group ).addClass('delayed_container_append_dup').attr('id', $( items[x] ).attr('id') + '-dup' );
										$( items[x] ).addClass('delayed_container_append');
									}

									prev_position--;
								}

								if ( prev_position <= 0 ) {
									break;
								}

								if ( x == 0 ) {
									x = items.length;
								}
							}

							sorted = $portfolio_items.find('.container_append, .delayed_container_append_dup').sort(function (a, b) {
								var el_a_position = parseInt( $(a).data('prev_position') );
								var el_b_position = parseInt( $(b).data('prev_position') );
								return ( el_a_position < el_b_position ) ? -1 : ( el_a_position > el_b_position ) ? 1 : 0;
							});

							$( sorted ).show().appendTo( $prev_carousel_group );

							$prev_carousel_group.children().each(function(){
								$(this).css({'width': item_width, 'position':'absolute', 'left': ( item_width * ( $(this).data('prev_position') - 1 ) ) });
							});

							$active_carousel_group.animate({
								left: '100%'
							}, {
								duration: slide_duration,
								complete: function() {
									$portfolio_items.find('.delayed_container_append').reverse().each(function(){
										$(this).css({'width': item_width, 'position':'absolute', 'left': ( item_width * ( $(this).data('prev_position') - 1 ) ) });
										$(this).prependTo( $prev_carousel_group );
									});

									$active_carousel_group.removeClass('active');
									$active_carousel_group.children().each(function(){
										position = $(this).data('position');
										current_position = $(this).data('current_position');
										$(this).removeClass('position_' + position + ' ' + 'changing_position current_position current_position_' + current_position );
										$(this).data('position', '');
										$(this).data('current_position', '');
										$(this).hide();
										$(this).css({'position': '', 'width': '', 'left': ''});
										$(this).appendTo( $portfolio_items );
									});

									$active_carousel_group.remove();
								}
							} );

							$prev_carousel_group.addClass('active').css({'position':'absolute', 'top':0, left: '-100%'});
							$prev_carousel_group.animate({
								left: '0%'
							}, {
								duration: slide_duration,
								complete: function(){
									setTimeout(function(){
										$prev_carousel_group.removeClass('prev').addClass('active').css({'position':'', 'width':'', 'top':'', 'left': ''});

										$prev_carousel_group.find('.delayed_container_append_dup').remove();

										$prev_carousel_group.find('.changing_position').each(function( index ){
											position = $(this).data('position');
											current_position = $(this).data('current_position');
											prev_position = $(this).data('prev_position');
											$(this).removeClass('container_append delayed_container_append position_' + position + ' ' + 'changing_position current_position current_position_' + current_position + ' prev_position prev_position_' + prev_position );
											$(this).data('current_position', '');
											$(this).data('prev_position', '');
											position = index + 1;
											$(this).data('position', position );
											$(this).addClass('position_' + position );
										});

										$prev_carousel_group.children().css({'position': '', 'width': original_item_width, 'left': ''});
										$the_portfolio.data('carouseling', false);
									}, 100 );
								}
							} );
						}
					});

				} else {
					// setup fullwidth portfolio grid
					set_fullwidth_portfolio_columns( $the_portfolio, false );
				}

			});
		}

		if ( $et_pb_filterable_portfolio.length ) {

			$(window).load(function(){

				$et_pb_filterable_portfolio.each(function(){
					var $the_portfolio = $(this),
					$the_portfolio_items = $the_portfolio.find('.et_pb_portfolio_items');

					$the_portfolio_items.imagesLoaded( function() {

						$the_portfolio.show(); //after all the content is loaded we can show the portfolio

						$the_portfolio_items.masonry({
							itemSelector : '.et_pb_portfolio_item',
							columnWidth : $the_portfolio.find('.column_width').innerWidth(),
							gutter : $the_portfolio.find('.gutter_width').innerWidth(),
							transitionDuration: 0
						});

						set_filterable_grid_items( $the_portfolio );

					});

					$the_portfolio.on('click', '.et_pb_portfolio_filter a', function(e){
						e.preventDefault();
						var category_slug = $(this).data('category-slug');
						$the_portfolio_items = $(this).parents('.et_pb_filterable_portfolio').find('.et_pb_portfolio_items');

						if ( 'all' == category_slug ) {
							$the_portfolio.find('.et_pb_portfolio_filter a').removeClass('active');
							$the_portfolio.find('.et_pb_portfolio_filter_all a').addClass('active');
							$the_portfolio.find('.et_pb_portfolio_item').removeClass('active');
							$the_portfolio.find('.et_pb_portfolio_item').show();
							$the_portfolio.find('.et_pb_portfolio_item').addClass('active');
						} else {
							$the_portfolio.find('.et_pb_portfolio_filter_all').removeClass('active');
							$the_portfolio.find('.et_pb_portfolio_filter a').removeClass('active');
							$the_portfolio.find('.et_pb_portfolio_filter_all a').removeClass('active');
							$(this).addClass('active');

							$the_portfolio_items.find('.et_pb_portfolio_item').hide();
							$the_portfolio_items.find('.et_pb_portfolio_item').removeClass('active');
							$the_portfolio_items.find('.et_pb_portfolio_item.project_category_' + $(this).data('category-slug') ).show();
							$the_portfolio_items.find('.et_pb_portfolio_item.project_category_' + $(this).data('category-slug') ).addClass('active');
						}

						set_filterable_grid_items( $the_portfolio );
						setTimeout(function(){
							set_filterable_portfolio_hash( $the_portfolio );
						}, 500 );
					});

					$(this).on('et_hashchange', function( event ){
						var params = event.params;
						$the_portfolio = $( '#' + event.target.id );

						if ( !$the_portfolio.find('.et_pb_portfolio_filter a[data-category-slug="' + params[0] + '"]').hasClass('active') ){
							$the_portfolio.find('.et_pb_portfolio_filter a[data-category-slug="' + params[0] + '"]').click();
						}

						if ( params[1] ) {
							setTimeout(function(){
								if ( !$the_portfolio.find('.et_pb_portofolio_pagination a.page-' + params[1]).hasClass('active') ) {
									$the_portfolio.find('.et_pb_portofolio_pagination a.page-' + params[1]).addClass('active').click();
								}
							}, 300 );
						}
					});
				});

			}); // End $(window).load()

			function set_filterable_grid_items( $the_portfolio ) {
				var min_height = 0,
					$the_portfolio_items = $the_portfolio.find('.et_pb_portfolio_items'),
					active_category = $the_portfolio.find('.et_pb_portfolio_filter > a.active').data('category-slug'),
					masonry_data = Masonry.data( $the_portfolio_items[0] );

				$the_portfolio_items.masonry('option', {
					'columnWidth': $the_portfolio.find('.column_width').innerWidth(),
					'gutter': $the_portfolio.find('.gutter_width').innerWidth()
				});

				if ( !$the_portfolio.hasClass('et_pb_filterable_portfolio_fullwidth') ) {
					$the_portfolio.find( '.et_pb_portfolio_item' ).css({ minHeight : '', height : '' });
					$the_portfolio_items.masonry();
					if ( masonry_data.cols > 1 ) {
						$the_portfolio.find( '.et_pb_portfolio_item' ).css({ minHeight : '', height : '' });
						$the_portfolio.find( '.et_pb_portfolio_item' ).each( function() {
							if ( $(this).outerHeight() > min_height )
								min_height = parseInt( $(this).outerHeight() ) + parseInt( $(this).css('marginBottom').slice(0, -2) ) + parseInt( $(this).css('marginTop').slice(0, -2) );
						} );
						$the_portfolio.find( '.et_pb_portfolio_item' ).css({ height : min_height, minHeight : min_height });
					}
				}

				if( 'all' === active_category ) {
					$the_portfolio_visible_items = $the_portfolio.find('.et_pb_portfolio_item');
				} else {
					$the_portfolio_visible_items = $the_portfolio.find('.et_pb_portfolio_item.project_category_' + active_category);
				}

				var visible_grid_items = $the_portfolio_visible_items.length,
					posts_number = $the_portfolio.data('posts-number'),
					pages = Math.ceil( visible_grid_items / posts_number );

				set_filterable_grid_pages( $the_portfolio, pages );

				var visible_grid_items = 0;
				var _page = 1;
				$the_portfolio.find('.et_pb_portfolio_item').data('page', '');
				$the_portfolio_visible_items.each(function(i){
					visible_grid_items++;
					if ( 0 === parseInt( visible_grid_items % posts_number ) ) {
						$(this).data('page', _page);
						_page++;
					} else {
						$(this).data('page', _page);
					}
				});

				$the_portfolio_visible_items.filter(function() {
					return $(this).data('page') == 1;
				}).show();

				$the_portfolio_visible_items.filter(function() {
					return $(this).data('page') != 1;
				}).hide();

				$the_portfolio_items.masonry();
			}

			function set_filterable_grid_pages( $the_portfolio, pages ) {
				$pagination = $the_portfolio.find('.et_pb_portofolio_pagination');

				if ( !$pagination.length ){
					return;
				}

				$pagination.html('<ul></ul>');
				if ( pages <= 1 ) {
					return;
				}

				$pagination_list = $pagination.children('ul');
				$pagination_list.append('<li class="prev" style="display:none;"><a href="#" data-page="prev" class="page-prev">' + et_custom.prev + '</a></li>');
				for( var page = 1; page <= pages; page++ ) {
					var first_page_class = page === 1 ? ' active' : '',
						last_page_class = page === pages ? ' last-page' : '',
						hidden_page_class = page >= 5 ? ' style="display:none;"' : '';
					$pagination_list.append('<li' + hidden_page_class + ' class="page page-' + page + '"><a href="#" data-page="' + page + '" class="page-' + page + first_page_class + last_page_class + '">' + page + '</a></li>');
				}
				$pagination_list.append('<li class="next"><a href="#" data-page="next" class="page-next">' + et_custom.next + '</a></li>');
			}

			$et_pb_filterable_portfolio.on('click', '.et_pb_portofolio_pagination a', function(e){
				e.preventDefault();

				var to_page = $(this).data('page'),
					$the_portfolio = $(this).parents('.et_pb_filterable_portfolio'),
					$the_portfolio_items = $the_portfolio.find('.et_pb_portfolio_items');

				if ( $(this).hasClass('page-prev') ) {
					to_page = parseInt( $(this).parents('ul').find('a.active').data('page') ) - 1;
				} else if( $(this).hasClass('page-next') ) {
					to_page = parseInt( $(this).parents('ul').find('a.active').data('page') ) + 1;
				}

				$(this).parents('ul').find('a').removeClass('active');
				$(this).parents('ul').find('a.page-' + to_page ).addClass('active');

				var current_index = $(this).parents('ul').find('a.page-' + to_page ).parent().index(),
					total_pages = $(this).parents('ul').find('li.page').length;

				$(this).parent().nextUntil('.page-' + ( current_index + 3 ) ).show();
				$(this).parent().prevUntil('.page-' + ( current_index - 3 ) ).show();

				$(this).parents('ul').find('li.page').each(function(i){
					if ( !$(this).hasClass('prev') && !$(this).hasClass('next') ) {
						if ( i < ( current_index - 3 ) ) {
							$(this).hide();
						} else if( i > ( current_index + 1 ) ) {
							$(this).hide();
						} else {
							$(this).show();
						}

						if ( total_pages - current_index <= 2 && total_pages - i <= 5 ) {
							$(this).show();
						} else if( current_index <= 3 && i <= 4 ) {
							$(this).show();
						}

					}
				});

				if ( to_page > 1 ) {
					$(this).parents('ul').find('li.prev').show();
				} else {
					$(this).parents('ul').find('li.prev').hide();
				}

				if ( $(this).parents('ul').find('a.active').hasClass('last-page') ) {
					$(this).parents('ul').find('li.next').hide();
				} else {
					$(this).parents('ul').find('li.next').show();
				}

				$the_portfolio.find('.et_pb_portfolio_item').hide();
				$the_portfolio.find('.et_pb_portfolio_item').filter(function( index ) {
					return $(this).data('page') === to_page;
				}).show();

				$the_portfolio_items.masonry();

				setTimeout(function(){
					set_filterable_portfolio_hash( $the_portfolio );
				}, 500 );
			});

			function set_filterable_portfolio_hash( $the_portfolio ) {

				if ( !$the_portfolio.attr('id') ) {
					return;
				}

				var this_portfolio_state = [];
				this_portfolio_state.push( $the_portfolio.attr('id') );
				this_portfolio_state.push( $the_portfolio.find('.et_pb_portfolio_filter > a.active').data('category-slug') );

				if( $the_portfolio.find('.et_pb_portofolio_pagination a.active').length ) {
					this_portfolio_state.push( $the_portfolio.find('.et_pb_portofolio_pagination a.active').data('page') );
				} else {
					this_portfolio_state.push( 1 );
				}

				this_portfolio_state = this_portfolio_state.join( et_hash_module_param_seperator );

				et_set_hash( this_portfolio_state );
			}
		} /*  end if ( $et_pb_filterable_portfolio.length ) */

		if ( $et_pb_gallery.length ) {

			function set_gallery_grid_items( $the_gallery ) {
				var $the_gallery_items_container = $the_gallery.find('.et_pb_gallery_items'),
					$the_gallery_items = $the_gallery_items_container.find('.et_pb_gallery_item');

				var total_grid_items = $the_gallery_items.length,
					posts_number = $the_gallery_items_container.data('per_page'), // TODO: make this depend on col size and how many fit across at a given screenwidth & col size
					pages = Math.ceil( total_grid_items / posts_number );

				$the_gallery_items_container.masonry('option', {
					'columnWidth': $the_gallery.find('.column_width').innerWidth(),
					'gutter': $the_gallery.find('.gutter_width').innerWidth()
				});

				set_gallery_grid_pages( $the_gallery, pages );

				var total_grid_items = 0;
				var _page = 1;
				$the_gallery_items.data('page', '');
				$the_gallery_items.each(function(i){
					total_grid_items++;
					if ( 0 === parseInt( total_grid_items % posts_number ) ) {
						$(this).data('page', _page);
						_page++;
					} else {
						$(this).data('page', _page);
					}

				});

				var visible_items = $the_gallery_items.filter(function() {
					return $(this).data('page') == 1;
				}).show();

				$the_gallery_items.filter(function() {
					return $(this).data('page') != 1;
				}).hide();

				$the_gallery_items_container.masonry();
			}

			function set_gallery_grid_pages( $the_gallery, pages ) {
				$pagination = $the_gallery.find('.et_pb_gallery_pagination');

				if ( !$pagination.length ){
					return;
				}

				$pagination.html('<ul></ul>');
				if ( pages <= 1 ) {
					$pagination.hide();
					return;
				}

				$pagination_list = $pagination.children('ul');
				$pagination_list.append('<li class="prev" style="display:none;"><a href="#" data-page="prev" class="page-prev">' + et_custom.prev + '</a></li>');
				for( var page = 1; page <= pages; page++ ) {
					var first_page_class = page === 1 ? ' active' : '',
						last_page_class = page === pages ? ' last-page' : '',
						hidden_page_class = page >= 5 ? ' style="display:none;"' : '';
					$pagination_list.append('<li' + hidden_page_class + ' class="page page-' + page + '"><a href="#" data-page="' + page + '" class="page-' + page + first_page_class + last_page_class + '">' + page + '</a></li>');
				}
				$pagination_list.append('<li class="next"><a href="#" data-page="next" class="page-next">' + et_custom.next + '</a></li>');
			}

			function set_gallery_hash( $the_gallery ) {

				if ( !$the_gallery.attr('id') ) {
					return;
				}

				var this_gallery_state = [];
				this_gallery_state.push( $the_gallery.attr('id') );

				if( $the_gallery.find('.et_pb_gallery_pagination a.active').length ) {
					this_gallery_state.push( $the_gallery.find('.et_pb_gallery_pagination a.active').data('page') );
				} else {
					this_gallery_state.push( 1 );
				}

				this_gallery_state = this_gallery_state.join( et_hash_module_param_seperator );

				et_set_hash( this_gallery_state );
			}

			$et_pb_gallery.each(function(){
				var $the_gallery = $(this);

				if ( $the_gallery.hasClass( 'et_pb_gallery_grid' ) ) {
					$the_gallery.imagesLoaded( function() {

						$the_gallery.show(); //after all the content is loaded we can show the gallery

						$the_gallery.find('.et_pb_gallery_items').masonry({
							itemSelector : '.et_pb_gallery_item',
							columnWidth : $the_gallery.find('.column_width').innerWidth(),
							gutter : $the_gallery.find('.gutter_width').innerWidth(),
							transitionDuration: 0
						});

						set_gallery_grid_items( $the_gallery );
					});

					$the_gallery.on('et_hashchange', function( event ){
						var params = event.params;
						$the_gallery = $( '#' + event.target.id );

						if ( page_to = params[0] ) {
							setTimeout(function(){
								if ( !$the_gallery.find('.et_pb_gallery_pagination a.page-' + page_to ).hasClass('active') ) {
									$the_gallery.find('.et_pb_gallery_pagination a.page-' + page_to ).addClass('active').click();
								}
							}, 300 );
						}
					});
				} else {
					$the_gallery.et_pb_simple_slider({
						fade_speed 		: 700,
						slide			: '.et_pb_gallery_item'
					});
				}

			});

			$et_pb_gallery.data('paginating', false );
			$et_pb_gallery.on('click', '.et_pb_gallery_pagination a', function(e){
				e.preventDefault();

				var to_page = $(this).data('page'),
					$the_gallery = $(this).parents('.et_pb_gallery'),
					$the_gallery_items_container = $the_gallery.find('.et_pb_gallery_items'),
					$the_gallery_items = $the_gallery_items_container.find('.et_pb_gallery_item');

				if ( $the_gallery.data('paginating') ) {
					return;
				}

				$the_gallery.data('paginating', true );

				if ( $(this).hasClass('page-prev') ) {
					to_page = parseInt( $(this).parents('ul').find('a.active').data('page') ) - 1;
				} else if( $(this).hasClass('page-next') ) {
					to_page = parseInt( $(this).parents('ul').find('a.active').data('page') ) + 1;
				}

				$(this).parents('ul').find('a').removeClass('active');
				$(this).parents('ul').find('a.page-' + to_page ).addClass('active');

				var current_index = $(this).parents('ul').find('a.page-' + to_page ).parent().index(),
					total_pages = $(this).parents('ul').find('li.page').length;

				$(this).parent().nextUntil('.page-' + ( current_index + 3 ) ).show();
				$(this).parent().prevUntil('.page-' + ( current_index - 3 ) ).show();

				$(this).parents('ul').find('li.page').each(function(i){
					if ( !$(this).hasClass('prev') && !$(this).hasClass('next') ) {
						if ( i < ( current_index - 3 ) ) {
							$(this).hide();
						} else if( i > ( current_index + 1 ) ) {
							$(this).hide();
						} else {
							$(this).show();
						}

						if ( total_pages - current_index <= 2 && total_pages - i <= 5 ) {
							$(this).show();
						} else if( current_index <= 3 && i <= 4 ) {
							$(this).show();
						}

					}
				});

				if ( to_page > 1 ) {
					$(this).parents('ul').find('li.prev').show();
				} else {
					$(this).parents('ul').find('li.prev').hide();
				}

				if ( $(this).parents('ul').find('a.active').hasClass('last-page') ) {
					$(this).parents('ul').find('li.next').hide();
				} else {
					$(this).parents('ul').find('li.next').show();
				}

				$the_gallery_items.hide();
				var visible_items = $the_gallery_items.filter(function( index ) {
					return $(this).data('page') === to_page;
				}).show();

				$the_gallery_items_container.masonry();
				$the_gallery.data('paginating', false );

				setTimeout(function(){
					set_gallery_hash( $the_gallery );
				}, 100 );

				$( 'html, body' ).animate( { scrollTop : $the_gallery.offset().top - 200 }, 200 );
			});

		} /*  end if ( $et_pb_gallery.length ) */

		function et_countdown_timer( timer ) {
			var gmt_offset = timer.data('gmt-offset') * 3600000;

			var end_date = new Date( timer.data('end-date') ).getTime();
			end_date = end_date + gmt_offset;

			var current_date = new Date(),
				month_names  = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
			current_date = ( month_names[current_date.getMonth()] ) + ' ' + current_date.getDate() + ' ' + current_date.getFullYear() + ' ' + current_date.getHours() + ':' + current_date.getMinutes() + ':' + current_date.getSeconds();
			current_date = new Date( current_date ).getTime() + gmt_offset;

			var seconds_left = ( end_date - current_date ) / 1000;

			days = parseInt(seconds_left / 86400);
			days = days > 0 ? days : 0;
			seconds_left = seconds_left % 86400;

			hours = parseInt(seconds_left / 3600);
			hours = hours > 0 ? hours : 0;

			seconds_left = seconds_left % 3600;

			minutes = parseInt(seconds_left / 60);
			minutes = minutes > 0 ? minutes : 0;

			seconds = parseInt(seconds_left % 60);
			seconds = seconds > 0 ? seconds : 0;

			if( days == 0 ) {
				if ( !timer.find('.days > .value').parent('.section').hasClass('zero') ) {
					timer.find('.days > .value').html( '000' ).parent('.section').addClass('zero').next().addClass('zero');
				}
			} else {
				days_slice = days.toString().length >= 3 ? days.toString().length : 3;
				timer.find('.days > .value').html( ('000' + days).slice(-days_slice) );
			}

			if( days == 0 && hours == 0 ) {
				if ( !timer.find('.hours > .value').parent('.section').hasClass('zero') ) {
					timer.find('.hours > .value').html('00').parent('.section').addClass('zero').next().addClass('zero');
				}
			} else {
				timer.find('.hours > .value').html( ( '0' + hours ).slice(-2) );
			}

			if( days == 0 && hours == 0 && minutes == 0 ) {
				if ( !timer.find('.minutes > .value').parent('.section').hasClass('zero') ) {
					timer.find('.minutes > .value').html('00').parent('.section').addClass('zero').next().addClass('zero');
				}
			} else {
				timer.find('.minutes > .value').html( ( '0' + minutes ).slice(-2) );
			}

			if ( days == 0 && hours == 0 && minutes == 0 && seconds == 0 ) {
				if ( !timer.find('.seconds > .value').parent('.section').hasClass('zero') ) {
					timer.find('.seconds > .value').html('00').parent('.section').addClass('zero');
				}
			} else {
				timer.find('.seconds > .value').html( ( '0' + seconds ).slice(-2) );
			}
		}

		function et_countdown_timer_labels( timer ) {
			if ( timer.closest( '.et_pb_column_3_8' ).length || timer.children('.et_pb_countdown_timer_container').width() <= 250 ) {
				timer.find('.hours .label').html( timer.find('.hours').data('short') );
				timer.find('.minutes .label').html( timer.find('.minutes').data('short') );
				timer.find('.seconds .label').html( timer.find('.seconds').data('short') );
			}
		}

		if ( $et_pb_countdown_timer.length ) {
			$et_pb_countdown_timer.each(function(){
				var timer = $(this);
				et_countdown_timer_labels( timer );
				et_countdown_timer( timer );
				setInterval(function(){
					et_countdown_timer( timer );
				}, 1000);
			});

		}

		if ( $et_pb_tabs.length ) {
			$et_pb_tabs.et_pb_simple_slider( {
				use_controls   : false,
				use_arrows     : false,
				slide          : '.et_pb_all_tabs > div',
				tabs_animation : true
			} ).on('et_hashchange', function( event ){
				var params = event.params;
				var $the_tabs = $( '#' + event.target.id );
				var active_tab = params[0];
				if ( !$the_tabs.find( '.et_pb_tabs_controls li' ).eq( active_tab ).hasClass('et_pb_tab_active') ) {
					$the_tabs.find( '.et_pb_tabs_controls li' ).eq( active_tab ).click();
				}
			});

			$et_pb_tabs_li.click( function() {
				var $this_el        = $(this),
					$tabs_container = $this_el.closest( '.et_pb_tabs' ).data('et_pb_simple_slider');

				if ( $tabs_container.et_animation_running ) return false;

				$this_el.addClass( 'et_pb_tab_active' ).siblings().removeClass( 'et_pb_tab_active' );

				$tabs_container.data('et_pb_simple_slider').et_slider_move_to( $this_el.index() );

				if ( $this_el.closest( '.et_pb_tabs' ).attr('id') ) {
					var tab_state = [];
					tab_state.push( $this_el.closest( '.et_pb_tabs' ).attr('id') );
					tab_state.push( $this_el.index() );
					tab_state = tab_state.join( et_hash_module_param_seperator );
					et_set_hash( tab_state );
				}

				return false;
			} );
		}

		if ( $et_pb_map.length ) {
			google.maps.event.addDomListener(window, 'load', function() {
				$et_pb_map.each(function(){
					var $this_map_container = $(this);
					var $this_map = $this_map_container.children('.et_pb_map');

						$this_map_container.data('map', new google.maps.Map( $this_map[0], {
							zoom: parseInt( $this_map.data('zoom') ),
							center: new google.maps.LatLng( parseFloat( $this_map.data('center-lat') ) , parseFloat( $this_map.data('center-lng') )),
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							scrollwheel: $this_map.data('mouse-wheel') == 'on' ? true : false
						}));

						$this_map_container.data('bounds', new google.maps.LatLngBounds() );
						$this_map_container.find('.et_pb_map_pin').each(function(){
							var $this_marker = $(this),
								position = new google.maps.LatLng( parseFloat( $this_marker.data('lat') ) , parseFloat( $this_marker.data('lng') ) );

							$this_map_container.data('bounds').extend( position );

							var marker = new google.maps.Marker({
								position: position,
								map: $this_map_container.data('map'),
								title: $this_marker.data('title'),
								icon: { url: et_custom.images_uri + '/marker.png', size: new google.maps.Size( 46, 43 ), anchor: new google.maps.Point( 16, 43 ) },
								shape: { coord: [1, 1, 46, 43], type: 'rect' },
								anchorPoint: new google.maps.Point(0, -45)
							});

							if ( $this_marker.find('.infowindow').length ) {
								var infowindow = new google.maps.InfoWindow({
									content: $this_marker.html()
								});

								google.maps.event.addListener(marker, 'click', function() {
									infowindow.open( $this_map_container.data('map'), marker );
								});
							}
						});

						setTimeout(function(){
							if ( !$this_map_container.data('map').getBounds().contains( $this_map_container.data('bounds').getNorthEast() ) || !$this_map_container.data('map').getBounds().contains( $this_map_container.data('bounds').getSouthWest() ) ) {
								$this_map_container.data('map').fitBounds( $this_map_container.data('bounds') );
							}
						}, 200 );
				});
			} );
		}

		if ( $et_pb_circle_counter.length ){

			function et_pb_circle_counter_init($the_counter, animate) {
				$the_counter.easyPieChart({
					easing: 'easeInOutCirc',
					animate: {
						duration: 1800,
						enabled: true
					},
					size: $the_counter.width(),
					barColor: $the_counter.data('bar-bg-color'),
					trackColor: '#000000',
					trackAlpha: 0.1,
					scaleColor: false,
					lineWidth: 5,
					onStart: function() {
						$(this.el).find('.percent p').css({ 'visibility' : 'visible' });
					},
					onStep: function(from, to, percent) {
						$(this.el).find('.percent-value').text( Math.round( percent ) );
					},
					onStop: function(from, to) {
						$(this.el).find('.percent-value').text( $(this.el).data('number-value') );
					}
				});
			}

			$et_pb_circle_counter.each(function(){
				var $the_counter = $(this);
				et_pb_circle_counter_init($the_counter, false);

				$the_counter.on('containerWidthChanged', function( event ){
					$the_counter = $( event.target );
					$the_counter.find('canvas').remove();
					$the_counter.removeData('easyPieChart' );
					et_pb_circle_counter_init($the_counter, true);
				});

			});
		}

		if ( $et_pb_number_counter.length ){
			$et_pb_number_counter.each(function(){
				var $this_counter = $(this);
				$this_counter.easyPieChart({
					easing: 'easeInOutCirc',
					animate: {
						duration: 1800,
						enabled: true
					},
					size: 0,
					trackColor: false,
					scaleColor: false,
					lineWidth: 0,
					onStart: function() {
						$(this.el).find('.percent p').css({ 'visibility' : 'visible' });
					},
					onStep: function(from, to, percent) {
						if ( percent != to )
							$(this.el).find('.percent-value').text( Math.round( percent ) );
					},
					onStop: function(from, to) {
						$(this.el).find('.percent-value').text( $(this.el).data('number-value') );
					}
				});
			});
		}

		function et_apply_parallax() {
			var $this = $(this),
				element_top = $this.offset().top,
				window_top = $et_window.scrollTop(),
				y_pos = ( ( ( window_top + $et_window.height() ) - element_top ) * 0.3 ),
				main_position;

			main_position = 'translate3d(0, ' + y_pos + 'px, 0px)';

			$this.find('.et_parallax_bg').css( {
				'-webkit-transform' : main_position,
				'-moz-transform'    : main_position,
				'-ms-transform'     : main_position,
				'transform'         : main_position
			} );
		}

		function et_parallax_set_height() {
			var $this = $(this),
				bg_height;

			bg_height = ( $et_window.height() * 0.3 + $this.innerHeight() );

			$this.find('.et_parallax_bg').css( { 'height' : bg_height } );
		}

		$('.et_pb_toggle_title').click( function(){
			var $this_heading = $(this),
				$module = $this_heading.closest('.et_pb_toggle'),
				$content = $module.find('.et_pb_toggle_content'),
				is_accordion = $module.closest( '.et_pb_accordion' ).length,
				$accordion_active_toggle;

			if ( is_accordion ) {
				if ( $module.hasClass('et_pb_toggle_open') ) {
					return false;
				}

				$accordion_active_toggle = $module.siblings('.et_pb_toggle_open');
			}

			if ( $content.is( ':animated' ) ) {
					return;
				}

			$content.slideToggle( 700, function() {
				if ( $module.hasClass('et_pb_toggle_close') )
					$module.removeClass('et_pb_toggle_close').addClass('et_pb_toggle_open');
				else
					$module.removeClass('et_pb_toggle_open').addClass('et_pb_toggle_close');
			} );

			if ( is_accordion ) {
				$accordion_active_toggle.find('.et_pb_toggle_content').slideToggle( 700, function() {
					$accordion_active_toggle.removeClass( 'et_pb_toggle_open' ).addClass('et_pb_toggle_close');
				} );
			}
		} );

		var $et_contact_container = $('.et_pb_contact_form_container');

		if ( $et_contact_container.length ) {
			var $et_contact_form = $et_contact_container.find( 'form' ),
				$et_contact_submit = $et_contact_container.find( 'input.et_pb_contact_submit' ),
				$et_inputs = $et_contact_form.find('input[type=text],textarea'),
				et_email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
				et_contact_error = false,
				$et_contact_message = $et_contact_container.find('.et-pb-contact-message'),
				et_message = '';

			$et_inputs.live('focus', function(){
				if ( $(this).val() === $(this).siblings('label').text() ) $(this).val("");
			}).live('blur', function(){
				if ($(this).val() === "") $(this).val( $(this).siblings('label').text() );
			});

			$et_contact_form.on('submit', function(event) {
				et_contact_error = false;
				et_message = '<ul>';

				$et_inputs.removeClass('et_contact_error');

				$et_inputs.each(function(index, domEle){
					if ( $(domEle).val() === '' || $(domEle).val() === $(this).siblings('label').text() ) {
						$(domEle).addClass('et_contact_error');
						et_contact_error = true;

						var default_value = $(this).siblings('label').text();
						if ( default_value == '' ) default_value = et_custom.captcha;

						et_message += '<li>' + et_custom.fill + ' ' + default_value + ' ' + et_custom.field + '</li>';
					}
					if ( ($(domEle).attr('id') == 'et_contact_email') && !et_email_reg.test($(domEle).val()) ) {
						$(domEle).removeClass('et_contact_error').addClass('et_contact_error');
						et_contact_error = true;

						if ( !et_email_reg.test($(domEle).val()) ) et_message += '<li>' + et_custom.invalid + '</li>';
					}
				});

				if ( !et_contact_error ) {
					$href = $(this).attr('action');

					$et_contact_container.fadeTo('fast',0.2).load($href + ' #' + $et_contact_form.closest('.et_pb_contact_form_container').attr('id'), $(this).serializeArray(), function() {
						$et_contact_container.fadeTo('fast',1);
					});
				}

				et_message += '</ul>';

				if ( et_message != '<ul></ul>' )
					$et_contact_message.html(et_message);

				event.preventDefault();
			});
		}

		if ( $.fn.fitVids ) {
			$( '.et_pb_slide_video' ).fitVids();

			$( '#main-content' ).fitVids( { customSelector: "iframe[src^='http://www.hulu.com'], iframe[src^='http://www.dailymotion.com'], iframe[src^='http://www.funnyordie.com'], iframe[src^='https://embed-ssl.ted.com'], iframe[src^='http://embed.revision3.com'], iframe[src^='https://flickr.com'], iframe[src^='http://blip.tv'], iframe[src^='http://www.collegehumor.com']"} );
		}

		$( '.et_pb_video .et_pb_video_overlay, .et_pb_video_wrap .et_pb_video_overlay' ).click( function() {
			var $this        = $(this),
				$video_image = $this.closest( '.et_pb_video_overlay' );

			$video_image.fadeTo( 500, 0, function() {
				var $image = $(this);

				$image.css( 'display', 'none' );
			} );

			return false;
		} );

		et_fix_video_wmode('.fluid-width-video-wrapper');

		function et_fix_video_wmode( video_wrapper ) {
				$( video_wrapper ).each( function() {
					if ( $(this).find( 'iframe' ).length ) {
						var $this_el = $(this).find( 'iframe' ),
							src_attr = $this_el.attr('src'),
							wmode_character = src_attr.indexOf( '?' ) == -1 ? '?' : '&amp;',
							this_src = src_attr + wmode_character + 'wmode=opaque';

						$this_el.attr('src', this_src);
					}
				} );
		}

		function et_pb_resize_section_video_bg( $video ) {
			$element = typeof $video !== 'undefined' ? $video.closest( '.et_pb_section_video_bg' ) : $( '.et_pb_section_video_bg' );

			$element.each( function() {
				var $this_el = $(this),
					ratio = ( typeof $this_el.attr( 'data-ratio' ) !== 'undefined' )
						? $this_el.attr( 'data-ratio' )
						: $this_el.find('video').attr( 'width' ) / $this_el.find('video').attr( 'height' ),
					$video_elements = $this_el.find( '.mejs-video, video, object' ).css( 'margin', 0 ),
					$container = $this_el.closest( '.et_pb_section' ).length
						? $this_el.closest( '.et_pb_section' )
						: $this_el.closest( '.et_pb_slides' ),
					body_width = $container.width(),
					container_height = $container.innerHeight(),
					width, height;

				if ( typeof $this_el.attr( 'data-ratio' ) == 'undefined' )
					$this_el.attr( 'data-ratio', ratio );

				if ( body_width / container_height < ratio ) {
					width = container_height * ratio;
					height = container_height;
				} else {
					width = body_width;
					height = body_width / ratio;
				}

				$video_elements.width( width ).height( height );
			} );
		}

		function et_pb_center_video( $video ) {
			$element = typeof $video !== 'undefined' ? $video : $( '.et_pb_section_video_bg .mejs-video' );

			$element.each( function() {
				var $video_width = $(this).width() / 2;
				var $video_width_negative = 0 - $video_width;
				$(this).css("margin-left",$video_width_negative );

				if ( typeof $video !== 'undefined' ) {
					if ( $video.closest( '.et_pb_slider' ).length && ! $video.closest( '.et_pb_first_video' ).length )
						return false;

					setTimeout( function() {
						$( this ).closest( '.et_pb_preload' ).removeClass( 'et_pb_preload' );
					}, 500 );
				}
			} );
		}

		function et_calculate_header_values() {
			var $top_header = $( '#top-header' ),
				secondary_nav_height = $top_header.length && $top_header.is( ':visible' ) ? $top_header.innerHeight() : 0,
				admin_bar_height     = $( '#wpadminbar' ).length ? $( '#wpadminbar' ).innerHeight() : 0;

			et_header_height      = $( '#main-header' ).innerHeight() + secondary_nav_height - 1,
			et_header_modifier    = et_header_height <= 90 ? et_header_height - 29 : et_header_height - 56,
			et_header_offset      = et_header_modifier + admin_bar_height;

			et_primary_header_top = secondary_nav_height + admin_bar_height;
		}

		function et_fix_slider_height() {
			if ( ! $et_pb_slider.length ) return;

			$et_pb_slider.each( function() {
				var $slide = $(this).find( '.et_pb_slide' ),
					$slide_container = $slide.find( '.et_pb_container' ),
					max_height = 0;

				$slide_container.css( 'min-height', 0 );

				$slide.each( function() {
					var $this_el = $(this),
						height = $this_el.innerHeight();

					if ( max_height < height )
						max_height = height;
				} );

				$slide_container.css( 'min-height', max_height );
			} );
		}
		et_fix_slider_height();

		var $comment_form = $('#commentform');

		et_pb_form_placeholders_init( $comment_form );
		et_pb_form_placeholders_init( $( '.et_pb_newsletter_form' ) );

		$comment_form.submit(function(){
			et_pb_remove_placeholder_text( $comment_form );
		});

		function et_pb_form_placeholders_init( $form ) {
			$form.find('input:text, textarea').each(function(index,domEle){
				var $et_current_input = jQuery(domEle),
					$et_comment_label = $et_current_input.siblings('label'),
					et_comment_label_value = $et_current_input.siblings('label').text();
				if ( $et_comment_label.length ) {
					$et_comment_label.hide();
					if ( $et_current_input.siblings('span.required') ) {
						et_comment_label_value += $et_current_input.siblings('span.required').text();
						$et_current_input.siblings('span.required').hide();
					}
					$et_current_input.val(et_comment_label_value);
				}
			}).bind('focus',function(){
				var et_label_text = jQuery(this).siblings('label').text();
				if ( jQuery(this).siblings('span.required').length ) et_label_text += jQuery(this).siblings('span.required').text();
				if (jQuery(this).val() === et_label_text) jQuery(this).val("");
			}).bind('blur',function(){
				var et_label_text = jQuery(this).siblings('label').text();
				if ( jQuery(this).siblings('span.required').length ) et_label_text += jQuery(this).siblings('span.required').text();
				if (jQuery(this).val() === "") jQuery(this).val( et_label_text );
			});
		}

		// remove placeholder text before form submission
		function et_pb_remove_placeholder_text( $form ) {
			$form.find('input:text, textarea').each(function(index,domEle){
				var $et_current_input = jQuery(domEle),
					$et_label = $et_current_input.siblings('label'),
					et_label_value = $et_current_input.siblings('label').text();

				if ( $et_label.length && $et_label.is(':hidden') ) {
					if ( $et_label.text() == $et_current_input.val() )
						$et_current_input.val( '' );
				}
			});
		}

		et_duplicate_menu( $('#et-top-navigation ul.nav'), $('#et-top-navigation .mobile_nav'), 'mobile_menu', 'et_mobile_menu' );

		et_duplicate_menu( $('.et_pb_fullwidth_menu ul.nav'), $('.et_pb_fullwidth_menu .mobile_nav'), 'mobile_menu', 'et_mobile_menu' );

		function et_duplicate_menu( menu, append_to, menu_id, menu_class ){
			var $cloned_nav;

			menu.clone().attr('id',menu_id).removeClass().attr('class',menu_class).appendTo( append_to );
			$cloned_nav = append_to.find('> ul');
			$cloned_nav.find('.menu_slide').remove();
			$cloned_nav.find('li:first').addClass('et_first_mobile_item');

			append_to.on( 'click', function(){
				if ( $(this).hasClass('closed') ){
					$(this).removeClass( 'closed' ).addClass( 'opened' );
					$cloned_nav.slideDown( 500 );
				} else {
					$(this).removeClass( 'opened' ).addClass( 'closed' );
					$cloned_nav.slideUp( 500 );
				}
				return false;
			} );

			append_to.on( 'click', 'a', function(event){
				event.stopPropagation();
			} );
		}

		if ( $( '#et-secondary-nav' ).length ) {
			$('#et-top-navigation #mobile_menu').append( $( '#et-secondary-nav' ).clone().html() );
		}

		$et_pb_newsletter_button.click( function( event ) {
			if ( $(this).closest( '.et_pb_login_form' ).length || $(this).closest( '.et_pb_feedburner_form' ).length ) {
				return;
			}

			event.preventDefault();

			var $newsletter_container = $(this).closest( '.et_pb_newsletter' ),
				$firstname = $newsletter_container.find( 'input[name="et_pb_signup_firstname"]' ),
				$lastname = $newsletter_container.find( 'input[name="et_pb_signup_lastname"]' ),
				$email = $newsletter_container.find( 'input[name="et_pb_signup_email"]' ),
				list_id = $newsletter_container.find( 'input[name="et_pb_signup_list_id"]' ).val(),
				$result = $newsletter_container.find( '.et_pb_newsletter_result' ).hide(),
				service = $(this).closest( '.et_pb_newsletter_form' ).data( 'service' ) || 'mailchimp';

			$firstname.removeClass( 'et_pb_signup_error' );
			$lastname.removeClass( 'et_pb_signup_error' );
			$email.removeClass( 'et_pb_signup_error' );

			et_pb_remove_placeholder_text( $(this).closest( '.et_pb_newsletter_form' ) );

			if ( $firstname.val() == '' || $email.val() == '' || list_id === '' ) {
				if ( $firstname.val() == '' ) $firstname.addClass( 'et_pb_signup_error' );

				if ( $email.val() == '' ) $email.addClass( 'et_pb_signup_error' );

				if ( $firstname.val() == '' )
					$firstname.val( $firstname.siblings( '.et_pb_contact_form_label' ).text() );

				if ( $lastname.val() == '' )
					$lastname.val( $lastname.siblings( '.et_pb_contact_form_label' ).text() );

				if ( $email.val() == '' )
					$email.val( $email.siblings( '.et_pb_contact_form_label' ).text() );

				return;
			}

			$.ajax( {
				type: "POST",
				url: et_custom.ajaxurl,
				dataType: "json",
				data:
				{
					action : 'et_pb_submit_subscribe_form',
					et_load_nonce : et_custom.et_load_nonce,
					et_list_id : list_id,
					et_firstname : $firstname.val(),
					et_lastname : $lastname.val(),
					et_email : $email.val(),
					et_service : service
				},
				beforeSend: function() {
					$newsletter_container
						.find( '.et_pb_newsletter_button' )
						.addClass( 'et_pb_button_text_loading' )
						.find('.et_subscribe_loader')
						.show();
				},
				complete: function(){
					$newsletter_container
						.find( '.et_pb_newsletter_button' )
						.removeClass( 'et_pb_button_text_loading' )
						.find('.et_subscribe_loader')
						.hide();
				},
				success: function( data ){
					if ( data ) {
						if ( data.error ) {
							$result.html( data.error ).show();
						}
						if ( data.success ) {
							$newsletter_container.find( '.et_pb_newsletter_form > p' ).hide();
							$result.html( data.success ).show();
						}
					} else {
						$result.html( et_custom.subscription_failed ).show();
					}
				}
			} );
		} );

		function et_change_primary_nav_position() {
			var $body = $('body');

			if ( ! $body.hasClass( 'et_vertical_nav' ) && ( $body.hasClass( 'et_fixed_nav' ) ) ) {
				$('#main-header').css( 'top', et_primary_header_top );
			}
		}

		$( window ).resize( function(){
			var containerWidthChanged = et_container_width !== $et_container.width(),
				window_width = $et_window.width();

			et_pb_resize_section_video_bg();
			et_pb_center_video();

			et_fix_slider_height();

			if ( $( '.et_pb_blog_grid' ).length )
				$( '.et_pb_blog_grid' ).masonry();

			if ( et_is_fixed_nav && containerWidthChanged ) {
				setTimeout( function() {
					var $top_header = $( '#top-header' ),
						secondary_nav_height = $top_header.length && $top_header.is( ':visible' ) ? $top_header.innerHeight() : 0;

					$main_container_wrapper.css( 'paddingTop', $( '#main-header' ).innerHeight() + secondary_nav_height - 1 );

					et_change_primary_nav_position();
				}, 200 );
			}

			if ( $( '#wpadminbar' ).length && et_is_fixed_nav && window_width >= 740 && window_width <= 782 ) {
				et_calculate_header_values();

				et_change_primary_nav_position();
			}

			$et_pb_fullwidth_portfolio.each(function(){
				set_container_height = $(this).hasClass('et_pb_fullwidth_portfolio_carousel') ? true : false;
				set_fullwidth_portfolio_columns( $(this), set_container_height );
			});

			if ( containerWidthChanged ) {
				$('.container-width-change-notify').trigger('containerWidthChanged');

				setTimeout( function() {
					$et_pb_filterable_portfolio.each(function(){
						set_filterable_grid_items( $(this) );
					});
					$et_pb_gallery.each(function(){
						if ( $(this).hasClass( 'et_pb_gallery_grid' ) ) {
							set_gallery_grid_items( $(this) );
						}
					});
				}, 100 );

				et_container_width = $et_container.width();

				etRecalculateOffset = true;

				if ( $et_pb_circle_counter.length ){
					$et_pb_circle_counter.each(function(){
						var $this_counter = $(this);
							$this_counter.data('easyPieChart').update( $this_counter.data('number-value') );
					});
				}
			}
		} );

		$( window ).load( function(){
			if ( et_is_fixed_nav ) {
				et_calculate_header_values();

				$main_container_wrapper.css( 'paddingTop', et_header_height - 1 );

				et_change_primary_nav_position();
			}

			if ( $( '.et_pb_blog_grid' ).length ) {
				$( '.et_pb_blog_grid' ).masonry( {
					itemSelector : '.et_pb_post'
				} );
			}

			setTimeout( function() {
				$( '.et_pb_preload' ).removeClass( 'et_pb_preload' );
			}, 500 );

			if ( $.fn.hashchange ) {
				$(window).hashchange( function(){
					var hash = window.location.hash.substring(1);
					process_et_hashchange( hash );
				});
				$(window).hashchange();
			}

			if ( $('p.demo_store').length ) {
				$('#footer-bottom').css('margin-bottom' , $('p.demo_store').innerHeight());
			}

			if ( $.fn.waypoint ) {
				$( '.et_pb_counter_container, .et-waypoint' ).waypoint( {
					offset: '75%',
					handler: function() {
						$(this).addClass( 'et-animated' );
					}
				} );

				if ( $et_pb_circle_counter.length ){
					$et_pb_circle_counter.each(function(){
						var $this_counter = $(this);
						$this_counter.waypoint({
							offset: '65%',
							handler: function() {
								$this_counter.data('easyPieChart').update( $this_counter.data('number-value') );
							}
						});
					});
				}

				if ( $et_pb_number_counter.length ){
					$et_pb_number_counter.each(function(){
						var $this_counter = $(this);
						$this_counter.waypoint({
							offset: '75%',
							handler: function() {
								$this_counter.data('easyPieChart').update( $this_counter.data('number-value') );
							}
						});
					});
				}

				if ( et_is_fixed_nav ) {
					$('#main-content').waypoint( {
						offset: function() {
							if ( etRecalculateOffset ) {
								et_calculate_header_values();

								etRecalculateOffset = false;
							}

							return et_header_offset;
						},
						handler : function( direction ) {
							if ( direction === 'down' ) {
								$('#main-header').addClass( 'et-fixed-header' );
							} else {
								$('#main-header').removeClass( 'et-fixed-header' );
							}
						}
					} );
				}
			}

			if ( $et_pb_parallax.length && !et_is_mobile_device ) {
				$et_pb_parallax.each(function(){
					if ( $(this).hasClass('et_pb_parallax_css') ) {
						return;
					}

					var $this_parent = $(this).parent();

					$.proxy( et_parallax_set_height, $this_parent )();

					$.proxy( et_apply_parallax, $this_parent )();

					$et_window.on( 'scroll', $.proxy( et_apply_parallax, $this_parent ) );

					$et_window.on( 'resize', $.proxy( et_parallax_set_height, $this_parent ) );
					$et_window.on( 'resize', $.proxy( et_apply_parallax, $this_parent ) );
				});
			}


			if ( $('.et_pb_audio_module .mejs-audio').length || $( '.et_audio_content .mejs-audio' ).length ){
				$('.et_pb_audio_module .mejs-audio, .et_audio_content .mejs-audio').each(function(){
					$count_timer = $(this).find('div.mejs-currenttime-container').addClass('custom');
					$(this).find('.mejs-controls div.mejs-duration-container').replaceWith($count_timer);
				});
			}

		} );

		function et_pb_smooth_scroll( $target, $top_section, $speed ) {
			var $window_width = $( window ).width();

			if ( $( 'body' ).hasClass( 'et_fixed_nav' ) && $window_width > 980 ) {
				$menu_offset = $( '#top-header' ).outerHeight() + $( '#main-header' ).outerHeight() - 1;
			} else {
				$menu_offset = -1;
			}

			if ( $ ('#wpadminbar').length && $window_width > 600 ) {
				$menu_offset += $( '#wpadminbar' ).outerHeight();
			}

			//fix sidenav scroll to top
			if ( $top_section ) {
				$scroll_position = 0;
			} else {
				$scroll_position = $target.offset().top - $menu_offset;
			}

			$( 'html, body' ).animate( { scrollTop :  $scroll_position }, $speed );
		}

		$( 'a[href*="#"]:not([href="#"])' ).click( function() {
		if ( $(this).closest( '.woocommerce-tabs' ).length && $(this).closest( '.tabs' ).length ) {
				return false;
			}

			if ( location.pathname.replace( /^\//,'' ) == this.pathname.replace( /^\//,'' ) && location.hostname == this.hostname ) {
				var target = $( this.hash );
				target = target.length ? target : $( '[name=' + this.hash.slice(1) +']' );
				if ( target.length ) {
		//			et_pb_smooth_scroll( target, false, 800 );

					if ( ! $( '#main-header' ).hasClass( 'et-fixed-header' ) && $( 'body' ).hasClass( 'et_fixed_nav' ) && $( window ).width() > 980 ) {
		//					setTimeout(function(){
		//					et_pb_smooth_scroll( target, false, 200);
		//				}, 500 );
					}

		//			return false;
				}
			}
		});

		if ( $( '.et_pb_section' ).length > 1 && $( '.et_pb_side_nav_page' ).length ) {
			var $i=0;

			$( '#main-content' ).append( '<ul class="et_pb_side_nav"></ul>' );

			$( '.et_pb_section' ).each( function(){
				if ( $( this ).height() > 0 ) {
					$active_class = $i == 0 ? 'active' : '';
					$( '.et_pb_side_nav' ).append( '<li class="side_nav_item"><a href="#" id="side_nav_item_id_' + $i + '" class= "' + $active_class + '">' + $i + '</a></li>' );
					$( this ).addClass( 'et_pb_scroll_' + $i );
					$i++;
				}
			});

			$side_nav_offset = ( $i * 20 + 40 ) / 2;
			$( 'ul.et_pb_side_nav' ).css( 'marginTop', '-' + parseInt( $side_nav_offset) + 'px' );
			$( '.et_pb_side_nav' ).addClass( 'et-visible' );


			$( '.et_pb_side_nav a' ).click( function(){
				$top_section =  ( $( this ).text() == "0" ) ? true : false;
				$target = $( '.et_pb_scroll_' + $( this ).text() );

				et_pb_smooth_scroll( $target, $top_section, 800);

				if ( ! $( '#main-header' ).hasClass( 'et-fixed-header' ) && $( 'body' ).hasClass( 'et_fixed_nav' ) && $( window ).width() > 980 ) {
					setTimeout(function(){
						 et_pb_smooth_scroll( $target, $top_section, 200);
					},500);
				}

				return false;
			});

			$( window ).scroll( function(){

				$add_offset = ( $( 'body' ).hasClass( 'et_fixed_nav' ) ) ? 20 : -90;

				if ( $ ( '#wpadminbar' ).length && $( window ).width() > 600 ) {
					$add_offset += $( '#wpadminbar' ).outerHeight();
				}

				$side_offset = ( $( 'body' ).hasClass( 'et_vertical_nav' ) ) ? $( '#top-header' ).height() + $add_offset + 60 : $( '#top-header' ).height() + $( '#main-header' ).height() + $add_offset;

				for ( var $i = 0; $i <= $( '.side_nav_item a' ).length - 1; $i++ ) {
					 if( $( window ).scrollTop() + $( window ).height() == $( document ).height() ) {
						$last = $( '.side_nav_item a' ).length - 1;
						$( '.side_nav_item a' ).removeClass( 'active' );
						$( 'a#side_nav_item_id_' + $last ).addClass( 'active' );
					 } else {
						if ( $( this ).scrollTop() >= $( '.et_pb_scroll_' + $i ).offset().top - $side_offset ) {
							$( '.side_nav_item a' ).removeClass( 'active' );
							$( 'a#side_nav_item_id_' + $i ).addClass( 'active' );
						}
					}
				}
			});
		}

		if ( $('.et_pb_scroll_top').length ) {
			$(window).scroll(function(){
				if ($(this).scrollTop() > 800) {
					$('.et_pb_scroll_top').show().removeClass( 'et-hidden' ).addClass( 'et-visible' );
				} else {
					$('.et_pb_scroll_top').removeClass( 'et-visible' ).addClass( 'et-hidden' );
				}
			});

			//Click event to scroll to top
			$('.et_pb_scroll_top').click(function(){
				$('html, body').animate({scrollTop : 0},800);
			});
		}

	} );
})(jQuery)
