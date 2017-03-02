/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import Dimensions from 'Dimensions'

import {
  
  StyleSheet,
  Text,
  View,
  ActivityIndicator
  

} from 'react-native' 

var width = Dimensions.get('window').width


var Detail = React.createClass( {
 _backToList(){
  this.props.navigator.pop()
 },
  _onLoadStart(){ 
    console.log('load start')
    },      
  _onLoad(){ 
    console.log('loads')
    }, 
  _onProgress(data){ 
    if(!this.state.videoLoaded){
      this.setState({
        videoLoaded: true
      })
    }

    var  duration = data.playableDuration
    var  currentTime = data.currentTime
    var percent = Number((currentTime/duration).toFixed(2))
    var newState = {
       videoTotal : duration,
      currentTime: Number(data.currentTime.toFixed(2)),
      videoProgress: percent

    }

    if(!this.state.videoLoaded){
      newState.videoLoaded = true

    }
    if(!this.state.playing){
      newState.playing = true

    }
    this.setState(newState)

    },

  _onEnd(){ 
    console.log('end')
  this.setState({
      videoProgress: 1,
      playing:false

    })

      },

  _onError(e){ 
        console.log(e)

    console.log('error')


      },

  getInitialState(){ 

  var data = this.props.data
  return{
    data:data,
    rate: 1,
    muted: true,
    resizeMode: 'c_ontain',
    repeat:false,
    videoReady:false,
    videoProgress:0.01,
    videoTotal:0,
    currentTime:0,
    playing :false

  }
 },
 _rePlay(){
  this.refs.videoPlayer.seek(0)
 },
 render: function() {
 
        var data = this.props.data
        console.log(data)

    return (

      <View style = {styles.container}>
      <Text onPress = {this._backToList}>详情页面</Text>
      <View style = {styles.videoBox}> 
      <Video 
      ref = 'videoPlayer'
      source={{uri: data.video}}
      style = {styles.video}
      volume = {5}
      paused = {false}
      rate={this.state.rate}
      muted={this.state.muted}
      resizeMode = {this.state.resizeMode}
      repeat = {this.state.repeat}

      onLoadStart= {this._onLoadStart}
      onLoad= {this._onLoad}
      onProgress= {this._onProgress}
      onEnd= {this._onEnd}
      onError= {this._onError}
      />
      {
        !this.state.videoLoaded && <ActivityIndicator color='#ee735c' style={styles.loading} />
      }
      {

// console.log('this.state.videoLoaded' + this.state.videoLoaded)
// console.log('this.state.playing' + this.state.playing)

        this.state.videoLoaded && !this.state.playing ?
        <Icon onPress = {this._rePlay}
        name = 'ios-play'
        style = {styles.playIcon} 
        size={48}/>

         : null
      }

      <View style = {styles.progressBox}>
<View style = {[styles.progressBar, {width: width * this.state.videoProgress}]}>
</View>
      </View>

       </View>
        </View>
        )}
})


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  videoBox:{
    width: width,
    height: 360,
    backgroundColor: '#000'
  },
  video:{
    width:width,
    height:360,
    backgroundColor: '#000'
  },
  loading:{
    position:'absolute',
    left:0,
    top:140,
    width:width,
    alignSelf:'center',
    backgroundColor:'transparent'
  },
  progressBox:{
    width:width,
    height:2,
    backgroundColor:'#ccc',



  },
  progressBar:{
    width:1,
    height:2,
    backgroundColor:'#ff6600'
  },
  playIcon:{
     position: 'absolute',
        top: 140,
        left: width/2-30,
        width: 60,
        height: 60,
        paddingTop: 8,
        paddingLeft: 22,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        color: '#ed7b66'
  }
});


module.exports = Detail
