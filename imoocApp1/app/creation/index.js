/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react'
import {
  
  StyleSheet,
  Text,
  View,
  ListView
  

} from 'react-native' 

var List = React.createClass( {

 
  getInitialState(){
 var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  
    return{
    dataSource: ds.cloneWithRows([])
  }
  },

 render: function() {
    return (
      <View style = {styles.container}>
          <View style = {styles.header}>
          <Text style = {styles.headerTitle}>列表页面 </Text>
          </View>
          <ListView
      dataSource={this.state.dataSource}
      // renderRow={this.renderRow}
       renderRow={(rowData) => <Text>{rowData}</Text>}
      enableEmptySections = {true}
      />
      </View>
        )}
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header:{
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },
  headerTitle:{
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16
  }
})


module.exports = List
