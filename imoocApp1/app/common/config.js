'user strict'

module.exports = {
    header: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    },
    api: {
        base: 'http://rap.taobao.org/mockjs/9834/',
        creations: 'api/creations',
        comment:'api/comments',
        up: 'api/up',


    },
    BD: {
        base: 'http://test.bd.app.bestdo.com/2.5.2/',
        creations: 'version/iosVersion?version=2.5.1',
        clubIndex: 'clubservice/clubIndex'
    }
}