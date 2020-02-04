$(function(){
//Скрипты:

	// Включаем Aos.js
	AOS.init();

	AOS.init({
	  // Настройки, которые могут быть переопределены для каждого элемента с помощью атрибутов data-aos- *:
	  delay: 0, // значения от 0 до 3000 с шагом 50 мс
	  duration: 400, // значения от 0 до 3000 с шагом 50 мс
	  easing: 'ease', // ослабление по умолчанию для анимации AOS
	  once: true, // должна ли анимация происходить только один раз - при прокрутке вниз
	  mirror: true, // должны ли элементы анимироваться при прокрутке мимо них
	  anchorPlacement: 'top-bottom', // определяет, какая позиция элемента относительно окна должна вызывать анимацию

	});


	// Универсальный dropdown-menu:
	/*
	*Use To html -->>
	    <div class="dropdown-menu">
	      <button class="btn-open">
	        <i class="fa fa-bars" aria-hidden="true"></i>
	      </button>
	      <button class="btn-close">
	        <i class="fa fa-times" aria-hidden="true"></i>
	      </button>

	      <ul class="your classname">
					your content
	      </ul>
	    </div>
	*/
	var $btn_open 			= $('.btn-open');
	var $btn_close 			= $('.btn-close');
	var $dropdowm_menu 	= $('.dropdown-menu > .menu-content');
	
	$btn_open.click(function(event){
		 event.stopPropagation();
		 event.preventDefault();

		 $(this).parents('.dropdown-menu').find('.menu-content').toggleClass('is-open');		 
	});

	$btn_close.click(function(event){
			event.stopPropagation();
			event.preventDefault();
			$dropdowm_menu.removeClass('is-open').addClass('close');

			setTimeout(function(event){
				$dropdowm_menu.removeClass('close');
			}, 1000);
	});

	// Magnific-popup
	$('.popup-modal').magnificPopup({
		type: 'inline',

		fixedContentPos: false,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: true,
		preloader: false,
		
		midClick: true,
		mainClass: 'my-mfp-slide-bottom'
	});

	$(document).on('click', '.popup-modal-dismiss', function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});

	// Magnific-popup image
	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
	});

	$('.image-popup-fit-width').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		}
	});

	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

	//табы:
	jQuery.fn.lightTabs = function(options){

		var createTabs = function(){
			tabs = this;
				 i = 0;

			showPage = function(i){
			  $(tabs).children("div").children(".tabs-item").hide().removeClass('animate');
			  $(tabs).children("div").children(".tabs-item").eq(i).show().addClass('animate');
			  $(tabs).children("aside").children(".tab-nav").children(".tap-me").removeClass("active");
			  $(tabs).children("aside").children(".tab-nav").children(".tap-me").eq(i).addClass("active");
			}

			showPage(0);

			$(tabs).children("aside").children(".tab-nav").children(".tap-me").each(function(index, element){
			  $(element).attr("data-tab", i);
			  	i++;       
			});

			$(tabs).children("aside").children(".tab-nav").children(".tap-me").click(function(){
			  showPage(parseInt($(this).attr("data-tab")));
			});
		};
		return this.each(createTabs);
	};
	
	//инициализация:
	$(document).ready(function(){
  	$(".tabs").lightTabs();
	});

	//гармошка:
		// var $ml_menu = $('.harmonica');

		// $ml_menu.find('div:not(:first)').hide();

		// $('.harmonica a').click(function(event) {
		//   var $current_li = $(this).parent('li:first');

		//   if ( $current_li.children('div').length > 0 ) {
		//     event.stopPropagation();
		//     event.preventDefault();
		//     $current_li.toggleClass('active').find('div:first').slideToggle('slow');
		//   }

		//   $( $(this).parents('div').get(0) ).find('li').each(function(){
		//     if ( this != $current_li.get(0) ) {
	 //      	$(this).removeClass('active');
		//     }
		//   });

		// });


	/*Код плагина*/
	  $.fn.liHarmonica = function (params) {
	    var p = $.extend({
	      currentClass: 'cur', //Класс для выделенного пункта меню
	      onlyOne: false, //true - открытым может быть только один пункт, 
	      //false - число открытых одновременно пунктов не ограничено
	      speed: 500, //Скорость анимации
	      searchToString: false, // показать поиск по содержанию (по умолчанию скрыто)
	      badge: false
	    }, params);
	    return this.each(function () {
	      var
		      el = $(this).addClass('harmonica-menu'),
		        linkItem = $('ul', el).prev('a');
		      el.children(':last').addClass('last');

	      $('ul', el).each(function () {
	        $(this).children(':last').addClass('last');
	      });

	      $('ul', el).prev('a').addClass('harFull');
	      el.find('.' + p.currentClass).parents('ul').show().prev('a').addClass(p.currentClass).addClass('harOpen');

	      //searchToString
	      if (p.searchToString) {
				  jQuery.expr[':'].Contains = function(a,i,m){
				      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
				  };

		      function filter_list(header, list){
		      	var menu = $('.harmonica-menu');

				    var wrap 	= menu.wrapAll('<div class="harmonica-container"></div>'),
				    		form 	= $('<form>', {
				    			id: 'form',
				    			class: 'filter_form',
				    			action: '#',
				    		}),
				      	input = $('<input>', {
				      		class: 'filter_input',
				      		type: 'text',
				      		placeholder: 'Поиск по содержанию'
				      	});

				    var createSearchBlock = $('.harmonica-container')
				    		.prepend('<div class="search-block"></div>')
						    		$('.search-block')
						    				.append(form)
						    				$('.filter_form')
							    				.append(input);

						// динамически создаем форму с поиском
		      	createSearchBlock.appendTo(header);

		      	// настройка поиска:
		      	$(input)
		      		.change( function() {
		      			var filter = $(this).val();

				          if(filter) {

				            $matches = $(list).find('a:Contains(' + filter + ')').parents();
				            $matches.closest('a').slideDown(p.speed);
				            $('li', list).not($matches).slideUp(p.speed);
				            $matches.slideDown(p.speed);

				          } else {
				            $(list).find('li').slideDown(p.speed);
				            $(list).find('.harmonica-subcontent').css('display', 'none');
				          }
		      					return false;
		      		})
	      		.keyup( function() {
	      			$(this).change();
	      		});
		      }

		      $(function () {
		      	filter_list($('#form'), $('#list'));
		      });
	      }

	      // badge
	      if (p.badge) {
					$('.harmonica-menu li').each(function() {
						var badge = $('<span>', {class: 'badge'});
								badge.appendTo( $(this).children('a:not(:last-child)') );

					  // у harmonica-menu li ищем детей (тег а) в теге "а" ищем
					  var counter = $(this).children('a').children('.badge');

					  // если есть то: считаем и записываем кол-во в badge
					  if ( counter.length > 0 ) {
					    	 counter.text($(this)
					    	 	.children('ul')
					    	 	.children('li').length);
					  }
					});
	      }

	      linkItem.on('click', function () {

	        if ($(this).next('ul').is(':hidden')) {
	          $(this).addClass('harOpen');
	        } else {
	          $(this).removeClass('harOpen');
	        }

	        // если true значит при клике на категорию закрываем предыдущую
	        if (p.onlyOne) {
	          $(this).closest('ul').closest('ul').find('ul').not($(this).next('ul')).slideUp(p.speed).prev('a').removeClass('harOpen');
	          $(this).next('ul').slideToggle(p.speed);
	        } else {
	          $(this).next('ul').stop(true).slideToggle(p.speed);
	        }
	        return false;
	      });
	    });
	  };

	/*Инициализация плагина*/
	  $('.harmonica-menu').liHarmonica({
	    onlyOne: true,
	    speed: 400,
	    searchToString: true,
	    badge: true
	  });

});
