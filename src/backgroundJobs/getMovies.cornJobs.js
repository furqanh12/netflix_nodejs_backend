const cron = require('node-cron');
const axios = require('axios');
const {MoviesSchema} = require('../schema/Movies.schema')

 cron.schedule('0 0 * * *', async () => {
    try {
        
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=87dfa1c669eea853da609d4968d294be&language=en-us`);
        const movies = (response?.data?.results).map((item)=> {
          return {...item,img:`https://image.tmdb.org/t/p/w500${item?.backdrop_path}`,
          poster_path:`https://image.tmdb.org/t/p/w500${item?.poster_path}`,
          media_type:'Movie'
        }})
          MoviesSchema.create(movies, function(err, res) {
            if (err) {
              console.error(err);
            } else {
              console.log("Movie inserted");
            }
          });
      } catch (error) {
        console.log(error);
      }
    },{scheduled:true});