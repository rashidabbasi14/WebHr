//Libraries
import React from 'react';
import { StyleSheet, Text, TextInput, Image, TouchableOpacity, View, } from 'react-native';
import { ImagePicker } from 'expo';

import { add } from '../pages/Register'
import MyView from '../components/MyView';

export default class RegForm extends React.Component
{
    state = {
        name: '',
        password: '',
    }
    constructor(props) {
        super(props);
        this.state = {
            isHidden: false,
        };
    };

  render() {
    let { image } = this.state;
    return(
      <View style={styles.container}>
        <TouchableOpacity
            onPress={this._pickImage}>
            {image &&
                <Image source={{ uri:'data:image/jpeg;base64,'+image }} style={{ borderRadius:20, width: 150, height: 150, marginTop:100}} />}
            <MyView hide={this.state.isHidden}>
            <Image  style={{borderRadius:20,width:150, height: 150,marginTop:100}}
                source={require('../images/signuppic.png')}
                resizeMode="contain"/>
            </MyView>
        </TouchableOpacity>
        <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholderTextColor='#282828'
        returnKeyType = { "next" }
        onSubmitEditing={() => { this.secondTextInput.focus(); }}
        blurOnSubmit={false}
        onChangeText={(text) => {
            this.setState({
                name: text,
            });
        }}
        value={this.state.name}
        placeholder='Username'/>
        <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholderTextColor='#282828'
        returnKeyType = { "next" }
        onSubmitEditing={() => { if(this.props.type=='Register')
            add(this.state.name,this.state.password,this.state.image) }}
        ref={(input) => { this.secondTextInput = input; }}
        blurOnSubmit={true}
        onChangeText={(text) => {
            this.setState({
                password: text,
            });
        }}
        value={this.state.password}
        placeholder='Password'
        secureTextEntry={true} />
        <TouchableOpacity style={styles.button}
        onPress={() => {
            if(this.props.type=='Register')
                add(this.state.name,this.state.password,this.state.image)
        }}>
            <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
        quality: 0.2,
        });
        if (!result.cancelled) {
            this.state.isHidden=true;
            this.setState({ image: result.base64 });
        }
    }
}

//StyleSheet
const styles = StyleSheet.create(
{
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
  
    inputBox: {
        width: 300,
        height: 45,
        marginVertical: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 25,
        paddingHorizontal: 16,
    },
    buttonText: {
        fontSize: 16,
        color:'#ffffff'
    },
    button: {
        width: 300,
        height: 45,
        marginVertical: 15,
        backgroundColor: 'rgba(0,45,113,0.75)',
        borderRadius: 25,
        paddingHorizontal: 16,
        alignItems:'center',
        justifyContent: 'center',
    }
});