const { boolean, number, string } = require('joi');
const mongoose = require('mongoose');

const MoviesModel = new mongoose.Schema({
    adult:{type: Boolean},
    id:{type:Number},
    img:{type:String},
    original_language:{type:String},
    original_title:{type:String},
    overview:{type:String},
    release_date:{type:String},
    vote_average:{type:Number},
    title: {type:String,unique: true,},
    backdrop_path:{type:String},
    genre_ids:{type:Array},
    popularity:{type:Number},
    poster_path:{type:String},
    video:{type:Boolean},
    vote_count:{type:Number},
    up_coming:{
        type:Boolean,
        default:false
    },
    notifiedUsers: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        default:[]
    }
  ]
},
    {timestamps: true}
) 
exports.MoviesSchema = mongoose.model("movies",MoviesModel)