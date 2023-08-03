if (window.jQuery) {
    $(document).ready(function () {
        // Run validation rules.
        if (!isJsonEmpty(Feux.Validation)) {
            Feux.Validation.Actions.init();
        }

        // Run select2 setup.
        if (!isJsonEmpty(Feux.Select2)) {
            Feux.Select2.Actions.init();
        }

        // Run mask rules.
        if (!isJsonEmpty(Feux.Mask)) {
            Feux.Mask.Actions.init();
        }

        // Run owl carousel rules.
        if (!isJsonEmpty(Feux.UX.Owl)) {
            Feux.UX.Owl.Actions.init();
        }

        // Check if CurrentPage obj exists. If exists,
        // call CurrentPage related document-ready events.
        if (!isJsonEmpty(Feux.CurrentPage)) {
            if (typeof Feux.CurrentPage.jQueryDocumentReadyEvents === 'function') {
                Feux.CurrentPage.jQueryDocumentReadyEvents();
            }
        }

        // Check if Partial obj exists. If exists,
        // call Partial related document-ready events.
        if (!isJsonEmpty(Feux.Partial)) {
            if (typeof Feux.Partial.jQueryDocumentReadyEvents === 'function') {
                Feux.Partial.jQueryDocumentReadyEvents();
            }
        }
    });
}