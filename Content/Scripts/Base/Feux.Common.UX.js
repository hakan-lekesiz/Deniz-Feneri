Feux.UX = {
    expand: function (arg) {
        if (arg.hasOwnProperty('ev')) { arg.ev.preventDefault(); }

        // Disable sender to avoid multiple clicks from user.
        var sender = arg.sender;
        if (sender.disabled) { return false; }
        sender.disabled = true;
        // End

        if (sender.getAttribute("contentId")) {
            Feux.UX.closeAllOpenExpanders()
        }

        var containerSelectorName = arg.contentId;
        var containerEl = document.querySelector('[data-expand="' + containerSelectorName + '"]');
        var expandIcon = document.querySelector('#expandIcon-' + containerSelectorName + '');
        var expandingContentEl = containerEl.getElementsByClassName("expandingContent")[0];
        var contentHeight = expandingContentEl.offsetHeight;
        var isInitOn = containerEl.classList.contains('init-on'); // Is initially on.
        var isExpanded = containerEl.classList.contains('on');
        var senderStyle = arg.senderStyle;
        var parentId = arg.parentId;
        var parentEl = document.getElementById(parentId);

        if (!isExpanded && !isInitOn) {
            containerEl.classList.add("on");
            containerEl.style.height = contentHeight + "px";

            if (senderStyle === "rotate") {
                expandIcon.style.transform = "rotate(180deg)";
                expandIcon.style.transition = "transform 0.3s";
                sender.classList.add('on');
                if (parentEl) {
                    parentEl.classList.add('on');
                }
            }
            else if (senderStyle === "change") {
                sender.children[0].style.display = "none";
                sender.children[1].style.display = "block";
                if (parentEl) {
                    parentEl.classList.add('on');
                }
            }

            setTimeout(function () {
                containerEl.style.height = "auto";
                sender.disabled = false;
            }, 1000);
        }
        else {
            containerEl.style.height = contentHeight + "px";

            setTimeout(function () {
                containerEl.style.height = 0;
                containerEl.classList.remove("on");
                containerEl.classList.remove("init-on");
                sender.classList.remove('on');

                if (senderStyle === "rotate") {
                    expandIcon.style.transform = "rotate(0)";

                    if (parentEl) {
                        parentEl.classList.remove('on');
                    }
                }

                else if (senderStyle === "change") {
                    sender.children[0].removeAttribute("style");
                    sender.children[1].style.display = "none";
                    if (parentEl) {
                        parentEl.classList.remove('on');
                    }
                }

                setTimeout(function () {
                    sender.disabled = false;
                }, 1000);
            }, 10);
        }
    },

    closeAllOpenExpanders: function (arg) {
        var otherPageEl = document.querySelector("[data-page-class]");
        var otherPageClass = otherPageEl ? true : false;
        var openExpanders = null;
        var openExpander = null;

        if (otherPageClass) {
            otherPageClass = otherPageEl.getAttribute("data-page-class");
            openExpanders = document.querySelectorAll(otherPageClass + ".on");;
        } else {

            openExpanders = document.querySelectorAll(".c-item-01.on");
        }

        for (var i = 0; i < openExpanders.length; i++) {
            if (openExpanders[i].getAttribute("contentId")) {
                openExpander = openExpanders[i];
                break;
            }
        }
        if (openExpander) {
            var containerSelectorName = openExpander.getAttribute("contentId");
            var containerEl = document.querySelector('[data-expand="' + containerSelectorName + '"]');
            var expandIcon = document.querySelector('#expandIcon-' + containerSelectorName + '');
            var expandingContentEl = containerEl.getElementsByClassName("expandingContent")[0];
            var contentHeight = expandingContentEl.offsetHeight;

            containerEl.style.height = contentHeight + "px";

            setTimeout(function () {
                containerEl.style.height = 0;
                containerEl.classList.remove("on");
                containerEl.classList.remove("init-on");
                openExpander.classList.remove('on');
                expandIcon.style.transform = "rotate(0)";

            }, 10);
        }

    },

    toggleElem: function (sender, className, parentElemSelector) {
        var parentElem = findAncestor(sender, parentElemSelector);

        if (parentElem.classList.contains(className)) {
            parentElem.classList.remove(className);
        }
        else {
            parentElem.classList.add(className);
        }

    },

    switchContainer: function (arg) {
        if (arg.hasOwnProperty('ev')) { arg.ev.preventDefault(); }

        // Disable sender to avoid multiple clicks from user.
        if (arg.hasOwnProperty('sender')) {
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            setTimeout(function () {
                sender.disabled = false;
            }, 100);
        }
        // End

        // Get "from" and "to" container.
        var fromContainer = document.querySelector(arg.from);
        var toContainer = document.querySelector(arg.to);

        // Get height value.
        var fromContainerHeight = fromContainer.offsetHeight;
        var toContainerHeight = toContainer.offsetHeight;

        // Get group name.
        var groupName = fromContainer.getAttribute("data-switch-group");
        var groupParent = document.querySelector("[data-switch-group-parent='" + groupName + "']");

        // Switch-off "fromContainer"
        fromContainer.classList.add('switching-off');

        // Assign height values on parent container.
        groupParent.style.height = fromContainerHeight + "px";

        setTimeout(function () {
            fromContainer.classList.remove('switch-on');
            fromContainer.classList.remove('switching-off');

            groupParent.style.height = toContainerHeight + "px";
            toContainer.classList.add('switch-on');

            setTimeout(function () {
                groupParent.style.height = "auto";
            }, 350);
        }, 350);
    },

    displayListItems: function (arg) {
        var sender = arg.sender;

        // Reset active menu selector item.
        var activeSelector = document.querySelector("[data-tag-menu] a.on");
        activeSelector.classList.remove("on");

        // Activate new menu selector item.
        sender.classList.add("on");

        // Get all list items.
        var allListItems = document.querySelectorAll('[data-tag-name]');

        // Get user selected tagname.
        var selectedTag = arg.tagValue;

        if (selectedTag) {
            for (var i = 0; i < allListItems.length; i++) {
                var listItem = allListItems[i];

                if (listItem.getAttribute('data-tag-name') === selectedTag) {
                    listItem.removeAttribute("style");
                }
                else {
                    listItem.style.display = "none";
                }
            }
        }
        else {
            for (var i = 0; i < allListItems.length; i++) {
                var listItem = allListItems[i];
                listItem.removeAttribute("style");
            }
        }
    },

    breadcrumbMenuScroll: function () {
        var left = 0;
        if ($('.comp-other-10').length) {
            $('.comp-other-10').animate({
                scrollLeft: $('a[class="c-item-01 on"]').offset().left - left - 20 + "px"
            }, 800);
        }
    },

    print: function printAgreement(arg) {
        var width = 750;
        var height = 450;
        var left = (window.innerWidth / 2) - (width / 2);
        var top = (window.innerHeight / 2) - (height / 2) - 20;

        var w = window.open('', 'PRINT', 'top=' + top + ', left=' + left + ', width=' + width + ', height=' + height);
        w.document.write('<html><head><title>' + top + '</title>  <link href="Content/Styles/Css/Base.css" rel="stylesheet" type="text/css" />');
        w.document.write('</head><body>');
        w.document.write(document.getElementById(arg.elementId).innerHTML);
        w.document.write('</body></html>');
        w.document.close();
        w.focus();
        w.print();

        return true;
    },

    SectionImage: {
        over: function (arg) {
            var sender = arg.sender;
            var sectionImageId = sender.getAttribute("data-section-image-id");
            var sectionImageEl = document.getElementById(sectionImageId);
            sectionImageEl.classList.add('on');
        },

        out: function (arg) {
            var sender = arg.sender;
            var sectionImageId = sender.getAttribute("data-section-image-id");
            var sectionImageEl = document.getElementById(sectionImageId);
            sectionImageEl.classList.remove('on');
        }
    },

    DropMenu: {
        show: function (arg) {
            // Disable sender to avoid multiple clicks from user.
            arg.ev.preventDefault();
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;
            setTimeout(function () { sender.disabled = false; }, 1000);

            // If sender is active, then hide drop menu.
            var isActiveSender = sender.classList.contains('on');

            if (isActiveSender) {
                Feux.UX.DropMenu.hide();
                return;
            }

            // Get related dropmenu element and display with animation.
            var menuEl = document.getElementById(arg.menuId);
            menuEl.classList.add('on');

            // Display overlay with specific class.
            Feux.Globals.overlayWrElem.classList.add('f-dropmenu-overlay');

            // Move overlay under parentEl.
            var menuParentEl = menuEl.parentNode;
            menuParentEl.insertBefore(Feux.Globals.overlayWrElem, sender.parentNode.childNodes[0]);

            // Show overlay
            setTimeout(function () { Feux.Globals.overlayWrElem.classList.add('on'); }, 10);

            // Add sender an active class
            sender.classList.add("f-dropmenu-sender");
            sender.classList.add("on");

            if (arg.hasOwnProperty("hideOnScroll")) {
                // Add a flag for scrolling event which is used to hide on scroll.
                sender.setAttribute("data-hide-on-scroll", arg.hideOnScroll);
            }

        },

        hide: function () {
            var activeDropMenu = document.querySelector('.f-dropmenu.on');

            if (activeDropMenu) {
                // Hide drop menu.
                activeDropMenu.classList.remove('on');

                // Remove sender active class.
                var senderBtn = document.querySelector('.f-dropmenu-sender.on');
                senderBtn.classList.remove('on');

                // Hide overlay.
                Feux.Globals.overlayWrElem.classList.remove("on");
                setTimeout(function () { Feux.Globals.overlayWrElem.classList.remove('f-dropmenu-overlay'); }, 400);

                // Move overlay back to its original position and hide it.
                setTimeout(function () { Feux.Globals.pageWr.insertBefore(Feux.Globals.overlayWrElem, null); }, 600);

                // Enable scrolling.
                Feux.Base.Scroll.enable();
            }
        },

        overlayClick: function () {
            Feux.UX.DropMenu.hide();
        },

        resize: function () {
            Feux.UX.DropMenu.hide();
        },

        escKeyPress: function () {
            Feux.UX.DropMenu.hide();
        },

        onScroll: function () {
            // Check if need to hide on scrolling.
            var dropMenuSender = document.querySelector('.f-dropmenu-sender[data-hide-on-scroll=true]');

            if (dropMenuSender) {
                Feux.UX.DropMenu.hide();
            }
        }
    },

    Owl: {
        Props: {
            selector: "data-owl",
            speed: 300,
            navi: true,
            autoWidth: true,
            items: 1,
            loop: false,
            center: false
        },

        Current: {
            isDragging: false
        },

        Actions: {
            init: function (arg) {
                if (arg === undefined || arg === null) arg = {};

                // Find owl elements.
                var owlSelector = Feux.UX.Owl.Props.selector;
                var owlElements;
                var containerSelector = arg.containerSelector;
                var specificOwlSelector = arg.specificOwlSelector;

                if ('containerSelector' in arg) {
                    // If specific container element is requested.
                    owlElements = $(containerSelector).find('[' + owlSelector + ']');
                    owlElements.each(function (index, owlElem) {
                        if ($(owlElem).data('owl.carousel')) {
                            $(owlElem).owlCarousel('destroy');
                            $(owlElem).owlCarousel({ touchDrag: false, mouseDrag: false });
                        }
                    });
                }
                else if ('specificOwlSelector' in arg) {
                    // If specific single owl element is requested.
                    owlElements = $(specificOwlSelector);
                }
                else {
                    // Get all owl elements.
                    owlElements = $('[' + owlSelector + ']');
                }

                // Loop through all owl elements to initiate.
                owlElements.each(function (index, owlElem) {
                    // Clone default properties to use as current owl properties.
                    var currentProps = JSON.parse(JSON.stringify(Feux.UX.Owl.Props));

                    // Retrieve json properties and update current properties. The attribute value can be 
                    // empty string or just set as 'true'. Therefore, check the length of newPropArg value.
                    var newPropArg = $(owlElem).attr(owlSelector);

                    if (newPropArg.length > 5) {
                        var newProps = JSON.parse($(owlElem).attr(owlSelector));

                        for (var key in newProps) {
                            currentProps[key] = newProps[key];
                        }
                    }

                    // Retrieve functions to call
                    var onDragCallbackFunction = Feux.UX.Owl.Actions.drag;
                    var onDraggedCallbackFunction = Feux.UX.Owl.Actions.dragged;
                    var onTranslateCallbackFunction = Feux.UX.Owl.Actions.translate;
                    var onTranslatedCallbackFunction = Feux.UX.Owl.Actions.translated;

                    // Retrieve responsive resolution values
                    var md = Feux.Base.Props.MediaQ.Res.md;
                    var lg = Feux.Base.Props.MediaQ.Res.lg;
                    var xl = Feux.Base.Props.MediaQ.Res.xl;
                    var _responsiveObj = {};
                    if (currentProps.margin) {
                        _responsiveObj[md] = { margin: currentProps.margin.md };
                        _responsiveObj[lg] = { margin: currentProps.margin.lg };
                        _responsiveObj[xl] = { margin: currentProps.margin.xl };
                    }

                    // Build owl carousel.
                    $(owlElem).owlCarousel({
                        items: currentProps.items,
                        autoWidth: currentProps.autoWidth,
                        navi: currentProps.navi,
                        smartSpeed: currentProps.speed,
                        loop: currentProps.loop,
                        center: currentProps.center,
                        responsive: _responsiveObj,
                        onDrag: onDragCallbackFunction,
                        onDragged: onDraggedCallbackFunction,
                        onTranslate: onTranslateCallbackFunction,
                        onTranslated: onTranslatedCallbackFunction
                    });
                });
            },

            drag: function (event) {
                var owlElem = event.currentTarget;
                owlElem.setAttribute("data-drag", "true");

                // Call custom drag functions.
                var owlSelector = Feux.UX.Owl.Props.selector;
                var argString = owlElem.getAttribute(owlSelector);
                var arg = JSON.parse(argString);

                if (arg.hasOwnProperty('drag')) {
                    executeFunction(arg.drag, arg.dragArg);
                }
            },

            dragged: function (event) {
                // Call custom onDragged functions.
                var owlElem = event.currentTarget;
                var owlSelector = Feux.UX.Owl.Props.selector;
                var argString = owlElem.getAttribute(owlSelector);
                var arg = JSON.parse(argString);

                if (arg.hasOwnProperty('dragged')) {
                    executeFunction(arg.dragged, arg.draggedArg);
                }
            },

            translate: function (event) {
                var owlElem = event.currentTarget;

                // Call custom onTranslated functions.
                var owlSelector = Feux.UX.Owl.Props.selector;
                var argString = owlElem.getAttribute(owlSelector);
                var arg = JSON.parse(argString);

                if (arg.hasOwnProperty('translate')) {
                    executeFunction(arg.translate, arg.translateArg);
                }
            },

            translated: function (event) {
                var owlElem = event.currentTarget;
                owlElem.setAttribute("data-drag", "false");

                // Call custom onTranslated functions.
                var owlSelector = Feux.UX.Owl.Props.selector;
                var argString = owlElem.getAttribute(owlSelector);
                var arg = JSON.parse(argString);

                if (arg.hasOwnProperty('translated')) {
                    executeFunction(arg.translated, arg.translatedArg);
                }
            }
        }
    }
};

Feux.UX.breadcrumbMenuScroll();