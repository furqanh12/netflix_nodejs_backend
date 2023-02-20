const moment = require('moment')
const cron = require('node-cron');
const axios = require('axios');
const {MoviesSchema} = require('../schema/Movies.schema')

 cron.schedule('* * * * *', async () => {
    try {

          const upcoming = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=87dfa1c669eea853da609d4968d294be&language=en-us`);
        const up_coming_movies = (upcoming?.data?.results).filter(item => item.release_date).map((item) => {
        return {
            ...item,
            img: `https://image.tmdb.org/t/p/w500${item?.backdrop_path}`,
            poster_path: `https://image.tmdb.org/t/p/w500${item?.poster_path}`,
            up_coming: true,
            media_type:'Movie'
          }
        }).filter(item => moment(item.release_date, "YYYY-MM-DD").isAfter(moment('2023-03-01', "YYYY-MM-DD")));
        up_coming_movies.forEach(async function(movie) {
            MoviesSchema.create(movie,function(err,res){
              if(err){
                  console.log(err)
              }
              if(res){
                  console.log('movie inserted')
              }
            }) 
          }) 
        }        
       catch (error) {
        console.log(error);
      }
    },{scheduled:true});
