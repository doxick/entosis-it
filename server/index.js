var Express = require('express'),
    App = Express(),
    Swig = require('swig'),
    Config = require('./config'),
    bodyParser = require('body-parser');



// This is where all the magic happens!
App.engine('html', Swig.renderFile);
App.set('view engine', 'html');
App.set('views', __dirname + '/views');
App.set('view cache', false);
Swig.setDefaults({ cache: false });

App.use(bodyParser.json()); // support json encoded bodies
App.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

App.use(Express.static(__dirname + '/../static/'))

App.use(require('./controllers'));

App.listen(Config.http.port,function(){
    console.log('Application started on port', Config.http.port);
});