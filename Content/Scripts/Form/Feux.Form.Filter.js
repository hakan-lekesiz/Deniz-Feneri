Feux.Filter = {
    Props: {
        productListId: 'product-list',
        asideFilterId: 'aside-filter',
        listContainerId: 'list-container',
        chipContainerId: 'filter-chip-container',
        chipContentId: 'filter-chip-content',
        chipListId: 'filter-chip-list',
        formWeightrangeTextboxId: 'form-weight-range-textbox',
        formApparelTypeGroupId: 'form-apparel-type-selection',
        formKnittingTypeGroupId: 'form-knitting-type-selection',
        formRawMaterialGroupId: 'form-raw-materials-selection',
        tbWeightrangeMinId: 'tbWeightrangeMin',
        tbWeightrangeMaxId: 'tbWeightrangeMax',
        chipHtml: document.getElementById("filter-chip-temp").innerHTML,
        weightRangeMaxVal: 10000,
        queryStringPrefix:'flt'
    },

    Elements: {},

    Current: {},

    ready: function (isPageLoad) {
        // Allow filter elements to be built and placed.
        // Then set isPageLoad to false.
        Feux.Filter.Current.isPageLoad = isPageLoad;

        setTimeout(function () {
            Feux.Filter.Current.isPageLoad = false;
        }, 200);
        // End

        // Initiate filter component.
        Feux.Filter.Actions.init();
    },

    Actions: {
        init: function () {

            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            Feux.Filter.Helper.setElements();

            // Assign event listeners
            Feux.Filter.Helper.setEventListeners();
        },

        mfInit: function () {
            var current = Feux.Filter.Current;

            Feux.Filter.Helper.setCurrent();
            Feux.Filter.ready(true);
            Feux.Filter.Helper.collectAndEnrichData();
            current.formStatus = "responseSuccess";
            Feux.Filter.UX.responseSuccess();
        },

        weightrangeSubmit: function (arg) {

            var sender = arg.sender;

            var elements = Feux.Filter.Elements;

            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;

            // Collect form properties.
            current.formEl = elements.formPricerangeSelectionEl;

            // Collect and enrich data.
            Feux.Filter.Helper.collectAndEnrichData();

        },

        checkboxSubmit: function (arg) {

            var sender = arg.sender;

            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            // Collect form properties.
            current.formEl = findAncestor(sender, 'form');

            // Collect and enrich data.
            Feux.Filter.Helper.collectAndEnrichData();

        },

        removeFilterItem: function (arg) {
            var current = Feux.Filter.Current;
            var chipItem;

            if (arg.senderIs === "removeButton") {
                // If chip remove button is clicked. Avoid double click.
                var sender = arg.sender;
                if (sender.disabled || current.action === "removechipitem") { return false; }
                sender.disabled = true;

                // Set current action and shortcut variables.
                current.action = "removechipitem";
                var props = Feux.Filter.Props;
                var elements = Feux.Filter.Elements;

                // Collect form properties.
                current.formEl = null;
                current.submitter = sender;
                current.submitterName = "chipitem";

                // Apply UX approach.
                current.formStatus = "submitting";
                Feux.Filter.UX.submitting();

                chipItem = findAncestor(sender, '.chip-item');
                var relatedFilterElId = chipItem.getAttribute("data-related-filter-id");
                var relatedFilterEl = document.getElementById(relatedFilterElId);

                // Determine related filter element type.
                var elInfo = elementInfo(relatedFilterElId);

                if (elInfo.info === "checkbox") {
                    // Uncheck related checkbox.
                    relatedFilterEl.checked = false;
                }
                else if (elInfo.info === "text") {
                    relatedFilterEl.value = "";
                }

                // Collect and enrich data.
                Feux.Filter.Helper.collectAndEnrichData();

                // Call proxy.
                Feux.Filter.Actions.proxyCall();
            }
            else if (arg.senderIs === "filterer") {
                // If a filter item is cleared or unchecked...
                var filtererId = arg.sender.id;
                chipItem = document.querySelector('[data-related-filter-id=' + filtererId + ']');
            }
           
            // Hide container if it is the last chip item.
            if (current.totalChipCount === 0) {
                Feux.Filter.UX.lastFilterRemoved();
            }

            // Remove chip item to avoid fast user click.
            setTimeout(function () {
                chipItem.remove();
            }, 250);
        },

        clearFilters: function (arg) {
            var sender = arg.sender;
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;
            var chipList = elements.chipListEl.querySelectorAll('.chip-item');

            // Hide chip list container.
            Feux.Filter.Helper.hideChipContainer();

            // Reset chip related filter elements
            for (var c = 0; c < chipList.length; c++) {
                var chip = chipList[c];
                var relatedFilterElemId = chip.getAttribute('data-related-filter-id');

                var elInfo = elementInfo(relatedFilterElemId);

                if (elInfo.info === "checkbox") {
                    elInfo.el.checked = false;
                }
                else if (elInfo.info === "text") {
                    elInfo.el.value = ""; // check and test this part
                }
                else {
                    // continue for other types if needed
                }
            }
            // End

            // Empty chip list container.
            setTimeout(function () {
                elements.chipListEl.innerHTML = "";
            }, 300);

            // Collect form properties.
            current.formEl = null;
            current.submitter = sender;
            current.submitterName = "clearAll";

            // Apply UX approach.
            current.formStatus = "submitting";
            Feux.Filter.UX.submitting();

            // Collect and enrich data.
            Feux.Filter.Helper.collectAndEnrichData();

            // Call proxy.
            current.action = "clearingall";
            Feux.Filter.Actions.proxyCall();
        },

        reset: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            Feux.Filter.Helper.setCurrent();

            // To be developed if needed!
        },

        proxyCall: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            // If it is page load, then do not call proxy function.
            if (Feux.Filter.Current.isPageLoad) {
                // Apply form-submitting UX approach.
                current.formStatus = "responseSuccess";
                Feux.Filter.UX.responseSuccess();
            }
            else if (!Feux.Filter.Current.isPageLoad) {
                // Apply UX approach.
                current.formStatus = "submitted";
                Feux.Filter.UX.submitted();

                // Get data.
                var data = current.data;

                var filterObj = {
                    "rawMaterials": data.rawMaterials ? data.rawMaterials.rawMaterialsArray : null,
                    "knittingTypes": data.knittingTypes ? data.knittingTypes.knittingTypesArray : null,
                    "apparelTypes": data.apparelTypes ? data.apparelTypes.apparelTypesArray : null,
                    "weightRangeMin": data.weightRange && data.weightRange.customMinVal ? parseInt(data.weightRange.customMinVal) : 0,
                    "weightRangeMax": data.weightRange && data.weightRange.customMaxVal ? parseInt(data.weightRange.customMaxVal) : 0,
                    "currentPageId": parseInt(currentPageId)
                };

                Feux.Filter.Helper.updateQueryString(filterObj);

                var fd = new FormData();
                fd.append('data', JSON.stringify(filterObj));

                $.ajax({
                    url: "/umbraco/surface/Misc/FilterProducts/",
                    type: "POST",
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (response) {

                        elements.productListEl.innerHTML = response;
                        Feux.Filter.UX.buildSliders();

                        // Apply form-submitting UX approach.
                        current.formStatus = "responseSuccess";
                        Feux.Filter.UX.responseSuccess();
                        Feux.Modal.Actions.closeClick();


                    },
                    error: function (response) {

                    }
                });

            }
        }
    },

    UX: {
        presubmitting: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            // Add presubmitting class.
            elements.asideFilterEl.classList.add('form-presubmitting');
        },

        submitting: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            // Add submitting class
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.add('form-submitting');

        },

        submitted: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            // Add presubmitting class.
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.remove('form-submitting');
            elements.asideFilterEl.classList.add('form-submitted');
        },

        responseSuccess: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;
            var data = current.data;

            // Add form responded classes.
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.remove('form-submitting');
            elements.asideFilterEl.classList.remove('form-submitted');
            elements.asideFilterEl.classList.add('form-responded', 'form-response-success');

            var selectedElems = Feux.Filter.Elements.asideFilterEl.querySelectorAll("[data-chip]");

            for (var i = 0; i < selectedElems.length; i++) {
                var selectedElem = selectedElems[i];
                var elInfo = elementInfo("", selectedElem);
                current.submitter = selectedElem;

                var filterItem = document.querySelector("[data-related-filter-id='" + elInfo.id + "']");

                if (elInfo.info === "checkbox") {

                    if (elInfo.isChecked) {
                        if (!filterItem) {
                            // Create new chip item
                            current.submitterName = "checkbox";
                            Feux.Filter.Helper.createChipItem();

                            // Append new chip item on chip list container
                            elements.chipListEl.insertBefore(current.newChipItem, elements.chipListEl.childNodes[0]);
                        }
                    }
                    else if (!elInfo.isChecked) {
                        current.submitterIs = "filterer";

                        if (filterItem) {
                            Feux.Filter.Actions.removeFilterItem({ sender: current.submitter, senderIs: current.submitterIs });
                        }
                    }
                }
                else if (elInfo.info === "text") {
                    
                    if (filterItem) {
                        current.submitterIs = "filterer";
                        Feux.Filter.Actions.removeFilterItem({ sender: current.submitter, senderIs: current.submitterIs });
                    }

                    if (elInfo.val !=="") {
                        // Create new chip item
                        current.submitterName = "customPricerange";
                        Feux.Filter.Helper.createChipItem();

                        // Append new chip item on chip list container
                        elements.chipListEl.insertBefore(current.newChipItem, elements.chipListEl.childNodes[0]);
                    }
               

                }

            }

            // Set chip container
            if (current.chipStatus === "off" && current.totalChipCount > 0) {
                current.chipStatus = "on";
                elements.chipContainerEl.classList.add('on');
                $("#" + props.chipContainerId).fadeIn();
            }
             
            if (current.action === "clearingall") {
                Feux.Filter.Actions.reset();
            }

            // Reset action value.
            current.action = "";

            // Enable submitter.
            if (current.submitter) { current.submitter.disabled = false; }

            // Scroll to listing start if top elements are not the sender.
            if (current.submitterName !== "chipitem" && current.submitterName !== "linksort" && current.submitterName !== "selectsort") {
                var rect = document.getElementById("scroll-element-after-filter").getBoundingClientRect();
                var scrollTopVal = parseInt(Feux.Base.Props.Scroll.Y.currval + rect.top);

                if (!isBrowserIE11()) {
                    window.scrollTo({ top: scrollTopVal - 150, left: 0, behavior: 'smooth' });
                }
                else {
                    window.scrollTo(0, scrollTopVal - 150);
                }
            }


        },

        responseError: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            // Add form responded classes.
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.remove('form-submitting');
            elements.asideFilterEl.classList.remove('form-submitted');
            elements.asideFilterEl.classList.add('form-responded', 'form-response-error');

            // Enable sender button.
            current.submitter.disabled = false;
        },

        cancel: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            // Remove UX related form css classes.
            elements.asideFilterEl.classList.remove('form-presubmitting');
            elements.asideFilterEl.classList.remove('form-submitting');
            elements.asideFilterEl.classList.remove('form-submitted');
            elements.asideFilterEl.classList.remove('form-responded');
            elements.asideFilterEl.classList.remove('form-response-success');
            elements.asideFilterEl.classList.remove('form-response-error');
            elements.asideFilterEl.classList.remove('form-cancelling');

            // Enable sender button.
            current.submitter.disabled = false;
        },

        lastFilterRemoved: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            Feux.Filter.Helper.hideChipContainer();

            setTimeout(function () {
                Feux.Filter.Elements.chipListEl.innerHTML = "";
                current.chipStatus = "off";
                Feux.Filter.Actions.reset();
            }, 600);
        },

        buildSliders: function () {
            var key = Feux.Base.Props.MediaQ.Curr.key;
            if (key === 'md' || key === 'lg' || key === 'xl') {
                $("#product-list .owl-carousel").owlCarousel({
                    loop: false,
                    margin: 0,
                    lazyLoad: true,
                    center: false,
                    items: 1,
                    dots: true,
                    touchDrag: true,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1
                        }
                    }
                });
            }
        },

        openInterestExpand: function (filterType) {
            var openerEl = null;
            if (filterType === "weight") {
                openerEl = document.getElementById("expand-open-weight-range");
            }
            else if (filterType === "apparelTypes") {
                openerEl = document.getElementById("expand-open-apparel-type");
            }
            else if (filterType === "rawMaterials") {
                openerEl = document.getElementById("expand-open-raw-materials");
            }
            else if (filterType === "knittingTypes") {
                openerEl = document.getElementById("expand-open-knitting-type");
            }

            if (openerEl) {
                var parentEl = findAncestor(openerEl, ".c-container-01");
                if (!parentEl.classList.contains("on")) {
                    openerEl.click();
                }
                setTimeout(function () {
                    parentEl.scrollIntoView({ behavior: "smooth", block: "start", inline: "end" });
                }, 100);
            }

        }
    },

    Helper: {
        setCurrent: function () {
            Feux.Filter.Current = {
                isPageLoad: Feux.Filter.Current.isPageLoad,
                formStatus: '',
                chipStatus: 'off',
                weightChipCount: 0,
                apparelTypeGroupCount: 0,
                knittingTypeGroupCount: 0,
                rawMaterialGroupCount: 0,
                totalChipCount: 0,
                formEl: null,
                submitter: null,
                submitterName: '',
                newChipItem: null,
                action: '',
                data: {},
                url: {}
            };
        },

        setElements: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            elements.productListEl = document.getElementById(props.productListId);
            elements.asideFilterEl = document.getElementById(props.asideFilterId);
            elements.listContainerEl = document.getElementById(props.listContainerId);
            elements.chipContainerEl = document.getElementById(props.chipContainerId);
            elements.chipContentEl = document.getElementById(props.chipContentId);
            elements.chipListEl = document.getElementById(props.chipListId);
            elements.formWeightrange = document.getElementById(props.formWeightrangeTextboxId);
            elements.formApparelTypeGroup = document.getElementById(props.formApparelTypeGroupId);
            elements.formKnittingTypeGroup = document.getElementById(props.formKnittingTypeGroupId);
            elements.formRawMaterialGroup = document.getElementById(props.formRawMaterialGroupId);
            elements.tbWeightrangeMin = document.getElementById(props.tbWeightrangeMinId);
            elements.tbWeightrangeMax = document.getElementById(props.tbWeightrangeMaxId);


        },

        collectAndEnrichData: function () {

            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            // Collect form data
            formCollect({ sender: 'filter', current: Feux.Filter.Current, buildUrl: false, buildSortUrl: false, container: elements.asideFilterEl });
            var data = current.data;

            // weight Range
            if (data.weightRange) {
                data.weightRange.customMinVal = data.weightRange.textboxSection.tbWeightrangeMin.val;
                data.weightRange.customMaxVal = data.weightRange.textboxSection.tbWeightrangeMax.val;
                current.weightChipCount = (data.weightRange.customMinVal === "" && data.weightRange.customMaxVal === "") ? 0 : 1;
            }

            // rawMaterials
            if (data.rawMaterials) {
                var data_rawMaterials_string = jsonValListByCondition(data.rawMaterials.checkboxSection, "isChecked", true, "val", false, ",");
                data.rawMaterials.rawMaterialsArray = data_rawMaterials_string === "" ? [] : data_rawMaterials_string.split(',');
                current.rawMaterialGroupCount = data.rawMaterials.rawMaterialsArray.length;
            }
            // rawMaterials
            if (data.knittingTypes) {
                var data_knittingType_string = jsonValListByCondition(data.knittingTypes.checkboxSection, "isChecked", true, "val", false, ",");
                data.knittingTypes.knittingTypesArray = data_knittingType_string === "" ? [] : data_knittingType_string.split(',');
                current.knittingTypeGroupCount = data.knittingTypes.knittingTypesArray.length;
            }
            // rawMaterials
            if (data.apparelTypes) {
                var data_apparelType_string = jsonValListByCondition(data.apparelTypes.checkboxSection, "isChecked", true, "val", false, ",");
                data.apparelTypes.apparelTypesArray = data_apparelType_string === "" ? [] : data_apparelType_string.split(',');
                current.apparelTypeGroupCount = data.apparelTypes.apparelTypesArray.length;
            }
            // Total Count
            current.totalChipCount = parseInt(current.weightChipCount) + parseInt(current.rawMaterialGroupCount) + parseInt(current.knittingTypeGroupCount) + parseInt(current.apparelTypeGroupCount);

        },

        createChipItem: function (arg) {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            // Get chip properties
            var chip_properties = current.submitter.getAttribute("data-chip");
            var chip_obj = JSON.parse(chip_properties);
            var chip_header = chip_obj.header;
            var chip_key = "";
            var chip_value = "";

            if (current.submitterName === "customPricerange") {
                if (current.submitter.id === props.tbWeightrangeMinId) {
                    chip_value = elements.tbWeightrangeMin.getAttribute("data-empty") + " " + current.data.weightRange.customMinVal;
                }
                else if (current.submitter.id === props.tbWeightrangeMaxId) {
                    chip_value = elements.tbWeightrangeMax.getAttribute("data-empty") + " " + current.data.weightRange.customMaxVal;
                }

            }
            else {
                chip_key = chip_obj.key;

                if (chip_obj.value) {
                    chip_value = chip_obj.value;
                }
            }

            // Fill chip-html placeholder with values
            var chipItem = document.createElement('div');
            chipItem.classList.add("chip-item");
            chipItem.classList.add("chip-type-" + current.submitterName.toLowerCase());
            chipItem.setAttribute("data-related-filter-id", current.submitter.id);
            chipItem.innerHTML = props.chipHtml;

            var chipKey = chipItem.getElementsByClassName('chip-key')[0];
            var chipValue = chipItem.getElementsByClassName('chip-value')[0];
            chipKey.innerHTML = chip_header;
            chipValue.innerHTML = chip_value;

            // Add newly created chip on current obj
            current.newChipItem = chipItem;
        },

        hideChipContainer: function () {
            var props = Feux.Filter.Props;
            var current = Feux.Filter.Current;
            var elements = Feux.Filter.Elements;

            if (Feux.Filter.Elements.chipContainerEl.classList.contains('on')) {
                elements.chipContainerEl.classList.remove('on');
                $("#" + props.chipContainerId).fadeOut();
            }
        },

        setEventListeners: function () {
            var elements = Feux.Filter.Elements;
            // Assign event listener.

            if (elements.formWeightrange) {

                elements.tbWeightrangeMin.addEventListener('input', function () {
                    Feux.Filter.Actions.weightrangeSubmit({ sender: this, type: 'customPricerange', senderIs: 'filterer' });
                });
                elements.tbWeightrangeMax.addEventListener('input', function () {
                    Feux.Filter.Actions.weightrangeSubmit({ sender: this, type: 'customPricerange', senderIs: 'filterer' });
                });

            }

            if (elements.formApparelTypeGroup) {
                var apparelTypeGroup_checkboxlist = elements.formApparelTypeGroup.querySelectorAll('[type=checkbox]');

                for (var p = 0; p < apparelTypeGroup_checkboxlist.length; p++) {
                    var apparelTypeGroup_chk = apparelTypeGroup_checkboxlist[p];

                    apparelTypeGroup_chk.addEventListener('change', function () {
                        Feux.Filter.Actions.checkboxSubmit({ sender: this, type: '', senderIs: 'filterer' });
                    });
                }
            }

            if (elements.formKnittingTypeGroup) {
                var knittingTypeGroup_checkboxlist = elements.formKnittingTypeGroup.querySelectorAll('[type=checkbox]');

                for (var p = 0; p < knittingTypeGroup_checkboxlist.length; p++) {
                    var knittingTypeGroup_chk = knittingTypeGroup_checkboxlist[p];

                    knittingTypeGroup_chk.addEventListener('change', function () {
                        Feux.Filter.Actions.checkboxSubmit({ sender: this, type: '', senderIs: 'filterer' });
                    });
                }
            }

            if (elements.formRawMaterialGroup) {
                var rawMaterialGroup_checkboxlist = elements.formRawMaterialGroup.querySelectorAll('[type=checkbox]');

                for (var p = 0; p < rawMaterialGroup_checkboxlist.length; p++) {
                    var rawMaterialGroup_chk = rawMaterialGroup_checkboxlist[p];

                    rawMaterialGroup_chk.addEventListener('change', function () {
                        Feux.Filter.Actions.checkboxSubmit({ sender: this, type: '', senderIs: 'filterer' });
                    });
                }
            }

        },

        updateQueryString: function (filterObj) {
             
            var props = Feux.Filter.Props;
            var queryStringValues = [];
             

            if (filterObj.rawMaterials && filterObj.rawMaterials.length>0) {
                queryStringValues.push("rawMaterials:" + filterObj.rawMaterials.join(","));
            }
            if (filterObj.knittingTypes && filterObj.knittingTypes.length > 0) {
                queryStringValues.push("knittingTypes:" + filterObj.knittingTypes.join(","));
            }
            if (filterObj.apparelTypes && filterObj.apparelTypes.length > 0) {
                queryStringValues.push("apparelTypes:" + filterObj.apparelTypes.join(","));
            }
            if (filterObj.weightRangeMin>0) {
                queryStringValues.push("weightRangeMin:" + filterObj.weightRangeMin);
            }
            if (filterObj.weightRangeMax > 0) {
                queryStringValues.push("weightRangeMax:" + filterObj.weightRangeMax);
            }


            updateUrlQueryString({
                queryStringPrefix: props.queryStringPrefix,
                queryString: queryStringValues.join(";")
            });
        },

    }
};

Feux.Filter.Actions.mfInit();
