/**
 * Created by ckelkboom on 18-8-14.
 */


define(function() {


    return function($scope) {
        return {
            name: {
                title: 'Name',
                translationKey: 'Form.Name',
                width: 'col',
                required: true
            },
            description: {
                title: 'Description',
                translationKey: 'Form.Description',
                width: 'col',
                height: '100px',
                required: true
            }
        }
    };
});