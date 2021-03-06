'use strict';

/** Angular will instantiate this singleton by calling "new" on this function the first time it's referenced
 /*  State will persist throughout life of session
 */
angular.module('angularPoint')
    .service('mockModel', function (apModelFactory, apDecodeService, mockXMLService, $httpBackend) {

        /**
         * Entity Constructor
         * @param obj
         * @constructor
         */
        function Mock(obj) {
            var self = this;
            _.extend(self, obj);
        }

        /********************* Model Definition ***************************************/

        /** Model Constructor
         *  Also passes list to List constructor to build viewFields (XML definition of fields to return) */
        var model = apModelFactory.create({
            factory: Mock,
            list: {
                title: 'MockList',
                /**Maps to the offline XML file in dev folder (no spaces) */
                guid: '{F5345FE7-2F7C-49F7-87D0-DBFEBDD0CE61}',
                /**List GUID can be found in list properties in SharePoint designer */
                customFields: [
                    {staticName: "Title", objectType: "Text", mappedName: "title", readOnly: false},
                    // Has required = true to test field validation.
                    {
                        staticName: "Boolean",
                        objectType: "Boolean",
                        mappedName: "boolean",
                        readOnly: false,
                        required: true
                    },
                    {staticName: "Calculated", objectType: "Calculated", mappedName: "calculated", readOnly: true},
                    {staticName: "Choice", objectType: "Choice", mappedName: "choice", readOnly: false},
                    {
                        staticName: 'MultiChoice',
                        objectType: 'MultiChoice',
                        mappedName: 'multiChoice',
                        readOnly: false
                    },
                    {staticName: "Currency", objectType: "Currency", mappedName: "currency", readOnly: false},
                    {staticName: "Date", objectType: "DateTime", mappedName: "date", readOnly: false},
                    {staticName: "DateTime", objectType: "DateTime", mappedName: "dateTime", readOnly: false},
                    {staticName: "Integer", objectType: "Integer", mappedName: "integer", readOnly: false},
                    {staticName: 'Float', objectType: 'Float', mappedName: 'float', readOnly: false},
                    {staticName: 'HTML', objectType: 'HTML', mappedName: 'html', readOnly: false},
                    {staticName: "JSON", objectType: "JSON", mappedName: "json", readOnly: false},
                    {staticName: "Lookup", objectType: "Lookup", mappedName: "lookup", readOnly: false},
                    {
                        staticName: "LookupMulti",
                        objectType: "LookupMulti",
                        mappedName: "lookupMulti",
                        readOnly: false
                    },
                    {staticName: 'Note', objectType: 'Note', mappedName: 'note', readOnly: false},
                    {staticName: "User", objectType: "User", mappedName: "user", readOnly: false},
                    {staticName: "UserMulti", objectType: "UserMulti", mappedName: "userMulti", readOnly: false},
                    {staticName: 'Hyperlink', objectType: 'Hyperlink', mappedName: 'hyperlink', readOnly: false},
                    {staticName: 'Picture', objectType: 'Picture', mappedName: 'picture', readOnly: false},
                    {staticName: 'Attachments', objectType: 'Attachments', mappedName: 'attachments', readOnly: false}
                ]
            }
        });

        /*********************************** Queries ***************************************/

        /** Fetch data (pulls local xml if offline named model.list.title + '.xml')
         *  Initially pulls all requested data.  Each subsequent call just pulls records that have been changed,
         *  updates the model, and returns a reference to the updated data array
         * @returns {Array} Requested list items
         */
        model.registerQuery({
            name: 'primary',
            offlineXML: '../mock.xml',
            query: '' +
            '<Query>' +
            '   <OrderBy>' +
            '       <FieldRef Name="ID" Ascending="TRUE"/>' +
            '   </OrderBy>' +
            '</Query>'
        });

        model.registerQuery({
            name: 'secondary',
            offlineXML: '../mock.xml',
            query: '' +
            '<Query>' +
            '   <OrderBy>' +
            '       <FieldRef Name="ID" Ascending="TRUE"/>' +
            '   </OrderBy>' +
            '</Query>'
        });

        //model.executeQuery('primary');
        //model.executeQuery('secondary');
        //$httpBackend.flush();


        /********************* Model Specific Shared Functions ***************************************/

            ///** Optionally add a modal form **/
            //model.openModal = apModalService.modalModelProvider({
            //    templateUrl: '',
            //    controller: '',
            //    expectedArguments: ['entity']
            //});
            //
            //Mock.prototype.openModal = function () {
            //    return model.openModal(this);
            //};

        model.getField = function (name) {
            return _.find(model.list.fields, {mappedName: name});
        };


        model.importMocks = function () {
            var primaryCache = model.getCache('primary');
            var secondaryCache = model.getCache('secondary');
            primaryCache.clear();
            secondaryCache.clear();
            //apDecodeService.processListItems(model, primaryCache, mockXMLService.GetListItemChangesSinceToken, {
            //    target: primaryCache
            //});
            //apDecodeService.processListItems(model, secondaryCache, mockXMLService.GetListItemChangesSinceToken, {
            //    target: secondaryCache
            //});

            model.executeQuery('primary');
            model.executeQuery('secondary');
            $httpBackend.flush();

            /** Extend list and field definitions with mock XML */
            //apDecodeService.extendListDefinitionFromXML(model.list, mockXMLService.GetListItemChangesSinceToken);
            //apDecodeService.extendFieldDefinitionsFromXML(model.list.fields, mockXMLService.GetListItemChangesSinceToken);
            //model.fieldDefinitionsExtended = true;

            ///** Populate secondary query cache with same objects */
            //_.extend(secondaryCache, primaryCache);

            //return primaryCache;
        };

        return model;
    });
