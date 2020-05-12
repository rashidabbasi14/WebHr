//Libraries
import React from 'react';
import { StyleSheet, Text,  View, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, BackHandler } from 'react-native';
import { SQLite } from 'expo';

//Files
import Logo from '../components/Logo'
import Form from '../components/Form'

//DB
const db = SQLite.openDatabase('db.db');
const net = null;

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        net = this.props.navigation;
        this.state ={ isLoggedIn: false };
      }
    componentDidMount() {
        db.transaction(tx => {
          tx.executeSql(
            'create table if not exists users (id integer primary key not null, username text, password text, image text);'
          );
        });
    }
    render() {
        return (
            <View style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <Logo type="Sign In"/>
                <View style={{flex:1}}><Form type="Login" /></View>
            </KeyboardAvoidingView>
                <View style={styles.SignupText}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity
                         onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={{ color: 'rgba(0,45,113,0.75)' }}>Sign Up.</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

const createSession = async (id) => {
    try {
      AsyncStorage.setItem('SESSION', 'true');
      AsyncStorage.setItem('USER_ID', JSON.stringify(id));
    } catch (error) {
      alert(error)
    }
}

export const check = (username, password) => {
    db.transaction(
        tx => {
            tx.executeSql('select id,username,password from users where username = ? AND password = ?', [username,password], (_, { rows }) =>
            {
                if(rows.length==1)
                {
                    createSession(rows._array[0].id);
                    alert('You have successfully logged in.')
                    net.navigate('App');
                }
                else
                    alert('Invalid username or password, try again.')
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
        flexDirection: 'row',
        marginVertical: 15,
    }
});