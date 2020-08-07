const { db } = require('../json_db');
const { v4 } = require('uuid');
const { ErrorHandler } = require('../modules/error');
const jwt = require('jsonwebtoken');
// this should really be in .env
const secret = 'khdldlklkdghlkgdjhgdhg';
/*
 * Errors:
 * unf-user not found: unf
 * wrong password: pnm
 * email or password not provided in req.body: mcp
 */

class UserController {
  static signup(req, res, next) {
    try {
      const { name, pw } = req.body;
      const uuid = v4();

      let user_data = validateDbCollectionExists(db, '/users/');

      if (!user_data) {
        db.push('/users/', []);
        user_data = db.getData('/users/');
      }

      let userExists = user_data.find((user) => {
        return user.name == name;
      });

      let output = null;

      if (userExists) {
        res.status(400);
        output = { message: `user ${name} already exists` };
      } else {
        db.push('/users[]', { name, pw, uuid });
        let new_user = db.getData('/users/').find((user) => user.name == name);

        output = { new_user };
      }

      res.json(output);
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  }

  static login(req, res, next) {
    try {
      const { name, pw } = req.body;
      let output = null;
      if (!name || !pw) {
        res.status(400);
        output = { message: 'missing name or pw' };
      }

      let user_data = validateDbCollectionExists(db, '/users/');

      if (!user_data) {
        res.status(500);
        output = { message: 'missing name or pw' };
      }

      let userExists = user_data.find((user) => {
        console.log('UserController -> login -> user', user, user.name, name);
        return user.name == name ? user : null;
      });
      console.log('UserController -> login -> userExists', userExists);
      if (!userExists || userExists.pw != pw) {
        res.status(401);
        output = { message: 'user not authorized' };
      } else {
        // user found and passwords match
        const token = jwt.sign(
          { name: userExists.name, uuid: userExists.uuid },
          //process.env.SECRET_KEY,
          secret,
          {
            expiresIn: '1h',
          },
        );
        output = { user: userExists, token: token };
      }

      res.json(output);
    } catch (error) {
      console.log('UserController -> login -> error', error);
      error.statusCode = 500;
      next(error);
    }
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

module.exports = { UserController };
