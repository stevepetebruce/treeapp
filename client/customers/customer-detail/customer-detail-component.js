//Customer Details template and controller
    angular.module('treeapp').directive('customerDetails', function() {
       return {
            restrict: 'E',
            templateUrl: 'client/customers/customer-detail/customer-detail.html',
            controllerAs: 'customerDetails',
            controller: function($scope, $stateParams, $reactive) {
                $reactive(this).attach($scope);
                
                this.subscribe('customers');
                this.subscribe('users');
                
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
                            'public': this.customer.public,
                            location: this.customer.location
                        }
                    }, (error) => {
                            if (error) {
                                console.log('error');
                            } else {
                                console.log('done');
                            }
                    });
                };
                
                
                 //Map Controller
                this.map = {
                    center: {
                        latitude: -26.3204,
                        longitude: -48.8437
                    },
                    zoom: 10,
                    events: {
                        click: (mapModel, eventName, originalEventArgs) => {
                            if (!this.customer)
                                return;
                            
                            if (!this.customer.location)
                                this.customer.location = {};
                                
                            this.customer.location.latitude = originalEventArgs[0].latLng.lat();
                            this.customer.location.longitude = originalEventArgs[0].latLng.lng();
                            
                            //scope apply required because this event handler is outside of the angular domain
                            $scope.$apply();
                        }
                    },
                    marker: {
                        options: { 
                            draggable: true,
                            icon: 'http://aruncare.co.uk/wp-content/themes/JointsWP-master/library/css/icons/green_tree_icon.png'
                                 },
                        events: {
                            dragend: (marker, eventName, args) => {
                                if (!this.customer.location)
                                    this.customer.location = {};
                                
                                this.customer.location.latitude = marker.getPosition().lat();
                                this.customer.location.longitude = marker.getPosition().lng();
                            }
                        }
                        
                        
                    }
                };
                
                
                //static plantation border
                $scope.polygons = [
                    {
                        id: 1,
                        path: [
                            {
                                latitude: -26.3204,
                                longitude: -48.8437
                            },
                            {
                                latitude: -26.3204,
                                longitude: -49.2437
                            },
                            {
                                latitude: -26.7204,
                                longitude: -48.8437
                            }
                        ],
                        stroke: {
                            color: '#008000',
                            weight: 1
                        },
                        geodesic: false,
                        visible: true,
                        fill: {
                            color: '#008000',
                            opacity: 0.1
                        }
                    }
                ];
                
                
                
            }
       }
    });