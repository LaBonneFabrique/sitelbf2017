export const getMembreData = function(id) {
    const trouveId = function(membre) {
        return membre._id=== id;
    };
    const membre = Meteor.user().famille.find(trouveId);
    return membre;
};