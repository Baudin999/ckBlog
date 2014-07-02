

var http        = require('http'),
    products    = require('ckProducts'),
    server      = http.createServer(function(req, res) {
        res.writeHead(200);
        res.end('Hello blogger, ' + products.foo());
    }).listen(3001);