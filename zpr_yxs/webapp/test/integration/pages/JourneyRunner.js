sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"zpryxs/test/integration/pages/ShoppingCartList",
	"zpryxs/test/integration/pages/ShoppingCartObjectPage"
], function (JourneyRunner, ShoppingCartList, ShoppingCartObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('zpryxs') + '/test/flpSandbox.html#zpryxs-tile',
        pages: {
			onTheShoppingCartList: ShoppingCartList,
			onTheShoppingCartObjectPage: ShoppingCartObjectPage
        },
        async: true
    });

    return runner;
});

