const { UserSechema } = require("../schema/Auth.schema");
const { MoviesSchema } = require("../schema/Movies.schema");

class NotificationsController{

    all_notification = () => {
        return async (req, res) => {
            try {
             const user = await UserSechema.findOne({_id:req.user_id}).populate('notifications.movie')
                    if (user) {
                    const notifications = user.notifications;
                    return res.send(notifications)
                    } else {
                        return res.status(404).send({message:'No User Found'})
                    }
            } catch (error) {
                res.send(error)
                console.log(error)
            }
        }
    }
}

exports.NotificationsController = NotificationsController;