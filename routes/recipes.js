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

