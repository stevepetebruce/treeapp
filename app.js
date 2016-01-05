// customers
//  name
//  carmodel
//  treetype

Customers = new Mongo.Collection("customers");

if (Meteor.isClient) {
    angular.module('treeapp', ['angular-meteor','ui.router']); 
    
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
                template: '<customer-details></customer-details>'
            });
        
        //default re-route
        $urlRouterProvider.otherwise("/map");
    });
    
    
    //Customer List template and controllers
    angular.module('treeapp').directive('customersList', function() {
        return {
            restrict: 'E',
            templateUrl: 'customers-list.html',
            controllerAs: 'customersList',
            controller: function($scope, $reactive) {
                $reactive(this).attach($scope);
                
                //Add new customer object
                this.newCustomer = {};
                
                //Find Customers
                this.helpers({
                    customers: () => {
                        return Customers.find({});
                    }
                });
                
                //Add new customer on submit
                this.addCustomer = () => {
                    Customers.insert(this.newCustomer);
                    this.newCustomer = {};
                };
                
                //Remove individual customer
                this.removeCustomer = (customer) => {
                    Customers.remove({_id: customer._id});
                }
            }
        }
        
    });
    
    //Customer Details template and controller
    angular.module('treeapp').directive('customerDetails', function() {
       return {
            restrict: 'E',
            templateUrl: 'customer-details.html',
            controllerAs: 'customerDetails',
            controller: function($scope, $stateParams, $reactive) {
                $reactive(this).attach($scope);
                
                //Find customer detail. Mongo syntax 'findOne'
                this.helpers({
                    customer: () => {
                        return Customers.findOne({ _id: $stateParams.customerId});
                    }
                });  
                
                //Save edited customer
                // two paramaters - 'update' Mongo syntax and 
                // the set action to update relevant fields
                this.save = () => {
                    Customers.update({_id: $stateParams.customerId}, {
                        $set: {
                            name: this.customer.name,
                            carmodel: this.customer.carmodel,
                            treetype: this.customer.treetype
                        }
                    }, (error) => {
                        if (error) {
                            console.log('error');
                        } else {
                            console.log('done');
                        }
                    });
                };
            }
       }
    });
}