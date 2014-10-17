'use strict';

/**
 * @ngdoc service
 * @name angularPoint.apDecodeService
 * @description
 * Processes the XML received from SharePoint and converts it into JavaScript objects based on predefined field types.
 *
 * @requires angularPoint.apUtilityService
 * @requires angularPoint.apQueueService
 * @requires angularPoint.apConfig
 * @requires angularPoint.apCacheService
 */
angular.module('angularPoint')
    .service('apDecodeService', function ($q, _, apUtilityService, apQueueService, apConfig, apCacheService,
                                          apLookupFactory, apUserFactory, apFieldService) {


        return {
            checkResponseForErrors: checkResponseForErrors,
            extendFieldDefinitionsFromXML: extendFieldDefinitionsFromXML,
            extendListDefinitionFromXML: extendListDefinitionsFromXML,
            jsBoolean: jsBoolean,
            jsCalc: jsCalc,
            jsChoiceMulti: jsChoiceMulti,
            jsDate: jsDate,
            jsFloat: jsFloat,
            jsInt: jsInt,
            jsLookup: jsLookup,
            jsLookupMulti: jsLookupMulti,
            jsObject: jsObject,
            jsString: jsString,
            jsUser: jsUser,
            jsUserMulti: jsUserMulti,
            parseFieldVersions: parseFieldVersions,
            parseStringValue: parseStringValue,
            processListItems: processListItems,
            //updateLocalCache: updateLocalCache,
            xmlToJson: xmlToJson
        };

        /*********************** Private ****************************/


        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:processListItems
         * @methodOf angularPoint.apDecodeService
         * @description
         * Post processing of data after returning list items from server.  Returns a promise that resolves with
         * the processed entities.  Promise allows us to batch conversions of large lists to prevent ui slowdowns.
         * @param {object} model Reference to allow updating of model.
         * @param {object} query Reference to the query responsible for requesting entities.
         * @param {xml} responseXML Resolved promise from SPServices web service call.
         * @param {object} [options] Optional configuration object.
         * @param {function} [options.factory=model.factory] Constructor function typically stored on the model.
         * @param {string} [options.filter='z:row'] XML filter string used to find the elements to iterate over.
         * @param {Array} [options.mapping=model.list.mapping] Field definitions, typically stored on the model.
         * @param {Array} [options.target=model.getCache()] Optionally pass in array to update after processing.
         * @returns {object[]} List items.
         */
        function processListItems(model, query, responseXML, options) {
            var defaults = {
                factory: model.factory,
                filter: 'z:row',
                mapping: model.list.mapping,
                target: model.getCache()
            };

            var opts = _.extend({}, defaults, options);

            /** Map returned XML to JS objects based on mapping from model */
            var filteredNodes = $(responseXML).SPFilterNode(opts.filter);

            /** Prepare constructor for XML entities with references to the query and cached container */
            var listItemProvider = createListItemProvider(model, query, opts.target);

            /** Convert XML entities into JS objects and register in cache with listItemProvider, this returns an
             * array of entities but at this point we're not using them because the indexed cache should be more
             * performant. */
            xmlToJson(filteredNodes, listItemProvider, opts);

            return opts.target;
            //return entities;
        }

        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:createListItemProvider
         * @methodOf angularPoint.apDecodeService
         * @description
         * The initial constructor for a list item that references the array where the entity exists and the
         * query used to fetch the entity.  From there it extends the entity using the factory defined in the
         * model for the list item.
         * @param {object} model Reference to the model for the list item.
         * @param {object} query Reference to the query object used to retrieve the entity.
         * @param {object} indexedCache Location where we'll be pushing the new entity.
         * @returns {Function} Returns a function that takes the new list item while keeping model, query,
         * and container in scope for future reference.
         */
        function createListItemProvider(model, query, indexedCache) {
            return function (listItem) {
                /** Create Reference to the indexed cache */
                listItem.getCache = function () {
                    return indexedCache;
                };
                /** Allow us to reference the originating query that generated this object */
                listItem.getQuery = function () {
                    return query;
                };

                var entity = new model.factory(listItem);

                /** Register in global application entity cache and extends the existing entity if it
                 * already exists */
                return apCacheService.registerEntity(entity, indexedCache);
            }
        }

        ///**
        // * @ngdoc function
        // * @name angularPoint.apDecodeService:updateLocalCache
        // * @methodOf angularPoint.apDecodeService
        // * @description
        // * Maps a cache by entity id.  All provided entities are then either added if they don't already exist
        // * or replaced if they do.
        // * @param {object[]} localCache The cache for a given query.
        // * @param {object[]} entities All entities that should be merged into the cache.
        // * @returns {object} {created: number, updated: number}
        // */
        //function updateLocalCache(localCache, entities) {
        //    var updateCount = 0,
        //        createCount = 0;
        //
        //    /** Map to only run through target list once and speed up subsequent lookups */
        //    var idMap = _.pluck(localCache, 'id');
        //
        //    /** Update any existing items stored in the cache */
        //    _.each(entities, function (entity) {
        //        if (idMap.indexOf(entity.id) === -1) {
        //            /** No match found, add to target and update map */
        //            localCache.push(entity);
        //            idMap.push(entity.id);
        //            createCount++;
        //        } else {
        //            /** Replace local item with updated value */
        //            localCache[idMap.indexOf(entity.id)] = entity;
        //            updateCount++;
        //        }
        //    });
        //    return {
        //        created: createCount,
        //        updated: updateCount
        //    };
        //}

        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:xmlToJson
         * @methodOf angularPoint.apDecodeService
         * @description
         * Converts an XML node set to Javascript object array. This is a modified version of the SPServices
         * "SPXmlToJson" function.
         * @param {array} xmlEntities ["z:rows"] XML rows that need to be parsed.
         * @param {function} listItemProvider Constructor function used to build the list item with references to
         * the query, cached container, and registers each list item in the apCacheService.
         * @param {object} options Options object.
         * @param {object[]} options.mapping [columnName: "mappedName", objectType: "objectType"]
         * @param {boolean} [options.includeAllAttrs=false] If true, return all attributes, regardless whether
         * @param {boolean} [options.listItemProvider] List item constructor.
         * @param {boolean} [options.removeOws=true] Specifically for GetListItems, if true, the leading ows_ will
         * be stripped off the field name.
         * @param {array} [options.target] Optional location to push parsed entities.
         * @returns {object[]} An array of JavaScript objects.
         */
        function xmlToJson(xmlEntities, listItemProvider, options) {

            var defaults = {
                mapping: {},
                includeAllAttrs: false,
                removeOws: true
            };

            var opts = _.extend({}, defaults, options);
            var parsedEntities = [];

            _.each(xmlEntities, function (xmlEntity) {
                var parsedEntity = parseXMLEntity(xmlEntity, listItemProvider, opts);
                parsedEntities.push(parsedEntity);
            });

            return parsedEntities;
        }

        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:parseXMLEntity
         * @methodOf angularPoint.apDecodeService
         * @description
         * Convert an XML list item into a JS object using the fields defined in the model for the given list item.
         * @param {object} xmlEntity XML Object.
         * @param {function} listItemProvider Constructor function that instantiates a new object.
         * @param {object} opts Configuration options.
         * @param {string} opts.mapping Mapping of fields we'd like to extend on our JS object.
         * @param {boolean} [opts.includeAllAttrs=false] If true, return all attributes, regardless whether
         * @param {boolean} [opts.listItemProvider] List item constructor.
         * @param {boolean} [opts.removeOws=true] Specifically for GetListItems, if true, the leading ows_ will
         * @returns {object} New entity using the factory on the model.
         */
        function parseXMLEntity(xmlEntity, listItemProvider, opts) {
            var entity = {};
            var rowAttrs = xmlEntity.attributes;

            /** Bring back all mapped columns, even those with no value */
            _.each(opts.mapping, function (fieldDefinition) {
                entity[fieldDefinition.mappedName] = apFieldService.getDefaultValueForType(fieldDefinition.objectType);
                //entity[fieldDefinition.mappedName] = '';
            });

            /** Parse through the element's attributes */
            _.each(rowAttrs, function (attr) {
                var thisAttrName = attr.name;
                var thisMapping = opts.mapping[thisAttrName];
                var thisObjectName = typeof thisMapping !== 'undefined' ? thisMapping.mappedName : opts.removeOws ? thisAttrName.split('ows_')[1] : thisAttrName;
                var thisObjectType = typeof thisMapping !== 'undefined' ? thisMapping.objectType : undefined;
                if (opts.includeAllAttrs || thisMapping !== undefined) {
                    entity[thisObjectName] = parseStringValue(attr.value, thisObjectType, {
                        entity: entity,
                        propertyName: thisObjectName
                    });
                }

            });
            return listItemProvider(entity);
        }

        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:parseStringValue
         * @methodOf angularPoint.apDecodeService
         * @description
         * Converts a SharePoint string representation of a field into the correctly formatted JavaScript version
         * based on object type.  A majority of this code is directly taken from Marc Anderson's incredible
         * [SPServices](http://spservices.codeplex.com/) project but it needed some minor tweaking to work here.
         * @param {string} str SharePoint string representing the value.
         * @param {string} [objectType='Text'] The type based on field definition.  See
         * See [List.customFields](#/api/List.FieldDefinition) for additional info on how to define a field type.
         * @param {object} [options] Options to pass to the object constructor.
         * @param {object} [options.entity] Reference to the parent list item which can be used by child constructors.
         * @param {object} [options.propertyName] Name of property on the list item.
         * @returns {*} The newly instantiated JavaScript value based on field type.
         */
        function parseStringValue(str, objectType, options) {

            var unescapedValue = _.unescape(str);

            var colValue;

            switch (objectType) {
                case 'Boolean':
                    colValue = jsBoolean(unescapedValue);
                    break;
                case 'Calculated': // Formatted like type;#value so we break it apart and then pass back in to format correctly
                    colValue = jsCalc(unescapedValue);
                    break;
                case 'datetime': // For calculated columns, stored as datetime;#value
                case 'DateTime':
                    // Dates have dashes instead of slashes: ows_Created='2009-08-25 14:24:48'
                    colValue = jsDate(unescapedValue);
                    break;
                case 'Lookup':
                    colValue = jsLookup(unescapedValue, options);
                    break;
                case 'User':
                    colValue = jsUser(unescapedValue);
                    break;
                case 'LookupMulti':
                    colValue = jsLookupMulti(unescapedValue, options);
                    break;
                case 'UserMulti':
                    colValue = jsUserMulti(unescapedValue);
                    break;
                case 'Integer':
                case 'Counter': // Only really used for the ID field
                    colValue = jsInt(unescapedValue);
                    break;
                case 'Number':
                case 'Currency':
                case 'float': // For calculated columns, stored as float;#value
                case 'Float':
                    colValue = jsFloat(unescapedValue);
                    break;
                case 'MultiChoice':
                    colValue = jsChoiceMulti(unescapedValue);
                    break;
                case 'JSON': // Not a true SharePoint field type but acts as a decorator for Note
                    colValue = jsObject(unescapedValue);
                    break;
                case 'Choice':
                case 'HTML':
                case 'Note':
                default:
                    // All other objectTypes will be simple strings
                    colValue = jsString(unescapedValue);
                    break;
            }
            return colValue;
        }

        function jsObject(s) {
            if (!s) {
                return s;
            } else {
                /** Ensure JSON is valid and if not throw error with additional detail */
                var json = null;
                try {
                    json = JSON.parse(s);
                }
                catch (err) {
                    console.error('Invalid JSON: ', s);
                }
                return json;
            }
        }

        function jsString(s) {
            return s;
        }

        function jsInt(s) {
            if (!s) {
                return s;
            } else {
                return parseInt(s, 10);
            }
        }

        function jsFloat(s) {
            if (!s) {
                return s;
            } else {
                return parseFloat(s);
            }
        }

        function jsBoolean(s) {
            /** SharePoint uses different string representations for booleans in different places so account for each */
            return s === '1' || s === 'True' || s === 'TRUE';
        }

        function jsDate(s) {
            /** Replace dashes with slashes and the "T" deliminator with a space if found */
            return new Date(s.replace(/-/g, '/').replace(/Z/i, '').replace(/T/i, ' '));
        }

        function jsUser(s) {
            if (s.length === 0) {
                return null;
            }
            //Send to constructor
            return apUserFactory.create(s);
        }

        function jsUserMulti(s) {
            if (s.length === 0) {
                return [];
            } else {
                var thisUserMultiObject = [];
                var thisUserMulti = s.split(';#');
                for (var i = 0; i < thisUserMulti.length; i = i + 2) {
                    var thisUser = jsUser(thisUserMulti[i] + ';#' + thisUserMulti[i + 1]);
                    thisUserMultiObject.push(thisUser);
                }
                return thisUserMultiObject;
            }
        }

        function jsLookup(s, options) {
            if (s.length === 0) {
                return null;
            } else {
                //Send to constructor
                return apLookupFactory.create(s, options);
            }
        }

        function jsLookupMulti(s, options) {
            if (s.length === 0) {
                return [];
            } else {
                var thisLookupMultiObject = [];
                var thisLookupMulti = s.split(';#');
                for (var i = 0; i < thisLookupMulti.length; i = i + 2) {
                    var thisLookup = jsLookup(thisLookupMulti[i] + ';#' + thisLookupMulti[i + 1], options);
                    thisLookupMultiObject.push(thisLookup);
                }
                return thisLookupMultiObject;
            }
        }

        function jsChoiceMulti(s) {
            if (s.length === 0) {
                return [];
            } else {
                var thisChoiceMultiObject = [];
                var thisChoiceMulti = s.split(';#');
                for (var i = 0; i < thisChoiceMulti.length; i++) {
                    if (thisChoiceMulti[i].length !== 0) {
                        thisChoiceMultiObject.push(thisChoiceMulti[i]);
                    }
                }
                return thisChoiceMultiObject;
            }
        }


        function jsCalc(s) {
            if (s.length === 0) {
                return null;
            } else {
                var thisCalc = s.split(';#');
                // The first value will be the calculated column value type, the second will be the value
                return parseStringValue(thisCalc[1], thisCalc[0]);
            }
        }

        /**Constructors for user and lookup fields*/
        /**Allows for easier distinction when debugging if object type is shown as either Lookup or User**/

        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:extendObjectWithXMLAttributes
         * @methodOf angularPoint.apDecodeService
         * @description
         * Takes an XML element and copies all attributes over to a given JS object with corresponding values.  If
         * no JS Object is provided, it extends an empty object and returns it.  If an attributeTypes object is provided
         * we parse each of the defined field so they are typed correctly instead of being a simple string.
         * Note: Properties are not necessarily CAMLCase.
         * @param {object} xmlObject An XML element.
         * @param {object} [jsObject={}] An optional JS Object to extend XML attributes to.
         * @param {object} [attributeTypes={}] Key/Val object with keys being the name of the field and val being the
         * type of field.
         * @returns {object} JS Object
         */
        function extendObjectWithXMLAttributes(xmlObject, jsObject, attributeTypes) {
            var objectToExtend = jsObject || {};
            var attributeMap = attributeTypes || {};
            var xmlAttributes = xmlObject.attributes;

            _.each(xmlAttributes, function (attr, attrNum) {
                var attrName = xmlAttributes[attrNum].name;
                objectToExtend[attrName] = $(xmlObject).attr(attrName);
                if (attributeMap[attrName]) {
                    objectToExtend[attrName] = parseStringValue(objectToExtend[attrName], attributeMap[attrName]);
                }
            });
            return objectToExtend;
        }

        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:extendListDefinitionFromXML
         * @methodOf angularPoint.apDecodeService
         * @description
         * Takes the XML response from a web service call and extends the list definition in the model
         * with additional field metadata.  Important to note that all properties will coming from the XML start
         * with a capital letter.
         * @param {object} list model.list
         * @param {object} responseXML XML response from the server.
         * @returns {object} Extended list object.
         */
        function extendListDefinitionsFromXML(list, responseXML) {
            /** Object map of common fields and their types */
            var attributeTypes = {
                BaseType: 'Number',
                ServerTemplate: 'Number',
                Created: 'DateTime',
                Modified: 'DateTime',
                LastDeleted: 'DateTime',
                Version: 'Number',
                ThumbnailSize: 'Number',
                WebImageWidth: 'Number',
                WebImageHeight: 'Number',
                Flags: 'Number',
                ItemCount: 'Number',
                ReadSecurity: 'Number',
                WriteSecurity: 'Number',
                Author: 'Number',
                MajorWithMinorVersionsLimit: 'Number',
                HasUniqueScopes: 'Boolean',
                NoThrottleListOperations: 'Boolean',
                HasRelatedLists: 'Boolean',
                AllowDeletion: 'Boolean',
                AllowMultiResponses: 'Boolean',
                EnableAttachments: 'Boolean',
                EnableModeration: 'Boolean',
                EnableVersioning: 'Boolean',
                HasExternalDataSource: 'Boolean',
                Hidden: 'Boolean',
                MultipleDataList: 'Boolean',
                Ordered: 'Boolean',
                ShowUser: 'Boolean',
                EnablePeopleSelector: 'Boolean',
                EnableResourceSelector: 'Boolean',
                EnableMinorVersion: 'Boolean',
                RequireCheckout: 'Boolean',
                ThrottleListOperations: 'Boolean',
                ExcludeFromOfflineClient: 'Boolean',
                EnableFolderCreation: 'Boolean',
                IrmEnabled: 'Boolean',
                IsApplicationList: 'Boolean',
                PreserveEmptyValues: 'Boolean',
                StrictTypeCoercion: 'Boolean',
                EnforceDataValidation: 'Boolean',
                MaxItemsPerThrottledOperation: 'Number'
            };
            $(responseXML).find("List").each(function () {
                extendObjectWithXMLAttributes(this, list, attributeTypes);
            });
            return list;
        }


        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:extendFieldDefinitionsFromXML
         * @methodOf angularPoint.apDecodeService
         * @description
         * Takes the XML response from a web service call and extends any field definitions in the model
         * with additional field metadata.  Important to note that all properties will coming from the XML start
         * with a capital letter.
         * @param {object[]} fieldDefinitions Field definitions from the model.
         * @param {object} responseXML XML response from the server.
         */
        function extendFieldDefinitionsFromXML(fieldDefinitions, responseXML) {
            var fieldMap = {},
                attributeTypes = {
                    Decimals: 'Number',
                    EnforceUniqueValues: 'Boolean',
                    Filterable: 'Boolean',
                    FromBaseType: 'Boolean',
                    Hidden: 'Boolean',
                    Indexed: 'Boolean',
                    NumLines: 'Number',
                    ReadOnly: 'Boolean',
                    Required: 'Boolean',
                    Sortable: 'Boolean'
                };


            /** Map all custom fields with keys of the staticName and values = field definition */
            _.each(fieldDefinitions, function (field) {
                if (field.staticName) {
                    fieldMap[field.staticName] = field;
                }
            });

            /** Iterate over each of the field nodes */
            var fields = $(responseXML).SPFilterNode('Field');

            _.each(fields, function (xmlField) {


                var staticName = $(xmlField).attr('StaticName');
                var fieldDefinition = fieldMap[staticName];

                /** If we've defined this field then we should extend it */
                if (fieldDefinition) {

                    extendObjectWithXMLAttributes(xmlField, fieldDefinition, attributeTypes);

                    /** Additional processing for Choice fields to include the default value and choices */
                    if (fieldDefinition.objectType === 'Choice' || fieldDefinition.objectType === 'MultiChoice') {
                        fieldDefinition.Choices = [];
                        /** Convert XML Choices object to an array of choices */
                        var xmlChoices = $(xmlField).find('CHOICE');
                        _.each(xmlChoices, function (xmlChoice) {
                            fieldDefinition.Choices.push($(xmlChoice).text());
                        });
                        fieldDefinition.Default = $(xmlField).find('Default').text();
                    }
                }
            });

            return fieldDefinitions;
        }


        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:parseFieldVersions
         * @methodOf angularPoint.apDecodeService
         * @description
         * Takes an XML response from SharePoint webservice and returns an array of field versions.
         *
         * @param {xml} responseXML Returned XML from web service call.
         * @param {object} fieldDefinition Field definition from the model.
         *
         * @returns {Array} Array objects containing the various version of a field for each change.
         */
        function parseFieldVersions(responseXML, fieldDefinition) {
            var versions = [];
            var xmlVersions = $(responseXML).find('Version');
            var versionCount = xmlVersions.length;


            _.each(xmlVersions, function (xmlVersion, index) {
                /** Parse the xml and create a representation of the version as a js object */
                var version = {
                    editor: parseStringValue($(xmlVersion).attr('Editor'), 'User'),
                    /** Turn the SharePoint formatted date into a valid date object */
                    modified: parseStringValue($(xmlVersion).attr('Modified'), 'DateTime'),
                    /** Returns records in desc order so compute the version number from index */
                    version: versionCount - index
                };

                /** Properly format field based on definition from model */
                version[fieldDefinition.mappedName] =
                    parseStringValue($(xmlVersion).attr(fieldDefinition.staticName), fieldDefinition.objectType);

                /** Push to beginning of array */
                versions.unshift(version);
            });

            return versions;
        }

        /**
         * @ngdoc function
         * @name angularPoint.apDecodeService:checkResponseForErrors
         * @methodOf angularPoint.apDecodeService
         * @description
         * Errors don't always throw correctly from SPServices so this function checks to see if part
         * of the XHR response contains an "errorstring" element.
         * @param {object} responseXML XHR response from the server.
         * @returns {string|null} Returns an error string if present, otherwise returns null.
         */
        function checkResponseForErrors(responseXML) {
            var error = null;
            /** Look for <errorstring></errorstring> or <ErrorText></ErrorText> for details on any errors */
            var errorElements = ['ErrorText', 'errorstring'];
            _.each(errorElements, function (element) {
                $(responseXML).find(element).each(function () {
                    error = $(this).text();
                    /** Break early if found */
                    return false;
                });
            });
            return error;
        }
    });
