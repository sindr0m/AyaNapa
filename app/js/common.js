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
			});

			// Flatpickr calendar
			this.calendar_cfg = {
				"static": true,
				"locale": "ru",
				dateFormat: "d.m.Y H:i",
				minDate: "today",
				defaultDate: new Date(),
				enableTime: true,
				time_24hr: true,
				onReady: function(rawdate, altdate, instance) {
					$('<div class="confirmBtn"><i></i><i></i></div>').appendTo('.flatpickr-time').click(function() {
						instance.close();
						// test.getDataForm();
					});
					$('.flatpickr-time .confirmBtn:eq(1)').remove();
				}
			},
			this.checkInCalendar = flatpickr("#checkInDate", Object.assign(this.calendar_cfg, {

			})),
			this.checkOutCalendar = flatpickr("#checkOutDate", Object.assign(this.calendar_cfg, {

			})),

			self.setUpListeners();
			self.changePlaceholderTxt();
			// Cute reviews
			this.reviews = document.querySelectorAll(".item p:nth-child(2)");
			Array.prototype.slice.call(this.reviews).forEach(self.reviewTruncate);

			// this.showErrMsg("email", "Введите имя");
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

			return;
		},

		changePlaceholderTxt: function(txt) {
			var location = $('.tab.active a').text();

			txt = (typeof txt !== 'undefined') ? txt : location;
			$('.placeholder').text(txt);

			return;
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

			return;
		},

		// Cut review if text > 8 lines
		reviewTruncate: function(el) {
			// console.log(el.scrollHeight, el.offsetHeight);
			if (el.scrollHeight > (el.offsetHeight)){
				el.classList.add("cute-text");
			}
		},

		/**
		* @param {String} text  - PopUp message (Ваша заявка принята)
		*/
		showPopUp: function(text) {
			var popUp = document.createElement('div'),
			popUpMsg = '<div class="popUpMsg"><p>'+ text +'</p></div>';

			popUp.setAttribute('id', 'popUp');
			popUp.classList.add("popUp");
			popUp.innerHTML = popUpMsg.trim();
			document.body.appendChild(popUp);

			setTimeout(function() {
				document.body.removeChild(document.getElementById('popUp'));
			}, 2000);
		},

		/**
		* @param {String} target - Blank form field
		* @param {String} msg  - Error message
		*/
		showErrMsg: function(target, msg) {
			var el = document.querySelector('[name='+ target +']'),
				errorMsg = document.createElement('div');

			// remove last error message
			document.querySelectorAll('.error').forEach(function(err){
				err.parentNode.removeChild(err);
			});

			errorMsg.classList.add('error');
			errorMsg.innerHTML = msg;
			el.focus();
			el.parentNode.appendChild(errorMsg);
		},

	}

	var self = app;
	app.init();

})(window, window.document, window.jQuery);