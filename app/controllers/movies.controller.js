const { db } = require('../json_db');
const { v4 } = require('uuid');
const { ErrorHandler } = require('../modules/error');
const jwt = require('jsonwebtoken');
// this should really be in .env
const secret = 'khdldlklkdghlkgdjhgdhg';

class MoviesController {

  // static createMovie = (req, res, next) => {
  //   const { title, category, img, imdb } = req.body;
  //   const uuid = v4();

  //   let movie_data = validateDbCollectionExists(db, '/movies/');
    
  //     if (!movie_data) {
  //         db.push('/movies/', []);
  //         movie_data = db.getData('/movies/');
  //       }

  //       let movieExists = movie_data.find((movie) => {
  //         return movie.title == title
  //           // movie.title == title, 
  //           // movie.category ==category,
  //           // movie.img == img, 
  //           // movie.imdb == imdb
        
  //       });

  //   db.push("/test3", {
  //     new:"cool",
  //     json: {
  //         important : 5
  //     }
  // }, false);
  // }

    static createMovie(req, res, next) {
      const { title, category, img, imdb } = req.body;
      const uuid = v4();

      let movie_data = validateDbCollectionExists(db, '/movies/');

      if (!movie_data) {
        db.push('/movies/', []);
        movie_data = db.getData('/movies/');
      }

      let movieExists = movie_data.find((movie) => {
        return movie.title == title    
      });

      let output = null;

      if (movieExists) {
        res.status(400);
        output = { message: `movie ${title} already exists` };
      } else {
        db.push('/movies[]', { title, category, img, imdb });
        let new_movie = db.getData('/movies/').find((movie) => movie.title == title);

        output = { new_movie };
      }

      res.json(output)

    }
}


function validateDbCollectionExists(dbObjHandler, collection) {
  try {
    let result = dbObjHandler.getData(collection);
    return result;
  } catch (error) {
    return false;
  }
}

module.exports = { MoviesController };