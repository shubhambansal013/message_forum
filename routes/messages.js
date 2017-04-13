/**
 * Created by shubham on 13/04/17.
 */

var _ = require('lodash')

exports.postMessage = postMessage
exports.viewPosts = viewPosts
exports.deletePosts = deletePosts

var logging = require('./logger')
var constants = require('./constants')
var utils = require('./utils')

var allPosts = {}
var uid = 0

function postMessage(req, res) {
    logging.info(JSON.stringify(req.body))

    var post = {
        id : ++uid,
        text: req.body.text || '',
        source : req.body.source || 'anonymous',
        created_at : new Date()
    }
    allPosts[uid] = post

    var response = {
        responseMessage : 'ACTION_COMPLETE'
    }

    res.send(response)
}

function viewPosts(req, res) {

    if(!Object.keys(allPosts).length) {
        var response = {
            responseMessage : 'NO POSTS'
        }
        return res.send(response)
    }

    var posts = []
    for(var key in allPosts) {
        posts.push(allPosts[key])
    }

    //Although not required
    var posts = _.sortBy(posts, 'created_at')

    var response = {
        responseMessage : 'ACTION_COMPLETE',
        posts : posts
    }
    res.send(response)
}

function deletePosts(req, res) {
    logging.info(JSON.stringify(req.body))

    var access_token = req.body.access_token || ''
    access_token = access_token.toString()

    if(!access_token || (access_token && !~constants.access_tokens.indexOf(access_token))) {
        var response = {
            responseMessage : 'UNAUTHORIZED'
        }

        return res.status(401).send(response)
    }

    var required = ['id']

    if(utils.checkEmpty(required, req.body)) {
        var response = {
            responseMessage : 'BAD REQUEST'
        }

        return res.status(400).send(response)
    }

    var id = parseInt(req.body.id)

    if(!allPosts[id]) {
        var response = {
            responseMessage : 'NO POST FOUND'
        }
        return res.status(400).send(response)
    }

    delete allPosts[id]

    var response = {
        responseMessage : 'ACTION_COMPLETE'
    }
    res.send(response)

}

