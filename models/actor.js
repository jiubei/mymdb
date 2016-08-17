
var mongoose = require('mongoose');

// creating a schema. setting up how json structure would be like
var actorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  age: Number,
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
actorSchema.set('toJSON', { getter: true, virtuals: true } );

// Register a virtual attributes
actorSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
});

// register the schema
var Actor = mongoose.model('Actor', actorSchema);
//  NOTES the 'Actor' in the mongoose.model('Actor', actorSchema) is a command where it will look inside the lazy loaded db.Actors.
//  NOTES the program will always try to pluralize the 'Actor' to 'db.ACTORS' and also 'People' to 'db.PEOPLES'... BE CAREFUL

// Make available to other files
module.exports = Actor;
