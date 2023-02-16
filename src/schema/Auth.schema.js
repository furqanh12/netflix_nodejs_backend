const { string } = require('joi');
const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    email: { type: String, require: true, lowercase: true, unique: true },
    password: { type: String, require: true },
    plan: { type: String, enum: ['mobile', 'basic', 'standard', 'premmium',null], default: null },
    plan_expire: { type: Date, default: null },
    fav_movies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'movies',default:[]
    }],
    like_movies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'movies',default:[]
    }],
    notifications: [{
            message:{
                type:String,
                default:''
            },
            movie:{
               type:mongoose.Schema.Types.ObjectId,
               ref:'movies',
               require:true
            },
            date:{
                type:Date,
                default:new Date(),
            },
            mark_as_read:{
                type: Boolean,
                default: false
            }
          
        }]
    
},
    {timestamps: true}
) 
exports.UserSechema = mongoose.model("users",UserModel)