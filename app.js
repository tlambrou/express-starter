// Declarations
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/myapp');
var Post = require('./models/post.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected to the db!
});

// Middleware
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// Routing
// app.get('/', function (req, res) {
//     res.render('home');
//     // res.send('<h1>I\'m Alive!</h1>');
// });



//POSTS INDEX
app.get('/', function(req, res) {
  Post.find().exec(function(err, posts) {
    res.render('posts-index', { posts: posts});
  })
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

//POST SHOW
app.get('/post/:id', function (req, res) {
  var post = Post.findById(req.params.id);
  res.render('post-show', {post: post});
});

//POST CREATE
app.post('/posts', function (req, res) {
  var post = new Post(req.body);

  post.save(function (err) {
    console.log(post);
    res.send(post);
  });
});

//POST DELETE
app.delete('/post/:id', function (req, res) {
  console.log("blah");
  Post.findById(req.params.id).exec(function (err, post) {
    post.remove();

    res.status(200).json({});
  });
});

//POST UPDATE

//USER UPDATE
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

//USER DELETE
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

// SERVER
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Starter app listening on port 3000!');
});

// Seed Data
var seed =   [{ title: "10 Ways to Taxidermy Your Pets", category: "lifehacks", content: "Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et." }, {title: "Science Proves That Nothing Is Real", category: "science", content: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum."}, {title: "Newly Discovered Records Show that 16th Century Pirates Realized the Real Treasure They Were Looking for Was the Memories They Were Creating All Along", category: "history", content: "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue."}];
