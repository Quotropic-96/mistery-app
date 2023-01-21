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

/* GET Update/Edit recipe view */
// route /recipes/id/edit

router.get ("/:recipeId/edit", async (req,res,next) => { 
  const {recipeId} = req.params;
  try {
      const user = req.session.currentUser;
      const recipe = await Recipe.findById({recipeId});
      res.render("updateRecipe", { recipe, user });
  } catch (error) {
      next(error);
  }
})

/* POST Update/Edit Get data */
// route /recipes/id/edit

router.post ("/:recipeId/edit", async (req,res,next) => { 
  const {recipeId} = req.params;
  const { name, people, time, image, ingredients , description } = req.body;
  try {
      await Recipe.findByIdAndUpdate(recipeId, { name, people, time, image, ingredients , description });
      const user = req.session.currentUser;
    
      res.redirect("/recipes");
  } catch (error) {
      next(error);
  }
})
module.exports = router;

