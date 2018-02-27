(function(window, document, $, undefined){

	var	app = {
		// Инициализация
		init: function() {
			// Owl Carousel
			$('.owl-carousel').owlCarousel({
				loop: true,
				nav: true,
				dots: false,
				items: 1,
				center: true,
				navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
				// autoplay: true,
			});

			// Flatpickr calendar
			this.calendar_cfg = {
				"static": true,
				"locale": "ru",
				dateFormat: "d.m.Y H:i",
				minDate: "today",
				defaultDate: new Date(),
				enableTime: true,
				time_24hr: true
			},
			this.checkInCalendar = flatpickr("#checkInDate", Object.assign(this.calendar_cfg, {
				
			})),
			this.checkOutCalendar = flatpickr("#checkOutDate", Object.assign(this.calendar_cfg, {

			})),

			self.setUpListeners();
			self.changePlaceholderTxt();
		},

		setUpListeners: function(){
			$('.bars').on('click', self.toggleMenu);
			$('.tab a').on('click', self.selectLocation);
			$('.placeholder').on('click', self.toggleLocationBox);
			// Show/Hide tooltip
			$('.q')
				.on('mouseenter touchstart', function(e){
					var el = $(this);
					this.iid = setTimeout(function(){
						el.parent().find('.tooltip').css({'visibility':'visible'});
						e.stopPropagation();
						clearTimeout(this.iid);	
					}, 300);		
				}).on('mouseleave touchend', function(e){
					clearTimeout(this.iid);
					$(this).parent().find('.tooltip').css({'visibility':'hidden'});
					e.stopPropagation();
			});
		},

		// Open/Close menu
		toggleMenu: function(e){
			e.preventDefault();
			$('#menu').toggleClass('mobile');
			return true;
		},

		selectLocation: function(e){
			e.preventDefault();
			// console.log('click');
			$('.tab').removeClass('active');
			$(this).parent().addClass('active');
			self.changePlaceholderTxt();
			self.toggleLocationBox();

			return true;
		},

		changePlaceholderTxt: function(txt) {
			var location = $('.tab.active a').text();

			txt = (typeof txt !== 'undefined') ? txt : location;
			$('.placeholder').text(txt);

			return true;
		},

		toggleLocationBox: function(){
			// e.preventDefault();
			
			var el = $('.locations-list'),
					placeholder = $('.placeholder');

			if(el.css('display') == 'block'){
				el.removeClass('show');
				placeholder.removeClass('up').addClass('down');
			}
			else{
				el.addClass('show');
				placeholder.removeClass('down').addClass('up');
			}

			return true;
		},

	}

	var self = app;
	app.init();

})(window, window.document, window.jQuery);