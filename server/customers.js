//publish from Server to Client (keep only in server folder)

Meteor.publish("customers", function (options) {
    let selector = {
        $or: [
            {
                $and: [
                    // Public tick box
                    {'public': true},
                    {'public': {$exists: true}}
                ]
            },
            {
                $and: [
                    // Logged in user
                    {owner: this.userId},
                    {owner: {$exists: true}}
                ]
            }
        ]
    };
    
    Counts.publish(this, 'numberOfCustomers', Customers.find(selector), {noReady: true});
    return Customers.find(selector, options);
});