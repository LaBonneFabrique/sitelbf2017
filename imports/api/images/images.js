import {FilesCollection} from "meteor/ostrio:files";
import { newVersion } from './methods';
import { Meteor } from 'meteor/meteor';


//var fs = require ('fs-plus');

  
    var getImageFileSize = function (file) {
    return when.promise(function (resolve, reject) {
  
      gm(file).filesize(function (err, size) {
        if (err) {
          reject(err);
        } else {
          resolve(size);
        }
      });
  
    });
  };

export const Images = new FilesCollection({
  storagePath: 'public/assets/images',
  collectionName: 'Images',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg|gif/i.test(file.extension)) {
      return true;
    } else {
      return 'Les fichiers doivent être inférieur à 10 MB.';
    }
  },
  onAfterUpload: function (file) {

    //dimensions image finale
    const sizes = [{size:190, ratio: 1},{size: 120, ratio: 1}]
    //définition des chemins
    const cheminInitial = file.path;
    let update = file.versions;
    const fileId = file._id;
    const self = this;
    
    sizes.map(function(taille) {
      var size = taille.size;
      var ratio = taille.ratio;
      
       const cheminCopie = self.storagePath+"/"+file._id+"-"+size.toString()+"."+file.extension;
    // taille de l'image
    var imgInitialeSize;
      var imgInitiale = gm(cheminInitial);
      imgInitialeSize = Meteor.wrapAsync(imgInitiale.size, imgInitiale);
      var taille;
      try {
          taille = imgInitialeSize();
      } catch (e) {
          console.log('Error:');
          console.log(e)
      }


    const largeur = taille.width;
    const hauteur = taille.height;
    const ratioInitial = largeur/hauteur;
    
    var largeurCropped = largeur;
    let hauteurCropped = hauteur;
    var cropX = 0;
    var cropY = 0;
    if (ratioInitial>ratio) {
      largeurCropped = hauteur*ratio;
      cropX = (largeur-largeurCropped)/2
    } else if (ratioInitial<ratio) {
      hauteurCropped = largeur/ratio;
      cropY = (hauteur-hauteurCropped)/2
    }
    
    var imageCopie = gm(cheminInitial)
      .crop(largeurCropped, hauteurCropped, cropX, cropY)
      .resize(size, size);
      
    var writeCopie;
    var imgResizeCrop = Meteor.wrapAsync(imageCopie.write, imageCopie)
    try {
        writeCopie = imgResizeCrop(cheminCopie);
    } catch (e) {
        console.log('Error:');
        console.log(e)
    }
    
    var tailleFichier = gm(cheminCopie);
    var imgCopieFilesize = Meteor.wrapAsync(tailleFichier.filesize, tailleFichier);
    
    var tailleFichierCopie;
      try {
          tailleFichierCopie = imgCopieFilesize();
      } catch (e) {
          console.log('Error:');
          console.log(e)
      }
      
    const sizeText = size.toString();
    const versionUpdate = "taille"+sizeText;

    update [versionUpdate] = {
        path: cheminCopie,
        size: tailleFichierCopie,
        type: file.type,
        extension: file.extension,
        meta: {width: size, ratio: ratio}
      };
      
    })
   

    newVersion.call({fileId, update}, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('done')
      }
      });

  },
  downloadCallback: function(fileObj) {
     //   if @params?.query.download is 'true'
    //  Collections.files.collection.update fileObj._id, $inc: 'meta.downloads': 1
    return true
  }

});

export const imagesPath = Images.storagePath;