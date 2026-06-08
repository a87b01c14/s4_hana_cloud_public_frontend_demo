import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModelV2 from "sap/ui/model/odata/v2/ODataModel";
import ODataModelV4 from "sap/ui/model/odata/v4/ODataModel";
import Component from "../Component";

/**
 * @namespace zui5worklistyxs.controller
 */
export default class App extends BaseController {

    public onInit(): void {
        var fnSetAppNotBusy,
            iOriginalBusyDelay = this.getView()?.getBusyIndicatorDelay();

        const oViewModel = new JSONModel({
            busy: true,
            delay: 0
        });
        this.getView()?.setModel(oViewModel, "appView");

        fnSetAppNotBusy = function () {
            oViewModel.setProperty("/busy", false);
            oViewModel.setProperty("/delay", iOriginalBusyDelay);
        };

        // disable busy indication when the metadata is loaded and in case of errors
        const oComponent = this.getOwnerComponent() as Component;
        debugger;
        var oModel = oComponent.getModel();
        const isV2 = oModel instanceof ODataModelV2;
        const isV4 = oModel instanceof ODataModelV4;
        if (isV2) {
            const v2Model = oModel as ODataModelV2;
            // oModel.metadataLoaded()?.then(fnSetAppNotBusy);
            v2Model?.attachMetadataLoaded(fnSetAppNotBusy);
            v2Model?.attachMetadataFailed(fnSetAppNotBusy);
        }
        else if (isV4) {
            // const v4Model = oModel as ODataModelV4;
            // v4Model?.attachDataRequested(fnSetAppNotBusy);
            // v4Model?.attachSessionTimeout(fnSetAppNotBusy);
            fnSetAppNotBusy();
        }

        // apply content density mode to root view
        this.getView()?.addStyleClass(oComponent.getContentDensityClass());
    }
}