var mongoose = require('mongoose')
  var Schema = mongoose.Schema;

  var CommentSchema = new Schema({
      createdAt     : { type: Date }
    , updatedAt     : { type: Date }

    , body   : { type: String, required: true }
  })

  // SET createdAt and updatedAt
  CommentSchema.pre('save', function(next) {
    now = new Date();
    this.updatedAt = now;
    if ( !this.createdAt ) {
      this.createdAt = now;
    }
    next();
  });

  var Comment = mongoose.model('Comment', CommentSchema);

  module.exports = Comment;
