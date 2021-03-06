'use strict';

/**
 * @ngdoc service
 * @name angularPoint.apFieldService
 * @description
 * Handles the mapping of the various types of fields used within a SharePoint list
 */
angular.module('angularPoint')
    .factory('apFieldService', function (_) {

        var uniqueCount = 0;


        /** Store as a function to ensure we instantiate new objects for default values instead
         *  of having all blank field that have an array for a default value share the same array */
        function getFieldTypes() {
            /** Field types used on the models to create a field definition */
            return {
                Text: {
                    defaultValue: '',
                    staticMock: 'Test String',
                    dynamicMock: randomString
                },
                Note: {
                    defaultValue: '',
                    staticMock: 'This is a sentence.',
                    dynamicMock: randomParagraph
                },
                Boolean: {
                    defaultValue: null,
                    staticMock: true,
                    dynamicMock: randomBoolean
                },
                Calculated: {
                    defaultValue: null,
                    staticMock: 'float;#123.45',
                    dynamicMock: randomCalc
                },
                Choice: {
                    defaultValue: '',
                    staticMock: 'My Choice',
                    dynamicMock: randomString
                },
                Counter: {
                    defaultValue: null,
                    staticMock: getUniqueCounter(),
                    dynamicMock: getUniqueCounter
                },
                Currency: {
                    defaultValue: null,
                    staticMock: 120.50,
                    dynamicMock: randomCurrency
                },
                DateTime: {
                    defaultValue: null,
                    staticMock: new Date(2014, 5, 4, 11, 33, 25),
                    dynamicMock: randomDate
                },
                Integer: {
                    defaultValue: null,
                    staticMock: 14,
                    dynamicMock: randomInteger
                },
                JSON: {
                    defaultValue: '',
                    staticMock: [
                        {id: 1, title: 'test'},
                        {id: 2}
                    ],
                    dynamicMock: randomString
                },
                Lookup: {
                    defaultValue: '',
                    staticMock: {lookupId: 49, lookupValue: 'Static Lookup'},
                    dynamicMock: randomLookup
                },
                LookupMulti: {
                    defaultValue: [],
                    staticMock: [
                        {lookupId: 50, lookupValue: 'Static Multi 1'},
                        {lookupId: 51, lookupValue: 'Static Multi 2'}
                    ],
                    dynamicMock: randomLookupMulti
                },
                Mask: {
                    defaultValue: mockPermMask(),
                    staticMock: mockPermMask(),
                    dynamicMock: mockPermMask
                },
                MultiChoice: {
                    defaultValue: [],
                    staticMock: ['A Good Choice', 'A Bad Choice'],
                    dynamicMock: randomStringArray
                },
                User: {
                    defaultValue: '',
                    staticMock: {lookupId: 52, lookupValue: 'Static User'},
                    dynamicMock: randomUser
                },
                UserMulti: {
                    defaultValue: [],
                    staticMock: [
                        {lookupId: 53, lookupValue: 'Static User 1'},
                        {lookupId: 54, lookupValue: 'Static User 2'}
                    ],
                    dynamicMock: randomUserMulti
                }
            };
        }


        return {
            getDefaultValueForType: getDefaultValueForType,
            getMockData: getMockData,
            getDefinition: getDefinition,
            mockPermMask: mockPermMask,
            resolveValueForEffectivePermMask: resolveValueForEffectivePermMask
        };


        /**=================PRIVATE===================*/

        function getUniqueCounter() {
            uniqueCount++;
            return uniqueCount;
        }

        function randomBoolean() {
            return chance.bool();
        }

        function randomCalc() {
            return 'float;#' + chance.floating({min: 0, max: 10000});
        }

        function randomString(len) {
            return chance.word() + ' ' + chance.word();
        }

        function randomStringArray() {
            var randomArr = [];
            /** Create a random (1-4) number of strings and add to array */
            _.times(_.random(1, 4), function () {
                randomArr.push(randomString());
            });
            return randomArr;
        }

        function randomParagraph() {
            return chance.paragraph();
        }

        function randomCurrency() {
            return parseInt(_.random(10000000, true) * 100) / 100;
        }

        function randomDate() {
            return chance.date();
        }

        function randomInteger() {
            return chance.integer();
        }

        /**
         * @ngdoc function
         * @name angularPoint.apFieldService:resolveValueForEffectivePermMask
         * @methodOf angularPoint.apFieldService
         * @description
         * Takes the name of a permission mask and returns a permission value which can then be used
         * to generate a permission object using modelService.resolvePermissions(outputfromthis)
         * @param {string} perMask Options:
         *  - AddListItems
         *  - EditListItems
         *  - DeleteListItems
         *  - ApproveItems
         *  - FullMask
         *  - ViewListItems
         * @returns {string} value
         */
        function resolveValueForEffectivePermMask(perMask) {
            var permissionValue;
            switch (perMask) {
                case 'AddListItems':
                    permissionValue = '0x0000000000000002';
                    break;
                case 'EditListItems':
                    permissionValue = '0x0000000000000004';
                    break;
                case 'DeleteListItems':
                    permissionValue = '0x0000000000000008';
                    break;
                case 'ApproveItems':
                    permissionValue = '0x0000000000000010';
                    break;
                case 'FullMask':
                    permissionValue = '0x7FFFFFFFFFFFFFFF';
                    break;
                case 'ViewListItems':
                default:
                    permissionValue = '0x0000000000000001';
                    break;
            }
            return permissionValue;
        }

        /**
         * @ngdoc function
         * @name angularPoint.apFieldService:mockPermMask
         * @methodOf angularPoint.apFieldService
         * @description
         * Defaults to a full mask but allows simulation of each of main permission levels
         * @param {object} [options] Options container.
         * @param {string} [options.permissionLevel=FullMask] Optional mask.
         * @returns {string} Values for mask.
         */
        function mockPermMask(options) {
            var mask = 'FullMask';
            if (options && options.permissionLevel) {
                mask = options.permissionLevel;
            }
            return resolveValueForEffectivePermMask(mask);
        }

        function randomLookup() {
            return {
                lookupId: getUniqueCounter(),
                lookupValue: chance.word()
            };
        }

        function randomUser() {
            return {
                lookupId: getUniqueCounter(),
                lookupValue: chance.name()
            };
        }

        function randomLookupMulti() {
            var mockData = [];
            _.each(_.random(10), function () {
                mockData.push(randomLookup());
            });
            return mockData;
        }

        function randomUserMulti() {
            var mockData = [];
            _.each(_.random(10), function () {
                mockData.push(randomUser());
            });
            return mockData;
        }


        /**
         * Returns an object defining a specific field type
         * @param {string} fieldType
         * @returns {object} fieldTypeDefinition
         */
        function getDefinition(fieldType) {
            var fieldTypes = getFieldTypes();
            return fieldTypes[fieldType] ? fieldTypes[fieldType] : fieldTypes['Text'];
        }

        /**
         * @ngdoc function
         * @name angularPoint.apFieldService:getDefaultValueForType
         * @methodOf angularPoint.apFieldService
         * @description
         * Returns the empty value expected for a field type
         * @param {string} fieldType Type of field.
         * @returns {*} Default value based on field type.
         */
        function getDefaultValueForType(fieldType) {
            var fieldDefinition = getDefinition(fieldType),
                defaultValue;

            if (fieldDefinition) {
                defaultValue = fieldDefinition.defaultValue;
            }
            return defaultValue;
        }

        /**
         * @ngdoc function
         * @name angularPoint.apFieldService:getMockData
         * @methodOf angularPoint.apFieldService
         * @description
         * Can return mock data appropriate for the field type, by default it dynamically generates data but
         * the staticValue param will instead return a hard coded type specific value
         *
         * @requires ChanceJS to produce dynamic data.
         * https://github.com/victorquinn/chancejs
         * @param {string} fieldType Field type from the field definition.
         * @param {object} [options] Optional params.
         * @param {boolean} [options.staticValue=false] Default to dynamically build mock data.
         * @returns {*} mockData
         */
        function getMockData(fieldType, options) {
            var mock;
            var fieldDefinition = getDefinition(fieldType);
            if (fieldDefinition) {
                if (_.isFunction(Chance) && options && !options.staticValue) {
                    /** Return dynamic data if ChanceJS is available and flag isn't set requiring static data */
                    mock = fieldDefinition.dynamicMock(options);
                } else {
                    /** Return static data if the flag is set or ChanceJS isn't available */
                    mock = fieldDefinition.staticMock;
                }
            }
            return mock;
        }


    });
