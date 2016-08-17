//  Mongoose Stuff
var mongoose = require('mongoose');

// creating a schema. setting up how json structure would be like
var movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  publishedYear: Number,
  director: String,
  actor: String,
  published: {
    type: String,
    default: "MGM"
  },
  website: {
    type: String,
    unique: true,
    trim: true,
    get: function(url) {
      if (!url) {
        return url;
      } else {
        if (
          url.indexOf('http://') !== 0 &&
          url.indexOf('https://') !== 0
        ) {
          url = 'http://' + url;
        }

        return url;
      }
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// register the getter
movieSchema.set('toJSON', { getter: true } );

// register the schema
var Movie = mongoose.model('Movie', movieSchema);
//  NOTES the 'Movie' in the mongoose.model('Movie', movieSchema) is a command where it will look inside the lazy loaded db.Movies.
//  NOTES the program will always try to pluralize the 'Movie' to 'db.MOVIES' and also 'People' to 'db.PEOPLES'... BE CAREFUL

// Make available to other files
module.exports = Movie;
