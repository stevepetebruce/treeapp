 //Customer List template and controllers
    angular.module('treeapp').directive('customersList', function() {
        return {
            restrict: 'E',
            templateUrl: 'client/customers/customer-list/customer-list.html',
            controllerAs: 'customersList',
            controller: function($scope, $reactive) {
                $reactive(this).attach($scope);
                
                //Add new customer object
                this.newCustomer = {};
                
                // subscribes to publish in the server folder
                this.subscribe('customers');
                
                //Find Customers
                this.helpers({
                    customers: () => {
                        return Customers.find({});
                    }
                });
                
                //Add new customer on submit
                this.addCustomer = () => {
                    // defines an owner for each post added
                    this.newCustomer.owner = Meteor.user()._id;
                    // end
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