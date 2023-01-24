const { MoviesSchema } = require('../schema/Movies.schema');

class MoviesContorllers{

    getMovies(){
        return async (req, res) =>{
            try {
                const page = req.query?.page ?? 1
                console.log(page)
                const limit= page * 20 
              const movies = await MoviesSchema.find().limit(limit)
              return res.send({status:'success',result:movies})
            } catch (error) {
                res.status(500).send({error,msg:'Internal Server Error'})
            }
           
        }
     }
}
exports.MoviesContorllers = MoviesContorllers;