const { UserSechema } = require("../schema/Auth.schema");


class AccountSettingController {

    changeUsername(){
        return async (req, res) => {
            try {
                const {nameChange} = req.body;
                const userId = req.user_id; 
                const user = await  UserSechema.findByIdAndUpdate({ _id: userId }, { email: nameChange }, { new: true })
                res.status(200).send({ message: 'Username updated successfully',user});
            } catch (error) {
                console.log(error);
                res.status(500).send({ error: 'Could not update username' });
            }
        }
    }
}

exports.AccountSettingController = AccountSettingController