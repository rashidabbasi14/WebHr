//Libraries
import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, StyleSheet, ScrollView, ListView, Image, DrawerLayoutAndroid } from 'react-native';
import { SQLite } from 'expo';
import FadeInView from '../components/Main_Animation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Drawer from './Drawer'


//DB
const db = SQLite.openDatabase('db.db');

//icons

export default class Main extends React.Component
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
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
            </View>);
        return(
            <View style={{flex:1}}>
            
            <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => <Drawer/>}
            ref='MainDrawer'>

                <View style={{height:'13%', flexDirection:'row', elevation:3,backgroundColor:'#ffffff', alignItems:'flex-end', paddingBottom:10}}>
                <Icon.Button name="bars" size={18} color="#555555" backgroundColor="#ffffff" onPress={() => this.refs['MainDrawer'].openDrawer()}/>
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.logout()}>
                            <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2}
                            onPress={() => this.props.navigation.navigate('NuTimes')}>
                            <Text style={styles.buttonText}>NuTimes</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView >
                <ListView
                    dataSource={new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.users)}
                    enableEmptySections={true}
                    renderRow={(rowData) =>
                        <FadeInView text={rowData[0]} that={this}>
                        <View style={styles.image}>{<Image source={{ uri:'data:image/jpeg;base64,'+rowData[3] }} style={{borderRadius:8,width: 120, height: 120,}} />}</View><View style={styles.textContainer}><Text style={styles.imageText}>ID: {rowData[0]}</Text><Text style={styles.imageText}>Name: {rowData[1]}</Text></View>
                </FadeInView>}/>
                </ScrollView>

                </DrawerLayoutAndroid>
            </View>
        );
    }
    
    DeleteUser (id) {
        db.transaction(
            tx => {
                tx.executeSql('delete from users where id=?', [id]);
              }
        );
        if(id == this.state.User_Id)
            this.logout();
    }

    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
        alert('You have been logged out.');
    }

    _fetchusers() 
    {
        this.setState(this.state)
        this.setState({ users: [] });
        const that = this;
        db.transaction((txn) => {
            txn.executeSql('SELECT * FROM users', [], (tx, res) => 
            {
                if (res.rows.length > 0) {
                    for(var i=0;i<res.rows.length;i++)
                    {
                        const obj = [
                            res.rows.item(i).id,
                            res.rows.item(i).username,
                            res.rows.item(i).password,
                            res.rows.item(i).image,
                        ]
                        this.getData(obj)
                    }
                }
               
            });
           
        });
    }
    getData(data){
        this.state.users.push(data);
        this.setState(this.state);
    }
}
const styles = StyleSheet.create({
    container: {
        height:200,
        backgroundColor: '#F1F1F1',
        elevation: 20,
        borderRadius:8,
        margin:5,
    },
    image: {
        position: 'absolute',
        left: 20,
        top: 10,
        alignSelf:'baseline',
        elevation: 10,
    },
    textContainer: {
        height: '100%',
        position: 'relative',
        width: '60%',
        left:150,
        justifyContent: 'center',
        top: 0,
    },
    imageText: {
        fontSize: 17,
        color: 'black',
    },
    buttonText: {
        fontSize: 16,
        color:'#ffffff',
    },
    button: {
        left: 220,
        width: 100,
        height: 45,
        backgroundColor: 'rgba(0,45,113,0.75)',
        borderRadius: 25,
        alignItems:'center',
        justifyContent: 'center',
        elevation: 2,
    },
    drawer: {
        top:-10,
        position: 'absolute',
        width: 50,
        height: 45,
        backgroundColor: '#ffffff',
        alignItems:'center',
        justifyContent: 'center',
        elevation: 2,
    },
    button2: {
        width: 100,
        height: 45,
        backgroundColor: 'rgba(0,45,113,0.75)',
        borderRadius: 25,
        alignItems:'center',
        justifyContent: 'center',
        elevation: 2,
    }
});