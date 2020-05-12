//Libraries
import React from 'react';
import { StyleSheet,Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { SQLite } from 'expo';

//Files
import RegForm from '../components/RegForm';

//DB
const db = SQLite.openDatabase('db.db');

export default class Register extends React.Component 
{
    render()
    {    
        return(
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                    <View style={{flex:4, marginVertical:30,}}><RegForm type="Register"/></View>
                </KeyboardAvoidingView>
                <View style={styles.SignupText}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{color:'rgba(0,45,113,0.75)'}}>Sign In.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    //Functions
    
    _takePicktuer () {
        this.props.navigation.navigate('Camera');
    }
}

export const add = (username, password, image) => {
    db.transaction(
        tx => {
            tx.executeSql('select id,username from users where username = ?', [username], (_, { rows }) =>
            {
                if(rows.length<1)
                {
                    tx.executeSql('insert into users (username, password, image) values (?, ?, ?)', [username, password,image]);
                    alert("User succesfully added.")
                }
                else
                    alert('User already exists.');
            });
        }
    );
}

//StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SignupText: {
        flexDirection:'row',
        marginVertical:15,
    }
});