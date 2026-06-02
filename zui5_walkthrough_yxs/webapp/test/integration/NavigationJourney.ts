/*global QUnit*/
import opaTest from "sap/ui/test/opaQunit";
import AppPage from "./pages/AppPage";
import ViewPage from "./pages/View1Page";
import HelloPanelPage from "./pages/HelloPanelPage";


import Opa5 from "sap/ui/test/Opa5";

QUnit.module("Navigation Journey");

const onTheAppPage = new AppPage();
const onTheViewPage = new ViewPage();
const onTheHelloPanelPage = new HelloPanelPage();
Opa5.extendConfig({
	viewNamespace: "zui5walkthroughyxs.view.",
	autoWait: true
});

opaTest("Should see the initial page of the app", function () {
	// Arrangements
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iStartMyUIComponent({
		componentConfig: {
			name: "zui5walkthroughyxs"
		}
	});

	// Assertions
	onTheAppPage.iShouldSeeTheApp();
	onTheViewPage.iShouldSeeThePageView();


	// Cleanup
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	onTheAppPage.iTeardownMyApp();
});

opaTest("Should open the Hello dialog", function () {

	// Arrangements
	onTheHelloPanelPage.iStartMyUIComponent({
		componentConfig: {
			name: "zui5walkthroughyxs"
		}
	});

	// Actions
	onTheHelloPanelPage.iPressTheSayHelloWithDialogButton();

	// Assertions
	onTheHelloPanelPage.iShouldSeeTheHelloDialog();

	// Cleanup
	onTheHelloPanelPage.iTeardownMyApp();
});
