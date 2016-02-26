var restify = require('restify')
var server = restify.createServer()
var config = require('./config')
var allowedClients = require('./allowedClients')

var client = restify.createJsonClient({
    url: config.elasticsearch
})

server.use(restify.authorizationParser())

server.use(function(req, res, next){
    var deny = function(){
        res.json(401, {"error": "Unauthorized client"})
    }
    if(!req.authorization || !req.authorization.basic)
        deny()
    else
        var user = req.authorization.basic.username
        var password = req.authorization.basic.password
        if(
            allowedClients[user] &&
            allowedClients[user] == password
            ){
            next()
        } else {
            deny()
        }
})

server.use(restify.bodyParser())

server.use(function(req, res, next){
    var path = req.url
    var method = req.method.toLowerCase()
    if(method == 'delete')
        method = 'del'
    var body = req.body

    var callback = function(err, request, response, obj){
        var statusCode = response.statusCode
        res.json(statusCode, obj || {})
    }
    if(method == 'post' || method == 'put'){
        client[method](path, body, callback)
    } else {
        client[method](path, callback)
    }
})

server.get(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/,()=>{})
server.post(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/,()=>{})
server.del(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/,()=>{})
server.put(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/,()=>{})
server.head(/^\/([a-zA-Z0-9_\.~-]+)\/(.*)/,()=>{})

server.listen(config.port)