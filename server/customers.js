//publish from Server to Client (keep only in server folder)

Meteor.publish("customers", function () {
    return Customers.find({
        $or: [
            {
                $and: [
                    // Public tick box
                    {"public": true},
                    {"public": {$exists: true}}
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
    });
});