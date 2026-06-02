import Controller from "sap/ui/core/mvc/Controller";
import Component from "../Component";

/**
 * @namespace zui5walkthroughyxs.controller
 */
export default class App extends Controller {

    public onInit(): void {
        this.getView()?.addStyleClass((this.getOwnerComponent() as Component).getContentDensityClass() as string);
    }
}