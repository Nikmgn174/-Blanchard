window.addEventListener('DOMContentLoaded', function () {
  // плавные якоря

  const anchors = document.querySelectorAll('a.scroll-to')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href')

      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  // dropdown


  $('.dropdown__btn').click(function () {
    $(this).toggleClass('open');
    $('.dropdown__btn').not(this).removeClass('open');
  });

  // burger

  let burger = document.querySelector('.burger');
  let menu = document.querySelector('.header__nav');

  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
  });

  // search

  let searchBtn = document.querySelector('.header__top-btn');
  let searchForm = document.querySelector('.header__bottom');
  let close = document.querySelector('.close');

  const toggleMenu = () => {
    searchForm.classList.toggle('open');
  };

  searchBtn.addEventListener('click', e => {
    e.stopPropagation();

    toggleMenu();
  });

  close.addEventListener('click', e => {
    e.stopPropagation();

    toggleMenu();
  });


  document.addEventListener('click', e => {
    let target = e.target;
    let its_searchForm = target == searchForm || searchForm.contains(target);
    let its_searchBtn = target == searchBtn;
    let its_close = target == close;
    let searchForm_open = searchForm.classList.contains('open');

    if (!its_searchForm && !its_searchBtn && !its_close && searchForm_open) {
      toggleMenu();
    }
  });

  // Убираем placeholder на мобилке

  let inp = document.querySelector('.header__bottom-input');
  window.addEventListener('resize', function () {
    inp.setAttribute('placeholder', this.innerWidth <= 1024 ? '' : 'Поиск по сайту');
  });
  window.dispatchEvent(new Event('resize'));

  //hero слайдер

  let heroSlider = new Swiper('.hero__swiper', {
    loop: true,
    speed: 2000,
    autoplay: {
      delay: 4000,
    },
    effect: 'fade',
  });

  // hero title
  // let heroTitle = document.querySelector('.hero__title');

  // if(window.innerWidth >= 666) {
  //   heroTitle.classList.fontSize = "60px";
  // }

  // gallery слайдер

  const gallerySlider = new Swiper('.gallery__swiper-container', {
    pagination: {
      el: '.gallery__pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.gallery__btn-next',
      prevEl: '.gallery__btn-prev',
    },
    a11y: {
      prevSlideMessage: 'Предыдущие слайды',
      nextSlideMessage: 'Следующие слайды',
    },
    slidesPerView: 3,
    grid: {
      rows: 2,
    },
    slidesPerGroup: 3,
    spaceBetween: 50,
    speed: 800,
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        grid: {
          rows: 1,
        },
        spaceBetween: 15,
      },
      577: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 2,
        },
        spaceBetween: 34,
      },
      1400: {
        loop: false,
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 2,
        },
        spaceBetween: 50,
        speed: 600,
      },
    },
  });

  // gallery select

  const galleryChoices = new Choices('.gallery__select', {
    searchEnabled: false, //надо
    itemSelectText: null, //надо
    searchChoices: false,
    classNames: {
      containerOuter: 'choices gallery__choices',
    },
  });

  // modal

  let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
  let popup = document.querySelector('.popup'); // Само окно
  let openPopupButtons = document.querySelectorAll('.gallery__slide'); // Кнопки для показа окна
  let closePopupButton = document.querySelector('.popup__close'); // Кнопка для скрытия окна
  let galleryImg = document.querySelectorAll('.gallery__slide-img');// картинки
  let popupPicture = document.querySelector('.popup__picture');
  let popupImg = document.querySelector('.popup__img');
  openPopupButtons.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
      popupBg.classList.add('active'); // Добавляем класс 'active' для фона
      popup.classList.add('active'); // И для самого окна
      let src = button.querySelector('.gallery__slide-img').getAttribute("src");
      document.querySelector(".popup").querySelector(".popup__img").setAttribute("src", src);
      document.body.style.overflow = 'hidden'
    })
  });

  closePopupButton.addEventListener('click', () => { // Вешаем обработчик на крестик
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна
    document.body.style.overflow = 'visible'
  });

  document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
    if (e.target === popupBg) { // Если цель клика - фот, то:
      popupBg.classList.remove('active'); // Убираем активный класс с фона
      popup.classList.remove('active'); // И с окна
    }
  });

  // TABS

  function slidesPlugin(activeSlide = 2) {
    const slides = document.querySelectorAll('.tabs__btn');

    slides[activeSlide].classList.add('active');

    for (const slide of slides) {
      slide.addEventListener('click', () => {
        clearActiveClasses();
        slide.classList.add('active');
      });
    }

    function clearActiveClasses() {
      slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }
  }

  slidesPlugin();

  document.querySelectorAll('.tabs__btn').forEach(function (tabsBtn) {
    tabsBtn.addEventListener('click', function (event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content').forEach(function (tabContent) {
        tabContent.classList.remove('tab-content-active');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
    });
  });


  // ACCORDION

  $(".js-accordion").accordion({
    collapsible: true,
    active: 0,
    icons: false,
    heightStyle: 'content',
    classes: {
      "ui-accordion-header-active": "is-active",
    }
  });



  // Выбор художника

  function choicesArt() {
    let artLink = document.querySelectorAll(".catalog__author-link");
    artLink.forEach((art) => {
      art.addEventListener('click', function (artclick) {
        artclick.preventDefault();
        if (art.classList.contains("domeniko")) {
          let picLink = document.querySelector('.catalog__author-pic-link');
          picLink.src = 'img/catalog/art-desktop.jpg';
          picLink.alt = 'Доменико Гирландайо';
          document.querySelector('.Founded').style.display = 'block';
          document.querySelector('.notFounded').style.display = 'none';
        } else {
          let picLink = document.querySelector('.catalog__author-pic-link');
          picLink.src = 'img/catalog/art-x.jpg';
          picLink.alt = 'Пока ничего...';
          document.querySelector('.Founded').style.display = 'none';
          document.querySelector('.notFounded').style.display = 'block';
        }
      })
    })
  };
  choicesArt();

  $('.catalog__author-link').click(function () {
    $('.catalog__author-link').not(this).removeClass('active');
    $(this).addClass('active');
  });

  // events

  (() => {
    const MOBILE_WIDTH = 576;
    const DESKTOP_WIDTH = 850;
    const btn = document.querySelector(".js-show");

    const sliderMobileParams = {
      paginationClassName: "events-pagination",
      cardsContainerName: "js-slider",
      cardsWrapName: "js-slides-wrap",
      card: "events-slide",
      hiddenClass: "hidden"
    };

    function getWindowWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );
    }

    function activateMobileSlider(params) {
      const pagination = document.createElement("div");
      pagination.classList.add(params.paginationClassName);
      params.cardsContainer.append(pagination);

      params.cardsContainer.classList.add("swiper-container");
      params.cardsWrap.classList.add("swiper-wrapper");

      params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: `.${params.cardsContainerName} .${params.paginationClassName}`,
          clickable: true,
        },

        on: {
          beforeInit() {
            document.querySelectorAll(`.${params.card}`).forEach((el) => {
              el.classList.add("swiper-slide");
            });
          },

          beforeDestroy() {
            this.slides.forEach((el) => {
              el.classList.remove("swiper-slide");
              el.removeAttribute("role");
              el.removeAttribute("aria-label");
            });

            this.pagination.el.remove();
          }
        }
      });
    }

    function destroyMobileSlider(params) {
      params.cardsSlider.destroy();
      params.cardsContainer.classList.remove("swiper-container");
      params.cardsWrap.classList.remove("swiper-wrapper");
      params.cardsWrap.removeAttribute("aria-live");
      params.cardsWrap.removeAttribute("id");
    }

    function setHiddenCards(params, windowWidth) {
      const cards = document.querySelectorAll(`.${params.card}`);
      let quantity = cards.length;

      if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
        quantity = 2;
      }

      if (windowWidth >= DESKTOP_WIDTH) {
        quantity = 3;
      }

      cards.forEach((card, i) => {
        card.classList.remove(params.hiddenClass);
        if (i >= quantity) {
          card.classList.add(params.hiddenClass);
        }
      });
    }

    function showCards(e) {
      const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);

      e.target.style = "display: none";

      cards.forEach((card) => {
        card.classList.remove(sliderMobileParams.hiddenClass);
      });
    }

    function checkWindowWidthMobile(params) {
      const currentWidth = getWindowWidth();
      btn.style = "";
      params.cardsContainer = document.querySelector(
        `.${params.cardsContainerName}`
      );
      params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

      if (
        currentWidth <= MOBILE_WIDTH &&
        (!params.cardsSlider || params.cardsSlider.destroyed)
      ) {
        activateMobileSlider(params);
      } else if (currentWidth > MOBILE_WIDTH && params.cardsSlider) {
        destroyMobileSlider(params);
      }

      setHiddenCards(params, currentWidth);
    }

    checkWindowWidthMobile(sliderMobileParams);
    btn.addEventListener("click", showCards);

    window.addEventListener("resize", function () {
      checkWindowWidthMobile(sliderMobileParams);
    });
  })();

  // editions swiper

  const editionsSlider = new Swiper('.editions__swiper-container', {
    pagination: {
      el: '.editions__pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.editions__btn-next',
      prevEl: '.editions__btn-prev',
    },
    a11y: {
      prevSlideMessage: 'Предыдущие слайды',
      nextSlideMessage: 'Следующие слайды',
    },
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
    speed: 800,
    breakpoints: {
      577: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 34,
      },
      640: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      850: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 49,
      },
      1440: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
    },
  });

  function swiperDestroy() {
    if (window.screen.width <= 576) {
      editionsSlider.destroy();
      document.querySelector(".editions__wrapper").classList.remove("swiper-wrapper")
    }
  };
  swiperDestroy();

  // editions выбор

  let button = ".categories__btn";
  let labels = ".checkbox-list__label";
  let labelsList = ".checkbox-list";
  let labelsListActive = "checklist-active";
  let labelActive = "checkbox--label-active";
  let animationClass = "animation-test";
  let inputCheckbox = ".checkbox";

  function checkboxToggle(a, b, c, labelsListActive, labelActive, animationClass, inputCheckbox) {
    let btn = document.querySelector(a);
    let labels = document.querySelectorAll(b);
    let listLabels = document.querySelector(c);
    btn.addEventListener("click", toggleSpoiler);
    btn.addEventListener("keyup", function (e) {
      console.log(e.key);
      if (e.code === "Enter") {
        toggleSpoiler();
      }
    })

    function toggleSpoiler() {
      if (!listLabels.classList.contains(labelsListActive)) {
        listLabels.classList.add(labelsListActive);
        labels.forEach(item => {
          item.classList.add("checkbox--label-active");
          animationItem(item, labelActive, animationClass, "add");
        })
      } else {
        listLabels.classList.remove(labelsListActive);
        labels.forEach(item => {
          if (item.querySelector(inputCheckbox).checked) {
            animationItem(item, labelActive, animationClass, "add");
          } else {
            animationItem(item, labelActive, animationClass, "remove");
          }
        });
      }
      labels.forEach(item => {
        item.addEventListener("click", function () {
          if (!listLabels.classList.contains(labelsListActive)) {
            animationItem(this, labelActive, animationClass, "remove");
          }
        });
      })
    }

    function animationItem(item, class1, class2, f) {
      if (f === "add") {
        item.classList.add(class1);
        setTimeout(function () {
          item.classList.add(class2)
        }, 100);

      } else {
        item.classList.remove(class2);
        setTimeout(function () {
          item.classList.remove(class1)
        }, 300);
      }

    }
  }

  checkboxToggle(button, labels, labelsList, labelsListActive, labelActive, animationClass, inputCheckbox);

  // projects слайдер

  const projectsSwiper = new Swiper('.projects__swiper', {
    navigation: {
      nextEl: '.projects__swiper-next',
      prevEl: '.projects__swiper-prev',
    },
    a11y: {
      prevSlideMessage: 'Предыдущие слайды',
      nextSlideMessage: 'Следующие слайды',
    },

    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 50,
    speed: 800,

    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 15,
      },
      577: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },
      850: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 50,
      },
      1440: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
      },
    },
  });

  // tooltip
  tippy('#tooltip-one', {
    content: '<p style="max-height: 40px; text-align: center; font-size: 12px; font-weight: 600;">Пример современных тенденций - современная методология разработки </p>',
    maxWidth: 264,
    allowHTML: true,
    arrow: true,
    theme: 'tomato',
    duration: 1500,
  });

  tippy('#tooltip-two', {
    content: '<p style="min-height: 55px; text-align: center; font-size: 12px; font-weight: 600;">Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции  </p>',
    maxWidth: 264,
    allowHTML: true,
    arrow: true,
    theme: 'tomato',
    duration: 1500,
  });

  tippy('#tooltip-three', {
    content: '<p style="min-height: 25px; text-align: center; font-size: 12px; font-weight: 600;">В стремлении повысить качество </p>',
    minWidth: 264,
    allowHTML: true,
    arrow: true,
    theme: 'tomato',
    duration: 1500,
  });

  // MAP


  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.758468, 37.601088],
      zoom: 14,
      controls: ['geolocationControl', 'zoomControl']
    }, {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: { top: "200px", right: "20px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "120px", right: "20px" }
    });

    // Создание геообъекта с типом точка (метка).
    var myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point", // тип геометрии - точка
        coordinates: [55.758468, 37.601088] // координаты точки
      }
    });


    var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/contacts/map-icon.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-10, -20]
    });

    // Размещение геообъекта на карте.
    // myMap.geoObjects.add(myGeoObject);
    myMap.geoObjects.add(myPlacemark);
  }


  // DATA FORM

  var inputTel = document.querySelectorAll("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");
  im.mask(inputTel);

  const validation = new JustValidate('#form');

validation
  .addField('#name', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Имя должно содержать минимум 3 символа',
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      errorMessage: 'Укажите ваше имя',
    }
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Укажите ваш телефон',
    },
    {
      rule: 'minLength',
      value: 10,
      errorMessage: 'Телефон должен содержать 10 символов',
    }
  ])
})
