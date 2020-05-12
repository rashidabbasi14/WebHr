//Libraries
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';

import { add } from '../pages/Register'
import { check } from '../pages/Login'

export default class Form extends React.Component
{
    state = {
        name: '',
        password: '',
    }

    constructor(props){
        super(props)
    }

  render() {
    return(
      <View style={styles.container}>
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
        onSubmitEditing={() => { if(this.props.type=='Login')
            check(this.state.name,this.state.password) }}
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
            if(this.props.type=='Login')
                check(this.state.name,this.state.password)
        }}>
            <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
      </View>
    );
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