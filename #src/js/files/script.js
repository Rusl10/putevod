let pageSlider = new Swiper('.header', {
    // Свои классы
    wrapperClass: "page__wrapper",
    slideClass: "page__screen",

    // Вертикальный слайдер
    direction: 'vertical',

    // Количество слайдов для показа
    slidesPerView: 'auto',

    // Включаем параллакс
    parallax: true,


    // Управление клавиатурой
    keyboard: {
        // Включить\выключить
        enabled: true,
        // Включить\выключить
        // только когда слайдер
        // в пределах вьюпорта
        onlyInViewport: true,
        // Включить\выключить
        // управление клавишами
        // pageUp, pageDown
        pageUpDown: true,
    },

    // Управление колесом мыши
    mousewheel: {
        // Чувствительность колеса мыши
        sensitivity: 1,
        // Класс объекта на котором
        // будет срабатывать прокрутка мышью.
        //eventsTarget: ".image-slider"
    },

    // Отключение функционала
    // если слайдов меньше чем нужно
    watchOverflow: true,

    // Скорость
    speed: 800,

    // Обновить свайпер
    // при изменении элементов слайдера
    observer: true,

    // Обновить свайпер
    // при изменении родительских
    // элементов слайдера
    observeParents: true,

    // Обновить свайпер
    // при изменении дочерних
    // элементов слайда
    observeSlideChildren: true,

    // Навигация 
    // Буллеты, текущее положение, прогрессбар
    pagination: {
        el: '.page__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: "page__bullet",
        bulletActiveClass: "page__bullet_active",
    },
    // Скролл
    scrollbar: {
        el: '.page__scroll',
        dragClass: "page__drag-scroll",
        // Возможность перетаскивать скролл
        draggable: true
    },

    // Отключаем автоинициализацию
    init: false,

    // События
    on: {
        // Событие инициализации
        init: function() {
            menuSlider();
            setScrollType();
            wrapper.classList.add('_loaded');
        },
        // Событие смены слайда
        slideChange: function() {
            menuSliderRemove();
            menuLinks[pageSlider.realIndex].classList.add('_active');
        },
        resize: function() {
            setScrollType();
        }
    },
});