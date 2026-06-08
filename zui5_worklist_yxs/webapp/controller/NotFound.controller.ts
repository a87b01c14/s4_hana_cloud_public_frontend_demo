import BaseController from "./BaseController";
/**
 * @namespace zui5worklistyxs.controller
 */
export default class NotFound extends BaseController {

    /**
     * Navigates to the worklist when the link is pressed
     * @public
     */
    onLinkPressed() {
        this.getRouter().navTo("worklist");
    }

}