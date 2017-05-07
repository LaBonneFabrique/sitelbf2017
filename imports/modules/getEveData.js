import {Evenements} from '../api/evenements/evenements';

export const getEveData = function(id) {
    const evenement = Evenements.findOne({_id: id});
    return evenement;
};

export const getPlacesRestantes = function (id, creneauId) {
    const evenement = Evenements.findOne({_id: id});
    const trouveCreneau = function(creneaux) {
        return creneaux._id=== creneauId;
    };
    const creneau = evenement.creneaux.find(trouveCreneau);
    const placesRestantes = creneau.places-creneau.inscrits.length;
    return placesRestantes;
};

export const getCreneauData = function (id) {
        const evenement = Evenements.findOne({_id: id});
        return evenement.creneaux;
}

export const getIndexCreneau = function (creneaux,id) {
    const trouveCreneau = function(creneaux) {
        return creneaux._id=== id;
    };
    const n = creneaux.findIndex(trouveCreneau);
    return n;
};