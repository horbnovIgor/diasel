(function ($) {
  ("use strict");
  // variables
  var layout = $(".layout"),
    header = $(".layout__header");
  // preloader
  preloader();
  function preloader() {
    layout.on("click", ".nav__link", function (event) {
      layout.removeClass("layout_ready-load");
      event.preventDefault();
      var linkLocation = this.href;
      setTimeout(function () {
        window.location = linkLocation;
      }, 500);
    });
    setTimeout(function () {
      layout.addClass("layout_ready-load");
    }, 0);
  }

  // Slider
  if ($(".slider__primary").length) {
    const slider = new Swiper(".slider__primary", {
      loop: false,
      slidesPerView: 1,

      navigation: {
        nextEl: ".slider__primary .swiper__button_next",
        prevEl: ".slider__primary .swiper__button_prev",
      },
    });
    slider.on("slideChange", function (e) {
      $(".slider__preview")
        .find(".preview__item")
        .eq(slider.activeIndex)
        .addClass("preview__item_active")
        .siblings()
        .removeClass("preview__item_active");
    });
  }

  // Product Sliders
  if ($(".product__slider").length) {
    const swiperSecondary = new Swiper(".slider_secondary", {
      direction: "vertical",
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".slider_secondary .swiper__button_next",
        prevEl: ".slider_secondary .swiper__button_prev",
      },
      breakpoints: {
        768: {
          spaceBetween: 10,
          slidesPerView: 4,
        },
      },
    });
    const swiperPrimary = new Swiper(".slider_primary", {
      slidesPerView: 1,
      spaceBetween: 10,
      allowTouchMove: false,

      loopedSlides: 3,
      slideToClickedSlide: true,
      thumbs: {
        swiper: swiperSecondary,
      },
    });
  }

  // Products carousel
  if ($(".products__list_carousel").length) {
    new Swiper(".products__list_carousel", {
      loop: true,
      slidesPerView: 1,

      breakpoints: {
        920: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        520: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
      },
      navigation: {
        nextEl: ".swiper__button_next",
        prevEl: ".swiper__button_prev",
      },
    });
  }

  // Testimonials carousel
  // if ($(".testimonials__carousel").length) {
  //   new Swiper(".testimonials__carousel", {
  //     // loop: true,
  //     slidesPerView: 1,

  //     breakpoints: {
  //       920: {
  //         slidesPerView: 3,
  //         spaceBetween: 24,
  //       },
  //       767: {
  //         slidesPerView: 3,
  //         spaceBetween: 24,
  //       },
  //       520: {
  //         slidesPerView: 1,
  //         spaceBetween: 24,
  //       },
  //     },
  //     navigation: {
  //       nextEl: ".swiper__button_next",
  //       prevEl: ".swiper__button_prev",
  //     },
  //   });
  // }

  // Partners carousel
  if ($(".partners__list_carousel").length) {
    new Swiper(".partners__list_carousel", {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 8,
      navigation: {
        nextEl: ".swiper__button_next",
        prevEl: ".swiper__button_prev",
      },
      breakpoints: {
        767: {
          spaceBetween: 36,
        },
      },
    });
  }

  // Menu
  navInit();
  function navInit() {
    header.find(".user__item_burger").on("click", function () {
      $(this).closest(header).toggleClass("layout__header_active");
    });
  }

  // Sub menu
  submenuInit();
  function submenuInit() {
    header.find(".menu__link").on("click", function () {
      $(this).closest(".menu__item").toggleClass("menu__item_active");
      $(this).siblings(".menu__nav").slideToggle(200);
    });

    header.find(".nav__symbol").on("click", function () {
      $(this)
        .closest(".nav__item")
        .toggleClass("nav__item_active")
        .siblings()
        .removeClass("nav__item_active")
        .find(".nav__subnav")
        .slideUp(200);
      $(this).siblings(".nav__subnav").slideToggle(200);
    });
  }

  // Catalog
  catalogInit();
  function catalogInit() {
    header.find(".catalog__header").on("click", function () {
      $(this).closest(".header__catalog").toggleClass("header__catalog_active");
      $(this).siblings(".catalog__main").slideToggle(200);
    });
  }

  /// Scroll functions
  $(window).on("load resize scroll", function () {
    let h = $(window).height();
    scrollHeader(h);
    scrollSection(h);
    scrollImage(h);
  });
  function scrollHeader(h) {
    if ($(window).scrollTop() >= 1) {
      header.addClass("layout__header_scroll");
    } else {
      header.removeClass("layout__header_scroll");
    }
  }
  function scrollSection(h) {
    let section = $(".section");
    section.each(function () {
      if ($(window).scrollTop() + h >= $(this).offset().top) {
        $(this).addClass("section_animation");
      }
    });
  }
  function scrollImage(h) {
    // Image initialization
    let img = $("img");
    img.each(function () {
      if (
        $(window).scrollTop() + h >= $(this).offset().top &&
        this.getAttribute("data-src") &&
        this.src !== this.getAttribute("data-src")
      ) {
        this.src = this.getAttribute("data-src");
      }
    });
  }

  // Tabs init
  if ($(".tabs").length) {
    tabsInit();
  }

  function tabsInit() {
    let position,
      tabsActive = "tabs__item_active";
    $(".layout__tabs")
      .find(".tabs__header")
      .on("click", ".tabs__item", function () {
        position = $(this).index();
        $(this).addClass(tabsActive).siblings().removeClass(tabsActive);
        $(this)
          .closest(".layout__tabs")
          .find(".tabs__main")
          .find(".tabs__item")
          .eq(position)
          .slideDown(400)
          .siblings()
          .slideUp(400);
      });
  }

  // Accordion init
  if ($(".layout__accordion").length) {
    accordionInit();
  }

  function accordionInit() {
    $(".layout__accordion").on("click", ".accordion__header", function () {
      $(this).closest(".accordion__item").toggleClass("accordion__item_active");
      $(this)
        .closest(".accordion__item")
        .find(".accordion__main")
        .slideToggle(200);
    });
  }

  // Sidebar init
  if ($(".sidebar__categories").length) {
    sidebarInit();
  }

  function sidebarInit() {
    $(".sidebar__categories").on("click", ".categories__symbol", function () {
      $(this)
        .closest(".categories__item")
        .toggleClass("categories__item_active");
      $(this)
        .closest(".categories__item")
        .find(".categories__main")
        .slideToggle(200);
    });
  }
  // Footer init
  if ($(".footer__menu").length) {
    footerInit();
  }
  function footerInit() {
    $(".footer__menu").on("click", ".menu__header", function () {
      $(this)
        .closest(".menu__item")
        .toggleClass("menu__item_active")
        .siblings()
        .removeClass("menu__item_active");
      $(this).closest(".menu__item").find(".menu__main").slideToggle(200);
    });
  }
  // Validation & customize form
  if ($("form").length) {
    // select init
    jcf.setOptions("Select", {
      wrapNative: false,
      wrapNativeOnMobile: false,
      fakeDropInBody: false,
      maxVisibleItems: 5,
    });
    // Number init
    jcf.setOptions("Number", {
      fakeStructure:
        '<span class="jcf-number"><span class="jcf-btn-dec"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2"><rect width="12" height="2"/></svg></span><span class="jcf-btn-inc"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M0 5H12V7H0V5Z"/><path d="M7 8.74229e-08L7 12H5L5 0L7 8.74229e-08Z"/></svg></span></span>',
    });
    jcf.replaceAll();
    // Mask form
    $(".form__item_mask").mask("8(999) 999-99-99");
    // Attach
    if ($(".attach").length) {
      attach();
    }
    function attach() {
      let attach = $(".attach");
      attach.find(".attach__list").html("");
      // init
      attach.on("change", ".attach__input", function () {
        if ($(this).prop("files")[0].name.length > 0) {
          $(this)
            .closest(".attach")
            .find(".attach__text")
            .text($(this).prop("files")[0].name);
        }
      });
    }
    /* Slider */
    if ($(".range").length) {
      rangeInit();
    }
    function rangeInit() {
      $(".range__slider").slider({
        range: true,
        min: 1500,
        max: 10000,
        step: 100,
        values: [3000, 6000],
        slide: function (event, ui) {
          console.log(ui.values[0]);
          $(".range__input_min").val(ui.values[0]);
          $(".range__input_max").val(ui.values[1]);
        },
      });
      $(".range__input_min").val($(".range__slider").slider("values", 0));
      $(".range__input_max").val($(".range__slider").slider("values", 1));
    }
  }
  // MODAL INIT
  modalInit();
  function modalInit() {
    let modalName;
    // modal show
    $(document).on("click", ".modal-init", function () {
      layout
        .addClass("layout_modal-active")
        .find(".modal__layout")
        .removeClass("modal__layout_active");
      modalName = $(this).data("modalname");
      layout.find("." + modalName + "").addClass("modal__layout_active");
    });
    // modal hide
    $(document).mouseup(function (e) {
      if ($(".modal__layout_active").length) {
        var div = $(".modal__layout");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
          modalHide();
        }
      }
    });
    // modal hide
    $(document).on("click", ".modal__action", function () {
      modalHide();
    });
    // modal hide
    $(window).keydown(function (e) {
      if (e.key === "Escape") {
        modalHide();
      }
    });

    function modalHide() {
      layout
        .removeClass("layout_modal-active")
        .find(".modal__layout")
        .removeClass("modal__layout_active");
    }
  }

  // Scroll
  linkScroll();
  function linkScroll() {
    $('a[href^="#"]:not([href="#"])').click(function (e) {
      e.preventDefault();
      var target = $($(this).attr("href"));
      if (target.length) {
        var scrollTo = target.offset().top;
        $("body, html").animate({ scrollTop: scrollTo + "px" }, 800);
      }
    });
  }
})(jQuery);
