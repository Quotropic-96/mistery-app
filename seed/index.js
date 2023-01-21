const mongoose = require ("mongoose");
const Recipe = require ("../models/Recipe");
mongoose.set('strictQuery', true);
const recipes = require("../data/recipes");

mongoose.connect(process.env.MONGO_URL)
    .then(x => {
        console.log('Connected to ${x.connection.name}');
        return Recipe.deleteMany();
    })
    .then(() => {
        return Recipe.create(recipes);
    })
    .then(() => {
        mongoose.disconnect();
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });