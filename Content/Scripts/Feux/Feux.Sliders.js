Feux.Sliders = {
    Props: {},

    Elements: {},

    Current: {},

    ready: function () {
        Feux.Sliders.Actions.init();
    },

    Actions: {
        init: function () {
            Feux.Sliders.Actions.owlCarouselType01();
        },

        owlCarouselType01: function () {
            var mediaQ = Feux.Base.Props.MediaQ.Curr.key;
            if (mediaQ === "md" || mediaQ === "lg") {

                $(".owl-carousel.slide-type-01.slide-item-count-5").owlCarousel({
                    loop: false,
                    lazyLoad: true,
                    center: false,
                    dots: false,
                    touchDrag: true,
                    responsiveClass: true,
                    autoWidth: true,
                    nav: true,
                    navText: [`<a href="javascript:void(0);" class="prev nav  nav-bar-left">
                     <img src="Content/Visuals/left-iconfinder.png" alt="Alternate Text" />
                </a>`, `<a href="javascript:void(0);" class="next nav  nav-bar-right">
                        <img src="Content/Visuals/rigth-iconfinder.png" alt="Alternate Text" />
                    </a>`],
                    responsive: {
                        0: {
                            items: 5,
                            margin: 12,
                        },
                        768: {
                            items: 5,
                            margin: 16,
                        },
                        1300: {
                            items: 5,
                            margin: 40,
                        },


                    }
                });
            }

            $(".owl-carousel.slide-type-01.slide-item-count-3").owlCarousel({
                loop: false,
                lazyLoad: true,
                center: false,
                items: 3,
                dots: false,
                touchDrag: true,
                responsiveClass: true,
                autoWidth: true,
                nav: true,
                margin: 25,
                navText: [`<a href="javascript:void(0);" class="prev nav  nav-bar-left">
                     <img src="Content/Visuals/left-iconfinder.png" alt="Alternate Text" />
                </a>`, `<a href="javascript:void(0);" class="next nav  nav-bar-right">
                        <img src="Content/Visuals/rigth-iconfinder.png" alt="Alternate Text" />
                    </a>`]
            });

            $(".owl-carousel.slide-type-01.slide-item-count-3-1").owlCarousel({
                loop: false,
                lazyLoad: true,
                center: false,
                items: 4,
                dots: false,
                touchDrag: true,
                responsiveClass: true,
                autoWidth: true,
                nav: true,
                navText: [`<a href="javascript:void(0);" class="prev nav  nav-bar-left">
                     <img src="Content/Visuals/left-iconfinder.png" alt="Alternate Text" />
                </a>`, `<a href="javascript:void(0);" class="next nav  nav-bar-right">
                        <img src="Content/Visuals/rigth-iconfinder.png" alt="Alternate Text" />
                    </a>`],
                responsive: {
                    0: {
                        items: 2,
                        margin: 50,
                        nav: false,
                    },
                    768: {
                        items: 2,
                        nav: false,
                        margin: 16,
                    },
                    1300: {
                        items: 4,
                        margin: 35,
                    },
                }
            });
            $(".owl-carousel.slide-type-01.slide-item-count-2").owlCarousel({
                loop: false,
                lazyLoad: true,
                center: false,
                items: 2,
                dots: false,
                touchDrag: true,
                responsiveClass: true,
                autoWidth: true,
                responsive: {
                    0: {
                        margin: 12
                    },
                    768: {
                        margin: 16
                    },
                    1440: {
                        margin: 20
                    },
                    1680: {
                        margin: 24
                    },
                    1920: {
                        margin: 28,
                    }
                }
            });

            $(".owl-carousel.slide-type-01.slide-item-count-1").owlCarousel({
                loop: false,
                lazyLoad: true,
                center: false,
                items: 1,
                dots: true,
                touchDrag: true,
                responsiveClass: true,
                autoWidth: false,
                nav: true,
                navText: [`<a href="javascript:void(0);" class="prev nav  nav-bar-left">
                     <img src="Content/Visuals/Home/nav_icon_left.png" alt="left" />
                </a>`, `<a href="javascript:void(0);" class="next nav  nav-bar-right">
                        <img src="Content/Visuals/Home/nav_icon_right.png" alt="rigth" />
                    </a>`],

            });

            $(".owl-carousel.slide-type-02").owlCarousel({
                loop: false,
                lazyLoad: true,
                center: false,
                items: 1,
                dots: true,
                touchDrag: true,
                responsiveClass: true,
                autoWidth: false,
                nav: true,
                dotsData: true,
                navText: [`<a href="javascript:void(0);" class="prev nav  nav-bar-left">
                     <img src="Content/Visuals/News/left-arrow.png" alt="left" />
                </a>`, `<a href="javascript:void(0);" class="next nav  nav-bar-right">
                        <img src="Content/Visuals/News/right-arrow.png" alt="rigth" />
                    </a>`],

            });

        },
    },

};

$(function () {
    Feux.Sliders.ready();
});

