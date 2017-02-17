// Declarations
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// DB Setup
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/myapp');
var Post = require('./models/post.js');
var User = require('./models/user.js');

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

//ROUTES
//===========
require('./controllers/auth.js')(app);
require('./controllers/post.js')(app);
require('./controllers/user.js')(app);
require('./controllers/custom.js')(app);

// SERVER
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Starter app listening on port 3000!');
});
