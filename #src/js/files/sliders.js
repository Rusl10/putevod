//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            if (slider.classList.contains('mainslider__body')) {
                slider_wrapper.classList.add('mainslider__wrapper');
                slider_wrapper.classList.add('_gallery');
            }
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');

            if (slider.classList.contains('_swiper_scroll')) {
                let sliderScroll = document.createElement('div');
                sliderScroll.classList.add('swiper-scrollbar');
                slider.appendChild(sliderScroll);
            }
            let arrowLeft = document.createElement('div');
            let arrowRight = document.createElement('div');
            arrowLeft.classList.add('swiper-button-prev');
            arrowRight.classList.add('swiper-button-next');

            if (slider.classList.contains('mainslider__body')) {
                arrowLeft.classList.add('mainslider__navigation');
                arrowRight.classList.add('mainslider__navigation');
            }
            if (slider.classList.contains('feedbacks__slider')) {
                arrowLeft.classList.add('slider-feedbacks__navigation');
                arrowLeft.classList.add('slider-feedbacks__navigation_prev');
                arrowRight.classList.add('slider-feedbacks__navigation');
                arrowRight.classList.add('slider-feedbacks__navigation_next');
            }


            slider.appendChild(arrowLeft);
            slider.appendChild(arrowRight);

        }
        /*if (slider.classList.contains('_gallery')) {
    slider.data('lightGallery').destroy(true);
}*/
    }
    sliders_bild_callback();
}

function sliders_bild_callback(params) {}

function sliders_bild_callback(params) {}

// comment
var swiper = null;
let slider_feedbacks = null

function initSwiper() {
    if (swiper) {
        swiper.destroy();
    }
    if (slider_feedbacks) {
        slider_feedbacks.destroy();
    }

    swiper = new Swiper('.mainslider__body', {
        /*
        effect: 'fade',
        autoplay: {
        	delay: 3000,
        	disableOnInteraction: false,
        },
        */
        observer: true,
        observeParents: true,
        //height: 770,
        slidesPerView: 3,
        slidesPerColumn: 2,
        spaceBetween: 30,

        //autoHeight: true,
        speed: 800,
        //touchRatio: 0,
        //simulateTouch: false,
        //loop: true,
        //preloadImages: false,
        //lazy: true,
        // Dotts

        // Arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.mainslider__dotts',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            /*320: {
            	slidesPerView: 1,
            	spaceBetween: 0,
            	autoHeight: true,
            },
            768: {
            	slidesPerView: 2,
            	spaceBetween: 20,
            },
            992: {
            	slidesPerView: 3,
            	spaceBetween: 20,
            },
            1268: {
            	slidesPerView: 4,
            	spaceBetween: 30,
            },*/
            320: {
                slidesPerView: 1,
                slidesPerColumn: 1,
                autoHeight: true,

            },
            561: {
                slidesPerView: 2,
                pagination: {

                    dynamicBullets: true,
                },
            },
            992: {
                slidesPerView: 3,
            }
        },

        on: {
            lazyImageReady: function() {
                ibg();
            }

        }
        // And if we need scrollbar
        //scrollbar: {
        //	el: '.swiper-scrollbar',
        //},
    });

    slider_feedbacks = new Swiper('.feedbacks__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 38,
        direction: 'vertical',
        pagination: {
            el: '.feedbacks__dotts',
            clickable: true,
        },
        breakpoints: {
            320: {
                direction: 'horizontal',
                slidesPerView: 1,
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
            },
            992: {
                slidesPerView: 3,
                direction: 'vertical',
                navigation: {
                    nextEl: '.slider-feedbacks__navigation_next',
                    prevEl: '.slider-feedbacks__navigation_prev',
                },
            }
        }
    })
}

var timer;

window.addEventListener('resize', function() {
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(initSwiper, 200);
});

initSwiper();