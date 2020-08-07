const { db } = require('../json_db');
const { v4 } = require('uuid');
const { ErrorHandler } = require('../modules/error');
const jwt = require('jsonwebtoken');

class categoriesController {
  
  static createCategories(req, res, next) {
    try {
      const { category } = req.body;
      const uuid = v4();

      let category_data = validateDbCollectionExists(db, '/categories/');

      if (!category_data) {
        db.push('/categories/', []);
        category_data = db.getData('/categories/');
      }

      let categoryExists = category_data.find((category) => {
        return category.category == category;
      });

      let output = null;

      if (categoryExists) {
        res.status(400);
        output = { message: `category ${category} already exists` };
      } else {
        db.push('/categories[]', {category, uuid });
        let category = db.getData('/categories/').find((user) => user.name == name);

        output = { category };
      }

      res.json(output);
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  }

  // static getCategories (req, res, next) {
  //   try {
  //     const { category } = req.body;
  //     const uuid = v4();

  //     let category_data = validateDbCollectionExists(db, '/categories/');

  //     if (!category_data) {
  //       db.push('/categories/', []);
  //       category_data = db.getData('/categories/');
  //     }
      
  //   } catch (error) {
  //     error.statusCode = 500;
  //     next(error);
  //   }
  // }

  
}

module.exports = { categoriesController };
