'use strict';

//TODO: Remove dependency on toastr
/** Check to see if dependent modules exist */
try {
    angular.module('toastr');
}
catch (e) {
    /** Toastr wasn't found so redirect all toastr requests to $log */
    angular.module('toastr', [])
        .factory('toastr', function ($log) {
            return {
                error: $log.error,
                info: $log.info,
                success: $log.info,
                warning: $log.warn
            };
        });
}

angular.module('angularPoint', [
    'toastr'
])

/**
 * @ngdoc service
 * @name apConfig
 * @description
 * Basic config for the application (unique for each environment)
 *
 * @param {string} appTitle Name of the application in case you need to reference.
 * @param {boolean} debugEnabled Determines if we should show debug code.
 * @param {string} defaultUrl Automatically sets the defaultUrl for web service calls so we don't need to make the
 * initial blocking call by SPServices.
 * @param {string} [firebaseUrl] Necessary if you're using apSyncService.  Look there for more details.
 * @param {boolean} offline Automatically set based on the URL of the site.  Pulls offline XML when hosted locally.
 */
    .constant('apConfig', {
        appTitle: 'Angular-Point',
        debugEnabled: true,
        firebaseURL: "The optional url of your firebase source",
        offline: window.location.href.indexOf('localhost') > -1 ||
            window.location.href.indexOf('http://0.') > -1 ||
            window.location.href.indexOf('http://10.') > -1 ||
            window.location.href.indexOf('http://192.') > -1
    })
    .run(function () {

    });

