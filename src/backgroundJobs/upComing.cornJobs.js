const moment = require('moment')
const cron = require('node-cron');
const axios = require('axios');
const {MoviesSchema} = require('../schema/Movies.schema')

 cron.schedule('0 0 * * *', async () => {
    try {
        const upcoming = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=87dfa1c669eea853da609d4968d294be&language=en-us&page=50`);
        const up_coming_movies = (upcoming?.data?.results).filter(item => item.release_date).map((item) => {
        return {
            ...item,
            up_coming: true,
            img: `https://image.tmdb.org/t/p/w500${item?.poster_path}`
          }
        }).filter(item => moment(item.release_date, "YYYY-MM-DD").isAfter(moment('2023-02-10', "YYYY-MM-DD")));
        up_coming_movies.forEach(async function(movie) {
          const already_exist_movies = await MoviesSchema.find({ id: movie.id })
          if (already_exist_movies.length === 0) {
             MoviesSchema.create(movie,function(err,res){
                if(err){
                    console.log(err)
                }
                if(res){
                    console.log(res)
                }
            })  
          }
        })         
      } catch (error) {
        console.log(error);
      }
    },{scheduled:true});
