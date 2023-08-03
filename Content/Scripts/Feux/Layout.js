Feux.Layout = {
    Map: {
        status: {
            mausePos: {
                x: 0,
                y: 0
            },
            isMapLoaded: false
        },
        setEventListeners: function () {
            var elements = document.querySelectorAll("#map-area .cls-1.on, #city-names-area [data-id]");
            var infoWindow = document.getElementById("info-window");

            infoWindow.onmouseleave = function () {
                Feux.Layout.Map.closeInfoWindow();

            };

            for (var i = 0; i < elements.length; i++) {
                var elem = elements[i];

                if (Feux.Base.Props.MediaQ.Curr.key === "md" || Feux.Base.Props.MediaQ.Curr.key === "lg") {
                    elem.onmouseenter = function () {
                        var id = this.getAttribute("data-id");
                        Feux.Layout.Map.openInfoWindow(id);
                    };

                    elem.onmouseleave = function () {
                        var id = this.getAttribute("data-id");

                        var x = Feux.Layout.Map.status.mausePos.x;
                        var y = Feux.Layout.Map.status.mausePos.y;
                        var bounds = infoWindow.getBoundingClientRect();
                        var isMouseInInfoWindow = (x < bounds.right && x > bounds.left); //mause x düzleminde info window içindeyse
                        isMouseInInfoWindow = isMouseInInfoWindow && (y < bounds.bottom && y + 5 > bounds.top); //mause y düzleminde info window içindeyse

                        if (!isMouseInInfoWindow) {

                            Feux.Layout.Map.closeInfoWindow();
                        }


                    };
                }
                else {
                    elem.onclick = function () {
                        var id = this.getAttribute("data-id");
                        Feux.Layout.Map.openInfoWindow(id);
                    };
                }
            }

            onmousemove = function (e) {
                Feux.Layout.Map.status.mausePos.x = e.clientX;
                Feux.Layout.Map.status.mausePos.y = e.clientY;
            }
            Feux.Layout.Map.status.isMapLoaded = true;
        },
        openInfoWindow: function (id) {

            var elem = document.querySelector("#map-area .cls-1.on[data-id='" + id + "']");
            var bounds = elem.getBoundingClientRect();
            var html = contents.filter(x => x.id === id)[0].html;

            var infoWindow = document.getElementById("info-window");
            infoWindow.innerHTML = html;
            infoWindow.style.top = (bounds.bottom - ((bounds.bottom - bounds.top) / 2)) + "px"; //orta nokta bulunup yukardan 10px aşağı indirildi

            var left = bounds.right - 80 - ((bounds.right - bounds.left) / 2);
            left = left < 30 ? 30 : left;

            if (window.innerWidth < (infoWindow.getBoundingClientRect().width + left + 20)) {
                infoWindow.style.left = "auto";
                infoWindow.style.right = "30px";
            }
            else {
                infoWindow.style.left = left + "px";
                infoWindow.style.right = "auto";
            }

            infoWindow.classList.add("on");
        },
        closeInfoWindow: function () {
            console.log("closeInfoWindow")
            var infoWindow = document.getElementById("info-window");
            infoWindow.removeAttribute("style");
            infoWindow.classList.remove("on");
        },
    },
    Donate: {
        status: {
            listHtml: ""
        },
        search: function (sender) {

            var searchParam = sender.value;
            document.getElementById("list-container").innerHTML = Feux.Layout.Donate.status.listHtml;
            document.getElementById("not-result").style.display = "none";

            if (searchParam === "") {
                document.getElementById("clear-search").style.display = "none";
                Feux.Globals.bodyElem.classList.remove("donate-on-search");
            }
            else {
                document.getElementById("clear-search").style.display = "flex";
                if (!Feux.Globals.bodyElem.classList.contains("donate-on-search")) {
                    Feux.Globals.bodyElem.classList.add("donate-on-search");
                }
                var categories = document.querySelectorAll("[data-donate-ctg-search-val]");
                var showNotResult = true;

                for (var i = 0; i < categories.length; i++) {
                    var category = categories[i];
                    var items = category.querySelectorAll("[data-donate-search-val]");

                    var showCategory = false;

                    for (var j = 0; j < items.length; j++) {
                        var item = items[j];
                        var val = item.getAttribute("data-donate-search-val");

                        if (val.toLocaleLowerCase('tr').includes(searchParam.toLocaleLowerCase('tr'))) {
                            showCategory = true;
                            showNotResult = false;
                        }
                        else {
                            item.style.display = "none";
                        }

                    }

                    if (!showCategory) {
                        category.style.display = "none";
                    }


                }

                if (showNotResult) {
                    document.getElementById("not-result").removeAttribute("style");
                }
            }
        },
        resetFilter: function () {
            document.getElementById("search-donate").value = "";
            document.getElementById("not-result").style.display = "none";
                document.getElementById("clear-search").style.display = "none";
            document.getElementById("list-container").innerHTML = Feux.Layout.Donate.status.listHtml;
            Feux.Globals.bodyElem.classList.remove("donate-on-search");
            
        },
        init: function () {
            Feux.Layout.Donate.status.listHtml = document.getElementById("list-container").innerHTML;
        }
    },
    copyText: function (sender) {

        var text = sender.getAttribute("data-value");
        if (window.clipboardData && window.clipboardData.setData) {
            // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
            window.clipboardData.setData("Text", text);
            alert("IBAN No Kopyalandı: " + text);
            $(sender.parentNode.querySelector(".c-unit-03-B")).fadeIn();

            setTimeout(function () {
                $(sender.parentNode.querySelector(".c-unit-03-B")).fadeOut();
            },3500);


        }
        else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");  // Security exception may be thrown by some browsers.
                $(sender.parentNode.querySelector(".c-unit-03-B")).fadeIn();

                setTimeout(function () {
                    $(sender.parentNode.querySelector(".c-unit-03-B")).fadeOut();
                }, 3500);
            }
            catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                prompt("Copy to clipboard: Ctrl+C, Enter", text);
            }
            finally {
                document.body.removeChild(textarea);
            }
        }

    },
    playVideo: function (sender) {

        if (sender.paused) {
            sender.setAttribute("controls", "controls");
            setTimeout(function () {
                sender.play();

            }, 100);
        }
        else {
            sender.removeAttribute("controls");
            sender.pause();
        }
    },
    News: {
        search: function (sender) {

            var searchParam = sender.value;
             
            if (searchParam === "") {
                document.getElementById("clear-search").style.display = "none"; 
            }
            else {
                document.getElementById("clear-search").style.display = "flex";
            }
        },
        resetFilter: function () {
            document.getElementById("search-news").value = ""; 
            document.getElementById("clear-search").style.display = "none";  
        },
        
    },
}

 
