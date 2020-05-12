//Libraries
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends React.Component{
  render() {
    return(
      <View style={styles.container}>
        <Image style={{height:100}}
          source={require('../images/download.png')}
        />
        <Text style={styles.logoText}>{this.props.type}</Text>
      </View>
    );
  }
}

//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoText: {
    marginVertical: 20,
    fontSize: 18,
    color:'#555555'
  }
});