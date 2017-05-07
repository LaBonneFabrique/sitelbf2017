import React from 'react';
import {Images} from '../../api/images/images';
import Dropzone from 'react-dropzone';
import { Bert } from 'meteor/themeteorchef:bert';


var FontAwesome = require('react-fontawesome');
//var fs = require('fs-plus');

export class CreateDropzone extends React.Component {
    constructor(props) {
        super();
        this.onDrop = this.onDrop.bind(this);
        this.state = {
            currentUpload: false
        };
    }
    
    onDrop(files) {
        const self = this;
        const meta = this.props.meta;
        if (files && files[0]) {
        var file = files[0];
        if (file) {
            var uploadInstance = Images.insert({
                file: file,
                meta: meta,
                streams: 'dynamic',
                chunkSize: 'dynamic',
                onUploaded: function (error, fileObj) {
                }
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
    // crop&resize
    const sizes = {
        miniature200:{
            width: 200,
            square: true
        },
        miniature40: {
            width:40,
            square:  true
        }
    };
    // chemin du fichier juste uploadé
    
    
    
    }
}
    
    render() {
        return(
        <Dropzone onDrop={this.onDrop}  className="centPourCent dropzone">
            <FontAwesome name='upload' size='3x' /> 
        </Dropzone>
        );
    }
}

CreateDropzone.propTypes = {
  meta: React.PropTypes.object
};