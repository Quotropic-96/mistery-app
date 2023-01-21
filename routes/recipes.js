const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

/* GET all recipes */
router.get ("/", async (req,res,next) => {
  try {
      const recipes = await Recipe.find({});
      res.render("recipes", { recipes });
  } catch (error) {
      next(error);
  }
});

// GET New Recipe Page
router.get('/new', (req, res, next) => {
  res.render("newRecipe");
});

router.post('/new', async (req, res, next) => {
  const { name, people, time, level, image, ingredients, description } = req.body;
  const userId = req.session.currentUser
  try {
    const recipeInDB = await Recipe.findOne({ name:name });
    if (!recipeInDB) {
      Recipe.create({ name, people, time, level, image, ingredients, description, creator: userId});
      res.redirect('/recipes');
    } else {
      res.render('/recipes/new', {error: 'Already exists in db'});
    }
  } catch (error) {
    next(error);
  }
})

/*Get details*/

router.get("/recipes/:id", async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render("recipeDetails", { recipe });
    console.log( recipe);
  } catch (err) {
    // console.log(err);
    next(err);
  }
});


module.exports = router;

