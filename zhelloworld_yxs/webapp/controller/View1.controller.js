sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("zhelloworldyxs.controller.View1", {
        onInit() {
        },
        sayHello() {
            MessageBox.show("Hello World!");
        }
    });
});