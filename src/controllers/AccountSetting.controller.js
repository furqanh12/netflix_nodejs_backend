const { UserSechema } = require("../schema/Auth.schema");


class AccountSettingController {

    getUserDetails(){
        return async (req, res) => {
            try {
                const userId = req.user_id
                const user = await UserSechema.findById({_id:userId})
                res.status(200).send({ message: 'User Details',user});
            } catch (error) {
                res.send(error)
            }
        }
    }

    changeUsername(){
        return async (req, res) => {
            try {
                const {nameChange} = req.body;
                const userId = req.user_id; 
                const user = await  UserSechema.findByIdAndUpdate({ _id: userId }, { email: nameChange }, { new: true })
                res.status(200).send({ message: 'Username updated successfully',user});
            } catch (error) {
                res.status(500).send({ error: 'Could not update username' });
            }
        }
    }
}

exports.AccountSettingController = AccountSettingController