const cron = require('node-cron');
const axios = require('axios');
const {MoviesSchema} = require('../schema/Movies.schema')

 cron.schedule('0 0 * * *', async () => {
    try {
            const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=87dfa1c669eea853da609d4968d294be&language=en-us&page=1`);
            const movies = (response?.data?.results).map((item)=> {return {...item,img:`https://image.tmdb.org/t/p/w500${item?.poster_path}`}})
            movies.forEach(function(movie){
                MoviesSchema.find({ id: movie.id }).toArray(function(err, movies) {
                        if(movies.length === 0){
                            MoviesSchema.insertOne(movie, function(err, res) {
                            if (err) throw err;
                            console.log("Movie inserted");
                        });
                        }
                    });
                })
      } catch (error) {
        console.log(error);
      }
    },{scheduled:true});