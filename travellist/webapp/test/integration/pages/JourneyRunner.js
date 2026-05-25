sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"sap/fe/demo/travellist/test/integration/pages/TravelList",
	"sap/fe/demo/travellist/test/integration/pages/TravelObjectPage"
], function (JourneyRunner, TravelList, TravelObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('sap/fe/demo/travellist') + '/test/flpSandbox.html#sapfedemotravellist-tile',
        pages: {
			onTheTravelList: TravelList,
			onTheTravelObjectPage: TravelObjectPage
        },
        async: true
    });

    return runner;
});

