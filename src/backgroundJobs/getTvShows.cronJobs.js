const cron = require('node-cron');
const axios = require('axios');
const {MoviesSchema} = require('../schema/Movies.schema');

cron.schedule(
  '0 0 * * *',
  async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=87dfa1c669eea853da609d4968d294be&language=en-US`,
      );
      const tvShows = (response?.data?.results).map(item => {
        return {
          ...item,
          img: `https://image.tmdb.org/t/p/w500${item?.backdrop_path}`,
          poster_path: `https://image.tmdb.org/t/p/w500${item?.poster_path}`,
          tv: true,
          adult: false,
          original_title: item.original_name,
          release_date: item.first_air_date,
          title: item.name,
          video: false,
          media_type:'TvShow',
          up_coming: false,
          notifiedUsers: [],

        };
      });
      MoviesSchema.create(tvShows);

    } catch (error) {
      return error
    }
  },
  {scheduled: true},
);
