/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  
  StyleSheet,
  Text,
  View,
  

} from 'react-native' 

var Edit = React.createClass( {
 
 render: function() {
    return (
      <View style = {styles.container}>
      <Text>制作页面</Text>
        </View>
        )}
})


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


module.exports = Edit
