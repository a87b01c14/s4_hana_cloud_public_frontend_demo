sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("zui5texthyphenationyxs.controller.View1", {
       	onSliderMoved: function (oEvent) {
			var fValue = oEvent.getParameter("value");
			this.byId("containerLayout").setWidth(fValue + "%");
			this.byId("containerLayout1").setWidth(fValue + "%");
		},

		onHyphenationChange: function (oEvent) {
			var sWrappingType = oEvent.getParameter("state") ? "Hyphenated" : "Normal";
			for (var i = 0; i < 5; i++) {
				this.byId("text" + i).setWrappingType(sWrappingType);
			}
		}
    });
});