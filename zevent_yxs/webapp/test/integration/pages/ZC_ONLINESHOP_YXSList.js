sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'zeventyxs',
            componentId: 'ZC_ONLINESHOP_YXSList',
            contextPath: '/ZC_ONLINESHOP_YXS'
        },
        CustomPageDefinitions
    );
});