sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'zrapsoyxs',
            componentId: 'ZCE_SALEORDER_YXSList',
            contextPath: '/ZCE_SALEORDER_YXS'
        },
        CustomPageDefinitions
    );
});