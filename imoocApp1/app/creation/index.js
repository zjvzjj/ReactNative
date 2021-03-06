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
var request = require('../common/request')
var config = require('../common/config')
var Detail = require('../creation/detail')

import {

    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight,
    Image,
    Alert,
    ActivityIndicator,
    RefreshControl,
    AlertIOS


} from 'react-native'

// var Dimensions = React.Dimensions

var cachedResults = {
    nextPage: 1,
    items: [],
    total: 0
}

var width = Dimensions.get('window').width

var Item = React.createClass({
    getInitialState (){
        var row = this.props.row
        return {
            up: row.voted,
            row: row
        }
    },
    _up(){
        var that = this
        var up = !this.state.up
        var row = this.state.row
        var url = config.api.base + config.api.up

        var body = {
            id: row._id,
            up: up ? 'yes' : 'no',
            accessToken: 'abcee'
        }

        request.post(url, body)
            .then(function (data) {
                data.json().then(function (json) {
                    if (json && json.success) {
                        that.setState({
                            up: up
                        })
                    } else {
                        AlertIOS.alert('点赞失败，请重试')
                    }
                });

            })
            .catch(function (err) {
                console.log('err')
            })
    },

    render() {
        var row = this.state.row

        return (
            <TouchableHighlight onPress={this.props.onSelect}>
                <View style={styles.item}>
                    <Text style={styles.title}>{row.title}</Text>
                    <Image
                        source={{uri:row.thumb}}
                        style={styles.thumb}
                    >
                        <Icon
                            name='ios-play'
                            size={28}
                            style={styles.play}/>
                    </Image>
                    <View style={styles.itemFooter}>
                        <View style={styles.handleBox}>
                            <Icon
                                name={this.state.up ? 'ios-heart' : 'ios-heart-outline'}
                                size={28}
                                onPress={this._up}
                                style={[styles.up, this.state.up ? null : styles.down]}/>
                            <Text style={styles.handleText} onPress={this._up}>喜欢</Text>
                        </View>
                        <View style={styles.handleBox}>
                            <Icon
                                name='ios-chatboxes-outline'
                                size={28}
                                style={styles.commentIcon}/>
                            <Text style={styles.handleText}>评论</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
})
var List = React.createClass({

    getInitialState() {
        var ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
            ;

        return {
            isRefreshing: false,
            isLoadingTail: false,
            dataSource: ds.cloneWithRows([]),
        }
    },

    _renderRow: function (row) {
        return <Item 
          key={row._id} 
          onSelect = {() => this._loadPage(row)} 
          row={row}/>
    },
    componentDidMount() {
        var that = this

         that._fatchData(1)
       // that._testData()
    },

    _testData: function () {

        

    //     // fetch('http://test.bd.app.bestdo.com/2.5.2/clubservice/clubIndex', {
    // var fetchOptions = {
    //     method: 'POST',
    //     headers: {
          // 'Accept': 'application/json',
          // //表单
          // 'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body:'uid='530160901140737z55'
    //   };

   //  fetch("http://test.bd.app.bestdo.com/2.5.2/clubservice/clubIndex", {  
   //          method: "POST",  
   //          headers: {  
   //              'Accept': 'application/json',
   //        //表单
   //        'Content-Type': 'application/x-www-form-urlencoded'
   //          },  
   //          body: 'uid=530160901140737z55'  
   //      }) .then((data) => {  
   //          data.json().then(function (json) {
   //              console.log("fetch request ",json);
   //          })
   //          .catch(function (e) {  
   //          console.log("fetch fail");  
   //          Alert.alert('提示','系统错误',[{text: '确定', onPress: () => console.log('OK Pressed!')},]);  
   //      }); 
              
   // })
    var body = {
            uid: '530160901140737z55',
            token:'lalal'
        }
     
        request.post(config.BD.base + config.BD.clubIndex, body)
            .then((data) => {
                // console.log(data.data.description)
                
                // console.log(config.BD.base + config.BD.clubIndex)
                
                // console.log(data)
                
                // console.log("fetch request ", data.data.clubMenu[0].thumb);
                
                data.json().then(function (json) {
                    console.info(json);

                    // var str = json.data.description
                    // var _ds = JSON.parse(JSON.stringify(data));
                    // console.log('113' + _ds)

                    // console.log('11' + str)
                    // var str1 = str.replace(/"([^"]|;)"/ig, "\n")
                    // console.log('22' + str1)
                    // Alert.alert(
                    //     '有版本更新',

                    //     json.data.description,
                    //     [
                    //         {text: '取消', onPress: () => console.log('Cancel Pressed!')},
                    //         {text: '确定', onPress: () => console.log('OK Pressed!')},
                    //     ]
                    // )
                });
            })
    },
    _fatchData(page) {
        var that = this

        if (page !== 0) {
            this.setState({
                isLoadingTail: true
            })
        }
        else {
            this.setState({
                isRefreshing: true
            })
        }


        request.get(config.api.base + config.api.creations, {
            accessToken: 32,
            page: page
        })


            .then((data) => {
                if (data && data.success) {


                    var items = cachedResults.items.slice()

                    if (page !== 0) {
                        items = items.concat(data.data)
                        cachedResults.nextPage += 1
                    }
                    else {
                        items = data.data.concat(items)
                    }

                    cachedResults.items = items
                    cachedResults.total = data.total

                    if (page !== 0) {
                        that.setState({
                            isLoadingTail: false,
                            dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
                        })
                    }
                    else {
                        that.setState({
                            isRefreshing: false,
                            dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
                        })
                    }
                }


            })
            .catch((error) => {
                if (page !== 0) {
                    this.setState({
                        isLoadingTail: false
                    })
                }
                else {
                    this.setState({
                        isRefreshing: false
                    })
                }
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
    _onRefresh() {
        if (!this._hasMore() || this.state.isRefreshing) {
            return
        }

        this._fatchData(0)
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

    _loadPage(row){
        this.props.navigator.push({
            name: 'detail',
            component: Detail,
            params:{
                data: row
            }
        })
    },

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>列表页面</Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderFooter={this._renderFooter}
                    onEndReached={this._fetchMoreData}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor='#ff6600'
                            title='拼命加载中...'
                        />
                    }
                    onEndReachedThreshold={20}
                    enableEmptySections={true}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
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
        height: width * 0.56,
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
        color: '#ed7b66',
    },
    down: {
        fontSize: 22,
        color: '#333',
    },
    commentIcon: {
        fontSize: 22,
        color: '#333'
    },
    loadingMore: {
        marginVertical: 20

    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    }
})


module.exports = List