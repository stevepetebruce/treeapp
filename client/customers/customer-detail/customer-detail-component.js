//Customer Details template and controller
    angular.module('treeapp').directive('customerDetails', function() {
       return {
            restrict: 'E',
            templateUrl: 'client/customers/customer-detail/customer-detail.html',
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
                // the set action to update relevant fields.
                // optional third for checking errors
                this.save = () => {
                    Customers.update({_id: $stateParams.customerId}, {
                        $set: {
                            name: this.customer.name,
                            carmodel: this.customer.carmodel,
                            treetype: this.customer.treetype,
                            'public': this.customer.public
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