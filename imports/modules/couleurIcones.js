//import couleur LBF
var couleurs = require('../ui/themeLBF/couleurs');

export const couleurIcones = (type) => {
    var couleur="";
                switch(type) {
                    case "La-Bonne-Fabrique":
                        couleur=couleurs.lbf;  
                        break;
                    case "Le-Coworking":
                        couleur=couleurs.coworking;    
                        break;
                    case "La-brasserie":
                        couleur=couleurs.brasserie;    
                        break;
                    case "La-Salle-des-Machines":
                        couleur=couleurs.atelier;    
                        break;
                    case "grisLBF":
                        couleur=couleur.grisLBF;
                        break;
                    default:
                    break;
    }
    return couleur;
}