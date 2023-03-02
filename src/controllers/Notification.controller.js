const { UserSechema } = require("../schema/Auth.schema");
const { MoviesSchema } = require("../schema/Movies.schema");

class NotificationsController{

    all_notification = () => {
        return async (req, res) => {
            try {
             const user = await UserSechema.findOne({_id:req.user_id}).populate('notifications.movie')
                    if (user) {
                        const notifications = user.notifications.filter(notification => notification.mark_as_read === false);
                        return res.send(notifications);
                    } else {
                        return res.status(404).send({message:'No User Found'})
                    }
            } catch (error) {
                res.send(error)
            }
        }
    }

    set_read_notifications(){
        return async (req, res) => {
            const {message} = req.body
            const userId = req.user_id
            try {
             const user = await UserSechema.updateOne(
                {
                  _id: userId,
                  notifications: {
                    $elemMatch: {
                      message: message,
                      mark_as_read: false
                    }
                  }
                },
                {
                  $set: { 'notifications.$.mark_as_read': true }
                }
              );
              res.send(user)
            } catch (error) {
                res.send(error)
            }
        }
    }

}

exports.NotificationsController = NotificationsController;