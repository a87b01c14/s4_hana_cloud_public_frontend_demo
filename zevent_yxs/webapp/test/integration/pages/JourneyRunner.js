sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"zeventyxs/test/integration/pages/ZC_ONLINESHOP_YXSList",
	"zeventyxs/test/integration/pages/ZC_ONLINESHOP_YXSObjectPage"
], function (JourneyRunner, ZC_ONLINESHOP_YXSList, ZC_ONLINESHOP_YXSObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('zeventyxs') + '/test/flpSandbox.html#zeventyxs-tile',
        pages: {
			onTheZC_ONLINESHOP_YXSList: ZC_ONLINESHOP_YXSList,
			onTheZC_ONLINESHOP_YXSObjectPage: ZC_ONLINESHOP_YXSObjectPage
        },
        async: true
    });

    return runner;
});

