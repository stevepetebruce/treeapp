// Create new Mongo collection 'customers'
Customers = new Mongo.Collection("customers");


//allow User permissions
Customers.allow({
    insert: function (userId, customer) {
        return userId && customer.owner === userId;
    },
    update: function (userId, customer, fields, modifier) {
        return userId && customer.owner === userId;
    },
    remove: function (userId, customer) {
        return userId && customer.owner === userId;
    }
});

//Removes accounts create account
Accounts.config({
    forbidClientAccountCreation: true
});