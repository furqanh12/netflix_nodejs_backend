const moment = require('moment');
const cron = require('node-cron');
const { UserSechema } = require('../schema/Auth.schema');
const { MoviesSchema } = require('../schema/Movies.schema');
const  {io}  = require('../../index');

cron.schedule('* * * * *', async () => {
    try {
        // const today = moment(new Date()).format('YYYY-MM-DD') ;
        const today = '2023-02-17'
        console.log(today)
        const movies = await MoviesSchema.find({ release_date: today });
        movies.forEach(async (movie) => {
            const notifiedUsers = movie.notifiedUsers ?? [];
            console.log('1')
            if (notifiedUsers.length) {
              const updatedUsers = await Promise.all(notifiedUsers.map(async (userID) => {
                return UserSechema.findOneAndUpdate({ _id: userID }, {
                  $addToSet: {
                    notifications: {
                      message: `${movie.title} is released and ready to watch`,
                      movieId: movie._id,
                    }
                  }
                });
              }));
          console.log('2')
              socket.emit(`new release movie notification`, {
                message: `${movie.title} is released and ready to watch`,
                movieId: movie._id,
                notifiedUsers: updatedUsers.map(user => user._id),
              });
            }
          });
    } catch (error) {
        console.log(error)
    }
}, { scheduled: true })