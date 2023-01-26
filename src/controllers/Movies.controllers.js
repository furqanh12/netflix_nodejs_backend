const { UserSechema } = require('../schema/Auth.schema');
const { MoviesSchema } = require('../schema/Movies.schema');

class MoviesContorllers {

    getMovies() {
        return async (req, res) => {
            try {
                const page = req.query?.page ?? 1
                console.log(page)
                const limit = page * 20
                const movies = await MoviesSchema.find().limit(limit)
                return res.send({ status: 'success', result: movies })
            } catch (error) {
                res.status(500).send({ error, msg: 'Internal Server Error' })
            }

        }
    }

    favMovies() {
        return async (req, res) => {
            try {
                const { movie_id } = req.body
                console.log(typeof movie_id, req.user_id)
                if (movie_id && req.user_id) {
                    await UserSechema.findOneAndUpdate({ _id: req.user_id }, {
                        $addToSet: { fav_movies: movie_id }
                    })
                    const user = await UserSechema.findById(req.user_id).populate('fav_movies')
                    res.send({ status: 'success', user })
                }
            } catch (error) {
                console.log(error)
                return res.send(error)
            }
        }
    }

    removeMovies() {
        return async (req, res) => {
            try {
                const { movie_id } = req.body
                await UserSechema.updateOne({ _id: req.user_id }, {
                    $pull: { fav_movies: movie_id }
                })
                const user = await UserSechema.findById(req.user_id).populate('fav_movies')
                res.send({ user })

            } catch (error) {
                console.log(error)
                res.send(error)
            }
        }
    }

    getMovies(){
        return async (req, res) =>{
            try {
                
            } catch (error) {
                
            }
        }
    }
}
exports.MoviesContorllers = MoviesContorllers;