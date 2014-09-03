'use strict';

/**
 * @ngdoc service
 * @name angularPoint.apDataService
 * @description
 * Handles all interaction with SharePoint's SOAP web services.  Mostly a wrapper for SPServices functionality.
 *
 * For additional information on many of these web service calls, see Marc Anderson's
 * [SPServices](http://spservices.codeplex.com/documentation) documentation.
 *
 *
 // *  @requires apQueueService
 // *  @requires apConfig
 // *  @requires apUtilityService
 // *  @requires apFieldService
 */
angular.module('angularPoint')
    .service('apDataService', function ($q, $timeout, _, apQueueService, apConfig, apUtilityService, apDecodeService,
                                        apEncodeService, apFieldService, apIndexedCacheFactory, apMocksService, toastr) {

        /** Flag to use cached XML files from the location specified in apConfig.offlineXML */
        var offline = apConfig.offline;
        /** Allows us to make code easier to read */
        var online = !offline;

        /** Exposed functionality */
        var apDataService = {
            addUpdateItemModel: addUpdateItemModel,
            cleanCache: cleanCache,
            deleteAttachment: deleteAttachment,
            deleteItemModel: deleteItemModel,
            executeQuery: executeQuery,
            getCollection: getCollection,
            getFieldVersionHistory: getFieldVersionHistory,
            getList: getList,
            getListFields: getListFields,
            getListItemById: getListItemById,
            getMyData:getMyData,
            getView: getView,
            logErrorsToConsole: logErrorsToConsole,
            processChangeTokenXML: processChangeTokenXML,
            retrieveChangeToken: retrieveChangeToken,
            removeEntityFromLocalCache: removeEntityFromLocalCache,
            retrievePermMask: retrievePermMask,
            serviceWrapper: serviceWrapper
        };

        return apDataService;


        /*********************** Private ****************************/

        /**
         * @ngdoc function
         * @name apDataService.getFieldVersionHistory
         * @description
         * Returns the version history for a field in a list item.
         * @param {object} options Configuration object passed to SPServices.
         * <pre>
         * var options = {
         *        operation: 'GetVersionCollection',
         *        webURL: apConfig.defaultUrl,
         *        strlistID: model.list.guid,
         *        strlistItemID: listItem.id,
         *        strFieldName: fieldDefinition.internalName
         *    };
         * </pre>
         * @param {object} fieldDefinition Field definition object from the model.
         * @returns {object[]} Promise which resolves with an array of list item changes for the specified field.
         */
        function getFieldVersionHistory(options, fieldDefinition) {
            var defaults = {
                operation: 'GetVersionCollection'
            };
            var opts = _.extend({}, defaults, options);

            var deferred = $q.defer();

            if (online) {
                serviceWrapper(opts)
                    .then(function (response) {
                        /** Parse XML response */
                        var versions = apDecodeService.parseFieldVersions(response.responseText, fieldDefinition);
                        /** Resolve with an array of all field versions */
                        deferred.resolve(versions);
                    }, function (outcome) {
                        /** Failure */
                        toastr.error('Failed to fetch version history.');
                        deferred.reject(outcome);
                    });
            } else {
                /** Resolve with an empty array because we don't know what the data should look like to mock */
                deferred.resolve([]);
            }
            return deferred.promise;
        }

        /**
         * @ngdoc function
         * @name apDataService.getCollection
         * @description
         * Used to handle any of the Get[filterNode]Collection calls to SharePoint
         *
         * @param {Object} options - object used to extend payload and needs to include all SPServices required attributes
         * @param {string} [options.operation] GetUserCollectionFromSite
         * @param {string} [options.operation] GetGroupCollectionFromSite
         * @param {string} [options.operation] GetGroupCollectionFromUser @requires options.userLoginName
         * @param {string} [options.operation] GetUserCollectionFromGroup @requires options.groupName
         * @param {string} [options.operation] GetListCollection
         * @param {string} [options.operation] GetViewCollection @requires options.listName
         * @param {string} [options.operation] GetAttachmentCollection @requires options.listName & options.ID
         * @param {string} [options.filterNode] - Value to iterate over in returned XML
         *         if not provided it's extracted from the name of the operation
         *         ex: Get[User]CollectionFromSite, "User" is used as the filterNode
         *
         * @returns {object[]} Promise which when resolved will contain an array of objects representing the
         * requested collection.
         *
         * @example
         * <pre>
         * apDataService.getCollection({
         *        operation: "GetGroupCollectionFromUser",
         *        userLoginName: $scope.state.selectedUser.LoginName
         *        }).then(function (response) {
         *            postProcessFunction(response);
         *       });
         * </pre>
         */
        function getCollection(options) {
            var defaults = {
                postProcess: processXML
            };
            /** Set the default location for the offline XML in case it isn't manually set. */
            if(offline && _.isString(options.operation)) {
                defaults.offlineData = apConfig.offlineXML + options.operation + '.xml';
            }
            var opts = _.extend({}, defaults, options);

            /** Determine the XML node to iterate over if filterNode isn't provided */
            var filterNode = opts.filterNode || opts.operation.split('Get')[1].split('Collection')[0];

            var deferred = $q.defer();

            /** Convert the xml returned from the server into an array of js objects */
            function processXML(serverResponse) {
                var convertedItems = [];
                /** Get attachments only returns the links associated with a list item */
                if (opts.operation === 'GetAttachmentCollection') {
                    /** Unlike other call, get attachments only returns strings instead of an object with attributes */
                    $(serverResponse).SPFilterNode(filterNode).each(function () {
                        convertedItems.push($(this).text());
                    });
                } else {
                    convertedItems = $(serverResponse).SPFilterNode(filterNode).SPXmlToJson({
                        includeAllAttrs: true,
                        removeOws: false
                    });
                }
                return convertedItems;
            }

            var validPayload = validateCollectionPayload(opts);
            if (validPayload) {
                serviceWrapper(opts)
                    .then(function (response) {
                        deferred.resolve(response);
                    });
            } else {
                toastr.error('Invalid payload:', opts);
                deferred.reject();
            }

            return deferred.promise;
        }

        /**
         * @description
         * Simply verifies that all components of the payload are present.
         * @param {object} opts Payload config.
         * @returns {boolean} Collection is valid.
         */
        function validateCollectionPayload(opts) {
            var validPayload = true;
            var verifyParams = function (params) {
                _.each(params, function (param) {
                    if (!opts[param]) {
                        toastr.error('options' + param + ' is required to complete this operation');
                        validPayload = false;
                    }
                });
            };

            //Verify all required params are included
            switch (opts.operation) {
                case 'GetGroupCollectionFromUser':
                    verifyParams(['userLoginName']);
                    break;
                case 'GetUserCollectionFromGroup':
                    verifyParams(['groupName']);
                    break;
                case 'GetViewCollection':
                    verifyParams(['listName']);
                    break;
                case 'GetAttachmentCollection':
                    verifyParams(['listName', 'ID']);
                    break;
            }
            return validPayload;
        }

        /**
         * @ngdoc function
         * @name apDataService.logErrorsToConsole
         * @description
         * Helper function to look for errors in a response from the server and output them to console.
         * @param {object} responseXML XML response from the server.
         * @param {string} operation The type of operation that was being attempted.
         */
        function logErrorsToConsole(responseXML, operation) {
            /** Errors can still be resolved without throwing an error so check the XML */
            var errorMessage = apDecodeService.checkResponseForErrors(responseXML);
            var errorString;
            if (errorMessage) {
                errorString = operation + ': ' + errorMessage;
                console.error(errorString);
            }
            return errorString;
        }


        /**
         * @ngdoc function
         * @name apDataService.serviceWrapper
         * @description
         * Generic wrapper for any SPServices web service call.  The big benefit to this function is it allows us
         * to continue to use the $q promise model throughout the application instead of using the promise
         * implementation used in SPServices so we have a more consistent experience.
         * Check http://spservices.codeplex.com/documentation for details on expected parameters for each operation.
         *
         * @param {object} options Payload params that is directly passed to SPServices.
         * @param {string} [options.webURL] XML filter string used to find the elements to iterate over.
         * @param {string} [options.filterNode] XML filter string used to find the elements to iterate over.
         * This is typically 'z:row' for list items.
         * @returns {object} Returns a promise which when resolved either returns clean objects parsed by the value
         * in options.filterNode or the raw XML response if a options.filterNode
         *
         *      If options.filterNode is provided, returns XML parsed by node name
         *      Otherwise returns the server response
         */
            //TODO: Make this the primary function which interacts with SPServices and makes web service call.  No need having this logic duplicated.
        function serviceWrapper(options) {
            var defaults = {
                /** You need to specify the offline xml file if you want to properly mock the request when offline */
                offlineXML: apConfig.offlineXML + options.operation + '.xml',
                postProcess: processXML
            };
            var opts = _.extend({}, defaults, options);
            var deferred = $q.defer();

            apQueueService.increase();

            /** Convert the xml returned from the server into an array of js objects */
            function processXML(serverResponse) {
                if (opts.filterNode) {
                    return $(serverResponse).SPFilterNode(opts.filterNode).SPXmlToJson({
                        includeAllAttrs: true,
                        removeOws: false
                    });
                } else {
                    return serverResponse;
                }
            }
            /** Allow this method to be overloaded and pass any additional arguments to the mock service */
            var additionalArgs = Array.prototype.slice.call(arguments, 1);

            apDataService.getMyData(opts, additionalArgs)
                .then(function (response) {
                    /** Failure */
                    var data = opts.postProcess(response);
                    deferred.resolve(data);
                }, function (response) {
                    /** Failure */
                    toastr.error('Failed to complete the requested ' + opts.operation + ' operation.');
                    deferred.reject(response);
                }, function () {
                    apQueueService.decrease();
                });

            return deferred.promise;
        }

        //TODO Rename Me
        function getMyData(opts, additionalArgs) {
            var deferred = $q.defer();
            if (online) {
                //var webServiceCall = $().SPServices(opts);
                $q.when($().SPServices(opts)).then(function (webServiceCall) {
                    /** Success */
                    /** Errors can still be resolved without throwing an error so check the XML */
                    logErrorsToConsole(webServiceCall.responseXML, opts.operation);
                    deferred.resolve(opts.postProcess(webServiceCall.responseXML));
                }, function (outcome) {
                    /** Failure */
                    logErrorsToConsole(response, opts.operation);
                    deferred.reject(outcome);
                });
            } else {
                apMocksService.mockRequest(opts, additionalArgs)
                    .then(function (response) {
                        deferred.resolve(response);
                    });
            }
            return deferred.promise;
        }

        /**
         * @ngdoc function
         * @name apDataService.getList
         * @description
         * Returns all list details including field and list config.
         * @param {object} options Configuration parameters.
         * @param {string} options.listName GUID of the list.
         * @returns {object} Promise which resolves with an array of field definitions for the list.
         */
        function getList(options) {
            var deferred = $q.defer();

            var defaults = {
                operation: 'GetList'
            };

            var opts = _.extend({}, defaults, options);
            return serviceWrapper(opts);
            //    .then(function (responseXML) {
            //        var listDefinition = apDecodeService
            //            .extendListDefinitionFromXML({}, responseXML);
            //        deferred.resolve(listDefinition);
            //    });
            //return deferred.promise;
        }


        /**
         * @ngdoc function
         * @name apDataService.getListFields
         * @description
         * Returns field definitions for a specified list.
         * @param {object} options Configuration parameters.
         * @param {string} options.listName GUID of the list.
         * @returns {object} Promise which resolves with an array of field definitions for the list.
         */
        function getListFields(options) {
            var deferred = $q.defer();
            getList(options)
                .then(function (responseXml) {
                    var fields = $(responseXml).SPFilterNode('Field').SPXmlToJson({
                        includeAllAttrs: true,
                        removeOws: false
                    });
                    deferred.resolve(fields);
                });
            return deferred.promise;
        }

        /**
         * @ngdoc function
         * @name apDataService.getListItemById
         * @description
         * Returns a single list item with the provided id.
         * @param {number} entityId Id of the item being requested.
         * @param {object} options Configuration parameters.
         * @param {string} options.listName GUID of the list.
         * @returns {object} Promise which resolves with the requested entity if found.
         */
        function getListItemById(entityId, options) {
            var defaults = {
                operation: 'GetListItems',
                filterNode: 'z:row',
                CAMLRowLimit: 1,
                CAMLQuery: '' +
                '<Query>' +
                ' <Where>' +
                '   <Eq>' +
                '     <FieldRef Name="ID"/>' +
                '     <Value Type="Number">' + entityId + '</Value>' +
                '   </Eq>' +
                ' </Where>' +
                '</Query>'
            };

            var opts = _.extend({}, defaults, options);
            return serviceWrapper(opts);
        }

        /**
         * @ngdoc function
         * @name apDataService.deleteAttachment
         * @description
         * Deletes and attachment on a list item.  Most commonly used by ListItem.deleteAttachment which is shown
         * in the example.
         *
         * @param {object} options Configuration parameters.
         * @param {string} options.listItemId ID of the list item with the attachment.
         * @param {string} options.url Requires the URL for the attachment we want to delete.
         * @param {string} options.listName Best option is the GUID of the list.
         * <pre>'{37388A98-534C-4A28-BFFA-22429276897B}'</pre>
         *
         * @returns {object} Promise which resolves with the updated attachment collection.
         *
         * @example
         * <pre>
         * ListItem.prototype.deleteAttachment = function (url) {
         *    var listItem = this;
         *    return apDataService.deleteAttachment({
         *        listItemId: listItem.id,
         *        url: url,
         *        listName: listItem.getModel().list.guid
         *    });
         * };
         * </pre>
         */
        function deleteAttachment(options) {
            var defaults = {
                operation: 'DeleteAttachment',
                filterNode: 'Field'
            };

            var opts = _.extend({}, defaults, options);

            return serviceWrapper(opts);
        }

        /**
         * @ngdoc function
         * @name apDataService.getView
         * @description
         * Returns the schema of the specified view for the specified list.
         * @param {object} options Configuration parameters.
         * @param {string} options.listName GUID of the list.
         * @param {string} [options.viewName] Formatted as a GUID, if not provided
         * <pre>'{37388A98-534C-4A28-BFFA-22429276897B}'</pre>
         * @param {string} [options.webURL] Can override the default web url if desired.
         * @returns {object} {query: '', viewFields: '', rowLimit: ''}
         * Promise that resolves with an object similar to this.
         * @example
         * <pre>
         * apDataService.getView({
     *    viewName: '{EE7C652F-9CBF-433F-B376-86B0EE989A06}',
     *    listName: '{AA7C652F-44BF-433F-B376-234423234A06}'
     * })
         *
         *
         * </pre>
         * <h3>Returned XML</h3>
         * <pre>
         *  <View Name="{EE7C652F-9CBF-433F-B376-86B0EE989A06}"
         *  DefaultView="TRUE" Type="HTML" DisplayName="View_Name"
         *  Url="Lists/Events/File_Name.aspx" BaseViewID="1">
         *  <Query>
         *    <Where>
         *      <Leq>
         *        <FieldRef Name="Created"/>
         *        <Value Type="DateTime">2003-03-03T00:00:00Z</Value>
         *      </Leq>
         *    </Where>
         *  </Query>
         *  <ViewFields>
         *    <FieldRef Name="fRecurrence"/>
         *    <FieldRef Name="Attachments"/>
         *    <FieldRef Name="WorkspaceLink"/>
         *    <FieldRef Name="LinkTitle"/>
         *    <FieldRef Name="Location"/>
         *    <FieldRef Name="EventDate"/>
         *    <FieldRef Name="EndDate"/>
         *  </ViewFields>
         *  <RowLimit Paged="TRUE">100</RowLimit>
         * </View>
         * </pre>
         *
         */
        function getView(options) {
            var defaults = {
                operation: 'GetView',
                /** Optionally set alternate offline XML location */
                offlineXML: apConfig.offlineXML + 'GetView.xml'
            };

            var deferred = $q.defer();


            var opts = _.extend({}, defaults, options);

            serviceWrapper(opts)
                .then(function (response) {
                    /** Already have the correct node if offline, otherwise if offline we need the responseText prop */
                    var responseText = apConfig.offline ? response : response.responseText;
                    /** Success */
                    var output = {
                        query: '<Query>' + $(responseText).find('Query').html() + '</Query>',
                        viewFields: '<ViewFields>' + $(responseText).find('ViewFields').html() + '</ViewFields>',
                        rowLimit: $(responseText).find('RowLimit').html()
                    };

                    /** Pass back the lists array */
                    deferred.resolve(output);
                }, function (err) {
                    /** Failure */
                    toastr.error('Failed to fetch view details.');
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        /**
         * @ngdoc function
         * @name apDataService.executeQuery
         * @description
         * Primary method of retrieving list items from SharePoint.  Look at Query and Model for specifics.
         * @param {object} model Reference to the model where the Query resides.
         * @param {object} query Reference to the Query making the call.
         * @param {object} [options] Optional configuration parameters.
         * @param {Array} [options.target=model.getCache()] The target destination for returned entities
         * @param {string} [options.offlineXML=apConfig.offlineXML + model.list.title + '.xml'] Optionally include the location of
         * a custom offline XML file specifically for this query.
         * @returns {object} - Key value hash containing all list item id's as keys with the entity as the value.
         */
        function executeQuery(model, query, options) {

            var defaults = {
                target: model.getCache()
            };

            var deferred = $q.defer();

            /** Extend defaults **/
            var opts = _.extend({}, defaults, options);

            /** Set the location of the offline xml file */
            query.offlineXML = opts.offlineXML || query.offlineXML || apConfig.offlineXML + model.list.title + '.xml';

            serviceWrapper(query)
                .then(function (response) {
                    //TODO Remove offline logic
                    if (offline && !_.isNull(query.lastRun)) {
                        /** Entities have already been previously processed so just return the existing cache */
                        deferred.resolve(response);
                    } else {
                        if (query.operation === 'GetListItemChangesSinceToken') {
                            processChangeTokenXML(model, query, response, opts);
                        }

                        /** Convert the XML into JS objects */
                        var entities = apDecodeService.processListItems(model, query, response, opts);
                        deferred.resolve(entities);
                    }

                    /** Set date time to allow for time based updates */
                    query.lastRun = new Date();

                });

            return deferred.promise;
        }

        /**
         * @ngdoc function
         * @name apDataService.processChangeTokenXML
         * @description
         * The initial call to GetListItemChangesSinceToken also includes the field definitions for the
         * list so extend the existing field definitions and list defined in the model.  After that, store
         * the change token and make any changes to the user's permissions for the list.
         * @param {object} model List model.
         * @param {query} query Valid query object.
         * @param {object} responseXML XML response from the server.
         * @param {object} opts Config options built up along the way.
         */
        function processChangeTokenXML(model, query, responseXML, opts) {
            if (!model.fieldDefinitionsExtended) {
                apDecodeService.extendListDefinitionFromXML(model.list, responseXML);
                apDecodeService.extendFieldDefinitionsFromXML(model.list.fields, responseXML);
                model.fieldDefinitionsExtended = true;
            }

            /** Store token for future web service calls to return changes */
            query.changeToken = retrieveChangeToken(responseXML);

            /** Update the user permissions for this list */
            var effectivePermissionMask = retrievePermMask(responseXML);
            if (effectivePermissionMask) {
                model.list.effectivePermMask = effectivePermissionMask;
            }

            /** Change token query includes deleted items as well so we need to process them separately */
            processDeletionsSinceToken(responseXML, opts.target);
        }

        /**
         * @ngdoc function
         * @name apDataService.removeEntityFromLocalCache
         * @description
         * Searches for an entity based on list item ID and removes it from the cached array if it exists.
         * @param {Array} indexedCache Cached array of list items for a query.
         * @param {Number} entityId The ID to evaluate against to determine if there is a match.
         * @returns {boolean} Returns true if a list item was successfully found and removed.
         */
        function removeEntityFromLocalCache(indexedCache, entityId) {
            var successfullyDeleted = false;

            /** Remove from indexed cache if found */
            if (indexedCache[entityId]) {
                delete indexedCache[entityId];
                successfullyDeleted = true;
            }
            return successfullyDeleted;
        }

        /**
         * @ngdoc function
         * @name apDataService.retrieveChangeToken
         * @description
         * Returns the change token from the xml response of a GetListItemChangesSinceToken query
         * Note: this attribute is only found when using 'GetListItemChangesSinceToken'
         * @param {xml} responseXML XML response from the server.
         */
        function retrieveChangeToken(responseXML) {
            return $(responseXML).find('Changes').attr('LastChangeToken');
        }

        /**
         * @ngdoc function
         * @name apDataService.retrievePermMask
         * @description
         * Returns the text representation of the users permission mask
         * Note: this attribute is only found when using 'GetListItemChangesSinceToken'
         * @param {xml} responseXML XML response from the server.
         */
        function retrievePermMask(responseXML) {
            return $(responseXML).find('listitems').attr('EffectivePermMask');
        }

        /**
         * @ngdoc function
         * @name apDataService.processDeletionsSinceToken
         * @description
         * GetListItemChangesSinceToken returns items that have been added as well as deleted so we need
         * to remove the deleted items from the local cache.
         * @param {xml} responseXML XML response from the server.
         * @param {Array} indexedCache Cached array of list items for a query.
         */
        function processDeletionsSinceToken(responseXML, indexedCache) {
            var deleteCount = 0;

            /** Remove any locally cached entities that were deleted from the server */
            $(responseXML).SPFilterNode('Id').each(function () {
                /** Check for the type of change */
                var changeType = $(this).attr('ChangeType');

                if (changeType === 'Delete') {
                    var entityId = parseInt($(this).text(), 10);
                    /** Remove from local data array */
                    var foundAndRemoved = removeEntityFromLocalCache(indexedCache, entityId);
                    if (foundAndRemoved) {
                        deleteCount++;
                    }
                }
            });
            if (deleteCount > 0 && offline) {
                console.log(deleteCount + ' item(s) removed from local cache to mirror changes on source list.');
            }
        }


//        /**
//         * @ngdoc function
//         * @name apDataService.updateAllCaches
//         * @description
//         * Propagates a change to all duplicate entities in all cached queries within a given model.
//         * @param {object} model Reference to the entities model.
//         * @param {object} entity JavaScript object representing the SharePoint list item.
//         * @param {object} [exemptQuery] - The query containing the updated item is automatically updated so we don't
//         * need to process it.
//         *
//         * @returns {number} The number of queries where the entity was found and updated.
//         */
//        function updateAllCaches(model, entity, exemptQuery) {
//            var queriesUpdated = 0;
//            /** Search through each of the queries and update any occurrence of this entity */
//            _.each(model.queries, function (query) {
//                /** Process all query caches except the one originally used to retrieve entity because
//                 * that is automatically updated by "apDecodeService.processListItems". */
//                if (query != exemptQuery) {
//                    apDecodeService.updateLocalCache(query.getCache(), [entity]);
//                }
//            });
//            return queriesUpdated;
//        }

        /**
         * @ngdoc function
         * @name apDataService.addUpdateItemModel
         * @description
         * Adds or updates a list item based on if the item passed in contains an id attribute.
         * @param {object} model Reference to the entities model.
         * @param {object} entity JavaScript object representing the SharePoint list item.
         * @param {object} [options] Optional configuration params.
         * @param {boolean} [options.buildValuePairs=true] Automatically generate pairs based on fields defined in model.
         * @param {Array[]} [options.valuePairs] Precomputed value pairs to use instead of generating them for each
         * field identified in the model.
         * @returns {object} Promise which resolves with the newly updated item.
         */
        function addUpdateItemModel(model, entity, options) {
            var defaults = {
                mode: 'update',  //Options for what to do with local list data array in store [replace, update, return]
                buildValuePairs: true,
                updateAllCaches: false,
                valuePairs: []
            };
            /** Reference to the the query that needs to be updated if this is an existing entity */
            var query;
            var deferred = $q.defer();
            var opts = _.extend({}, defaults, options);

            if (opts.buildValuePairs === true) {
                var editableFields = _.where(model.list.fields, {readOnly: false});
                opts.valuePairs = apEncodeService.generateValuePairs(editableFields, entity);
            }
            var payload = {
                operation: 'UpdateListItems',
                webURL: model.list.webURL,
                listName: model.list.guid,
                valuepairs: opts.valuePairs
            };

            if ((_.isObject(entity) && _.isNumber(entity.id))) {
                /** Updating existing list item */
                payload.batchCmd = 'Update';
                payload.ID = entity.id;
                query = entity.getQuery();
            } else {
                /** Creating new list item */
                payload.batchCmd = 'New';
                payload.indexedCache = apIndexedCacheFactory.create({});
                payload.getCache = function () {
                    return payload.indexedCache;
                };
                query = payload;
            }
            /** Overload the function the pass anything past the first parameter to the supporting methods */
            serviceWrapper(payload, entity, model)
                .then(function (response) {
                    if (online) {
                        /** Online this should return an XML object */
                        var responseArray = apDecodeService.processListItems(model, query, response, opts);
                        deferred.resolve(responseArray[0]);
                    } else {
                        /** Offline response should be the updated entity as a JS Object */
                        deferred.resolve(response);
                    }
                });
            return deferred.promise;
        }

        /**
         * @ngdoc function
         * @name apDataService.deleteItemModel
         * @description
         * Typically called directly from a list item, removes the list item from SharePoint
         * and the local cache.
         * @param {object} model Reference to the entities model.
         * @param {object} entity JavaScript object representing the SharePoint list item.
         * @param {object} [options] Optional configuration params.
         * @param {Array} [options.target=item.getCache()] Optional location to search through and remove the
         * local cached copy.
         * @param {boolean} [options.updateAllCaches=false] Search through the cache for each query on the model
         * to ensure entity is removed everywhere.  This is more process intensive so by default we only delete the
         * cached entity in the cache where this entity is currently stored.
         * @returns {object} Promise which resolves when the operation is complete.  Nothing of importance is returned.
         */
        function deleteItemModel(model, entity, options) {
            var defaults = {
                target: _.isFunction(entity.getCache) ? entity.getCache() : model.getCache(),
                updateAllCaches: false,
                operation: 'UpdateListItems',
                webURL: model.list.webURL,
                listName: model.list.guid,
                batchCmd: 'Delete',
                ID: entity.id
            };

            var opts = _.extend({}, defaults, options);

            var deferred = $q.defer();

            if (online) {
                serviceWrapper(opts)
                    .then(function () {
                        /** Success */
                        cleanCache(entity, opts);
                        deferred.resolve(opts.target);
                    }, function (outcome) {
                        //In the event of an error, display toast
                        toastr.error('There was an error deleting a list item from ' + model.list.title);
                        deferred.reject(outcome);
                    });
            } else {
                /** Offline debug mode */
                /** Simulate deletion and remove locally */
                cleanCache(entity, opts);
                deferred.resolve(opts.target);
            }

            return deferred.promise;
        }

        function cleanCache(entity, options) {
            var model = entity.getModel();
            var defaults = {
                target: _.isFunction(entity.getCache) ? entity.getCache() : model.getCache(),
                updateAllCaches: false
            };

            var opts = _.extend({}, defaults, options);
            var deleteCount = 0;

            if (opts.updateAllCaches) {
                _.each(model.queries, function (query) {
                    var entityRemoved = removeEntityFromLocalCache(query.getCache(), entity.id);
                    if (entityRemoved) {
                        deleteCount++;
                    }
                });
            } else {
                var entityRemoved = removeEntityFromLocalCache(opts.target, entity.id);
                if (entityRemoved) {
                    deleteCount++;
                }
            }
            return deleteCount;
        }

    }
);