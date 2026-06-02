import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import Dialog from "sap/m/Dialog";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @namespace zui5walkthroughyxs.controller
 */
export default class HelloPanel extends Controller {
    private dialog: Dialog;
    onShowHello(): void {
        // read msg from i18n model
        const sRecipient = (this.getView()?.getModel() as JSONModel)?.getProperty("/recipient/name");
        const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
        const msg = resourceBundle.getText("helloMsg", [sRecipient]) as string;
        // show message
        MessageToast.show(msg);
    }
    async onOpenDialog(): Promise<void> {
        if (!this.dialog) {
            this.dialog ??= await this.loadFragment({
                name: "zui5walkthroughyxs.view.HelloDialog"
            }) as Dialog;
        }
        this.dialog.open();
    }
    onCloseDialog(): void {
        this.dialog?.close();
    }
}