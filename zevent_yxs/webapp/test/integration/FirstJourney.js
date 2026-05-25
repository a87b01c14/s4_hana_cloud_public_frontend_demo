sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/JourneyRunner"
], function (opaTest, runner) {
    "use strict";

    function journey() {
        QUnit.module("First journey");

        opaTest("Start application", function (Given, When, Then) {
            Given.iStartMyApp();

            Then.onTheZC_ONLINESHOP_YXSList.iSeeThisPage();
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("OrderUUID");
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("OrderID");
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("Ordereditem");
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("Deliverydate");
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("Creationdate");
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("Created By");
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("Created On");
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("Changed By");
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("Changed On");
            Then.onTheZC_ONLINESHOP_YXSList.onFilterBar().iCheckFilterField("Changed On");
            Then.onTheZC_ONLINESHOP_YXSList.onTable().iCheckColumns(10, {"OrderUUID":{"header":"OrderUUID"},"OrderID":{"header":"OrderID"},"Ordereditem":{"header":"Ordereditem"},"Deliverydate":{"header":"Deliverydate"},"Creationdate":{"header":"Creationdate"},"LocalCreatedBy":{"header":"Created By"},"LocalCreatedAt":{"header":"Created On"},"LocalLastChangedBy":{"header":"Changed By"},"LocalLastChangedAt":{"header":"Changed On"},"LastChangedAt":{"header":"Changed On"}});

        });


        opaTest("Navigate to ObjectPage", function (Given, When, Then) {
            // Note: this test will fail if the ListReport page doesn't show any data
            
            When.onTheZC_ONLINESHOP_YXSList.onFilterBar().iExecuteSearch();
            
            Then.onTheZC_ONLINESHOP_YXSList.onTable().iCheckRows();

            When.onTheZC_ONLINESHOP_YXSList.onTable().iPressRow(0);
            Then.onTheZC_ONLINESHOP_YXSObjectPage.iSeeThisPage();

        });

        opaTest("Teardown", function (Given, When, Then) { 
            // Cleanup
            Given.iTearDownMyApp();
        });
    }

    runner.run([journey]);
});