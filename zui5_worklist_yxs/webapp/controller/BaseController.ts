import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import { URLHelper } from "sap/m/library";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Component from "zui5worklistyxs/Component";
import View from "sap/ui/core/mvc/View";
import Router from "sap/ui/core/routing/Router";

/**
 * @namespace zui5worklistyxs.controller
 */
export default class BaseController extends Controller {
    /**
     * Convenience method for accessing the router.
     * @public
     * @returns {sap.ui.core.routing.Router} the router for this component
     */
    getRouter(): Router {
        return UIComponent.getRouterFor(this);
    }

    /**
     * Convenience method for getting the view model by name.
     * @public
     * @param {string} [sName] the model name
     * @returns {sap.ui.model.Model} the model instance
     */
    getModel(sName?: string): Model {
        return this.getView()?.getModel(sName) as Model;
    }

    /**
     * Convenience method for setting the view model.
     * @public
     * @param {sap.ui.model.Model} oModel the model instance
     * @param {string} sName the model name
     * @returns {sap.ui.mvc.View} the view instance
     */
    setModel(oModel: Model, sName: string): View | undefined {
        return this.getView()?.setModel(oModel, sName);
    }

    /**
     * Getter for the resource bundle.
     * @public
     * @returns {sap.base.i18n.ResourceBundle} the resourceBundle of the component
     */
    getResourceBundle(): ResourceBundle {
        return ((this.getOwnerComponent() as Component).getModel("i18n") as ResourceModel).getResourceBundle() as ResourceBundle;
    }

    /**
     * Event handler when the share by E-Mail button has been clicked
     * @public
     */
    onShareEmailPress() {
        var oViewModel = (this.getModel("objectView") || this.getModel("worklistView"));
        URLHelper.triggerEmail(
            undefined,
            oViewModel.getProperty("/shareSendEmailSubject"),
            oViewModel.getProperty("/shareSendEmailMessage")
        );
    }

}
