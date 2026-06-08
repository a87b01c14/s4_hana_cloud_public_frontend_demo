import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import Device from "sap/ui/Device";


/**
 * @namespace zui5worklistyxs
 */
export default class Component extends BaseComponent {

    public static metadata = {
        manifest: "json",
        interfaces: [
            "sap.ui.core.IAsyncContentCreation"
        ]
    };

    public init(): void {
        // call the base component's init function
        super.init();

        // set the device model
        this.setModel(createDeviceModel(), "device");

        // enable routing
        this.getRouter().initialize();
    }
    getContentDensityClass(): string {
        return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
    }
}