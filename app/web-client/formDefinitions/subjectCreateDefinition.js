/**
 * Created by ckelkboom on 15-8-14.
 */


define(function() {


    return function($scope) {
        return {
            name: {
                title: 'Name',
                translationKey: 'Form.Name',
                width: 'col',
                required: true,
                valueChangedHandler: function(value, object) {
                    $scope.model.translations.en.name = value;
                }
            },
            description: {
                title: 'Description',
                translationKey: 'Form.Description',
                width: 'col',
                height: '100px',
                required: true,
                allowClear: false,
                valueChangedHandler: function(value, object) {
                    $scope.model.translations.en.description = value;
                }
            },
            image: {
                title: 'Image',
                translationKey: 'Form.Image',
                width: 'col',
                required: true
            }
        }
    };
});
