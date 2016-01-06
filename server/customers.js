//publish from Server to Client (keep only in server folder)

Meteor.publish("customers", function (options, searchString) {
    // no search return everything
    if (!searchString || searchString == null){
        searchString = '';
    }
    
    let selector = {
        //filter whose name contains the searchString
        name: {'$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
        
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