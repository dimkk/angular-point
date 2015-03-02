let $injector = angular.injector();
let apUtilityService = $injector.get('apUtilityService');


/**
 * @ngdoc function
 * @name angularPoint.apLookupFactory
 * @description
 * Tools to assist with the creation of CAML queries.
 *
 */
export default class apLookupFactory{
    /**
     * @ngdoc function
     * @name angularPoint.apLookupFactory:create
     * @methodOf angularPoint.apLookupFactory
     * @description
     * Instantiates and returns a new Lookup field.
     */
    create(s, options) {
        return new Lookup(s, options);
    }

}

/**
 * @ngdoc function
 * @name Lookup
 * @description
 * Allows for easier distinction when debugging if object type is shown as either Lookup or User.  Also allows us
 * to create an async request for the entity being referenced by the lookup
 * @param {string} s String to split into lookupValue and lookupId
 * @param {object} options Contains a reference to the parent list item and the property name.
 * @param {object} options.entity Reference to parent list item.
 * @param {object} options.propertyName Key on list item object.
 * @constructor
 */
export class Lookup {
    constructor(s) {
        var lookup = this;
        var thisLookup = new apUtilityService.SplitIndex(s);
        lookup.lookupId = thisLookup.id;
        lookup.lookupValue = thisLookup.value || '';
    }
}
