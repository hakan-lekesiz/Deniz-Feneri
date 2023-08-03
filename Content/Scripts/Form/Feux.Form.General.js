Feux.FormGeneral = {
    Props: {
        formId: 'generalForm',
    },

    Elements: {
    },

    Current: {

    },

    ready: function () {
        Feux.FormGeneral.Actions.init();
    },

    resize: function () {

    },

    Actions: {
        init: function () {
            Feux.FormGeneral.Helper.setCurrent();
            Feux.FormGeneral.Helper.setElements();

        },

        submit: function (arg) {
            // Disable sender to avoid multiple clicks from user.
            arg.ev.preventDefault();
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            // Set current properties
            var current = Feux.FormGeneral.Current;
            var elements = Feux.FormGeneral.Elements;
            current.submitter = sender;
            current.submitterArg = arg;
            
            // Validate form
            var isValid = Feux.Validation.Actions.run({ formEl: elements.formEl });
            // Collect form data
            if (isValid) {
                formCollect({ current: current, container: elements.formEl });

                //document.getElementById("hiddenProductGroup").value = jsonValListByCondition(current.data.productGroup, "isChecked", true, "val", false, ";");
                //document.getElementById("hiddenServices").value = jsonValListByCondition(current.data.serviceGroup, "isChecked", true, "val", false, ";");
                //document.getElementById("hiddenWhatIsNext").value = jsonValListByCondition(current.data.WhatIsNextGroup, "isChecked", true, "val", false, ";");


                elements.formEl.submit();

                setTimeout(function () {
                    window.location.href = arg.sender.getAttribute("data-success-page-url");
                }, 1000);
            }
            else {
                sender.disabled = false;
            }
        },
    },

    UX: {

    },

    Helper: {
        setCurrent: function () {
            Feux.FormGeneral.Current = {
                submitter: null,
                submitterArg: {},
                data: {},
                
            }
        },

        setElements: function () {
            var props = Feux.FormGeneral.Props;
            var elements = Feux.FormGeneral.Elements;

            elements.formEl = document.getElementById(props.formId);
        },
    },
}

Feux.FormGeneral.ready();