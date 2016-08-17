// Connect to mongoose.
var mongo_url = prcess.env.MONGODB_URI || 'mongodb://localhost/mymdb';

// require mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(mongo_url);


// Requiring the modules. (Movie)
var Movie = require('./models/movie');
var Actor = require('./models/actor');


//  Standard Stuff
var express = require('express');

var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



// Setup the port
var port = 5000;
app.set('port', port);


// set the routes to list all movies
app.route('/movies')
  .get(function(req, res) {
    // res.send('list all movies');
    Movie.find({}, function(err, movies) {
      if (err) next(err);

      res.json(movies);
    });
  }).post(function(req, res) {
    var new_movie = new Movie( req.body);

    new_movie.save(function(err) {
      if(err) return next(err);

      res.json(new_movie);
    });
  });

  app.route('/movies/:movie_id')
  .get( function(req, res, next) {
    var movie_id = req.params.movie_id;
    Movie.findOne({
      _id: movie_id
    }, function(err, movie) {
      if(err) return next(err);

      res.json(movie);
    });
  })
  .put( function(req, res, next) {
    // console.log(req.body);
    var movie_id = req.params.movie_id;

    Movie.findByIdAndUpdate ( movie_id, req.body,
    function(err, movie) {
      if(err) return next(err);

      res.json(movie);
    });
  });

  // set the routes to list all actors
  app.route('/actors')
    .get(function(req, res) {
      // res.send('list all actors');
      Actor.find({}, function(err, actors) {
        if (err) next(err);

        res.json(actors);
      });
    }).post(function(req, res) {
      var new_actor = new Actor( req.body);

      new_actor.save(function(err) {
        if(err) return next(err);

        res.json(new_actor);
      });
    });

    app.route('/actors/:actor_id')
    .get( function(req, res, next) {
      var actor_id = req.params.actor_id;
      Actor.findOne({
        _id: actor_id
      }, function(err, actor) {
        if(err) return next(err);

        res.json(actor);
      });
    })
    .put( function(req, res, next) {
      // console.log(req.body);
      var actor_id = req.params.actor_id;

      Actor.findByIdAndUpdate ( actor_id, req.body,
      function(err, actor) {
        if(err) return next(err);

        res.json(actor);
      });
    });

// Listenning to the port
app.listen(app.get('port'), function() {
  console.log('running on port' + app.get('port'));
});
