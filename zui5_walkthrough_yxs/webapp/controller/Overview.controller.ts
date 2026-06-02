import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

/**
 * @namespace zui5walkthroughyxs.controller
 */
export default class View1 extends Controller {

    public onInit(): void {
        const oData = {
            recipient: {
                name: "World"
            }
        };
        this.getView()?.setModel(new JSONModel(oData));

        // set i18n model on view
        // not needed defined in manifest.json
        // const i18nModel = new ResourceModel({
        //     bundleName: "zui5walkthroughyxs.i18n.i18n"
        // });
        // this.getView()?.setModel(i18nModel, "i18n");
    }

}