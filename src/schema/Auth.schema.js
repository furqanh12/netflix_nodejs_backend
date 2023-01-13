const mongoose = require('mongoose');
const joi = require("joi");

const UserModel = new mongoose.Schema({
    email: { type: String, require: true, lowercase: true, unique: true },
    password: { type: String, require: true },
    plan: { type: String, enum: ['mobile', 'basic', 'standard', 'premmium',null], default: null },
    plan_expire: { type: Date, default: null },
},
    {timestamps: true}
) 
exports.UserSechema = mongoose.model("users",UserModel)