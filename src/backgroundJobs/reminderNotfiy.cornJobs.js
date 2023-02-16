const moment = require('moment');
const cron = require('node-cron');
const { UserSechema } = require('../schema/Auth.schema');
const { MoviesSchema } = require('../schema/Movies.schema');


const socketConnection = (io) => {
    io.on('connection', (socket) => {
        socket.emit('socket connection', "user connected")
        console.log('user connected')
        cron.schedule('0 0 * * *', async () => {
            try {
                // const today = moment(new Date()).format('YYYY-MM-DD') ;\

                const today = '2023-02-15';
                const movies = await MoviesSchema.find({ release_date: today });
                movies.forEach(async (movie) => {
                    const notifiedUsers = movie.notifiedUsers ?? [];
                    if (notifiedUsers.length > 0) {
                        notifiedUsers.map(async (userID) => {
                            await UserSechema.findOneAndUpdate({ _id: userID }, {
                                $addToSet: {
                                    notifications: {
                                        message: `${movie.title} is released and ready to watch`,
                                        movie: movie._id,
                                    }
                                }
                            });
                            socket.emit(`new_release_movie_notification${userID}`, {
                                message: `${movie.title} is released and ready to watch`,
                                movie: movie,
                                mark_as_read: false,
                                date: new Date()
                            });
                            return
                        })
                    }
                });
            } catch (error) {
                console.log(error)
            }
        }, { scheduled: true })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}


module.exports = socketConnection

