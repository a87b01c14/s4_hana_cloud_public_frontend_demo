sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"zrapsoyxs/test/integration/pages/ZCE_SALEORDER_YXSList",
	"zrapsoyxs/test/integration/pages/ZCE_SALEORDER_YXSObjectPage"
], function (JourneyRunner, ZCE_SALEORDER_YXSList, ZCE_SALEORDER_YXSObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('zrapsoyxs') + '/test/flpSandbox.html#zrapsoyxs-tile',
        pages: {
			onTheZCE_SALEORDER_YXSList: ZCE_SALEORDER_YXSList,
			onTheZCE_SALEORDER_YXSObjectPage: ZCE_SALEORDER_YXSObjectPage
        },
        async: true
    });

    return runner;
});

