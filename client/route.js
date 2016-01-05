//ui.router 
    angular.module('treeapp').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        //Sets url to regular HTML5 /etc.
        $locationProvider.html5Mode(true);
        
        //routes
        $stateProvider
            .state('map', {
                url: '/map',
                template: '<customers-list></customers-list>'
            })
            .state('customerDetails', {
                url: '/customerDetails/:customerId',
                template: '<customer-details></customer-details>',
                // non authorised customer cannot enter customer details section
                resolve: {
                    currentUser: ($q) => {
                        if (Meteor.userId() == null) {
                            return $q.reject();
                        } else {
                            return $q.resolve();
                        }
                    }
                }
            });
        
        //default re-route
        $urlRouterProvider.otherwise("/map");
    });
    