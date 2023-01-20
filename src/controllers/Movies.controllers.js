const { MoviesSchema } = require('../schema/Movies.schema');

class MoviesContorllers{

     insertMovies(){
        return async (req, res) =>{
            const {movies}=req.body
            console.log(movies)
            // movies ?? [].forEach(function(movie) {
            //     MoviesSchema.find({ id: movie.id }).toArray(function(err, find_movies) {
            //         if(find_movies.length === 0){
            //             MoviesSchema.insertOne(movie, function(err, res) {
            //                 if (err) throw err;
            //                     console.log('Movie inserted');
            //             });
            //         }
            //     });
            // });
        }
     }
}
exports.MoviesContorllers = MoviesContorllers;