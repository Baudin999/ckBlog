var params              = Array.prototype.slice.call(process.argv),
    fs                  = require('fs'),
    pageName            = params[params.length - 1],
    controllerName      = pageName + 'Controller',
    viewName            = pageName,
    controllerFileName  = __dirname + "/../app/client/controllers/" + controllerName + '.js',
    viewFileName        = __dirname + "/../app/client/views/" + viewName + '.html',
    routesFileName      = __dirname + "/../app/client/routes.js";

var route   = "\t\t\t\t.when('/" + pageName.replace(/([A-Z])/g, function($1) { return '/' + $1.toLowerCase(); }) + "', route.resolve('" + pageName + "'))";


// delete stuff
if (fs.existsSync(controllerFileName)) fs.unlink(controllerFileName);
if (fs.existsSync(viewFileName)) fs.unlink(viewFileName);

// add the controller
fs.readFile(__dirname + '/controllerTemplate.txt', 'utf8', function (err, data) {
    fs.writeFile(controllerFileName, data.replace(/\{0\}/g, controllerName), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('The file ' + controllerName + ' was saved!');
        }
    });
});

// add the view
fs.readFile(__dirname + '/viewTemplate.txt', 'utf8', function (err, data) {
    fs.writeFile(viewFileName, data.replace(/\{0\}/g, viewName), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('The file ' + viewName + ' was saved!');
        }
    });
});

// add a route
fs.readFile(routesFileName, 'utf8', function (err,data) {

    if (err) { return console.log(err); }
    else {
        var result = data.replace(/\/\/ business routes/g, '// business routes \r\n ' + route);

        fs.writeFile(routesFileName, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    }
});



