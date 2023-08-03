


//mediaScale = animasyon tipi,
//start.top = animasyonun başlayacağı top değeri header height'ı ile eşit olmalı
//start.scale = animasyonun başlamadan önceki image'ın scale değeri
//start.storyBottom =scrolla bağlı story alanının görüneceği bottom değeri
//start.storyMarginBottom = story alanın sayfanın ne kadar altından başlayacağını belirtir
//finish.value = scrolla bağlı image'ın scale değeri ve story' in opacity değeri bu değer ile orantılı bir şekilde 1 e gelecek
//finish.storyTop = scrolla bağlı story alanın tepe noktası bu noktadan sonra animasyonlar bitecek 


Feux.Animation = {
    Props: {
        animElemsSelector: '[data-f-anim]',
        animType: {
            mediaScale: {
                xl: { start: { top: 124, scale: 1.02, storyBottom: 150, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 220 } },
                lg: { start: { top: 124, scale: 1.02, storyBottom: 150, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 220 } },
                md: { start: { top: 112, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 192 } },
                sm2: { start: { top: 100, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 180 } },
                sm1: { start: { top: 100, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 180 } },
                xs2: { start: { top: 100, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 148 } },
                xs1: { start: { top: 100, scale: 1.02, storyBottom: 100, storyMarginBottom: -70 }, finish: { value: 300, storyTop: 148 } }
            },
            counter: {
                 xl: { start: { bottom: 400 }, speed: 400 },
                 lg: { start: { bottom: 400 }, speed: 400 },
                 md: { start: { bottom: 400 }, speed: 400 },
                sm2: { start: { bottom: 400 }, speed: 400 },
                sm1: { start: { bottom: 400 }, speed: 400 },
                xs2: { start: { bottom: 400 }, speed: 400 },
                xs1: { start: { bottom: 400 }, speed: 400 }
            }
        }
    },

    Elements: {},

    Current: {},

    ready: function () {
        // Initiate configuration setup 
        Feux.Animation.Actions.init();
    },

    scrollEvents: function (arg) {
        Feux.Animation.UX.animate();
    },

    Actions: {
        init: function () {
            var props = Feux.Animation.Props;
            var current = Feux.Animation.Current;
            var elements = Feux.Animation.Elements;

            Feux.Animation.Helper.setElements();
            Feux.Animation.Helper.setDefaultCss();
        },

    },

    UX: {

        animate: function () {
            var elements = Feux.Animation.Elements;
            var mqKey = Feux.Base.Props.MediaQ.Curr.key;

            for (var i = 0; i < elements.animElems.length; i++) {
                var elem = elements.animElems[i];
                var animType = elem.getAttribute("data-f-anim");
                var data = Feux.Animation.Props.animType[animType];

                if (data[mqKey]) {
                    //animasyon tipi "linear" (yazılar) ise 
                    if (animType === "linear") {
                        if (window.innerHeight * ((100 - data[mqKey].w) / 100) > elem.getBoundingClientRect().top) {
                            elem.style.transform = "translateX(" + 0 + ")";
                            elem.style.transform = "translateY(" + 0 + ")";
                            elem.style.opacity = 1;
                        }
                    }

                    //animasyon tipi "linear" (görseller) ise 
                    else if (animType === "p-img-y") {
                        //elemanın ekranda görünürlük durumunu belirliyoruz
                        if (elem.getBoundingClientRect().bottom < window.innerHeight && elem.getBoundingClientRect().top > 0) {
                            elem.setAttribute("data-f-screen", "on");
                        }
                        else if (elem.getBoundingClientRect().top > window.innerHeight || elem.getBoundingClientRect().bottom < 0) {
                            elem.setAttribute("data-f-screen", "off");
                        }
                        else {
                            elem.setAttribute("data-f-screen", "partial");
                        }

                        //eleman ekranda belirlediğimiz yüzdelik dilimine girdiğinde animasyon başlayacak
                        if (window.innerHeight * ((100 - data[mqKey].w) / 100) > elem.getBoundingClientRect().top) {

                            //domdaki ilk eleman ise
                            if (elem.getAttribute("data-f-anim-first-image") === "0") {
                                //transform y değerimizi belirliyoruz
                                elem.style.transform = "translateY(" + Feux.Base.Props.Scroll.Y.currval / data[mqKey].s + "px)";
                            }
                            else {
                                //transform y değerimizi belirliyoruz
                                var tyval = window.innerHeight * ((100 - data[mqKey].w) / 100) - elem.getBoundingClientRect().top;
                                elem.style.transform = "translateY(" + tyval / data[mqKey].s + "px)";

                            }
                        }

                        //eleman ekran dışında ve alt bölümünde ise transform y değerimizi sıfırlıyoruz
                        if (elem.getBoundingClientRect().top > window.innerHeight) {
                            elem.setAttribute("data-f-tyval", 0);
                            elem.style.transform = "translateY(" + 0 + ")";
                        }

                        //scroll değerimiz 0 ise ilk elemanın konumunu sıfırlıyoruz
                        if (Feux.Base.Props.Scroll.Y.currval === 0) {
                            elem.style.transform = "translateY(" + 0 + ")";
                        }

                    }

                    else if (animType === "mediaScale") {

                        //mediaItem
                        var media = elem.querySelector("[data-media-scale]");
                        var mediaItem = media.querySelector("[data-media-item]");
                        var containerTop = elem.getBoundingClientRect().top;
                        var iStartScale = data[mqKey].start.scale;
                        var startTop = data[mqKey].start.top;
                        var finishValue = data[mqKey].finish.value;

                        //story
                        var storyContainer = elem.querySelector("[data-story-opacity]");
                        var sTop = storyContainer.getBoundingClientRect().top;
                        var sStartBottom = data[mqKey].start.storyBottom;
                        var sFinishTop = data[mqKey].finish.storyTop;


                        //image scale animations
                        if (containerTop < startTop) {
                            if (startTop - finishValue < containerTop) {
                                var newScale = (((startTop - containerTop) * (1 - iStartScale)) / finishValue) + iStartScale;
                                media.style.transform = "scale(" + newScale + ")";
                                mediaItem.style.transition = "transform 5s";
                                mediaItem.style.transform = "scale(1.12)";
                            }
                            else {
                                media.style.transform = "scale(1)";
                            }
                        }
                        else {
                            media.style.transform = "scale(" + iStartScale + ")";
                        }

                        //media itemını scroll etmeye karşı ekranda tutuyoruz

                        if (containerTop < startTop) {
                            if (sTop > sFinishTop) {
                                media.style.position = "fixed";
                                media.style.top = startTop + "px";
                                elem.style.marginBottom = (startTop - containerTop) + "px";
                            }
                            else {

                                media.style.position = "absolute";
                                media.style.bottom = "-" + elem.style.marginBottom;
                                media.style.top = "auto";
                            }

                        }
                        else {
                            elem.style.marginBottom = "0";
                            media.style.position = "absolute";
                            media.style.top = "auto";
                            media.style.bottom = "0";
                        }

                        //story opacity animations
                        if (sTop > 0 && window.innerHeight - sTop > sStartBottom) {
                            var x = window.innerHeight - sTop - sStartBottom;

                            if (x < finishValue) {
                                storyContainer.style.opacity = x / finishValue;
                            }
                            else {
                                storyContainer.style.opacity = 1;
                            }

                        }
                    }

                    else if (animType === "counter") {
                        var containerTop = elem.getBoundingClientRect().top;

                        if (!elem.classList.contains("counter-anim-finished")) {
                            if (window.innerHeight - containerTop > data[mqKey].start.bottom) {
                                elem.classList.add("counter-anim-finished");
                                Feux.Animation.UX.startCounterAnimate(elem, data[mqKey].speed);
                            }
                        }


                    }
                }


            }
        },
        startCounterAnimate: function (section, speed) {

            const counters = section.querySelectorAll('[data-counter-anim]');

            counters.forEach(counter => {
                const animate = () => {
                    const value = +counter.getAttribute('data-counter-anim');
                    const data = +counter.innerText;

                    const time = value / speed;
                    if (data < value) {
                        counter.innerText = Math.ceil(data + time);
                        setTimeout(animate, 5);
                    } else {
                        counter.innerHTML = value;
                    }

                }

                animate();
            });

        },

    },

    Helper: {

        setElements: function () {
            var props = Feux.Animation.Props;
            var elements = Feux.Animation.Elements;

            elements.animElems = document.querySelectorAll(props.animElemsSelector);
        },
        setDefaultCss: function () {

            var elements = Feux.Animation.Elements;
            var mqKey = Feux.Base.Props.MediaQ.Curr.key;

            //default css ler atanıyor
            for (var i = 0; i < elements.animElems.length; i++) {

                var elem = elements.animElems[i];
                var animType = elem.getAttribute("data-f-anim");
                var data = Feux.Animation.Props.animType[animType];

                if (data[mqKey]) {
                    if (animType === "linear") {

                        var tranlateValue = data[mqKey].p.split("|");
                        elem.style.transform = "translateX(" + tranlateValue[0] + "px)";
                        elem.style.transform = "translateY(" + tranlateValue[1] + "px)";
                        elem.style.transitionDuration = data[mqKey].s + "s";
                        elem.style.opacity = 0;
                    }
                    else if (animType === "mediaScale") {
                        var media = elem.querySelector("[data-media-scale]");

                        media.style.transform = "scale(" + data[mqKey].start.scale + ")";
                        media.style.transition = "scale 0.2s";

                        var storyContainer = elem.querySelector("[data-story-opacity]");
                        storyContainer.style.opacity = 0;
                        storyContainer.style.transition = "opacity 0.2s";
                        storyContainer.style.marginBottom = data[mqKey].start.storyMarginBottom + "px";

                    }
                }

            }
        }

    }
};

// End


Feux.Animation.ready();



//for a linear animation use this data

//'{
//"xl": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"lg": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"md": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"sm2": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"sm1": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"xs2": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" },
//"xs1": { "type": "linear", "w": "30", "s": "0.5", "p": "0|35" }
//}'

////////////////////////////////////////////////////////