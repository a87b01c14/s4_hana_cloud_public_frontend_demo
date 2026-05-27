sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("zui5textemptyindicatoryxs.controller.View1", {
        onCssClassChange: function () {
            this.byId("containerAuto").toggleStyleClass("sapMShowEmpty-CTX");
        }
    });
});