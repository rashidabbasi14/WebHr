import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, AsyncStorage } from 'react-native';
import { SQLite } from 'expo';

//DB
const db = SQLite.openDatabase('db.db');

export default class FadeInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            User_Id: null,
            fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
            delAnim: new Animated.Value(210),
        };
    }
    
  
    componentDidMount = async () => {
      Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 3,              // Make it take a while
        }
      ).start();                     // Starts the animation
    }

    DelAnim() {
        Animated.timing(
            this.state.delAnim,           // The animated value to drive
            {
              toValue: 0,                   // Animate to opacity: 1 (opaque)
              duration: 800,                   // Make it take a while
            },
          ).start();                       // Starts the animation
          this.props.that.DeleteUser(this.props.text);
          
    }
    
    render() {
      let { fadeAnim } = this.state;
      let { delAnim } = this.state;
        
      const childrenWithExtraProp = React.Children.map(this.props.children, child => {
        return React.cloneElement(child, {
          test: 'hello'
        });
      });
      
      return (
        
            <Animated.View                 // Special animatable View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim,        // Bind opacity to animated value
                    width:'100%',
                    height: delAnim,
                }}
            >
                <View style={styles.container}>
                    <View style={{ width:'100%', height: '20%', flexDirection:'column',alignItems:'flex-end'}}>

                    <TouchableOpacity style={{right:10, top:10}}
                        onPress={() => this.DelAnim()}>
                            <Text >X</Text>
                    </TouchableOpacity></View>

                    <View style={{width:'100%', height: '80%'}}>{childrenWithExtraProp}</View>
                </View>
            </Animated.View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        height:200,
        backgroundColor: '#F1F1F1',
        elevation: 5,
        borderRadius:8,
    },
    button: {
        alignItems:'center',
        justifyContent: 'center',
        elevation: 2,
    },
});