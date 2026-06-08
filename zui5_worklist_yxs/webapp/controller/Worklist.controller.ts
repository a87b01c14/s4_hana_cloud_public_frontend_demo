import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Control from "sap/ui/core/Control";
import Event from "sap/ui/base/Event";
import ObjectListItem from "sap/m/ObjectListItem";
import ListBinding from "sap/ui/model/ListBinding";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import Context from "sap/ui/model/Context";

/**
 * @namespace zui5worklistyxs.controller
 */
export default class Worklist extends BaseController {
    private _aTableSearchState: any[];

    /* =========================================================== */
    /* lifecycle methods                                           */
    /* =========================================================== */

    /**
     * Called when the worklist controller is instantiated.
     * @public
     */
    onInit() {
        var oViewModel: JSONModel,
            iOriginalBusyDelay: number,
            oTable: Control = this.byId("table") as Control;

        // Put down worklist table's original value for busy indicator delay,
        // so it can be restored later on. Busy handling on the table is
        // taken care of by the table itself.
        iOriginalBusyDelay = oTable?.getBusyIndicatorDelay();
        // keeps the search state
        this._aTableSearchState = [];

        // Model used to manipulate control states
        oViewModel = new JSONModel({
            worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
            shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
            shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
            shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
            tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
            tableBusyDelay: 0
        });
        this.setModel(oViewModel, "worklistView");

        // Make sure, busy indication is showing immediately so there is no
        // break after the busy indication for loading the view's meta data is
        // ended (see promise 'oWhenMetadataIsLoaded' in AppController)
        oTable.attachEventOnce("updateFinished", function () {
            // Restore original busy indicator delay for worklist's table
            oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
        });
    }

    /* =========================================================== */
    /* event handlers                                              */
    /* =========================================================== */

    /**
     * Triggered by the table's 'updateFinished' event: after new table
     * data is available, this handler method updates the table counter.
     * This should only happen if the update was successful, which is
     * why this handler is attached to 'updateFinished' and not to the
     * table's list binding's 'dataReceived' method.
     * @param {sap.ui.base.Event} oEvent the update finished event
     * @public
     */
    onUpdateFinished(oEvent: Event) {
        // update the worklist's object counter after the table update
        var sTitle,
            oTable = oEvent.getSource() as ObjectListItem;
            // iTotalItems = oEvent.getParameter("total") as number;

        var iTotal:number = 10; 
        // only update the counter if the length is final and
        // the table is not empty
        if (iTotal && (oTable?.getBinding("items") as ListBinding).isLengthFinal()) {
            sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotal]);
        } else {
            sTitle = this.getResourceBundle().getText("worklistTableTitle");
        }
        (this.getModel("worklistView") as JSONModel).setProperty("/worklistTableTitle", sTitle);
    }

    /**
     * Event handler when a table item gets pressed
     * @param {sap.ui.base.Event} oEvent the table selectionChange event
     * @public
     */
    onPress(oEvent: Event) {
        // The source is the list item that got pressed
        this._showObject(oEvent.getSource());
    }

    /**
     * Event handler for navigating back.
     * We navigate back in the browser history
     * @public
     */
    onNavBack() {
        history.go(-1);
    }


    onSearch(oEvent:SearchField$SearchEvent) {
        if (oEvent.getParameters().refreshButtonPressed) {
            // Search field's 'refresh' button has been pressed.
            // This is visible if you select any master list item.
            // In this case no new search is triggered, we only
            // refresh the list binding.
            this.onRefresh();
        } else {
            var aTableSearchState:Filter[] = [];
            var sQuery = oEvent.getParameter("query");

            if (sQuery && sQuery.length > 0) {
                aTableSearchState = [new Filter("ProductName", FilterOperator.Contains, sQuery)];
            }
            this._applySearch(aTableSearchState);
        }

    }

    /**
     * Event handler for refresh event. Keeps filter, sort
     * and group settings and refreshes the list binding.
     * @public
     */
    onRefresh() {
        var oTable = this.byId("table");
        (oTable?.getBinding("items") as ListBinding).refresh();
    }

    /* =========================================================== */
    /* internal methods                                            */
    /* =========================================================== */

    /**
     * Shows the selected item on the object page
     * On phones a additional history entry is created
     * @param {sap.m.ObjectListItem} oItem selected Item
     * @private
     */
    _showObject(oItem:ObjectListItem) {
        this.getRouter().navTo("object", {
            objectId: (oItem.getBindingContext() as Context).getProperty("ProductID")
        });
    }

    /**
     * Internal helper method to apply both filter and search state together on the list binding
     * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
     * @private
     */
    _applySearch(aTableSearchState: Filter[]) {
        var oTable = this.byId("table"),
            oViewModel = this.getModel("worklistView") as JSONModel;
        (oTable?.getBinding("items") as ListBinding).filter(aTableSearchState, "Application");
        // changes the noDataText of the list in case there are no filter results
        if (aTableSearchState.length !== 0) {
            oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
        }
    }

}