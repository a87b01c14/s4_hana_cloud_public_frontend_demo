import UI5Object from "sap/ui/base/Object";
import MessageBox from "sap/m/MessageBox";
import Component from "../Component";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ODataModel,{ ODataModel$MetadataFailedEvent} from "sap/ui/model/odata/v2/ODataModel";
import Event from "sap/ui/base/Event";

/**
 * @namespace zui5worklistyxs.controller
 */
export default class ErrorHandler extends UI5Object {
    private _oResourceBundle: ResourceBundle;
    private _oComponent: Component;
    private _oModel: ODataModel;
    private _bMessageOpen: boolean;
    private _sErrorText: string;

    /**
         * Handles application errors by automatically attaching to the model events and displaying errors when needed.
         * @class
         * @param {sap.ui.core.UIComponent} oComponent reference to the app's component
         * @public
         * @alias zui5worklistyxs.controller.ErrorHandler
         */
    constructor(oComponent: Component) {
        super();
        this._oResourceBundle = (oComponent.getModel("i18n") as ResourceModel).getResourceBundle() as ResourceBundle;
        this._oComponent = oComponent;
        this._oModel = oComponent.getModel() as ODataModel;
        this._bMessageOpen = false;
        this._sErrorText = this._oResourceBundle.getText("errorText") as string;
        const self = this;

        this._oModel.attachMetadataFailed(function (oEvent: ODataModel$MetadataFailedEvent) {
            var oParams = oEvent.getParameters() as any;
            self._showServiceError(oParams.response);
        }, this);

        this._oModel.attachRequestFailed(function (oEvent: Event) {
            var oParams = oEvent.getParameters() as any;
            // An entity that was not found in the service is also throwing a 404 error in oData.
            // We already cover this case with a notFound target so we skip it here.
            // A request that cannot be sent to the server is a technical error that we have to handle though
            const sResponse = oParams.response as any;
            if (sResponse.statusCode !== "404" || (sResponse.statusCode === 404 && sResponse.responseText.indexOf("Cannot POST") === 0)) {
                self._showServiceError(sResponse);
            }
        }, this);
    }

    /**
         * Shows a {@link sap.m.MessageBox} when a service call has failed.
         * Only the first error message will be display.
         * @param {string} sDetails a technical error to be displayed on request
         * @private
         */
    _showServiceError(sDetails: string): void {
        if (this._bMessageOpen) {
            return;
        }
        const self = this;
        this._bMessageOpen = true;
        MessageBox.error(
            this._sErrorText,
            {
                id: "serviceErrorMessageBox",
                details: sDetails,
                styleClass: this._oComponent.getContentDensityClass(),
                actions: [MessageBox.Action.CLOSE],
                onClose: function () {
                    self._bMessageOpen = false;
                }.bind(this)
            }
        );
    }

}