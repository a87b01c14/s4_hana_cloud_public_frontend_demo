import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import History from "sap/ui/core/routing/History";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Route, { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

export default class NotFObjectound extends BaseController {

    /* =========================================================== */
    /* lifecycle methods                                           */
    /* =========================================================== */

    /**
     * Called when the worklist controller is instantiated.
     * @public
     */
    onInit() {
        // Model used to manipulate control states. The chosen values make sure,
        // detail page is busy indication immediately so there is no break in
        // between the busy indication for loading the view's meta data
        var iOriginalBusyDelay: number,
            oViewModel = new JSONModel({
                busy: true,
                delay: 0
            });

        this.getRouter().getRoute("object")?.attachPatternMatched(this._onObjectMatched, this);

        // Store original busy indicator delay, so it can be restored later on
        iOriginalBusyDelay = this.getView()?.getBusyIndicatorDelay() as number;
        this.setModel(oViewModel, "objectView");
        (this.getOwnerComponent()?.getModel() as ODataModel)?.metadataLoaded().then(function () {
            // Restore original busy indicator delay for the object view
            oViewModel.setProperty("/delay", iOriginalBusyDelay);
        }
        );
    }

    /* =========================================================== */
    /* event handlers                                              */
    /* =========================================================== */


    /**
     * Event handler  for navigating back.
     * It there is a history entry we go one step back in the browser history
     * If not, it will replace the current entry of the browser history with the worklist route.
     * @public
     */
    onNavBack() {
        var sPreviousHash = History.getInstance().getPreviousHash();

        if (sPreviousHash !== undefined) {
            history.go(-1);
        } else {
            this.getRouter().navTo("worklist", {}, true);
        }
    }

    /* =========================================================== */
    /* internal methods                                            */
    /* =========================================================== */

    /**
     * Binds the view to the object path.
     * @function
     * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
     * @private
     */
    _onObjectMatched(oEvent: Route$PatternMatchedEvent) {
        var sObjectId = (oEvent.getParameter("arguments") as any).objectId;
        const oModel = this.getModel() as ODataModel;
        const self = this;
        oModel.metadataLoaded().then(function () {
            var sObjectPath = oModel.createKey("Products", {
                ProductID: sObjectId
            });
            self._bindView("/" + sObjectPath);
        }.bind(this));
    }

    /**
     * Binds the view to the object path.
     * @function
     * @param {string} sObjectPath path to the object to be bound
     * @private
     */
    _bindView(sObjectPath: string): void {
        var oViewModel = this.getModel("objectView") as JSONModel,
            oDataModel = this.getModel() as ODataModel;

        this.getView()?.bindElement({
            path: sObjectPath,
            events: {
                change: this._onBindingChange.bind(this),
                dataRequested: function () {
                    oDataModel.metadataLoaded().then(function () {
                        // Busy indicator on view should only be set if metadata is loaded,
                        // otherwise there may be two busy indications next to each other on the
                        // screen. This happens because route matched handler already calls '_bindView'
                        // while metadata is loaded.
                        oViewModel.setProperty("/busy", true);
                    });
                },
                dataReceived: function () {
                    oViewModel.setProperty("/busy", false);
                }
            }
        });
    }

    _onBindingChange() {
        var oView = this.getView(),
            oViewModel = this.getModel("objectView") as JSONModel,
            oElementBinding = oView?.getElementBinding();

        // No data for the binding
        if (!oElementBinding?.getBoundContext()) {
            this.getRouter().getTargets()?.display("objectNotFound");
            return;
        }

        var oResourceBundle = this.getResourceBundle() as ResourceBundle,
            oObject = oView?.getBindingContext()?.getObject(),
            sObjectId = oObject.ProductID,
            sObjectName = oObject.ProductName;

        oViewModel.setProperty("/busy", false);
        oViewModel.setProperty("/shareSendEmailSubject",
            oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
        oViewModel.setProperty("/shareSendEmailMessage",
            oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
    }

}