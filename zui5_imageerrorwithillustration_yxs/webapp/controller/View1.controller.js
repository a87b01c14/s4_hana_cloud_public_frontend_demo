sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/Device',
    'sap/ui/model/json/JSONModel'
], (Controller, Device, JSONModel) => {
    "use strict";

    return Controller.extend("zui5imageerrorwithillustrationyxs.controller.View1", {
        onInit: function () {
            var bIsPhone = Device.system.phone,
                oImgModel = new JSONModel(sap.ui.require.toUrl("zui5imageerrorwithillustrationyxs/mockdata/img.json")); // raises error when loading the image
            oImgModel = new JSONModel({
                products: {
                    pic1: "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-7777-large.jpg"
                }
            });

            this.getView().setModel(new JSONModel({
                imageHeight: bIsPhone ? "5em" : "10em",
                imageWidth: bIsPhone ? "5em" : "10em",
                hasError: false
            }));
            this.getView().setModel(oImgModel, "img");
        },

        onLoad: function () {
            this.getView().getModel().setProperty("/hasError", false);
        },

        onError: function () {
            this.getView().getModel().setProperty('/hasError', true);
        },

        onPressSetSrc: function () {
            this.getView().getModel("img").setProperty('/products/pic1', "/some/random/url");
        }
    });
});