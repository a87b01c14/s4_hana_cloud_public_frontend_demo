sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'zpryxs',
            componentId: 'ShoppingCartObjectPage',
            contextPath: '/ShoppingCart'
        },
        CustomPageDefinitions
    );
});