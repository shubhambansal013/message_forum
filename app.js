var express = require('express')
var http = require('http')
var morgan = require('morgan')
var bodyParser = require('body-parser')

var logging = require('./routes/logger')
var messages = require('./routes/messages')

var app = express()

var port = process.env.PORT || 9000

app.set('port', port)
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/ping', function(req, res) {
    var response = {
        message : 'Alive'
    }
    res.send(response)
})

app.post('/post', messages.postMessage)
app.get('/view_posts', messages.viewPosts)
app.post('/delete_post', messages.deletePosts)
app.post('/delete_all_posts', messages.deleteAllPosts)

var httpServer = http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listeneing on port ', app.get('port'));
})

