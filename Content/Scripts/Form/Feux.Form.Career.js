Feux.FormCareer = {
    Props: {
        formId: 'careerForm',

    },

    Elements: {
    },

    Current: {

    },

    ready: function () {
        Feux.FormCareer.Actions.init();
    },

    resize: function () {

    },

    Actions: {
        init: function () {
            Feux.FormCareer.Helper.setCurrent();
            Feux.FormCareer.Helper.setElements();

        },

        submit: function (arg) {
            // Disable sender to avoid multiple clicks from user.
            arg.ev.preventDefault();
            var sender = arg.sender;
            if (sender.disabled) { return false; }
            sender.disabled = true;

            // Set current properties
            var current = Feux.FormCareer.Current;
            var elements = Feux.FormCareer.Elements;
            current.submitter = sender;
            current.submitterArg = arg;

            // Validate form
            var isValid = Feux.Validation.Actions.run({ formEl: elements.formEl });

            // Collect form data
            if (isValid) {
                formCollect({ current: current, container: elements.formEl });
                debugger
                var fd = new FormData();
                fd.append('productsGroup', jsonValListByCondition(current.data.productsGroup, "isChecked", true, "val", false, ", "));
                fd.append('firstname', current.data.firstname.val);
                fd.append('lastname', current.data.lastname.val);
                fd.append('email', current.data.email.val);
                fd.append('jobtitle', current.data.jobtitle.val);
                fd.append('linkedin', current.data.linkedin.val);
                fd.append('comments', document.getElementById("comments").value);

                $.ajax({
                    url: "/umbraco/surface/Misc/CareerForm/",
                    type: "POST",
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        window.location.href = arg.sender.getAttribute("data-success-page-url");
                    },
                    error: function (response) {
                        errorCallback(response);
                    }
                });

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
            Feux.FormCareer.Current = {
                submitter: null,
                submitterArg: {},
                data: {},

            }
        },

        setElements: function () {
            var props = Feux.FormCareer.Props;
            var elements = Feux.FormCareer.Elements;

            elements.formEl = document.getElementById(props.formId);
        },
    },
}

Feux.FormCareer.ready();