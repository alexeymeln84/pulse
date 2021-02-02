$(document).ready(function() {

  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    speed: 1200,
    controls: false,
    nav: false,
    edgePadding: 20,
    navPosition: "bottom",
    controlsPosition: "bottom",
    controlsText: [
      '<img src="icons/left_arrow.svg">',
      '<img src="icons/right_arrow.svg">'
    ],
    responsive: {
      320: {
        controls: false,
        edgePadding: 20,
        nav: true,
        
      },
      576: {
        controls: true,
      },
      768: {
        nav: true,
        controls: true,
      },
      992: {
        gutter: 30,
      }
  }
  });

 
  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });
  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });
 

  (function($) {
    $(function() {
      
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      
      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        })
      }

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

    });
  })(jQuery);

      // Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
  });

  $('.button_mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

      // validation

  function validateForm(form){
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите ваше имя",
          minlength: jQuery.validator.format("Имя должно содержать не менее {0} символов")
        },
        phone: "Введите ваш номер телефона",
        email: {
          required: "Введите дейсвующий адрес эл. почты",
          email: "Неверный формат"
        }
      }
    });
  };

validateForm('#consultation-main-form');
validateForm('#consultation form');
validateForm('#order form');

    // maskedinput

  $('input[name=phone]').mask("+7 (999) 999-99-99");
  $.fn.setCursorPosition = function(pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };
  $('input[name="phone"]').click(function(){
    $(this).setCursorPosition(4);  // set position number
  });

    // mailer - отправка писем с сайта

  $('form').submit(function(e) {
    e.preventDefault();
    let thisForm = $(this);
    if (!thisForm.valid()) return false;
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find('input').val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

    // Smooth scroll and pageup

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn('slow');
    } else {
      $('.pageup').fadeOut('slow');
    }
  });

  $("a[href='#up']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();
});

