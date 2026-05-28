sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    'sap/ui/Device',
    'sap/ui/model/json/JSONModel'
], (Controller,MessageToast,Device,JSONModel) => {
    "use strict";

    return Controller.extend("zui5imageyxs.controller.View1", {
        onInit: function () {
            var bIsPhone = Device.system.phone,
                // svgLogo = sap.ui.require.toUrl("zui5imageyxs/images/sap-logo.svg"),
                oImgModel;

            this.getView().setModel(new JSONModel({
                imageWidth: bIsPhone ? "5em" : "10em"
                // svgLogo: svgLogo
            }));

            // set explored app's demo model on this sample
            oImgModel = new JSONModel(sap.ui.require.toUrl("zui5imageyxs/mockdata/img.json"));
            this.getView().setModel(oImgModel, "img");

        },

        handleImage3Press: function (evt) {
            MessageToast.show("The image has been pressed");
        }
    });
});