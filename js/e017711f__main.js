/*

	* Website for ACM IRISS 2021
    * Copyright PSG College of Technology
    * Developed by AMCS, PSG TECH

*/


jQuery(function ($) {



   /**-------------------------------------------------
    *Fixed HEader
    *----------------------------------------------------**/
   $(window).on('scroll', function () {

      /**Fixed header**/
      if ($(window).scrollTop() > 250) {
         $('.header').addClass('sticky fade_down_effect');
      } else {
         $('.header').removeClass('sticky fade_down_effect');
      }
   });

   /* ---------------------------------------------
                     Menu Toggle 
   ------------------------------------------------ */

   if ($(window).width() < 991) {
      $(".navbar-nav li a").on("click", function () {
         $(this).parent("li").find(".dropdown-menu").slideToggle();
         $(this).find("i").toggleClass("fa-angle-up fa-angle-down");
      });

   }


   /* ----------------------------------------------------------- */
   /*  Event counter 
   /* -----------------------------------------------------------*/

   if ($('.countdown').length > 0) {
      $(".countdown").jCounter({
         date: '11 February 2021 09:00:00',
         fallback: function () {
            console.log("count finished!")
         }
      });
   }


   /*==========================================================
     funfact 
     ======================================================================*/
   var skl = true;
   $('.ts-funfact').appear();

   $('.ts-funfact').on('appear', function () {
      if (skl) {
         $('.counterUp').each(function () {
            var $this = $(this);
            jQuery({
               Counter: 0
            }).animate({
               Counter: $this.attr('data-counter')
            }, {
               duration: 8000,
               easing: 'swing',
               step: function () {
                  var num = Math.ceil(this.Counter).toString();
                  if (Number(num) > 99999) {
                     while (/(\d+)(\d{3})/.test(num)) {
                        num = num.replace(/(\d+)(\d{3})/, '');
                     }
                  }
                  $this.html(num);
               }
            });
         });
         skl = false;
      }
   });

   /*=====================
    isotop grid
    ========================*/

   if ($('.grid').length > 0) {
      var $portfolioGrid = $('.grid'),
         colWidth = function () {
            var w = $portfolioGrid.width(),
               columnNum = 1,
               columnWidth = 0;
            if (w > 1200) {
               columnNum = 3;
            } else if (w > 900) {
               columnNum = 3;
            } else if (w > 600) {
               columnNum = 2;
            } else if (w > 450) {
               columnNum = 2;
            } else if (w > 385) {
               columnNum = 1;
            }
            columnWidth = Math.floor(w / columnNum);
            $portfolioGrid.find('.grid-item').each(function () {
               var $item = $(this),
                  multiplier_w = $item.attr('class').match(/grid-item-w(\d)/),
                  multiplier_h = $item.attr('class').match(/grid-item-h(\d)/),
                  width = multiplier_w ? columnWidth * multiplier_w[1] : columnWidth,
                  height = multiplier_h ? columnWidth * multiplier_h[1] * 0.4 - 12 : columnWidth * 0.3;
               $item.css({
                  width: width,
                  //height: height
               });
            });
            return columnWidth;
         },

         isotope = function () {
            $portfolioGrid.isotope({
               resizable: true,
               itemSelector: '.grid-item',
               masonry: {
                  columnWidth: colWidth(),
                  gutterWidth: 3
               }
            });
         };
      isotope();
      $(window).resize(isotope);
   } // End is_exists



   /*==========================================================
          main slider
  ======================================================================*/
   if ($('.main-slider').length > 0) {
      var bannerSlider = $(".main-slider");
      bannerSlider.owlCarousel({
         items: 1,
         mouseDrag: true,
         loop: true,
         touchDrag: true,
         autoplay:true,
         dots: true,
         autoplayTimeout: 5000,
         animateOut: 'fadeOut',
         autoplayHoverPause: true,
         smartSpeed: 250,

      });
   }

   /*=============================================================
			 speaker popup
	=========================================================================*/

   $('.ts-image-popup').magnificPopup({
      type: 'inline',
      closeOnContentClick: false,
      midClick: true,
      callbacks: {
         beforeOpen: function () {
            this.st.mainClass = this.st.el.attr('data-effect');
         }
      },
      zoom: {
         enabled: true,
         duration: 500, // don't foget to change the duration also in CSS
      },
      mainClass: 'mfp-fade',
   });

   /*=============================================================
   			gallery
   	=========================================================================*/

   $('.ts-popup').magnificPopup({
      type: 'image',
      closeOnContentClick: false,
      midClick: true,
      callbacks: {
         beforeOpen: function () {
            this.st.mainClass = this.st.el.attr('data-effect');
         }
      },
      zoom: {
         enabled: true,
         duration: 500, // don't foget to change the duration also in CSS
      },
      mainClass: 'mfp-fade',
   });

   /*=============================================================
   			video popup
   	=========================================================================*/

   $('.ts-video-popup').magnificPopup({
      type: 'iframe',
      closeOnContentClick: false,
      midClick: true,
      callbacks: {
         beforeOpen: function () {
            this.st.mainClass = this.st.el.attr('data-effect');
         }
      },
      zoom: {
         enabled: true,
         duration: 500, // don't foget to change the duration also in CSS
      },
      mainClass: 'mfp-fade',
   });

   /*=============================================================
   			hero image animation
   	=========================================================================*/
   $('.tile')
      // tile mouse actions
      .on('mouseover', function () {
         $(this).children('.photo').css({
            'transform': 'scale(' + $(this).attr('data-scale') + ')'
         });
      })
      .on('mouseout', function () {
         $(this).children('.photo').css({
            'transform': 'scale(1)'
         });
      })
      .on('mousemove', function (e) {
         $(this).children('.photo').css({
            'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + '%'
         });
      })
      // tiles set up
      .each(function () {
         $(this)
            // add a photo container
            .append('<div class="photo"></div>')
            // some text just to show zoom level on current item in this example
            //.append('<div class="txt"><div class="x">'+ $(this).attr('data-scale') +'x</div>ZOOM ON<br>HOVER</div>')
            // set up a background image for each tile based on data-image attribute
            .children('.photo').css({
               'background-image': 'url(' + $(this).attr('data-image') + ')'
            });
      });

   /*==========================================================
   wow animated
    ======================================================================*/
   var wow = new WOW({
      animateClass: 'animated',
      mobile: false
   });
   wow.init();


   /* ----------------------------------------------------------- */
   /*  Back to top
   /* ----------------------------------------------------------- */

   $(window).on('scroll', function () {
      if ($(window).scrollTop() > $(window).height()) {
         $(".BackTo").fadeIn('slow');
      } else {
         $(".BackTo").fadeOut('slow');
      }

   });
   $("body, html").on("click", ".BackTo", function (e) {
      e.preventDefault();
      $('html, body').animate({
         scrollTop: 0
      }, 800);
   });


   
   // scrollme.init();


});
/*!
* Website for ACM IRISS 2021
* Copyright PSG College of Technology
* Developed by AMCS, PSG TECH
*/

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff; font-size:15px; color:#ffd00a}";
        document.body.appendChild(css);
    };
