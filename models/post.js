var mongoose = require('mongoose')
  var Schema = mongoose.Schema;

  var PostSchema = new Schema({
      createdAt     : { type: Date }
    , updatedAt     : { type: Date }

    , title     : { type: String, required: true }
    , category  : { type: String, required: true }
    , body      : { type: String, required: true }

  })

  var Post = mongoose.model('Post', PostSchema)

  module.exports = Post;
