'use strict';

angular.module('angularPoint')
    .run(function ($httpBackend, apCachedXML) {

        /** Mock response for apDataService.getCurrentSite */
        $httpBackend.whenPOST('/_vti_bin/Webs.asmx')
            .respond(function (method, url, data) {
                return responder(apCachedXML.WebUrlFromPageUrl);
            });

        $httpBackend.whenPOST('/test/_vti_bin/UserProfileService.asmx')
            .respond(function (method, url, data) {
                var requestXML = $.parseXML(data);
                var request = $(requestXML).find('[xmlns^="http://microsoft.com/"]');
                var operation = request[0].nodeName;
                var responseXML;

                if(apCachedXML[operation]) {
                    responseXML = apCachedXML[operation];
                }

                return responder(responseXML);
            });

        $httpBackend.whenPOST('/test/_vti_bin/usergroup.asmx')
            .respond(function (method, url, data) {
                var requestXML = $.parseXML(data);
                var request = $(requestXML).find('[xmlns^="http://schemas.microsoft.com/"]');
                var operation = request[0].nodeName;
                var responseXML;

                if(apCachedXML[operation]) {
                    responseXML = apCachedXML[operation];
                }

                return responder(responseXML);
            });

        $httpBackend.whenPOST('/test/_vti_bin/Views.asmx')
            .respond(function (method, url, data) {
                console.info(typeof data);
                var requestXML = $.parseXML(data);
                var request = $(requestXML).find('[xmlns^="http://schemas.microsoft.com/"]');
                var operation = request[0].nodeName;
                var responseXML;

                if(apCachedXML[operation]) {
                    responseXML = apCachedXML[operation];
                }

                return responder(responseXML);
            });

        $httpBackend.whenPOST('/test/_vti_bin/Lists.asmx')
            .respond(function (method, url, data) {
                var requestXML = $.parseXML(data);
                var request = $(requestXML).find('[xmlns^="http://schemas.microsoft.com/sharepoint/"]');
                var operation = request[0].nodeName;
                var responseXML;

                switch(operation) {
                    //case 'DeleteAttachment':
                    //    responseXML = apCachedXML.DeleteAttachment;
                    //    break;
                    case 'GetListItems':
                        var rowLimit = $(requestXML).find('rowLimit').text();
                        if(rowLimit == 1) {
                            /** Returns a single entity */
                            responseXML = apCachedXML.GetListItemById;
                        } else {
                            responseXML = apCachedXML.GetListItems;
                        }
                        break;
                    case 'UpdateListItems':
                        var updateMethod = request.find('Method');
                        var cmd = updateMethod.attr('Cmd');
                        switch(cmd) {
                            /** Create list item 4 */
                            case 'New':
                                responseXML = apCachedXML.UpdateListItems_New;
                                break;
                            case 'Update':
                                /** Update List Item 1 with mock.integer=13 */
                                responseXML = apCachedXML.UpdateListItems_Update;
                                break;
                            /** Delete list Item 1 */
                            case 'Delete':
                                responseXML = apCachedXML.UpdateListItems_Delete;
                                break;
                        }
                        break;

                    default:
                        if(apCachedXML[operation]) {
                            responseXML = apCachedXML[operation];
                        }
                }
                return responder(responseXML);
            });

        function responder(responseXML) {
            return [200, responseXML];
        }
    });