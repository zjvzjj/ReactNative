'user strict'

var queryString = require('query-string')
var _ = require('lodash')
var request = {}
var config = require('./config')
var Mock = require('mockjs')

request.get = function (url, params) {
    if (params) {
        console.log('333')
        url += '?' + queryString.stringify(params)
    }
    console.log(url)
    return fetch(url)
        .then((response) => response.json()
        )
        // .then((response) => Mock.mock(response)
        // )

}


request.post = function (url, body) {
    console.log(url)
    var options = _.extend(config.header, {
        body: JSON.stringify(body)
    })
    console.log('3332')
    return fetch(url, options)
        console.log('333')
        .then((response) => response.json()
        )
        // .then((response) => Mock.mock(response)
        // )
}

module.exports = request