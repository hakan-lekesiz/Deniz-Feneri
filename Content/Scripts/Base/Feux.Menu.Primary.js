// Menu Primary Object

Feux.MenuPrimary = {
    Props: {
        Settings: {
            xs1: {
                // type: Menu type (possible values: regular, hamburger)
                type: 'hamburger',

                // header: Based on header type position header (Especially fixed headers  not working under transformed containers)
                header: 'fixed', // empty string or 'fixed' are the values.

                // hideByOverlay: Overlay click hides menu if true.
                hideByOverlay: true,

                // hideByEscape: Esc key hit hides menu if true.
                hideByEscape: false,

                // account: Move user account menu into animation wrapper if true.
                account: false,

                // logo: Clone logo into animation wrapper if true.
                logo: true,
                logoContainerId: '',

                // closeBtn: Clone hamburger close button into animation wrapper if true.
                closeBtn: true,
                closeBtnContainerId: '',

                // backToMainScreen: Appends a header-button-link to direct user back to menu-screen-1
                backToMainScreen: false,
                backToMainScreenText: 'Menü',

                // addScreenTitle: Appends current menu screen title.
                addScreenTitle: false,

                // language: Move language menu into animation wrapper if true.
                language: false,

                // socialmedia: Move social media menu into animation wrapper if true.
                socialmedia: false,

                // Appearance: First menu appearance animation arguments.
                Appearance: {
                    Animation: {
                        type: 'push_l2r', // values: fade, push_l2r, push_r2l, drawer_l2r, drawer_r2l 
                        movement_on: '100%',
                        duration_on: 300,
                        ease_on: 'ease-in-out',
                        movement_off: '100%',
                        duration_off: 300,
                        ease_off: 'ease-in-out'
                    }
                },

                // Screen: Animation arguments related to submenu screens..
                Screen: {
                    Animation: {
                        type: 'push',

                        Level1: {
                            movement_on: '-33.33%',
                            duration_on: 500,
                            ease_on: 'ease-in-out',
                            movement_off: 0,
                            duration_off: 400,
                            ease_off: 'ease-in-out'
                        },

                        Level2: {
                            movement_on: '-66.66%',
                            duration_on: 500,
                            ease_on: 'ease-in-out',
                            movement_off: '-33.33%',
                            duration_off: 400,
                            ease_off: 'ease-in-out'
                        }
                    }
                }
            },
            xs2: {},
            sm1: {
                // type: Menu type (possible values: regular, hamburger)
                type: 'hamburger',

                // header: Based on header type position header (Especially fixed headers  not working under transformed containers)
                header: 'fixed', // empty string or 'fixed' are the values.

                // hideByOverlay: Overlay click hides menu if true.
                hideByOverlay: true,

                // hideByEscape: Esc key hit hides menu if true.
                hideByEscape: false,

                // account: Move user account menu into animation wrapper if true.
                account: false,

                // logo: Clone logo into animation wrapper if true.
                logo: true,
                logoContainerId: '',

                // closeBtn: Clone hamburger close button into animation wrapper if true.
                closeBtn: true,
                closeBtnContainerId: '',

                // backToMainScreen: Appends a header-button-link to direct user back to menu-screen-1
                backToMainScreen: false,
                backToMainScreenText: 'Menü',

                // addScreenTitle: Appends current menu screen title.
                addScreenTitle: false,

                // language: Move language menu into animation wrapper if true.
                language: false,

                // socialmedia: Move social media menu into animation wrapper if true.
                socialmedia: false,

                // Appearance: First menu appearance animation arguments.
                Appearance: {
                    Animation: {
                        type: 'push_l2r', // values: fade, push_l2r, push_r2l, drawer_l2r, drawer_r2l 
                        movement_on: '375px',
                        duration_on: 300,
                        ease_on: 'ease-in-out',
                        movement_off: '375px',
                        duration_off: 300,
                        ease_off: 'ease-in-out'
                    }
                },

                // Screen: Animation arguments related to submenu screens..
                Screen: {
                    Animation: {
                        type: 'push',

                        Level1: {
                            movement_on: '-33.33%',
                            duration_on: 500,
                            ease_on: 'ease-in-out',
                            movement_off: 0,
                            duration_off: 400,
                            ease_off: 'ease-in-out'
                        },

                        Level2: {
                            movement_on: '-66.66%',
                            duration_on: 500,
                            ease_on: 'ease-in-out',
                            movement_off: '-33.33%',
                            duration_off: 400,
                            ease_off: 'ease-in-out'
                        }
                    }
                }
            },
            sm2: {},
            md: {
                // type: Menu type (possible values: regular, hamburger)
                type: 'regular'
            },
            lg: {},
            xl: {}
        },

        // Use the same selector names on html elements.
        hamburgerMenuWrId: 'hamburger-menu-wrapper',
        menuAnimationWrId: 'menu-animation-wrapper',
        menuScreen1ElId: 'menu-screen-1',
        menuScreen2ElId: 'menu-screen-2',
        menuScreen3ElId: 'menu-screen-3',
        menuPrimaryElId: 'menu-primary',
        menuAccountContainerElId: 'account-container',
        menuAccountElId: 'menu-account',
        menuAccountBackToParentSelector: '.account-head-text',
        menuLanguageElId: 'menu-language',
        menuSocialMediaElId: 'menu-socialmedia',
        siteLogoElId: 'site-logo',
        closeBtnElId: 'button-menuclose',
        primaryMenuInnerHtmlIncludingLevels: '',
        originalHeaderContent: ''
    },

    Current: {},

    ready: function () {
        // Check if menu element exists.
        var menuPrimaryEl = document.getElementById(Feux.MenuPrimary.Props.menuPrimaryElId);

        if (menuPrimaryEl) {
            // Set current.
            Feux.MenuPrimary.Helper.setCurrent();

            // Initiate menu configuration setup 
            Feux.MenuPrimary.Actions.init();

            // Prepare menu related items on level (adding ul, li level classes etc).
            Feux.MenuPrimary.Actions.setMenuLevels();

            // Move elements (language, accont, social media, logo, etc).
            Feux.MenuPrimary.Actions.moveElements();

            // Prepare animation related elements for hamburger menu.
            Feux.MenuPrimary.Actions.prepareAnimationElements();

            // Custom function can be used.
            Feux.MenuPrimary.Helper.custombuilder();
        }
    },

    resize: function (arg) {
        // On window resize or orientation change (caller source: Feux.Base)
        var current = Feux.MenuPrimary.Current;

        if (current.state === 'menu-on') {
            Feux.Globals.pageWr.classList.remove('menu-on');
        }

        if (arg) {
            var isOrientationChange = arg.isOrientationChange;
            var resizeCompleted = arg.resizeCompleted;

            // If resize completed, reset DOM and initiate menu again.
            if (resizeCompleted) {
                var props = Feux.MenuPrimary.Props;

                // Remove page wrapper data animation attributes
                Feux.Globals.pageWr.removeAttribute("data-appearance-animation");
                Feux.Globals.pageWr.removeAttribute("data-screen-animation");

                // Remove hamburger menu wrapper.
                var hamburgerMenuWr = document.getElementById(props.hamburgerMenuWrId);
                if (hamburgerMenuWr) hamburgerMenuWr.remove();

                // Set original header content.
                Feux.Globals.headerElem.innerHTML = props.originalHeaderContent;

                // Reset current object.
                Feux.MenuPrimary.Helper.setCurrent();

                // Set resize flag.
                current.isResize = true;

                // Recreate menu.
                Feux.MenuPrimary.ready();
            }
        }
    },

    Actions: {
        init: function () {
            // Check if menu is populated by micro frontend loading function.
            // If it is, make sure header html after loading is saved in current object.
            if (Feux.Globals.isMF && !Feux.MenuPrimary.Current.isResize) {
                var headerElemHtml = Feux.Globals.headerElem.innerHTML;
                Feux.MenuPrimary.Props.originalHeaderContent = headerElemHtml;
            }
            else if (!Feux.Globals.isMF) {
                Feux.MenuPrimary.Props.originalHeaderContent = Feux.Globals.headerElem.innerHTML;
            }

            Feux.MenuPrimary.Current.isResize = false;
            // End

            // Retrieve settings based on current media query value.
            var currentMediaQuery = Feux.Base.Props.MediaQ.Curr.key;
            Feux.MenuPrimary.Current.Settings = Feux.MenuPrimary.Props.Settings[currentMediaQuery];

            // If settings is null, then use related media query menu settings.
            if (currentMediaQuery === "lg") {
                Feux.MenuPrimary.Current.Settings = Feux.MenuPrimary.Props.Settings["md"];
            }
            else if (currentMediaQuery === "sm2") {
                Feux.MenuPrimary.Current.Settings = Feux.MenuPrimary.Props.Settings["sm1"];
            }
            else if (currentMediaQuery === "xs2") {
                Feux.MenuPrimary.Current.Settings = Feux.MenuPrimary.Props.Settings["xs1"];
            }

            // If current menu type is hamburger, then create a hamburger wrapper under page wrapper.
            if (Feux.MenuPrimary.Current.Settings.type === 'hamburger') {
                var hamburgerWrapper = document.createElement("div");
                hamburgerWrapper.id = "hamburger-menu-wrapper";
                hamburgerWrapper.innerHTML = "<div id='menu-content-wrapper'>" +
                    "<div id='menu-animation-wrapper'>" +
                    "<div id='menu-screen-1'></div>" +
                    "<div id='menu-screen-2'></div>" +
                    "<div id='menu-screen-3'></div>" +
                    "</div></div>";
                Feux.Globals.pageWr.insertBefore(hamburgerWrapper, Feux.Globals.pageWr.childNodes[0]);
            }
        },

        setMenuLevels: function () {
            var props = Feux.MenuPrimary.Props;
            var menuPrimaryEl = document.getElementById(props.menuPrimaryElId);

            // Add necessary attributes on menu child elements by iterating through each of them.
            var ul_Level1Elements = menuPrimaryEl.children;

            for (var i_ul_L1_count = 0; i_ul_L1_count < ul_Level1Elements.length; i_ul_L1_count++) {
                // First level <ul> iteration.
                var ul_Level1Element = ul_Level1Elements[i_ul_L1_count];
                ul_Level1Element.setAttribute('data-ul-no', i_ul_L1_count);
                ul_Level1Element.classList.add("ul-level-1");

                // First level (level 1) <li> iteration.
                var li_Level1Elements = ul_Level1Element.children;
                for (var i_li_L1_count = 0; i_li_L1_count < li_Level1Elements.length; i_li_L1_count++) {
                    var li_Level1Element = li_Level1Elements[i_li_L1_count];

                    // Check if level 1 <li> element contains a "sub menu".
                    var li_level1_hasSubmenu = li_Level1Element.classList.contains('hasSubmenu');

                    if (li_level1_hasSubmenu) {
                        // Children of level 1 <li> iteration. In general, the children are <a>, <ul> tags.
                        var liLevel1Children = li_Level1Element.children;

                        for (var i_li_L1_child_count = 0; i_li_L1_child_count < liLevel1Children.length; i_li_L1_child_count++) {
                            // Current child item of level 2 <li>.
                            var liLevel1Child = liLevel1Children[i_li_L1_child_count];

                            // Retrieve current child's tag name.
                            var liLevel1ChildTagName = liLevel1Child.tagName.toLowerCase();

                            if (Feux.MenuPrimary.Current.Settings.type === 'hamburger') {
                                // If current tag is <a>, use it as "go-back-to-parent" menu item for hamburger menu 
                                // instead of a regular naviagting <a> item. In case there are more <a> elements as 
                                // child (like submenu-ad), i_li_L1_child_count === 0 condition needed to find correct 
                                // <a> element which is a_Level1Element
                                if (i_li_L1_child_count === 0 && liLevel1ChildTagName === "a") {
                                    var a_Level1Element = liLevel1Child;
                                    var url_value = a_Level1Element.getAttribute('href');
                                    a_Level1Element.setAttribute('href', 'javascript:void(0);');
                                    a_Level1Element.setAttribute("onclick", "Feux.MenuPrimary.UX.itemClick({ sender: this, url: '" + url_value + "' });");
                                    a_Level1Element.setAttribute("data-related-ul-no", i_ul_L1_count + "-" + i_li_L1_count);
                                }
                            }

                            // If current tag is <ul>, define it's level number as submenu.
                            if (liLevel1ChildTagName === "ul") {
                                var ul_Level2Element = liLevel1Child;
                                ul_Level2Element.setAttribute('data-ul-no', i_ul_L1_count + "-" + i_li_L1_count);
                                ul_Level2Element.classList.add("ul-level-2");

                                // Second level (level 2) <li> iteration.
                                var li_Level2Elements = ul_Level2Element.children;
                                for (var i_li_L2_count = 0; i_li_L2_count < li_Level2Elements.length; i_li_L2_count++) {
                                    var li_Level2Element = li_Level2Elements[i_li_L2_count];

                                    // Check if level 2 <li> element contains a "sub menu".
                                    var li_level2_hasSubmenu = li_Level2Element.classList.contains('hasSubmenu');

                                    if (li_level2_hasSubmenu) {
                                        // Children of level 2 <li> iteration. In general, the children are <a>, <ul> tags.
                                        var liLevel2Children = li_Level2Element.children;

                                        for (var i_li_L2_child_count = 0; i_li_L2_child_count < liLevel2Children.length; i_li_L2_child_count++) {
                                            // Current child item of level 2 <li>.
                                            var liLevel2Child = liLevel2Children[i_li_L2_child_count];

                                            // Retrieve current child's tag name.
                                            var liLevel2ChildTagName = liLevel2Child.tagName.toLowerCase();

                                            if (Feux.MenuPrimary.Current.Settings.type === 'hamburger') {
                                                // If current tag is <a>, use it as "go-back-to-parent" menu item for hamburger menu 
                                                // instead of a regular naviagting <a> item. In case there are more <a> elements as 
                                                // child (like submenu-ad), i_li_L2_child_count === 0 condition needed to find correct 
                                                // <a> element which is a_Level2Element
                                                if (i_li_L2_child_count === 0 && liLevel2ChildTagName === "a") {
                                                    var a_Level2Element = liLevel2Child;
                                                    url_value = a_Level2Element.getAttribute('href');
                                                    a_Level2Element.setAttribute('href', 'javascript:void(0);');
                                                    a_Level2Element.setAttribute("onclick", "Feux.MenuPrimary.UX.itemClick({ sender: this, url: '" + url_value + "' });");
                                                    a_Level2Element.setAttribute("data-related-ul-no", i_ul_L1_count + "-" + i_li_L1_count + "-" + i_li_L2_count);
                                                }
                                            }

                                            // If current tag is <ul>, define it's level number as submenu.
                                            if (liLevel2ChildTagName === "ul") {
                                                var ul_Level3Element = liLevel2Child;
                                                ul_Level3Element.setAttribute('data-ul-no', i_ul_L1_count + "-" + i_li_L1_count + "-" + i_li_L2_count);
                                                ul_Level3Element.classList.add("ul-level-3");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Check if account-menu should be set as well.
            if (Feux.MenuPrimary.Current.Settings.account) {
                var menuAccountEl = document.getElementById(props.menuAccountElId);
                var menuAccountUlEl = menuAccountEl.getElementsByTagName('ul')[0];

                menuAccountUlEl.setAttribute('data-ul-no', 'a-0-0');
                menuAccountUlEl.classList.add("ul-level-2", "account-submenu");
            }

            // Save primary menu html content.
            props.primaryMenuInnerHtmlIncludingLevels = menuPrimaryEl.innerHTML;
        },

        moveElements: function () {
            var currentSettings = Feux.MenuPrimary.Current.Settings;
            var props = Feux.MenuPrimary.Props;

            if (currentSettings.type === 'hamburger') {
                var hamburgerMenuWr = document.getElementById(props.hamburgerMenuWrId);
                var menuScreen1El = document.getElementById(props.menuScreen1ElId);
                var menuScreen2El = document.getElementById(props.menuScreen2ElId);
                var menuScreen3El = document.getElementById(props.menuScreen3ElId);

                // Clone site-logo
                if (currentSettings.logo) {
                    var siteLogoEl = document.getElementById(props.siteLogoElId);
                    var siteLogoElCloned = siteLogoEl.cloneNode(true);
                    siteLogoElCloned.setAttribute("id", 'site-logo-menu');

                    // Check if logo has to be inserted in a specific container
                    if (currentSettings.logoContainerId === '') {
                        hamburgerMenuWr.insertBefore(siteLogoElCloned, hamburgerMenuWr.childNodes[0]);
                    }
                    else {
                        var logoContainerEl = document.getElementById(currentSettings.logoContainerId);
                        logoContainerEl.insertBefore(siteLogoElCloned, logoContainerEl.childNodes[0]);
                    }
                }

                var buttonsContainer1 = document.createElement("div");
                buttonsContainer1.setAttribute("id","buttons-container-01");

                // Clone search button
                var searchButton = document.getElementById("search-button");
                var searchButtonElCloned = searchButton.cloneNode(true);
                searchButtonElCloned.setAttribute("id", 'search-button-menu');
                searchButtonElCloned.setAttribute("onclick", 'Feux.MenuPrimary.UX.hide();Feux.Search.Actions.showSearchContainer({ sender: this, ev:event });');
                buttonsContainer1.appendChild(searchButtonElCloned);

                // Clone language button
                var languageButton = document.getElementById("language-button");
                var languageButtonElCloned = languageButton.cloneNode(true);
                languageButtonElCloned.setAttribute("id", 'language-button-menu');
                buttonsContainer1.appendChild(languageButtonElCloned);


                // Clone account numbers button
                var accountNumbersButton = document.getElementById("account-numbers-button");
                var accountNumbersButtonElCloned = accountNumbersButton.cloneNode(true);
                accountNumbersButtonElCloned.setAttribute("id", 'account-numbers-button-menu');
                buttonsContainer1.appendChild(accountNumbersButtonElCloned);


                // Clone donation button
                var donationButton = document.getElementById("donation-button");
                var donationButtonElCloned = donationButton.cloneNode(true);
                donationButtonElCloned.setAttribute("id", 'donation-button-menu');
                donationButtonElCloned.setAttribute("onclick", 'window.location.href="' + donationButton.getAttribute("data-href") + '"');
                buttonsContainer1.appendChild(donationButtonElCloned);

                menuScreen1El.insertBefore(buttonsContainer1, menuScreen1El.childNodes[0]);




                // Clone close-button
                if (currentSettings.closeBtn) {
                    var closeBtnEl = document.getElementById(props.closeBtnElId);
                    var closeBtnElCloned = closeBtnEl.cloneNode(true);
                    closeBtnElCloned.setAttribute("id", 'close-button-menu');

                    // Check if close button has to be inserted in a specific container
                    if (currentSettings.closeBtnContainerId === '') {
                        hamburgerMenuWr.insertBefore(closeBtnElCloned, hamburgerMenuWr.childNodes[0]);
                    }
                    else {
                        var closeBtnContainerEl = document.getElementById(currentSettings.closeBtnContainerId);
                        closeBtnContainerEl.insertBefore(closeBtnElCloned, closeBtnContainerEl.childNodes[0]);
                    }
                }

                // Add backToMainScreen button on each sub screens.
                if (currentSettings.backToMainScreen) {
                    var screen2 = document.getElementById(props.menuScreen2ElId);
                    var screen3 = document.getElementById(props.menuScreen3ElId);
                    var backToMainScreenBtnEl = document.createElement("a");
                    backToMainScreenBtnEl.innerHTML = currentSettings.backToMainScreenText;
                    backToMainScreenBtnEl.setAttribute("href", "javascript:void(0)");
                    backToMainScreenBtnEl.setAttribute("onclick", "Feux.MenuPrimary.UX.goMainScreen({ sender: this })");
                    backToMainScreenBtnEl.classList.add("main-menu-btn");

                    screen2.appendChild(backToMainScreenBtnEl);
                    screen3.appendChild(backToMainScreenBtnEl.cloneNode(true));
                }
                
                // Move language-menu element
                if (currentSettings.lang) {
                    var menuLanguageEl = document.getElementById(props.menuLanguageElId);
                    menuScreen1El.insertBefore(menuLanguageEl, menuScreen1El.childNodes[0]);
                }

                // Move social-media-menu element
                if (currentSettings.socialmedia) {
                    var menuSocialMediaEl = document.getElementById(props.menuSocialMediaElId);
                    menuScreen1El.insertBefore(menuSocialMediaEl, menuScreen1El.childNodes[0]);
                }

                // Move user account menu
                if (currentSettings.account) {
                    // Move the account section
                    var menuAccountContainerEl = document.getElementById(props.menuAccountContainerElId);
                    menuScreen1El.insertBefore(menuAccountContainerEl, menuScreen1El.childNodes[0]);

                    // Add onclick link on ""user-registered" to view submenu
                    var userRegisteredContainerEl = menuAccountContainerEl.getElementsByClassName("user-registered")[0];
                    userRegisteredContainerEl.setAttribute("onclick", "Feux.MenuPrimary.UX.itemClick({ sender: this });");
                    userRegisteredContainerEl.setAttribute('data-related-ul-no', 'a-0-0');

                    // Move account submenu under menuScreen2
                    var menuAccountEl = document.getElementById(props.menuAccountElId);
                    var menuAccountUlEl = menuAccountEl.getElementsByTagName('ul')[0];
                    menuScreen2El.insertBefore(menuAccountUlEl, menuScreen2El.childNodes[0]);

                    // Create a "back to parent" element for account submenu
                    var menuAccountBackToParentEl = menuAccountContainerEl.querySelector(props.menuAccountBackToParentSelector);
                    var a_accountBackToParent_Element = document.createElement('a');
                    a_accountBackToParent_Element.innerHTML = menuAccountBackToParentEl.innerHTML;
                    a_accountBackToParent_Element.classList.add('level-2-header');
                    a_accountBackToParent_Element.setAttribute('href', 'javascript:void(0);');
                    a_accountBackToParent_Element.setAttribute('data-ul-header-no', 'a-0-0');
                    a_accountBackToParent_Element.setAttribute("onclick", "Feux.MenuPrimary.UX.goParent({ sender: this });");
                    menuScreen2El.insertBefore(a_accountBackToParent_Element, menuScreen2El.childNodes[0]);
                }

                // Start moving menu elements. Notice that it starts from end to start (Level3, Level2, and remaining menu items like Level1).
                // Move ul-level-3 sub menu elements out of its parent li because of free animation.
                // Notice that, they are moved under a related screen: 'menuScreen3El'
                var menuPrimaryEl = document.getElementById(props.menuPrimaryElId);
                var level3_submenu_list = menuPrimaryEl.getElementsByClassName("ul-level-3");
                var level3_submenu_list_count = level3_submenu_list.length;

                for (var level3_submenu_count = 0; level3_submenu_count < level3_submenu_list_count; level3_submenu_count++) {
                    // Before moving sub menu elements create header that is clickable to go back to parent.
                    var level3_submenu_item = level3_submenu_list[0];
                    var level3_submenu_no = level3_submenu_item.getAttribute('data-ul-no');
                    var level3_submenu_parentText = document.querySelector('a[data-related-ul-no="' + level3_submenu_no + '"]').innerHTML;

                    // Get related parent-level1 link text.
                    var level1_no = level3_submenu_no.split('-')[0] + "-" + level3_submenu_no.split('-')[1];
                    var level1_parentText = document.querySelector('a[data-related-ul-no="' + level1_no + '"]').innerHTML;

                    var level3_submenu_header = document.createElement("a");
                    level3_submenu_header.innerHTML = currentSettings.addScreenTitle ? level1_parentText : level3_submenu_parentText;
                    level3_submenu_header.classList.add("level-3-header");
                    level3_submenu_header.setAttribute("href", "javascript:void(0);");
                    level3_submenu_header.setAttribute("data-ul-header-no", level3_submenu_no);
                    level3_submenu_header.setAttribute("onclick", "Feux.MenuPrimary.UX.goParent({ sender: this });");

                    // 1. Append submenu header onto related menu-screen
                    menuScreen3El.appendChild(level3_submenu_header);

                    // 2. Append menu screen related title if specified.
                    if (currentSettings.addScreenTitle) {
                        var level3_screen_title = document.createElement("h6");
                        level3_screen_title.innerHTML = level3_submenu_parentText;
                        level3_screen_title.classList.add("level-3-screentitle");
                        level3_screen_title.setAttribute("data-ul-screentitle-no", level3_submenu_no);
                        menuScreen3El.appendChild(level3_screen_title);
                    }

                    // 3. Append submenu items onto related menu-screen
                    menuScreen3El.appendChild(level3_submenu_item);
                }

                // Move ul-level-2 sub menu elements out of its parent li because of free animation.
                // Notice that, they are moved under a related screen: 'menuScreen2El'
                var level2_submenu_list = menuPrimaryEl.getElementsByClassName("ul-level-2");
                var level2_submenu_list_count = level2_submenu_list.length;

                for (var level2_submenu_count = 0; level2_submenu_count < level2_submenu_list_count; level2_submenu_count++) {
                    // Before moving sub menu elements create header that is clickable to go back to parent.
                    var level2_submenu_item = level2_submenu_list[0];
                    var level2_submenu_no = level2_submenu_item.getAttribute('data-ul-no');
                    var level2_submenu_parentText = document.querySelector('a[data-related-ul-no="' + level2_submenu_no + '"]').innerHTML;

                    var level2_submenu_header = document.createElement("a");
                    level2_submenu_header.innerHTML = level2_submenu_parentText;
                    level2_submenu_header.classList.add("level-2-header");
                    level2_submenu_header.setAttribute("href", "javascript:void(0);");
                    level2_submenu_header.setAttribute("data-ul-header-no", level2_submenu_no);
                    level2_submenu_header.setAttribute("onclick", "Feux.MenuPrimary.UX.goParent({ sender: this });");

                    menuScreen2El.appendChild(level2_submenu_header);

                    // 1. Append menu screen related title if specified.
                    if (currentSettings.addScreenTitle) {
                        var level2_screen_title = document.createElement("h6");
                        level2_screen_title.innerHTML = level2_submenu_parentText;
                        level2_screen_title.classList.add("level-2-screentitle");
                        level2_screen_title.setAttribute("data-ul-screentitle-no", level2_submenu_no);
                        menuScreen2El.appendChild(level2_screen_title);
                    }

                    // 2. Append submenu items onto related menu-screen
                    menuScreen2El.appendChild(level2_submenu_item);
                }

                // 3. Move remaining primary menu at the end.
                menuScreen1El.insertBefore(menuPrimaryEl, menuScreen1El.childNodes[0]);
            }
        },

        prepareAnimationElements: function () {
            var currentSettings = Feux.MenuPrimary.Current.Settings;

            if (currentSettings.type === "hamburger") {
                Feux.Globals.pageWr.setAttribute("data-appearance-animation", currentSettings.Appearance.Animation.type);
                Feux.Globals.pageWr.setAttribute("data-screen-animation", currentSettings.Screen.Animation.type);
            }
        }
    },


    UX: {
        show: function (arg) {
            var props = Feux.MenuPrimary.Props;
            var current = Feux.MenuPrimary.Current;
            var settings = current.Settings;
            var appearanceAnimation = settings.Appearance.Animation;
            var hamburgerMenuWr = document.getElementById(props.hamburgerMenuWrId);

            if (current.state === 'menu-off') {
                // Disable body scroll.
                Feux.Base.Scroll.disable();

                // If header is fixed, then set as absolute with new top value.
                if (settings.header === "fixed") {
                    Feux.Globals.headerElem.setAttribute("style", "position: absolute; top: " + Feux.Base.Props.Scroll.Y.currval + "px");
                }

                // Begin showing animation by adding class on page-wrapper which is the parent container.
                current.state = 'menu-on';
                current.animating = true;
                Feux.Globals.pageWr.classList.add('menu-on', 'animating', 'animating-on');

                // Set menu-wrapper and page-wrapper properties based on animation type.
                if (appearanceAnimation.type === "fade") {
                    setTimeout(function () {
                        current.animating = false;
                        Feux.Globals.pageWr.classList.remove('animating', 'animating-on');
                    }, appearanceAnimation.duration_on);
                }
                else if (appearanceAnimation.type === "push_l2r" || appearanceAnimation.type === "push_r2l") {
                    // Keep hamburger wrapper on top position.
                    hamburgerMenuWr.setAttribute("style", "top: " + Feux.Base.Props.Scroll.Y.currval + "px");

                    // Animate 'page wrapper'.
                    var movement = appearanceAnimation.movement_on;
                    var duration = appearanceAnimation.duration_on;
                    var ease = appearanceAnimation.ease_on;

                    if (appearanceAnimation.type === "push_l2r") {
                        Feux.Globals.pageWr.style.transition = "transform " + parseFloat(duration / 1000) + "s " + ease;
                        Feux.Globals.pageWr.style.transform = "translateX(" + movement + ")";
                    }
                    else if (appearanceAnimation.type === "push_r2l") {
                        // ...
                    }

                    setTimeout(function () {
                        current.animating = false;
                        Feux.Globals.pageWr.classList.remove('animating', 'animating-on');
                    }, appearanceAnimation.duration_on);
                }
                else if (appearanceAnimation.type === "drawer_l2r" || appearanceAnimation.type === "drawer_r2l") {
                    // Animate 'hamburger menu wrapper'.
                    duration = appearanceAnimation.duration_on;
                    ease = appearanceAnimation.ease_on;

                    if (appearanceAnimation.type === "drawer_l2r") {
                        // ...
                    }
                    else if (appearanceAnimation.type === "drawer_r2l") {
                        hamburgerMenuWr.style.transition = "transform " + parseFloat(duration / 1000) + "s " + ease;
                        hamburgerMenuWr.style.transform = "translateX(0)";
                    }

                    setTimeout(function () {
                        current.animating = false;
                        Feux.Globals.pageWr.classList.remove('animating', 'animating-on');
                    }, duration);
                }

                // Show overlay
                Feux.Globals.overlayWrElem.classList.add('on');
            }
        },

        hide: function (arg) {
            var props = Feux.MenuPrimary.Props;
            var current = Feux.MenuPrimary.Current;
            var settings = current.Settings;
            var appearanceAnimation = settings.Appearance.Animation;
            var hamburgerMenuWr = document.getElementById(props.hamburgerMenuWrId);
            var menuAnimationWr = document.getElementById(props.menuAnimationWrId);
            var sender = arg ? arg.sender : null;

            if (current.state === 'menu-on') {
                // Enable body scroll.
                Feux.Base.Scroll.enable();

                // Begin showing animation by adding class on page-wrapper which is the parent container.
                current.state = 'menu-off';
                current.animating = true;

                Feux.Globals.pageWr.classList.add('menu-off', 'animating', 'animating-on');

                // Set menu-wrapper and page-wrapper properties based on animation type.
                if (appearanceAnimation.type === "fade") {
                    setTimeout(function () {
                        // Call onHide helper.
                        Feux.MenuPrimary.Helper.onHide();
                    }, appearanceAnimation.duration_off);
                }
                else if (appearanceAnimation.type === "push_l2r" || appearanceAnimation.type === "push_r2l") {
                    current.state_screen = 'level1-on';

                    // Animate 'hamburger menu wrapper'.
                    var duration = appearanceAnimation.duration_off;
                    var ease = appearanceAnimation.ease_off;
                    Feux.Globals.pageWr.style.transition = "transform " + parseFloat(duration / 1000) + "s " + ease;

                    if (appearanceAnimation.type === "push_l2r") {
                        Feux.Globals.pageWr.style.transform = "translateX(0)";
                    }
                    else if (appearanceAnimation.type === "push_r2l") {
                        // ....
                    }

                    setTimeout(function () {
                        // Call onHide helper.
                        Feux.MenuPrimary.Helper.onHide();
                    }, duration);
                }
                else if (appearanceAnimation.type === "drawer_l2r" || appearanceAnimation.type === "drawer_r2l") {
                    current.animating = false;
                    current.state_screen = 'level1-on';

                    // Animate 'hamburger menu wrapper'.
                    duration = appearanceAnimation.duration_off;
                    ease = appearanceAnimation.ease_off;
                    hamburgerMenuWr.style.transition = "transform " + parseFloat(duration / 1000) + "s " + ease;

                    if (appearanceAnimation.type === "drawer_l2r") {
                        // ....
                    }
                    else if (appearanceAnimation.type === "drawer_r2l") {
                        hamburgerMenuWr.style.transform = "translateX(100%)";
                    }

                    setTimeout(function () {
                        // Call onHide helper.
                        Feux.MenuPrimary.Helper.onHide();
                    }, duration);
                }

                // Show overlay
                Feux.Globals.overlayWrElem.classList.remove('on');
            }
        },

        itemClick: function (arg) {
            var props = Feux.MenuPrimary.Props;
            var current = Feux.MenuPrimary.Current;
            var settings = current.Settings;
            var screenAnimation = settings.Screen.Animation;
            var hamburgerMenuWr = document.getElementById(props.hamburgerMenuWrId);
            var menuAnimationWr = document.getElementById(props.menuAnimationWrId);
            var sender = arg.sender;

            // Either level-1 screen is on or level-2 screen is on.
            if (current.state_screen === 'level1-on' || current.state_screen === 'level2-on') {
                // Set current state properties.
                current.animating = true;

                // Set new state_screen.
                current.state_screen = current.state_screen === 'level1-on' ? 'level2-on' : 'level3-on';

                // Set related submenu headers.
                var ulNo = sender.getAttribute("data-related-ul-no");
                var relatedSubmenuHeader = menuAnimationWr.querySelector('[data-ul-header-no="' + ulNo + '"]');
                var relatedSubmenu = menuAnimationWr.querySelector('[data-ul-no="' + ulNo + '"]');
                var relatedScreenTitle = menuAnimationWr.querySelector('[data-ul-screentitle-no="' + ulNo + '"]');
                relatedSubmenuHeader.classList.add('on');
                relatedSubmenu.classList.add('on');
                if (relatedScreenTitle) relatedScreenTitle.classList.add('on');

                // Now animate 'menu animation wrapper'.
                var movement;
                var duration;
                var ease;

                if (screenAnimation.type === "push") {
                    if (current.state_screen === 'level2-on') {
                        // From screen level 1 to 2...
                        movement = screenAnimation.Level1.movement_on;
                        duration = screenAnimation.Level1.duration_on;
                        ease = screenAnimation.Level1.ease_on;
                    }
                    else if (current.state_screen === 'level3-on') {
                        // From screen level 2 to 3...
                        movement = screenAnimation.Level2.movement_on;
                        duration = screenAnimation.Level2.duration_on;
                        ease = screenAnimation.Level2.ease_on;
                    }

                    menuAnimationWr.style.transform = "translateX(" + movement + ")";
                    menuAnimationWr.style.transition = "transform " + parseFloat(duration / 1000) + "s";
                    menuAnimationWr.style.transitionTimingFunction = ease;
                }

                // Add screen number on data attribute of hamburger wrapper
                hamburgerMenuWr.setAttribute('data-screen', current.state_screen);

                // Add & remove page wrapper animation related class names.
                Feux.Globals.pageWr.classList.add('animating', 'animating-on');

                setTimeout(function () {
                    current.animating = false;
                    Feux.Globals.pageWr.classList.remove('animating', 'animating-on');
                }, duration);
            }
        },

        goParent: function (arg) {
            var props = Feux.MenuPrimary.Props;
            var current = Feux.MenuPrimary.Current;
            var settings = current.Settings;
            var screenAnimation = settings.Screen.Animation;
            var hamburgerMenuWr = document.getElementById(props.hamburgerMenuWrId);
            var menuAnimationWr = document.getElementById(props.menuAnimationWrId);
            var sender = arg ? arg.sender : null;

            // Either level-2 screen is on or level-3 screen is on.
            if (current.state_screen === 'level2-on' || current.state_screen === 'level3-on') {
                // Set current state properties.
                current.animating = true;

                // Set new state_screen.
                current.state_screen = current.state_screen === 'level2-on' ? 'level1-on' : 'level2-on';

                // Now animate 'menu animation wrapper'.
                var movement = 0;
                var duration = 0;

                if (screenAnimation.type === "push") {
                    // Remove active submenu and header class.
                    var submenu;
                    var submenuHeader;
                    var screenTitle;
                    var ease;

                    if (current.state_screen === 'level2-on') {
                        // From screen level 3 to 2...
                        submenu = menuAnimationWr.querySelector('.ul-level-3.on');
                        submenuHeader = menuAnimationWr.querySelector('.level-3-header.on');
                        screenTitle = menuAnimationWr.querySelector('.level-3-screentitle.on');
                        movement = screenAnimation.Level2.movement_off;
                        duration = screenAnimation.Level2.duration_off;
                        ease = screenAnimation.Level2.ease_off;
                    }
                    else if (current.state_screen === 'level1-on') {
                        // From screen level 2 to 1...
                        submenu = menuAnimationWr.querySelector('.ul-level-2.on');
                        submenuHeader = menuAnimationWr.querySelector('.level-2-header.on');
                        screenTitle = menuAnimationWr.querySelector('.level-2-screentitle.on');
                        movement = screenAnimation.Level1.movement_off;
                        duration = screenAnimation.Level1.duration_off;
                        ease = screenAnimation.Level1.ease_off;
                    }

                    menuAnimationWr.style.transform = "translateX(" + movement + ")";
                    menuAnimationWr.style.transition = "transform " + parseFloat(duration / 1000) + "s";
                    menuAnimationWr.style.transitionTimingFunction = ease;

                    // Add & remove page wrapper animation related class names.
                    Feux.Globals.pageWr.classList.add('animating', 'animating-on');

                    setTimeout(function () {
                        submenu.classList.remove('on');
                        submenuHeader.classList.remove('on');
                        if (screenTitle) screenTitle.classList.remove('on');
                        current.animating = false;
                        Feux.Globals.pageWr.classList.remove('animating', 'animating-on');
                    }, duration);
                }

                // Add screen number on data attribute of hamburger wrapper
                hamburgerMenuWr.setAttribute('data-screen', current.state_screen);
            }
        },

        goMainScreen: function () {
            var props = Feux.MenuPrimary.Props;
            var current = Feux.MenuPrimary.Current;
            var settings = current.Settings;
            var screenAnimation = settings.Screen.Animation;
            var hamburgerMenuWr = document.getElementById(props.hamburgerMenuWrId);
            var menuAnimationWr = document.getElementById(props.menuAnimationWrId);

            // Either level-2 screen is on or level-3 screen is on.
            if (current.state_screen === 'level3-on') {
                // Set current state properties.
                current.animating = true;

                // Set new state_screen.
                current.state_screen = 'level1-on';

                // Animate 'menu animation wrapper'.
                if (screenAnimation.type === "push") {
                    var duration = 0;
                    var ease;

                    // From screen level 3 to 2...
                    duration = screenAnimation.Level2.duration_off;
                    ease = screenAnimation.Level2.ease_off;

                    // Hide the middle screen (menu-screen-2);
                    var menuScreen2El = document.getElementById(props.menuScreen2ElId);
                    menuScreen2El.style.display = "none";

                    // Shring wrapper because the middle screen is hidden.
                    menuAnimationWr.style.width = "200%";

                    // Pull wrapper back to half distance.
                    menuAnimationWr.style.transition = "transform 0.0s";
                    menuAnimationWr.style.transform = "translateX(-50%)";

                    // Wait a bit...
                    setTimeout(function () {
                        menuAnimationWr.style.transform = "translateX(0)";
                        menuAnimationWr.style.transition = "transform " + parseFloat(duration / 1000) + "s";
                        menuAnimationWr.style.transitionTimingFunction = ease;

                        // Add & remove page wrapper animation related class names.
                        Feux.Globals.pageWr.classList.add('animating', 'animating-on');

                        setTimeout(function () {
                            // Remove width value which was used to shrink the wrapper.
                            menuAnimationWr.removeAttribute('style');
                            menuScreen2El = document.getElementById(props.menuScreen2ElId);
                            menuScreen2El.removeAttribute('style');

                            // Remove active class name.
                            var submenu = menuAnimationWr.querySelector('.ul-level-3.on');
                            if (submenu) submenu.classList.remove('on');

                            submenu = menuAnimationWr.querySelector('.ul-level-2.on');
                            if (submenu) submenu.classList.remove('on');

                            var submenuHeader = menuAnimationWr.querySelector('.level-3-header.on');
                            if (submenuHeader) submenuHeader.classList.remove('on');

                            submenuHeader = menuAnimationWr.querySelector('.level-2-header.on');
                            if (submenuHeader) submenuHeader.classList.remove('on');

                            var screenTitle = menuAnimationWr.querySelector('.level-3-screentitle.on');
                            if (screenTitle) screenTitle.classList.remove('on');

                            screenTitle = menuAnimationWr.querySelector('.level-2-screentitle.on');
                            if (screenTitle) screenTitle.classList.remove('on');

                            // Reset values.
                            current.animating = false;
                            Feux.Globals.pageWr.classList.remove('animating', 'animating-on');
                        }, duration);
                    }, 20);
                }

                // Add screen number on data attribute of hamburger wrapper
                hamburgerMenuWr.setAttribute('data-screen', current.state_screen);
            }
            else if (current.state_screen === "level2-on") {
                // Just go back to parent...
                Feux.MenuPrimary.UX.goParent();
            }
        },

        overlayClick: function (arg) {
            var current = Feux.MenuPrimary.Current;

            if (current.Settings.hideByOverlay) {
                Feux.MenuPrimary.UX.hide({ sender: arg.sender });
            }
        },

        escKeyPress: function () {
            var current = Feux.MenuPrimary.Current;

            if (current.Settings.hideByEscape) {
                Feux.MenuPrimary.UX.hide();
            }
        }
    },

    Helper: {
        setCurrent: function () {
            Feux.MenuPrimary.Current = {
                state: 'menu-off',
                state_screen: 'level1-on',
                animating: false,
                isResize: false,
                Settings: {}
            };
        },

        onHide: function () {
            var props = Feux.MenuPrimary.Props;
            var current = Feux.MenuPrimary.Current;
            current.animating = false;
            current.state_screen = 'level1-on';

            // Reset hamburger menu wrapper.
            var hamburgerMenuWr = document.getElementById(props.hamburgerMenuWrId);
            hamburgerMenuWr.removeAttribute("data-screen");
            hamburgerMenuWr.removeAttribute("style");

            // Reset submenu ul elements and headers.
            var menuAnimationWr = document.getElementById(props.menuAnimationWrId);

            var activeLevel2Submenu = menuAnimationWr.querySelector('.ul-level-2.on');
            var activeLevel3Submenu = menuAnimationWr.querySelector('.ul-level-3.on');
            var activeLevel2Header = menuAnimationWr.querySelector('.level-2-header.on');
            var activeLevel3Header = menuAnimationWr.querySelector('.level-3-header.on');
            var activeLevel3ScreenTitle = menuAnimationWr.querySelector('.level-3-screentitle.on');
            var activeLevel2ScreenTitle = menuAnimationWr.querySelector('.level-2-screentitle.on');

            if (activeLevel2Submenu) {
                activeLevel2Submenu.classList.remove('on');
            }

            if (activeLevel3Submenu) {
                activeLevel3Submenu.classList.remove('on');
            }

            if (activeLevel2Header) {
                activeLevel2Header.classList.remove('on');
            }

            if (activeLevel3Header) {
                activeLevel3Header.classList.remove('on');
            }

            if (activeLevel2ScreenTitle) {
                activeLevel2ScreenTitle.classList.remove('on');
            }

            if (activeLevel3ScreenTitle) {
                activeLevel3ScreenTitle.classList.remove('on');
            }
            // End

            // Scroll submenu screens back to top
            var menuScreen1El = document.getElementById(props.menuScreen1ElId);
            menuScreen1El.scrollTop = 0;

            var menuScreen2El = document.getElementById(props.menuScreen2ElId);
            menuScreen2El.scrollTop = 0;

            var menuScreen3El = document.getElementById(props.menuScreen3ElId);
            menuScreen3El.scrollTop = 0;
            // End


            // Reset menu animation wrapper.
            menuAnimationWr.style.transform = "translateX(0)";
            menuAnimationWr.style.transition = "transform 0s";

            // Remove classes on page wrapper.
            Feux.Globals.pageWr.classList.remove('menu-on', 'menu-off', 'animating', 'animating-on');
            Feux.Globals.pageWr.removeAttribute("style");

            // If header is fixed, then remove manipulating style values.
            if (current.Settings.header === "fixed") {
                Feux.Globals.headerElem.removeAttribute("style");
            }
        },

        custombuilder: function () {
        }
    }
};

// End

// Functions to call as DOM ready

if (!Feux.Globals.isMF) {
    Feux.MenuPrimary.ready();
}

// End