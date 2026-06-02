import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";

export default {
    statusText: function (this: Controller, sStatus: string): string | undefined {
        const i18nModel = this?.getOwnerComponent()?.getModel("i18n") as ResourceModel;
        const oBundle = i18nModel?.getResourceBundle() as ResourceBundle;
        switch (sStatus) {
            case "A":
                return oBundle.getText("invoiceStatusA");
            case "B":
                return oBundle.getText("invoiceStatusB");
            case "C":
                return oBundle.getText("invoiceStatusC");
            default:
                return sStatus;
        }
    }
}