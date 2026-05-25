sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'zeventyxs',
            componentId: 'ZC_ONLINESHOP_YXSObjectPage',
            contextPath: '/ZC_ONLINESHOP_YXS'
        },
        CustomPageDefinitions
    );
});