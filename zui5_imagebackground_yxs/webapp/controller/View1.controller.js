sap.ui.define([
    "sap/ui/core/mvc/Controller",
    	'sap/ui/Device',
		'sap/ui/model/json/JSONModel',
		'sap/m/library'
], (Controller,Device,JSONModel,mobileLibrary) => {
    "use strict";
    	// shortcut for sap.m.ImageMode
	var ImageMode = mobileLibrary.ImageMode;

    return Controller.extend("zui5imagebackgroundyxs.controller.View1", {
        	onInit: function() {
			var bIsPhone = Device.system.phone,
				oImgModel = new JSONModel(sap.ui.require.toUrl("zui5imagebackgroundyxs/mockdata/img.json"));

			this.getView().setModel(new JSONModel({
				imageHeight: bIsPhone ? "5em" : "10em",
				imageWidth: bIsPhone ? "5em" : "10em",
				imageMode: ImageMode.Background,
				imageBackgroundSize: "2em"
			}));

			this.getView().setModel(oImgModel, "img");
		}
    });
});