import React from 'react';
import Grille from '../containers/grilleAccueil';

export class Index extends React.Component {
    
constructor(props) {
    super();
}
    
componentDidMount() {
    document.title = "La Bonne Fabrique";
}
    
render () {

    return (<Grille />
        )
}
}
/*
export const Index = () => (
    <Grille />
);*/
