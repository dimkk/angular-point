/**
 * @ngdoc object
 * @name angularPoint.apDefaultFields
 * @methodOf angularPoint.apFieldService
 * @description
 * Read only fields that should be included in all lists
 */
export var apDefaultFields = [
    {staticName: 'ID', objectType: 'Counter', mappedName: 'id', readOnly: true},
    {staticName: 'Modified', objectType: 'DateTime', mappedName: 'modified', readOnly: true},
    {staticName: 'Created', objectType: 'DateTime', mappedName: 'created', readOnly: true},
    {staticName: 'Author', objectType: 'User', mappedName: 'author', readOnly: true},
    {staticName: 'Editor', objectType: 'User', mappedName: 'editor', readOnly: true},
    {staticName: 'PermMask', objectType: 'Mask', mappedName: 'permMask', readOnly: true},
    {staticName: 'UniqueId', objectType: 'String', mappedName: 'uniqueId', readOnly: true},
    {staticName: 'FileRef', objectType: 'Lookup', mappedName: 'fileRef', readOnly: true}
];
