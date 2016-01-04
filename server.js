// customers
//  name
//  carmodel
//  treetype

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Customers.find().count() === 0) {
            var customers = [
                {
                    'name': 'Steven',
                    'carmodel': 'Skoda',
                    'treetype': 'Ash'
                },
                {
                    'name': 'Steven',
                    'carmodel': 'Skoda',
                    'treetype': 'Ash'
                }
                
            ];
            
            for ( var i=0; i < customers.length; i++) {
                Customers.insert(customers[i]);
            }
        }
    });
}