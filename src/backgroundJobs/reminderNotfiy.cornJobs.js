const moment = require('moment');
const cron = require('node-cron');
const { UserSechema } = require('../schema/Auth.schema');
const { MoviesSchema } = require('../schema/Movies.schema');

cron.schedule('0 0 * * *', async () => {
    try {
            // const today = moment(new Date()).format('YYYY-MM-DD') ;
            const today = '2023-02-17'
            console.log(today)
            const movies = await MoviesSchema.find({ release_date: today });
            
            movies.forEach(async (movie) => {
            (movie.notifiedUsers ?? []).forEach(async(userID)=>{
                console.log(userID)
                await UserSechema.findOneAndUpdate({ _id:userID },{
                    $addToSet:{ notifications : {
                        message:`${movie.title} is released and ready to watch`,
                        movieId:movie._id,
                    }}
                });
            })
        });
    } catch (error) {
        console.log(error)
    }
  },{scheduled:true})