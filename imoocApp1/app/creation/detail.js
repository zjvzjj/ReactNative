 /**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Video from 'react-native-video'
import Button from 'react-native-button'
import Dimensions from 'Dimensions'
var config = require('../common/config')
var request = require('../common/request')

import {
  
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
  ListView,
  TextInput,
  Modal,
  AlertIOS

  

} from 'react-native' 

var width = Dimensions.get('window').width

var cachedResults = {
    nextPage: 1,
    items: [],
    total: 0
}

var Detail = React.createClass( {
 _pop(){
  this.props.navigator.pop()
 },
  _onLoadStart() {
    console.log('load start')
  },

  _onLoad() {
    console.log('loads')
  },

  _onProgress(data,e) {

    if (!this.state.videoLoaded) {
      this.setState({
        videoLoaded: true
      })
    }


    var duration = data.playableDuration
        console.log(duration)

    var currentTime = data.currentTime
    var percent = Number((currentTime / duration).toFixed(2))
    var newState = {
      videoTotal: duration,
      currentTime: Number(data.currentTime.toFixed(2)),
      videoProgress: percent
    }

    if (!this.state.videoLoaded) {
      newState.videoLoaded = true
    }
    if (!this.state.playing) {
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
_onError(e) {
    this.setState({
      videoOk: false
    })
  },

  getInitialState(){ 
  var ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })

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
    videoLoaded: false,
    playing :false,
    paused:false,
          videoOk: true,
            dataSource: ds.cloneWithRows([]),
            // modal
            animationType:'none',
            modalVisible:false,
            isSending:false,
            content:''



  }
 },
 _rePlay(){
  this.refs.videoPlayer.seek(0)
 },
 _pause(){
 if(!this.state.paused){
    this.setState({
  paused:true
})
  }
 },
 _resume(){
  if(this.state.paused){
    this.setState({
  paused:false
})
  }
 },

 componentDidMount(){
  this._fatchData()
 },


 _fatchData(page) {
        var that = this

        this.setState({
                isLoadingTail: true
            })

        request.get(config.api.base + config.api.comment, {
            accessToken: 32,
            page: page,
               creation : 124
        })


            .then((data) => {
                if (data && data.success) {


                    var items = cachedResults.items.slice()

                        items = items.concat(data.data)
                        cachedResults.nextPage += 1
                   

                    cachedResults.items = items
                    cachedResults.total = data.total

                        that.setState({
                            isLoadingTail: false,
                            dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
                        })
                  
                }


            })
            .catch((error) => {
                    this.setState({
                        isLoadingTail: false
                    })
                
            })

    },

    _hasMore() {
        return cachedResults.items.length !== cachedResults.total
    },


    _fetchMoreData() {
        if (!this._hasMore() || this.state.isLoadingTail) {

            this.setState({
                isLoadingTail: false
            })

            return
        }

        var page = cachedResults.nextPage

        this._fatchData(page)
    },
  
    _renderFooter(){
        if (!this._hasMore() && cachedResults.total !== 0) {
            return (
                <View style={styles.loadingMore}><Text style={styles.loadingText}>没有更多了</Text></View>
            )
        }
        if (!this.state.isLoadingTail) {
            return <View style={styles.loadingMore}/>
        }
        return <ActivityIndicator style={styles.loadingMore}/>

    },


 _renderRow(row){

  return(
    <View key={row._id} style = {styles.replyBox}> 
        <Image style = {styles.replyAvatar} source = {{uri : row.replyBy.acatar}} >
       </Image>
                    <View style = {styles.reply}>
                   
    <Text style = {styles.replyNickname}>{row.replyBy.nickname}</Text>
       <Text style = {styles.replyContent}>{row.content}</Text>
                    </View> 
                    </View>
    )
 },

 _focus(){
  this._setModalVisible(true)
 },
 _setModalVisible(isVisible){
  this.setState({
    modalVisible:isVisible
  })
 },
 _blur(){

 },
 _closeModal(){
    this._setModalVisible(false)
 },
 _renderHeader(){
       var data = this.state.data

          return(
          <View style = {styles.listHeader}>
              <View style = {styles.infoBox}>
               <Image style = {styles.avatar} source = {{uri : data.author.acatar}} >
              </Image>
              <View style = {styles.descBox}>
             
                <Text style = {styles.nickname}>{data.author.nickname}</Text>
                <Text style = {styles.title}>{data.title}</Text>
              </View> 
              </View>
          <View style = {styles.commentBox}>
             <View style = {styles.comment}>
             <TextInput
             placeholder='好喜欢这个狗'
             style = {styles.content}
             multiline={true}
             onFocus={this._focus}
             />
                  </View>
                  </View>
                  <View style = {styles.commentArea}>
                  <Text style = {styles.commentTitle}>精彩评论</Text>
                  </View>
              </View>
            )
 },

 _submit(){

  var that = this
  if(!this.state.content){
    return AlertIOS.alert('留言不能为空!')
  }

   if(this.state.isSending){
    return AlertIOS.alert('正在评论中!')
  }

  this.setState({
    isSending:true
  },function(){
    var body = {
      accessToken:'abc',
      creation:'112233',
      content:this.state.content
    }

    var url = config.api.base + config.api.comment

    request.post(url,body)
    .then(function(data) {
      if(data && data.success){

        var items = cachedResults.items.slice()
        var content = that.state.content
        items =[{
          content:content,
          replyBy:{
            acatar:'http://dummyimage.com/150x150/3cea0d)',
            nickname:'啦啦啦'
          }
        }].concat(items)

        cachedResults.items = items
        console.log(items)
        cachedResults.total = cachedResults.total + 1
        that.setState({
          content:'',
          isSending:false,
          dataSource:that.state.dataSource.cloneWithRows(
            cachedResults.items)
        })
        that._setModalVisible(false)
      }
    })
    .catch((err) => {
      console.log(err)
      that.setState({
        isSending:false
      })
      that._setModalVisible(false)
      AlertIOS.alert('留言失败')
    })
  })

 },
 render: function() {       
 
        var data = this.props.data
        console.log(data)
console.log('this.state.videoLoaded' + this.state.videoLoaded)
console.log('this.state.playing' + this.state.playing)
    return (

      <View style = {styles.container}>
      <View style = {styles.header}>
        <TouchableOpacity style = {styles.backBox} onPress = {this._pop}>
          <Icon name = 'ios-arrow-back' style = {styles.backIcon} />
          <Text style = {styles.backText}>返回</Text>

        </TouchableOpacity>
        <Text style= {styles.headerTitle} numberOflines = {1}>视频详情页</Text>
      </View>
      <Text onPress = {this._backToList}>详情页面</Text>
      <View style = {styles.videoBox}> 
      <Video 
      ref = 'videoPlayer'
      source={{uri: data.video}}
      style = {styles.video}
      volume = {5}
        paused = {this.state.paused}
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
            !this.state.videoOk && <Text style={styles.failText}>视频出错了！很抱歉</Text>
          }

          {
            !this.state.videoLoaded && <ActivityIndicator color='#ee735c' style={styles.loading} />
          }

          {
            this.state.videoLoaded && !this.state.playing
            ? <Icon
                onPress={this._rePlay}
                name='ios-play'
                size={48}
                style={styles.playIcon} />
            //: <Text></Text>
            : null
          }

          {
            this.state.videoLoaded && this.state.playing
            ? <TouchableOpacity onPress={this._pause} style={styles.pauseBtn}>
              {
                this.state.paused
                ? <Icon onPress={this._resume} size={48} name='ios-play' style={styles.resumeIcon} />
                : null
              }
            </TouchableOpacity>
            : null
          }

      <View style = {styles.progressBox}>
            <View style={[styles.progressBar, {width: width * this.state.videoProgress}]}></View>

      </View>

       </View>
      

                    <ListView dataSource={this.state.dataSource}
                    renderRow={this._renderRow}

                    renderFooter={this._renderFooter}
                    renderHeader={this._renderHeader}
                    onEndReached={this._fetchMoreData}
                  
                    onEndReachedThreshold={20}

                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                />

                <Modal 
                  animationType={'fade'}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {this._setModalVisible(false)}}
                >
                <View style = {styles.modalContainer}>
                      <Icon 
                         onPress = {this._closeModal}
                         name = 'ios-close-outline'
                         style = {styles.closeIcon} 
                      />
           <View style = {styles.commentBox}>
               <View style = {styles.comment}>
                   <TextInput
                   placeholder='好喜欢这个狗'
                   style = {styles.content}
                   multiline={true}
              
                   defaultValue={this.state.content}
                   onChangeText={(text) => {
                    this.setState({
                      content:text
                    })
                   }}
                   />
               </View>
            </View>
            <Button style = {styles.submitBtn} onPress={this._submit}>评论</Button> 
            </View>
                </Modal>

        </View>
        )}
})


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  modalContainer:{
    flex:1,
    paddingTop:45,
    backgroundColor:'#fff'
  },
  closeIcon:{
    alignSelf:'center',
    fontSize:30,
    color:'#ee753c'
  },
  submitBtn:{
    width:width-20,
    padding:16,
    marginTop:15,
    marginLeft:10,
    marginBottom:20,
    borderWidth:1,
    borderColor:'#ee735c',
    borderRadius:4,
    color:'#ee735c',
    fontSize:18
  },
  header:{
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:width,
    height:64,
    paddingTop : 20,
    paddingLeft : 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor:'rgba(0,0,0,0.1)',
    backgroundColor:'#fff'

  },
  backBox:{
    position:'absolute',
    left:12,
    top :32,
    width:50,
    flexDirection:'row',
    alignItems:'center'

  },
  headerTitle:{
    width:width - 120,
    textAlign :'center'

  },
  backIcon:{
    color:'#999',
    fontSize:20,
    marginRight:5

  },
  backText:{
    color:'#999'
  },
  videoBox:{
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },
  video:{
    width:width,
    height:width * 0.56,
    backgroundColor: '#000'
  },
  loading:{
    position:'absolute',
    left:0,
    top:80,
    width:width,
    alignSelf:'center',
    backgroundColor:'transparent'
  },
  progressBox:{
    width:width,
    height:2,
    backgroundColor:'#ccc',



  },
  failText:{
    position:'absolute',
    left:0,
    top:180,
    width:width,
    textAlign:'center',
    color:'#fff',
    backgroundColor:'transparent'
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
  },
  pauseBtn:{
    width: width,
    height: 360,
    position :'absolute',
    left:0,
    top:0
  },
  resumeIcon:{
      width: 60,
      top:90,
        height: 60,
        paddingTop: 8,
        paddingLeft: 22,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        color: '#ed7b66',
        alignSelf: 'center'
  },
  infoBox:{
    width:width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,

  },
  avatar:{
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30
  },
  descBox:{
    flex:1
  },
  nickname:{
    fontSize: 18
  },
  title:{
    marginTop: 8,
        marginRight: 5,
    fontSize: 16,
    color: '#666'
  },
  replyBox:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,

  },
  replyAvatar:{
    width:40,
    height:40,
    marginLeft:10,
    marginRight:10,
    borderRadius:20
  },
  replyNickname:{
    color:'#666'
  },
  replyContent:{
    color:'#666',
    marginTop:4
  },
  reply:{
    flex:1
  },
    loadingMore: {
        marginVertical: 20

    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    },
    commentBox:{
      marginTop:10,
      marginBottom:10,
      padding:8,
      width:width
    },
    content:{
      paddingLeft:2,
      color:'#333',
      borderWidth:1,
      borderColor:'#ddd',
      borderRadius:4,
      fontSize:14,
      height:80
    },
    listHeader:{
      marginTop:10,
      width:width
    },
    commentArea:{
      width:width,
      paddingBottom:6,
      paddingLeft:10,
      paddingRight:10,
      borderBottomWidth:1,
      borderBottomColor:'#eee'
    },
});


module.exports = Detail
