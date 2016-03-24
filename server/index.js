var Express = require('express'),
    App = Express(),
    Swig = require('swig'),
    Config = require('./config'),
    BodyParser = require('body-parser'),
    Session = require('express-session'),
    Helpers = require('./lib/helpers');


// This is where all the magic happens!
App.engine('html', Swig.renderFile);
App.set('view engine', 'html');
App.set('views', __dirname + '/views');
App.set('view cache', false);
Swig.setDefaults({ cache: false });

App.use(BodyParser.json()); // support json encoded bodies
App.use(BodyParser.urlencoded({ extended: true })); // support encoded bodies
App.use(Express.static(__dirname + '/../static/'))

App.use(Session({
    secret: Config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: {
//        secure: true,
        maxAge: Config.session.maxAge
    }
}));
App.use(function(req,res,next){
    var player = req.session.player;
    if (! player)
    {
        var guid = Helpers.GenerateGuid();
        req.session.player = {
            id: guid,
            hash: Helpers.Md5(guid)
        };
    }
    next();
});

App.use(require('./controllers'));

App.listen(Config.http.port,function(){
    console.log('Application started on port', Config.http.port);
});




Swig.setFilter('secondsFromNow',function(input) {
    return (new Date(input) - Date.now()) / 1000;
});
