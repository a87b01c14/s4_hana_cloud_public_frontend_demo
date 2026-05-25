sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'zrapsoyxs',
            componentId: 'ZCE_SALEORDER_YXSObjectPage',
            contextPath: '/ZCE_SALEORDER_YXS'
        },
        CustomPageDefinitions
    );
});