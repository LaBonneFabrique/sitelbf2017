import React from 'react';
import {Images} from '../../api/images/images';
import { Bert } from 'meteor/themeteorchef:bert';
import {supprimeImage} from '../../api/images/methods';
//material-ui
import IconButton from 'material-ui/IconButton';
import {GridList, GridTile} from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
//inlinegrid
//import { Grid, Row, Cell } from 'react-inline-grid';

var FontAwesome = require('react-fontawesome');
const optionsGrid = {
  columns: 12,
  gutter: 8,
  margin: 0
};
const styles = {
inline: {
  display:"inline-block",
},
  centPourCent: {
    width: '100%',
    padding: '0px',
    margin: '0px'
  },
  border: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'black',
    padding: '0px',
    margin: '0px'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 400,
    height: 200,
    overflowY: 'auto',
    marginBottom: 0,
  },
  noSpace: {
      padding: 0,
      margin: 0
  },
  smallIcon: {
    width: 16,
    height: 16,
  },
  small: {
    width: 24,
    height: 24,
    padding: 2,
  },
  img: {
    margin: 2
  }
};

export class ListeImagesEvenement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          choixImage: ""
        };
        this.choisirImage=this.choisirImage.bind(this);
    }
    
componentDidMount() {
  this.setState({choixImage:this.props.choixImg});
}

choisirImage(id) {
  this.setState({choixImage: id});
  this.props.retourChoix(id);
}

choixIcon(imageId) {
  const iconChoix = imageId===this.state.choixImage ? "fa fa-check-square-o" : "fa fa-square-o";
  console.log(iconChoix)
  return iconChoix;
}
    
supprimerImage(id) {
supprimeImage.call({id}, (error) => {
  if (error) {
    Bert.alert("Le fichier n'a pu être supprimé : " + error.reason, "danger");
  } else {
    Bert.alert("Fichier supprimé avec succès", "success");
  }
});
}
    
    render() {
        const  self = this;
        const listeImg = this.props.images.map(function(image) {
        const iconChoix = image._id===self.state.choixImage ? "fa fa-check-square-o" : "fa fa-square-o";
        return (<GridTile style={styles.img}>
                <img 
                  src={Images.link(image, 'taille120')} 
                  width="120"
                  onClick={() => {self.choisirImage(image._id)}}
                  />
                      <IconButton 
                            iconStyle={styles.smallIcon}
                            style={styles.small}
                            onClick={() => {self.choisirImage(image._id)}}
                            >
                            <FontIcon className={iconChoix}/>
                        </IconButton>

                    <IconButton 
                    iconStyle={styles.smallIcon}
                    style={styles.small}
                    >
                    <FontIcon className="fa fa-crop"/>
                </IconButton>

                    <IconButton 
                      iconStyle={styles.smallIcon}
                      style={styles.small}
                      onClick={() => {self.supprimerImage(image._id)}}
                      >
                    <FontIcon className="fa fa-remove"/>
                </IconButton>
                 </GridTile >
        );
    });

          return(
            <div>
              <GridList
                  cellHeight={160}
                  style={styles.gridList}
                  cols={3}
                  padding={5}
                >
                  {listeImg}
                </GridList>
              </div>
              );
    }
    
}