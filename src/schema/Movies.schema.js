const { boolean, number, string } = require('joi');
const mongoose = require('mongoose');

const MoviesModel = new mongoose.Schema({
    adult:{type: Boolean},
    id:{type:Number},
    img:{type:String},
    original_language:{type:String},
    original_title:{type:String},
    overview:{type:String},
    release_date:{String},
    vote_average:{Number}
},
    {timestamps: true}
) 
exports.UserSechema = mongoose.model("movies",MoviesModel)