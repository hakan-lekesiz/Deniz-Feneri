//-> Checkout related functions
Feux.Checkout = {
    Status: {

    },
    addressTypes: {

    },
    Page: {

    },

    creditCardNumberChange: function (sender) {

        var firsNumber = sender.value.substring(0, 1);
        var creditCartIcon = document.getElementById("f-creditCartIcon");

        creditCartIcon.classList.remove("icon-visa");
        creditCartIcon.classList.remove("icon-master");
        creditCartIcon.classList.remove("icon-troy");

        if (firsNumber === "4") {
            creditCartIcon.classList.add("icon-visa");
        }
        else if (firsNumber === "5") {
            creditCartIcon.classList.add("icon-master");
        }
        else if (firsNumber === "9") {
            creditCartIcon.classList.add("icon-troy");
        }
        Feux.Checkout.ccInfoChange()

    },

    creditCardNumberType: function (e, sender) {
        var ccNumberVal = sender.value.replace(/[^0-9\.]+/g, '');
        if (ccNumberVal.length > 5) {
            var ccNumberValTruncated = ccNumberVal.substring(0, 6);
            var lastCcNumberVal = Feux.Checkout.Status.ccNumberVal;
            var getAgain = false;

            if (lastCcNumberVal) {
                if (ccNumberValTruncated !== lastCcNumberVal) {
                    getAgain = true;
                }
            }
            else {
                getAgain = true;
            }
            if (getAgain) {
                Feux.Checkout.Status.ccNumberVal = ccNumberValTruncated;
                Feux.Checkout.getPaymentOptions(ccNumberValTruncated);
            }
        }
    },

    complete: function (e, sender) {
        sender.disabled = true;
        e.preventDefault();
        var ccData = null;
        //var ccOwner = null;
        var ccNumber = null;
        var expireMonth = null;
        var expireYear = null;
        var cvv = null;
        var use3d = null;
        var paymentOptionId = null;


        Feux.Form.collect('ccAddressForm');
        var ccAddressData = Feux.Form.data;
        var seperateBillingInfo = false;

        var deliveryChecked = document.querySelector('input[name="address-delivery"]:checked');
        var deliveryAddressId = deliveryChecked ? document.querySelector('input[name="address-delivery"]:checked').value : 0;
        if (deliveryAddressId != 0) {
            document.querySelector("[data-form-section=ccAddressDetails]").style.border = "none";
        }
        else {
            document.querySelector("[data-form-section=ccAddressDetails]").style.border = "1px solid #BB000F";
            sender.disabled = false;

            window.scrollTo({
                top: document.querySelector("[data-form-section=ccAddressDetails]").getBoundingClientRect().top - 250,
                left: 0,
                behavior: 'smooth'
            });

            return;
        }

        if (sender.getAttribute("data-isFree") !== "True") {



            // Because 2 form containers exist, manually get data from cc form if valid.
            var ccSummaryFormValid = $('#ccSummaryForm').valid();
            var ccInfoFormValid = $('#ccInfoForm').valid();
            var ccAddressValid = $('#ccAddressForm').valid();


            if (!ccInfoFormValid || !ccSummaryFormValid || !ccAddressValid) {
                sender.disabled = false;
                return;
            }

            Feux.Form.collect('ccInfoForm');
            ccData = Feux.Form.data;
            //ccOwner = ccData.ccDetails["cardholder"].val;
            ccNumber = ccData.ccDetails["cardno"].val.replace(/\s/g, '');
            expireMonth = ccData.ccDetails["expireMonth"].val;
            expireYear = ccData.ccDetails["expireYear"].val;
            cvv = ccData.ccDetails["cardcvc"].val;
            use3d = ccData.ccDetails["use3DS"].val == 'on';
            paymentOptionId = jsonValByCondition(ccData.ccDetails.paymentOptions, "isChecked", true, "val");

            if (document.getElementById("useShippingAddress")) {
                if (document.getElementById("useShippingAddress").checked) {
                    seperateBillingInfo = false;
                }
                else {
                    seperateBillingInfo = true;
                }
            }

        }


        // Now go on with regular method.
        var proceed = Feux.Form.presubmit(sender);

        if (proceed) {

            Lidia.Checkout.Commands.PlaceOrder(refNr, 'cc',  ccNumber, expireMonth, expireYear, cvv, paymentOptionId, seperateBillingInfo, use3d,
                function (response) {

                    if (response.ResponseCode === 200) {
                        // Redirect to summary page
                        document.location.href = '/checkout/' + refNr + '/completed';
                    }
                    else if (response.ResponseCode === 201) {

                        // Access the secure payment frame and set the source
                        var securePaymentFrame = document.querySelector('#frmSecurePayment');
                        securePaymentFrame.src = '/Checkout/' + refNr + '/spg';

                        // Open 3d modal
                        document.getElementById("modalSecurePaymentTrigger").click();
                    }
                    else if (response.ResponseCode === 202) {

                        // Access the checkout form frame and set the source
                        var checkoutFormFrame = document.querySelector('#frmCheckoutForm');
                        checkoutFormFrame.src = response.CheckoutFormUrl;

                        // Open iyzico checkout form
                        Feux.Modal.show({ css: 'modalPayment body-gradient', hdr: 'Havale ile Ödeme', bodyContentId: 'moneyTransferModalContent', onHideFunc: 'window.top.postMessage("cancel", "*");' });
                    }
                    else if (response.ResponseCode === -205) {
                        sender.disabled = false;
                        Feux.Identity.Events.openConfirmModal(response.Email, "email");
                    }
                    else {
                        // Show feedback
                        Feux.Checkout.showFeedBack(response.Errors);

                        // Cancel form-sending mode
                        Feux.Form.cancel(sender);
                    }
                },
                function (response) { }
            );
        }
    },
    ccvFocus: function () {
        if (!document.querySelector('.credit-card-box').classList.contains("hover")) {
            document.querySelector('.credit-card-box').classList.add("hover");
        }
    },
    ccvFocusout: function () {
        document.querySelector('.credit-card-box').classList.remove("hover");
    },
    ccInfoChange: function () {

        //var ccOwnerValue = document.getElementById("ccOwner").value;
        //if (ccOwnerValue) {
        //    document.getElementById("ccOwner-target").innerText = ccOwnerValue;
        //}
        //else {
        //    document.getElementById("ccOwner-target").innerText = document.getElementById("ccOwner-target").getAttribute("data-default-value");
        //}
        var ccNumberValue = document.getElementById("ccNumber").value;
        if (ccNumberValue) {
            document.getElementById("ccNumber-target").innerText = ccNumberValue;
        }
        else {
            document.getElementById("ccNumber-target").innerText = document.getElementById("ccNumber-target").getAttribute("data-default-value");
        }
        var monthValue = document.getElementById("cc-month").value;
        if (monthValue) {
            document.getElementById("cc-month-target").innerText = monthValue;
        }
        else {
            document.getElementById("cc-month-target").innerText = document.getElementById("cc-month-target").getAttribute("data-default-value");
        }

        var yearValue = document.getElementById("cc-year").value;
        if (yearValue) {
            document.getElementById("cc-year-target").innerText = yearValue;
        }
        else {
            document.getElementById("cc-year-target").innerText = document.getElementById("cc-year-target").getAttribute("data-default-value");
        }

        var ccCodeValue = document.getElementById("ccCode").value;
        if (ccCodeValue) {
            document.getElementById("ccCode-target").innerText = ccCodeValue;
        }
        else {
            document.getElementById("ccCode-target").innerText = document.getElementById("ccCode-target").getAttribute("data-default-value");
        }

    },

    Tabber: {
        changeTab: function (sender) {
            var activeTabNo = sender.getAttribute("data-tab-no");

            //set Active Header
            document.querySelector("[data-tab-header-container] [data-tab-no].active").classList.remove("active");
            document.querySelector("[data-tab-header-container] [data-tab-no='" + activeTabNo + "']").classList.add("active");

            //set Active Tab
            document.querySelector("[data-tab-content-container] [data-tab-no].active").classList.remove("active");
            document.querySelector("[data-tab-content-container] .tab[data-tab-no='" + activeTabNo + "']").classList.add("active");

            //set Active Page
            if (document.querySelector("[data-tab-pagination-container]")) {
                document.querySelector("[data-tab-pagination-container] [data-tab-no].active").classList.remove("active");
                document.querySelector("[data-tab-pagination-container] [data-tab-no='" + activeTabNo + "']").classList.add("active");
            }

        }
    },
    toggleSender: function (sender) {
        var otherEl = sender.parentNode.querySelector(".other");
        var myselfEl = sender.parentNode.querySelector(".myself");
        var formEl = findAncestor(sender, "[data-cart-line]").querySelector("form");
        otherEl.classList.remove("on");
        myselfEl.classList.remove("on");
        sender.classList.add("on");

        if (otherEl.classList.contains("on")) {
            formEl.removeAttribute("style");
        }
        else {
            formEl.style.display = "none";
        }
    },
    Bagis: function (sender) {
        if (sender.checked) {
            document.getElementById("bagis-yap").style.display = "flex";
        } else {
            document.getElementById("bagis-yap").style.display = "none";
        }
    }
};


