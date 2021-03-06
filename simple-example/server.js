var RPC = require('../main.js');
var express = require('express');
var port = 8031;

var rpcApp = new RPC(port, {
    test: require('./rpc_channel_test'),
    plain: function(){
        return 41;
    }
}, {
    test: function(handshake, CB) {	//second function/parameter is optional for authenticated channels
        if (handshake.passw == '123') {
            CB(true);
        } else {
            CB(false);
        }
    }
});

var app = rpcApp.expressApp;
app.use(require('morgan')('dev'));
app.use(express.static(__dirname));

rpcApp.io.on('connection', function (socket) {
    var intId;
    console.log("cl call " + socket.id);
    intId = setInterval(function() {
        socket.rpc.call('fnOnClient')().then(function(ret){
            console.log("client returned: " + ret);
        });
    }, 5000);

    socket.on('disconnect', function () {
        console.log("disconnected, stop calling it");
        clearInterval(intId);
    });

});

app.get('/ng', function (req, res) {
    res.sendFile(__dirname  + '/ng.html');
});
app.get('/ie8', function (req, res) {
    res.sendFile(__dirname + '/ie8.html');
});
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

