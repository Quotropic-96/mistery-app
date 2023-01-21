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

module.exports = router;

