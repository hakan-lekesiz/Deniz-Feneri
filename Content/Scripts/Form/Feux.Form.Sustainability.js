Feux.FormSustainability = {
    Props: {
        formId: 'sustainabilityForm',
    },

    Elements: {
    },

    Current: {

    },

    ready: function () {
        Feux.FormSustainability.Actions.init();
    },

    resize: function () {

    },

    Actions: {
        init: function () {
            Feux.FormSustainability.Helper.setCurrent();
            Feux.FormSustainability.Helper.setElements();

        },

        submit: function (arg) {
            // Disable sender to avoid multiple clicks from user.
            arg.ev.preventDefault();
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            // Set current properties
            var current = Feux.FormSustainability.Current;
            var elements = Feux.FormSustainability.Elements;
            current.submitter = sender;
            current.submitterArg = arg;

            // Validate form
            var isValid = Feux.Validation.Actions.run({ formEl: elements.formEl });

            // Collect form data
            if (isValid) {

                formCollect({ current: current, container: elements.formEl });
              
                //document.getElementById("hiddenProductGroup").value = jsonValListByCondition(current.data.productsGroup, "isChecked", true, "val", false, ";");
                //document.getElementById("hiddenProjects").value = jsonValListByCondition(current.data.projectsGroup, "isChecked", true, "val", false, ";");
                //document.getElementById("hiddenRequestSwatch").value = jsonValListByCondition(current.data.requestSwatchGroup, "isChecked", true, "val", false, ";");


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
            Feux.FormSustainability.Current = {
                submitter: null,
                submitterArg: {},
                data: {},

            }
        },

        setElements: function () {
            var props = Feux.FormSustainability.Props;
            var elements = Feux.FormSustainability.Elements;

            elements.formEl = document.getElementById(props.formId);
        },
    },
}

Feux.FormSustainability.ready();