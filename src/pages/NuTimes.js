import React from 'react';
import { WebView } from 'react-native'


export default class NuTimes extends React.Component {

    render (){
        return (
            <WebView
                source={{uri: 'https://rashidabbasi17.000webhostapp.com/main.php'}}
                style={{marginTop: 20}}
            />
        );
    }
}