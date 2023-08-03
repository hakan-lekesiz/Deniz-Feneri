Feux.FormRequestSwatch = {
    Props: {
        formId: 'requestSwatchForm',
    },

    Elements: {
    },

    Current: {

    },

    ready: function () {
        Feux.FormRequestSwatch.Actions.init();
    },

    resize: function () {

    },

    Actions: {
        init: function () {
            Feux.FormRequestSwatch.Helper.setCurrent();
            Feux.FormRequestSwatch.Helper.setElements();

        },

        submit: function (arg) {
            // Disable sender to avoid multiple clicks from user.
            arg.ev.preventDefault();
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            // Set current properties
            var current = Feux.FormRequestSwatch.Current;
            var elements = Feux.FormRequestSwatch.Elements;
            current.submitter = sender;
            current.submitterArg = arg;

            // Validate form
            var isValid = Feux.Validation.Actions.run({ formEl: elements.formEl });
           
            // Collect form data
            if (isValid) {
                 
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
            Feux.FormRequestSwatch.Current = {
                submitter: null,
                submitterArg: {},
                data: {},

            }
        },

        setElements: function () {
            var props = Feux.FormRequestSwatch.Props;
            var elements = Feux.FormRequestSwatch.Elements;

            elements.formEl = document.getElementById(props.formId);
        },
    },
}

Feux.FormRequestSwatch.ready();