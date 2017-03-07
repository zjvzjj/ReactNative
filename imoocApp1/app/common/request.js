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

    var queryString = Object.keys(body)
    .map(key => key + '=' + encodeURIComponent(body[key]))
    .join('.');
    console.log(queryString)

    var options = _.extend(config.header, {
        body: queryString
    })

    return fetch(url, options)
        // .then((response) => response.json()
        // )
       // .then((response) => Mock.mock(response)
       //  )
}

module.exports = request