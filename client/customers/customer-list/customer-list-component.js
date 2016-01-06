 //Customer List template and controllers
    angular.module('treeapp').directive('customersList', function() {
        return {
            restrict: 'E',
            templateUrl: 'client/customers/customer-list/customer-list.html',
            controllerAs: 'customersList',
            controller: function($scope, $reactive) {
                $reactive(this).attach($scope);
                
                this.newCustomer = {};
                this.perPage = 3;
                this.page = 1;
                this.sort = {
                    name: 1
                };
                this.orderProperty = '1';
                this.searchText = '';
                
                // 1 - subscribes to publish in the server folder.
                // 2 -  plus object with properties for pagination and search
                this.subscribe('customers', () => {
                    return [
                      {
                        limit: parseInt(this.perPage),
                        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
                        sort: this.getReactively('sort')
                      },
                      this.getReactively('searchText')
                    ]
                });
                
                //Find Customers (and sort) and counts collection
                this.helpers({
                    customers: () => {
                        return Customers.find({}, { sort : this.getReactively('sort') });
                    },
                    customersCount: () => {
                        return Counts.get('numberOfCustomers');
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
                };
                
                // Pagination
                this.pageChanged = (newPage) => {
                    this.page = newPage;
                };
                
                // Order pagination
                this.updateSort = () => {
                    this.sort = {
                      name: parseInt(this.orderProperty)
                    }
                };
                
                //map
                this.map = {
                    center: {
                        latitude: -26.3204,
                        longitude: -48.8437
                    },
                    zoom: 8,
                    marker: {
                        options: { 
                            icon: 'http://aruncare.co.uk/wp-content/themes/JointsWP-master/library/css/icons/green_tree_icon.png'
                                 }
                    }
                };
            }
        }
        
    });