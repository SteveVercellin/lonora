// source --> https://lonora.hrslab.com/wp-content/plugins/woocommerce/assets/js/frontend/tokenization-form.min.js?ver=6.9.3 
jQuery(function(t){var o=function(e){this.$target=e,this.$formWrap=e.closest(".payment_box"),this.params=t.extend({},{is_registration_required:!1,is_logged_in:!1},wc_tokenization_form_params),this.onDisplay=this.onDisplay.bind(this),this.hideForm=this.hideForm.bind(this),this.showForm=this.showForm.bind(this),this.showSaveNewCheckbox=this.showSaveNewCheckbox.bind(this),this.hideSaveNewCheckbox=this.hideSaveNewCheckbox.bind(this),this.$target.on("click change",":input.woocommerce-SavedPaymentMethods-tokenInput",{tokenizationForm:this},this.onTokenChange),t("input#createaccount").on("change",{tokenizationForm:this},this.onCreateAccountChange),this.onDisplay()};o.prototype.onDisplay=function(){0===t(":input.woocommerce-SavedPaymentMethods-tokenInput:checked",this.$target).length&&t(":input.woocommerce-SavedPaymentMethods-tokenInput:last",this.$target).prop("checked",!0),0===this.$target.data("count")&&t(".woocommerce-SavedPaymentMethods-new",this.$target).remove(),0<t("input#createaccount").length&&t("input#createaccount").is(":checked")||this.params.is_logged_in||this.params.is_registration_required?this.showSaveNewCheckbox():this.hideSaveNewCheckbox(),t(":input.woocommerce-SavedPaymentMethods-tokenInput:checked",this.$target).trigger("change")},o.prototype.onTokenChange=function(e){"new"===t(this).val()?(e.data.tokenizationForm.showForm(),e.data.tokenizationForm.showSaveNewCheckbox()):(e.data.tokenizationForm.hideForm(),e.data.tokenizationForm.hideSaveNewCheckbox())},o.prototype.onCreateAccountChange=function(e){t(this).is(":checked")?e.data.tokenizationForm.showSaveNewCheckbox():e.data.tokenizationForm.hideSaveNewCheckbox()},o.prototype.hideForm=function(){t(".wc-payment-form",this.$formWrap).hide()},o.prototype.showForm=function(){t(".wc-payment-form",this.$formWrap).show()},o.prototype.showSaveNewCheckbox=function(){t(".woocommerce-SavedPaymentMethods-saveNew",this.$formWrap).show()},o.prototype.hideSaveNewCheckbox=function(){t(".woocommerce-SavedPaymentMethods-saveNew",this.$formWrap).hide()},t.fn.wc_tokenization_form=function(e){return new o(this),this},t(document.body).on("updated_checkout wc-credit-card-form-init",function(){t("ul.woocommerce-SavedPaymentMethods").each(function(){t(this).wc_tokenization_form()})})});