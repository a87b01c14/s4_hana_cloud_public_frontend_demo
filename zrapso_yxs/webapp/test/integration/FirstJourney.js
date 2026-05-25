sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/JourneyRunner"
], function (opaTest, runner) {
    "use strict";

    function journey() {
        QUnit.module("First journey");

        opaTest("Start application", function (Given, When, Then) {
            Given.iStartMyApp();

            Then.onTheZCE_SALEORDER_YXSList.iSeeThisPage();
            Then.onTheZCE_SALEORDER_YXSList.onTable().iCheckColumns(5, {"SalesOrderItem":{"header":"销售凭证项目"},"SalesOrder":{"header":"销售凭证"},"SalesOrderItemText":{"header":"项目描述"},"SalesOrderItemCategory":{"header":"项目类别"},"CreatedByUser":{"header":"创建人"}});

        });


        opaTest("Navigate to ObjectPage", function (Given, When, Then) {
            // Note: this test will fail if the ListReport page doesn't show any data
            
            When.onTheZCE_SALEORDER_YXSList.onFilterBar().iExecuteSearch();
            
            Then.onTheZCE_SALEORDER_YXSList.onTable().iCheckRows();

            When.onTheZCE_SALEORDER_YXSList.onTable().iPressRow(0);
            Then.onTheZCE_SALEORDER_YXSObjectPage.iSeeThisPage();

        });

        opaTest("Teardown", function (Given, When, Then) { 
            // Cleanup
            Given.iTearDownMyApp();
        });
    }

    runner.run([journey]);
});