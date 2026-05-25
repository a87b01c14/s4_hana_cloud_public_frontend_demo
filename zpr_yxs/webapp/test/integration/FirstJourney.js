sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/JourneyRunner"
], function (opaTest, runner) {
    "use strict";

    function journey() {
        QUnit.module("First journey");

        opaTest("Start application", function (Given, When, Then) {
            Given.iStartMyApp();

            Then.onTheShoppingCartList.iSeeThisPage();
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("OrderUUID");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("OrderID");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("OrderedItem");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("Price");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("TotalPrice");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("OrderQuantity");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("DeliveryDate");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("OverallStatus");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("Notes");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("Created By");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("Created On");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("Changed By");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("Changed On");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("Changed On");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("PurchaseRequisition");
            Then.onTheShoppingCartList.onFilterBar().iCheckFilterField("PrCreationDate");
            Then.onTheShoppingCartList.onTable().iCheckColumns(16, {"OrderUUID":{"header":"OrderUUID"},"OrderID":{"header":"OrderID"},"OrderedItem":{"header":"OrderedItem"},"Price":{"header":"Price"},"TotalPrice":{"header":"TotalPrice"},"OrderQuantity":{"header":"OrderQuantity"},"DeliveryDate":{"header":"DeliveryDate"},"OverallStatus":{"header":"OverallStatus"},"Notes":{"header":"Notes"},"CreatedBy":{"header":"Created By"},"CreatedAt":{"header":"Created On"},"LastChangedBy":{"header":"Changed By"},"LastChangedAt":{"header":"Changed On"},"LocalLastChangedAt":{"header":"Changed On"},"PurchaseRequisition":{"header":"PurchaseRequisition"},"PrCreationDate":{"header":"PrCreationDate"}});

        });


        opaTest("Navigate to ObjectPage", function (Given, When, Then) {
            // Note: this test will fail if the ListReport page doesn't show any data
            
            When.onTheShoppingCartList.onFilterBar().iExecuteSearch();
            
            Then.onTheShoppingCartList.onTable().iCheckRows();

            When.onTheShoppingCartList.onTable().iPressRow(0);
            Then.onTheShoppingCartObjectPage.iSeeThisPage();

        });

        opaTest("Teardown", function (Given, When, Then) { 
            // Cleanup
            Given.iTearDownMyApp();
        });
    }

    runner.run([journey]);
});