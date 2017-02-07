// Declarations
var express = require('express');

var exphbs  = require('express-handlebars');

var app = express();

var bodyParser = require('body-parser');

// var auth = require('controllers/auth.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var mongoose = require('mongoose');
var Post = require('./models/post.js');

mongoose.connect('mongodb://localhost/myapp');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var posts =   [{ title: "10 Ways to Taxidermy Your Pets", category: "lifehacks", body: "Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et." }, {title: "Science Proves That Nothing Is Real", category: "science", body: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum."}, {title: "Newly Discovered Records Show that 16th Century Pirates Realized the Real Treasure They Were Looking for Was the Memories They Were Creating All Along", category: "history", body: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."}];


// Middleware
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Routing
// app.get('/', function (req, res) {
//     res.render('home');
//     // res.send('<h1>I\'m Alive!</h1>');
// });

app.get('/', function(req, res) {
    res.render('posts-index', { posts: posts});
});

app.get('/greetings/:name', function(req, res) {
    res.send('<h1>Greetings, ' + req.params.name + '</h1>');
});

app.get('/api/blahs', function(req, res) {
  res.json([
    { name: "Blah"},
    { name: "Blah"},
    { name: "Blah"}
  ]);
});

app.post('/posts', function (req, res) {
  var post = req.body;
  res.send(post);
  posts.push(post);
  console.log(post);
  res.status(200).json(post);
});

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

// Server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Starter app listening on port 3000!');
});
