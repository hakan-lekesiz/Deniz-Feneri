// Search Object


Feux.Search = {
    Props: {
        searchAreaId: 'search-area',
        searchTextboxId: 'search-textbox',
        searchListContainerId: 'autoCompletePlaceholder',
        searchButtonId: 'search-button'
    },

    Settings: {
        overlayAboveHeader: true, // Overlay covers header or not.
        escPress: true, // Close search list container on esc press.
        firstFocus: false, // Opens search list container on textbox focus.
        OnClickClose: {
            funcname: null, // Call custom function on closing.
            funcarg: null
        },
        OnInput: {
            proxyfunc: "Feux.Search.Actions.searchByKey", // Call proxy function as inputting ends.
            delay: 300  // Typing delay value.
        }
    },

    Elements: {},

    Current: {},

    ready: function () {
        // Initiate configuration setup 
        Feux.Search.Actions.init();
    },

    resize: function (arg) {

    },

    Actions: {
        init: function () {
            Feux.Search.Helper.setCurrent();
            Feux.Search.Helper.setElements();
        },

        mfInit: function (arg) {
            // If mf is used, add onload attribute to call mfInit function with container id.
            Feux.Search.Helper.setCurrent();
            Feux.Search.Helper.setElements();
        },

        focus: function (arg) {
            // Get current object
            var current = Feux.Search.Current;

            if (current.state === "off" && current.Settings.firstFocus) {
                // Set current new properties
                current.submitter = arg.sender;
                current.state = "on";
                current.status = "showing";

                Feux.Search.Props = {
                    searchAreaId: arg.sender.getAttribute("data-search-area-id"),
                    searchTextboxId: arg.sender.id,
                    searchListContainerId: arg.sender.getAttribute("data-list-container-id"),
                    searchButtonId: arg.sender.getAttribute("data-search-button-id"),
                }

                Feux.Search.Helper.setCurrent();
                Feux.Search.Helper.setElements();
                // Show search list container
                Feux.Search.UX.show();
            }
        },

        input: function (arg) {

            // Get shortcuts
            var current = Feux.Search.Current;
            current.status = "inputting";

            if (current.inputting) {
                // If still typing cancel settimeout.
                clearTimeout(current.inputting);
                current.inputting = null;
                current.status = "inputting";
            }

            if (current.inputting === null) {
                current.inputting = setTimeout(function () {
                    var proxyfunc = current.Settings.OnInput.proxyfunc;
                    var searchVal = Feux.Search.Elements.searchTextboxEl.value;

                    executeFunction(proxyfunc, [searchVal, Feux.Search.Helper.proxySucess, Feux.Search.Helper.proxyError]);
                    current.status = "";
                }, current.Settings.OnInput.delay);
            }
        },

        closeClick: function (arg) {
            if (arg) {
                if (arg.hasOwnProperty('ev')) { arg.ev.preventDefault(); }

                // Disable sender to avoid multiple clicks from user.
                var sender = arg.sender;
                if (sender.disabled) { return false; }
                sender.disabled = true;

                setTimeout(function () {
                    sender.disabled = false;
                }, 100);
            }

            // Get common short cuts.
            var current = Feux.Search.Current;

            // Set current new properties
            current.submitter = sender;
            current.status = "hiding";

            // Go to hide action.
            Feux.Search.UX.close();
        },

        escKeyPress: function () {
            if (Feux.Search.Current.Settings.escPress) {
                if (Feux.Search.Current.state === "on") {

                    setTimeout(function () {
                        this.disabled = false;
                    }, 300);

                    Feux.Search.Actions.closeClick({ sender: this });
                }
            }
        },

        enterKeyPress: function () {
            Feux.Search.Actions.goSearchResultPage();
        },

        overlayClick: function (arg) {
            Feux.Search.Actions.closeClick({ sender: this });
        },

        clearValue: function () {
            var elements = Feux.Search.Elements;
            elements.searchTextboxEl.value = "";

            //display focus elements
            elements.searchListContainerEl.querySelector(".on-search").style.display = "none";
            elements.searchListContainerEl.querySelector(".on-focus").removeAttribute("style");

        },

        goSearchResultPage: function () {
            var elements = Feux.Search.Elements;
            window.location.href = elements.searchButton.getAttribute("data-href") + elements.searchTextboxEl.value;
        },

        showSearchContainer: function (arg) {

            var event = arg.ev;
            event.preventDefault();

            var searchBox = document.getElementById("search-textbox");
            var container = document.getElementById("search-area");
            Feux.Globals.bodyElem.classList.add("noscroll");
            container.classList.add("on");
            searchBox.focus();

        },

        searchByKey: function (searchKey, successCallback, errorCallback) {

            //var data = [searchKey, rootPageId]

            //var fd = new FormData();
            //fd.append('data', JSON.stringify(data));

            //$.ajax({
            //    url: "/umbraco/surface/Misc/SearchByKey/",
            //    type: "POST",
            //    data: fd,
            //    contentType: false,
            //    processData: false,
            //    success: function (response) {
            //        successCallback(response);
            //    },
            //    error: function (response) {
            //        errorCallback(response);
            //    }
            //});

            //bu alanda backend'en gelen ceveap iligili dom elemanına eklenir
            //gelen cevap Feux.Search.Helper.proxySucess() fonksiyonuna paslanır bu alana html göndermeniz yeterli 
            //backend olmadığı için static bir html gönderiyorum 
            //backend bağlandığında aşağıdaki satırı kaldırıp response da html dönmeniz yeterli

            Feux.Search.Helper.proxySucess(document.getElementById("search-result-template").innerHTML);

            //sonuç bulunamadı ise
            // Feux.Search.Helper.proxySucess(document.getElementById("search-result-not-found-template").innerHTML);

        }
    },

    UX: {
        show: function () {
            var props = Feux.Search.Props;
            var elements = Feux.Search.Elements;
            var current = Feux.Search.Current;
            // Display search list container.
            elements.searchAreaEl.classList.add('on');

            elements.searchListContainerEl.removeAttribute("style");

            if (current.Settings.overlayAboveHeader) {
                // Move overlay under search area container to cover header.
                elements.searchAreaEl.insertBefore(Feux.Globals.overlayWrElem, elements.searchAreaEl.childNodes[0]);
            }
            else {
                // Move overlay under content wrapper not to cover header area.
                Feux.Globals.contentWr.insertBefore(Feux.Globals.overlayWrElem, null);
            }

            // Show overlay
            Feux.Globals.overlayWrElem.classList.add("on");

        },

        close: function () {
            var elements = Feux.Search.Elements;
            var current = Feux.Search.Current;

            elements.searchAreaEl.classList.remove('on');
            current.state = "off";
            current.status = "";
            elements.searchListContainerEl.style.display = "none";

            // Clear and blur search textbox element
            elements.searchTextboxEl.value = "";
            elements.searchTextboxEl.blur();


            // Move overlay back to its original position.
            Feux.Globals.pageWr.insertBefore(Feux.Globals.overlayWrElem, null);

            // Hide overlay
            Feux.Globals.overlayWrElem.classList.remove("on");
            Feux.Globals.bodyElem.classList.remove("noscroll");



            // Call on-click-close function if saved in current object
            if (current.Settings.OnClickClose.funcname) {
                executeFunction(current.Settings.OnClickClose.funcname, current.Settings.OnClickClose.funcarg);
            }
        }
    },

    Helper: {
        setCurrent: function () {

            Feux.Search.Current = {
                state: 'off',
                status: '',
                inputting: null,
                isListContainerClick: false,
                submitter: null,
                submitterArg: {},
                Settings: Feux.Search.Settings
            };
        },

        setElements: function () {
            var props = Feux.Search.Props;
            var elements = Feux.Search.Elements;

            elements.searchAreaEl = document.getElementById(props.searchAreaId);
            elements.searchTextboxEl = document.getElementById(props.searchTextboxId);
            elements.searchListContainerEl = document.getElementById(props.searchListContainerId);
            elements.searchButton = document.getElementById(props.searchButtonId);
        },

        proxySucess: function (response) {


            var current = Feux.Search.Current;
            document.querySelector("#search-result-items").innerHTML = "";
            if (response) {
                document.querySelector("#search-result-items").innerHTML = response;
            }

            if (current.state === "off" && !current.Settings.firstFocus) {
                // Set current new properties
                current.submitter = null;
                current.state = "on";
                current.status = "showing";

                // Show search list container
                Feux.Search.UX.show();
            }
        },

        proxyError: function (response) {
        }
    }
};

// End

// Functions to call as DOM ready

//if (!Feux.Globals.isMF) {
Feux.Search.ready();
//}

// End

