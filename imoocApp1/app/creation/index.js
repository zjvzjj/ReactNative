/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {
  Component
} from 'react'
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/Ionicons'
import {

  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image


} from 'react-native'

// var Dimensions = React.Dimensions


var width = Dimensions.get('window').width

var List = React.createClass({

    getInitialState() {
      var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      return {
        dataSource: ds.cloneWithRows([{
          "_id": "620000198503211187",
          "thumb": "http://dummyimage.com/1200x600/60d2bc)",
          "video": "http://v2.mukewang.com/6ae55890-3157-4b72-b2ac-3abb0bc6969f/L.mp4?auth_key=1478593262-0-0-2ddaa5876432f784a04f87cff2f19791"
        }, {
          "_id": "410000198406246397",
          "thumb": "http://dummyimage.com/1200x600/6e623d)",
          "video": "http://v2.mukewang.com/6ae55890-3157-4b72-b2ac-3abb0bc6969f/L.mp4?auth_key=1478593262-0-0-2ddaa5876432f784a04f87cff2f19791"
        }]),
      }
    },

    renderRow: function(row){
      return (
        <TouchableHighlight>
          <View style = {styles.item}>
        <Text style = {styles.title}>{row._id}</Text>

    <Image
        source={{uri:row.thumb}}
        style={styles.thumb}
       >
    <Icon
    name='ios-play'
    size={28}
    style={styles.play}
    />
   </Image>


    <View style={styles.itemFooter}>
    <View style={styles.handleBox}>
    <Icon name='ios-heart-outline'
    size={28}
    style={styles.up}
    />
    <Text style={styles.handleText}>喜欢</Text>
    </View>
    <View style={styles.handleBox}>
  <Icon
  name='ios-pricetag-outline'
  size={28}
  style={styles.commentIcon}
  />
  <Text style={styles.handleText}>评论</Text>
  </View>
  </View>
  </View>
  </TouchableHighlight>
)
},

render: function() {
return ( 
  <View style = {styles.container}>
  <View style = {styles.header}>
  <Text style = {styles.headerTitle}>列表页面</Text>
  </View>
  <ListView dataSource = {
    this.state.dataSource
  }
  renderRow = {
    this.renderRow
  }
  enableEmptySections = {true}
    automaticallyAdjustContentInsets = {false}

  /> 
  </View>
)
}
})

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16
  },
  item: {
    width: width,
    marginBottom: 10,
    backgroundColor: '#fff'

  },
  thumb: {
    width: width,
    height: width * 0.5,
    resizeMode: 'cover'

  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333'
  },

  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee'
  },

  handleBox: {
    padding: 10,
    flexDirection: 'row',
    width: width / 2 - 0.5,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  play: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 46,
    height: 46,
    paddingTop: 9,
    paddingLeft: 18,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 23,
    color: '#ed7b66'
  },
  handleText: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#333'
  },
  up: {
    fontSize: 22,
    color: '#333',
  },
  commentIcon: {
    fontSize: 22,
    color: '#333'
  }
})


module.exports = List