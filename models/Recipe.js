const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'You must enter a name']
    }, 
    people: {
        type: Number,
        required: [true, 'You must enter the number of people']
    }, //comensales
    time: {
        type: Number,
        required: [true, 'You must enter the duration']
    }, //tiempo de preparación en minutos
    level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
    }, //podrá ser "advanced", "easy", "medium"
    image: {
        type: String,
        default: 'https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg'
    },
    ingredients: {
        type: [String],
        required: [true, 'You must enter some ingredients']
    }, //array de strings,
    description: String, //pasos
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, //¿quién está loguinado en el momento de crearla?
})

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;