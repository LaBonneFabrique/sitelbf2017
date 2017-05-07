import React from 'react';
import {Images} from '../../api/images/images';
//import {FilesCollection} from "meteor/ostrio:files";
import {Row, Col, Button, Modal} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import {supprimeImage, newVersion} from '../../api/images/methods';
import Dropzone from 'react-dropzone';
import CropperJS from 'react-cropperjs';

export class FormulaireUpload extends React.Component {
    
constructor(props) {
    super();
    this.onDrop = this.onDrop.bind(this);
    this.handleCrop = this.handleCrop.bind(this);
    this.close = this.close.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showImage = this.showImage.bind(this);
    this.crop = this.crop.bind(this);
    this.state = {
        currentUpload: false,
        show: false,
        imageId: "",
        imageLink:"",
        imageType:"",
        imageExtension:""
    };
    Meteor.subscribe('files.images.all');
}

supprimerImage(id) {
supprimeImage.call({id}, (error) => {
  if (error) {
    Bert.alert("Le fichier n'a pu être surprimé : " + error.reason, "danger");
  } else {
    Bert.alert("Fichier supprimé avec succès", "success");
  }
});
}

onDrop(files) {
    const self = this;
    if (files && files[0]) {
    var file = files[0];
       if (file) {
            var uploadInstance = Images.insert({
                file: file,
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);
        
            uploadInstance.on('start', function() {
                self.setState({currentUpload: true});
            });
            
            uploadInstance.on('end', function(error, fileObj) {
                if (error) {
                    Bert.alert('L\'upload s\'est terminé avec une erreur: '+error.reason, 'danger');
                } else {
                    Bert.alert('Le fichier a été uploadé avec succès', 'success');
                }
                self.setState({currentUpload: false});
            });
            
            uploadInstance.start();
            
        }
        
    }
}

showModal(id) {
    const self = this;
    this.setState({imageId: id, show: true});
    const liste = this.props.listeImages;
    liste.map(function(image) {
        if(image._id===id) {
            self.setState({imageLink: Images.link(image), imageType: image.type, imageExtension:image.extension});
        }
    });
}

handleCrop() {
  const self = this;
  this.refs.cropper.getCroppedCanvas().toBlob(function(blob) {
  const fileName = "imageCarre."+self.state.imageExtension;
  var file = new File([blob], fileName, {type: self.state.imageType});
  console.log(file)
  var update = Images.findOne({_id: self.state.imageId}).fetch()[0].versions;
    update['cropCarre'] = {
      path: file.path,
      size: file.size,
      type: file.type,
      extension: self.state.imageExtension
  }
  console.log(update)
  const id = self.state.imageId;
  /*const update = {versions: {'version.carre': {
      path: file.path,
      size: file.size,
      type: file.type,
      extension: file.extension
  }}}*/
  
  newVersion.call({id, update}, (error) => {
  if (error) {
    Bert.alert("La nouvelle version n'a pas pu être créée : " + error.reason, "danger");
  } else {
    Bert.alert("La nouvelle version du fichier a été créée avec succès", "success");
  }
});
/*
    var uploadInstance = Images.insert({
                file: file,
                streams: 'dynamic',
                chunkSize: 'dynamic'
    }, false);
        
            uploadInstance.on('start', function() {
                self.setState({currentUpload: true});
            });
            
            uploadInstance.on('end', function(error, fileObj) {
                if (error) {
                    Bert.alert('L\'upload s\'est terminé avec une erreur: '+error.reason, 'danger');
                } else {
                    Bert.alert('Le fichier a été uploadé avec succès', 'success');
                }
                self.setState({currentUpload: false});
            });
            
            uploadInstance.start(); */

});

    this.setState({show: false});
}

close() {
    this.setState({show: false});
}

crop() {

  }
  
cropend() {

  }
  
 

showImage() {
    const self = this;
    const liste = this.props.listeImages;
    let retour;
    liste.map(function(image) {
        if(image._id===self.state.imageId) {
            retour = <CropperJS
        ref='cropper'
        src={self.state.imageLink}
        style={{height: 400, width: '100%'}}
        // Cropper.js options
        aspectRatio={1}
        guides={false}
        cropend={self.cropend}
        crop={self.crop} /> ;
            
            
        }
    });
    return retour;
}

render() {
    const self = this;
    //const liste = this.props.listeImages.fetch();
    const liste = this.props.listeImages;
    const listeImg = liste.map(function(image) {
        const keyBouton = "supprimer"+image._id;
        return (
            <div key={image._id}>
                <img src={Images.link(image)} />
                <Button bsSize="xsmall" onClick={() => {self.supprimerImage(image._id)}} key={keyBouton}>Supprimer</Button> <Button bsSize="xsmall" onClick={() =>{self.showModal(image._id)}}>Retailler</Button>
            </div>
        );
    });

    
    return (
        <div>
        <Row className="padding">
        <Col sm={6}>
            <Dropzone onDrop={this.onDrop}>
              <div>Faites glisser votre image sur ce cadre, ou cliquez pour choisir votre image.</div>
            </Dropzone>
        </Col>
        <Col sm={6}>
            <p>liste images :</p>
            {listeImg}
        </Col>
        </Row>
        
<Modal
          show={this.state.show}
          onHide={this.close}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title>Retailler l'image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.showImage()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCrop}>Appliquer</Button>
          </Modal.Footer>
        </Modal>
        
        </div>
        );
}

}