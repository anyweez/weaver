/* jslint node: true, esnext: true */
var koa = require('koa');
var route = require('koa-route');
var cors = require('koa-cors');

var handlers = [
    require('./handlers/find'),
//    require('./handlers/paths')
];

const PORT = 8080;

var app = koa();
app.use(cors());

app.use(function* (next) {
    var start = new Date();

    yield next;

    var duration = new Date() - start;

    console.log(this.method, this.url, duration + 'ms');
    this.set('X-Response-Time', duration + 'ms');
});


// Initialize all of the handlers so that they're ready to respond
// to requests.
console.log('Initializing handlers...');
handlers.forEach(function (handler) {
    if (handler.hasOwnProperty('init')) handler.init();
});

// Set up all handlers.
handlers.forEach(function (handler) {
    console.log('Adding handler for ' + handler.route);
    app.use(route.get(
        handler.route,
        handler.func
    ));
});
/*
app.use(route.get('/', function* () {
    this.body = "It's working!";
}));
*/

// Start listening.
app.listen(PORT);
console.log('Server listening on port ' + PORT);