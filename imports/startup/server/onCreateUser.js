// une erreur est jetée dans l'environnement dev, il faut préciser ROOT_URL dans le déploiement en production
Accounts.onCreateUser(function(options, user) {
    if (Meteor.userId()) {
    var service = _.keys(user.services)[0];

    const serviceToAdd = user.services
    const existingUser = Meteor.user();
    
    user=existingUser;
    user.services[service] = serviceToAdd[service]

    Meteor.users.remove({_id: existingUser._id});

    }
    else {
        if (options.profile)
            user.profile=options.profile;
    }

    return user;
})