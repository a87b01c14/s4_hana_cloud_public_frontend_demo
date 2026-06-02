import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import Event from "sap/ui/base/Event";
import ObjectListItem from "sap/m/ObjectListItem";
import UIComponent from "sap/ui/core/UIComponent";
import Context from "sap/ui/model/Context";

/**
 * @namespace zui5walkthroughyxs.controller
 */
export default class InvoiceList extends Controller {

    onInit(): void {
        const viewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView()?.setModel(viewModel, "view");
    }

    onFilterInvoices(oEvent: SearchField$SearchEvent): void {
        // build filter array
        const aFilter = [];
        const sQuery = oEvent.getParameter("query");
        if (sQuery) {
            aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
        }
        // filter binding
        const oList = this.byId("invoiceList");
        const oBinding = oList?.getBinding("items") as ListBinding;
        oBinding?.filter(aFilter);
    }

     onPress(event: Event): void {
        const item = event.getSource() as ObjectListItem;
        const router = UIComponent.getRouterFor(this);
        router.navTo("detail", {
            invoicePath: window.encodeURIComponent(((item.getBindingContext("invoice") as Context).getPath() as string).substring(1))
        });
    }     
};