const { UserSechema } = require('../schema/Auth.schema');

var moment = require('moment');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

class AuthControllers{
    signUp(){
        return async (req, res)=>{
            try {
                let token = null;
                const { email, password } = req.body;
                console.log("cr===>",email,password)
                const encryptPassword =md5(password);
                const find_email = await UserSechema.findOne({email})
                if(find_email){
                    return res.send('email already in use')
                }
                let user = new UserSechema({
                    email,
                    password: encryptPassword,
                    token
                })
                user = await user.save()
                if(user){
                    const jwtSecretKey = process.env.JWT_SECRET_KEY;
                    const{_id}=user
                    token = jwt.sign({id:_id}, jwtSecretKey);
                }
                return res.send({
                    user,
                    token,
                    status: "success",
                    message: 'new user add successfuly'
                })
            } catch (error) {
                console.log(error)
                return res.send(error)
                }
        }
    }

    login(){
        return async (req, res) =>{
            try {
                const { email, password } = req.body
                console.log(email,password,'===>',req.body)
                const encryptPassword = md5(password)
                const user = await UserSechema.findOne({email:email, password: encryptPassword})
                if(!user){
                    return res.status(401).send('Invalid Email or Password')
                }else{
                      const jwtSecretKey = process.env.JWT_SECRET_KEY
                      const {_id} = user
                      const token = jwt.sign({id:_id},jwtSecretKey)
                      return res.send({status:'success',token,user})
                    }

            } catch (error) {
                console.log(error)
                res.status(error.response.status).json(error.response.data)
            }
        }
    }

    plans(){
        return async (req, res) =>{
            try {
                const { plans } = req.body
                const user_id=req.user_id
                const plan_start = new Date();
                const plan_expire = moment(plan_start).add(1,'months').format()
                let user = await UserSechema.findByIdAndUpdate(user_id,{
                    plan:plans,
                    plan_expire,
                })
                  user = await UserSechema.findById(user_id)
                console.log("u",user)
                return res.send({
                    status: 'success',
                    user,
                })
            } catch (error) {
                console.log(error)
                return res.send(error)
            }
        }
    }

}
exports.AuthControllers = AuthControllers;