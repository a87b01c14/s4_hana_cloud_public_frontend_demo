sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"zrap100yxs/test/integration/pages/TravelList",
	"zrap100yxs/test/integration/pages/TravelObjectPage"
], function (JourneyRunner, TravelList, TravelObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('zrap100yxs') + '/test/flpSandbox.html#zrap100yxs-tile',
        pages: {
			onTheTravelList: TravelList,
			onTheTravelObjectPage: TravelObjectPage
        },
        async: true
    });

    return runner;
});

