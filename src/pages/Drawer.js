import React from 'react'
import {View,Text,AsyncStorage,StyleSheet,Image} from 'react-native'
import { SQLite } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

//DB
const db = SQLite.openDatabase('db.db');

export default class Drawer extends React.Component
{
    constructor(props) {
        super(props);
        this.state ={ 
            User_Id: null,
            users: [],
        };
    }
    componentDidMount = async () => {
        try{
        await AsyncStorage.getItem('USER_ID', (err, item) => {
                this.setState(state => ({User_Id: item}))
        });
        }catch(err){
            alert(err);
        }
        this._fetchusers();
    }
    
    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#fff',paddingTop:40}}>
              <View style={{flexDirection:"row"}}>{<Image source={{ uri:'data:image/jpeg;base64,'+this.state.users[3] }} style={styles.image} />}<Text style={{top:90}}>Welcome, {this.state.users[1]}</Text></View>
              <View style={{marginTop:20}}>
              <Icon.Button name="bars" size={50} color="#555555" backgroundColor="#ffffff">Login </Icon.Button>
              <Icon.Button name="bars" size={50} color="#555555" backgroundColor="#ffffff">Logout </Icon.Button>
              <Icon.Button name="bars" size={50} color="#555555" backgroundColor="#ffffff">Control Panel </Icon.Button>
              </View>
            </View>
        );
    }

    _fetchusers() 
    {
        this.setState(this.state)
        this.setState({ users: [] });
        const that = this;
        db.transaction((txn) => {
            txn.executeSql('SELECT * FROM users where id=?', [this.state.User_Id], (tx, res) => 
            {
                //alert(JSON.stringify(res.rows.length))
                if (res.rows.length > 0) {
                    for(var i=0;i<res.rows.length;i++)
                    {
                        const obj = [
                            res.rows.item(i).id,
                            res.rows.item(i).username,
                            res.rows.item(i).password,
                            res.rows.item(i).image,
                        ]
                        console.log(obj);
                        this.getData(obj);
                    }
                }
            });
           
        });
    }
    getData(data){
        this.setState(state => ({users: data}))
        this.setState(this.state);
    }

}

const styles = StyleSheet.create({
    image: {
        borderRadius:100,
        width: 120, 
        height: 120
    }
});