const { UserSechema } = require('../schema/Auth.schema');
const { MoviesSchema } = require('../schema/Movies.schema');

class MoviesContorllers {

    getMovies() {
        return async (req, res) => {
            try {
                const limit = 50
                const movies = await MoviesSchema.find().limit(limit)
                return res.send({ status: 'success', result: movies })
            } catch (error) {
                console.log(error)
                res.status(500).send({ error, msg: 'Internal Server Error' })
            }

        }
    }

    favMovies() {
        return async (req, res) => {
            try {
                const { movie_id } = req.body
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
                const { movieId } = req.body
                await UserSechema.updateOne({ _id: req.user_id }, {
                    $pull: { fav_movies: movieId }
                })
                const user = await UserSechema.findById(req.user_id).populate('fav_movies')
                res.send({ user })

            } catch (error) {
                console.log(error)
                res.send(error)
            }
        }
    }

    getFavMovies(){
        return async (req, res) =>{
            try {
                const {fav_movies} = await UserSechema.findById(req.user_id).populate('fav_movies')
                res.send(fav_movies)
            } catch (error) {
                console.log(error)
                res.send(error)
            }
        }
    }


    addToLikedMovies(){
        return async (req ,res) =>{
            try {
                const { movieId } = req.body
                if (movieId && req.user_id) {
                    await UserSechema.findOneAndUpdate({ _id: req.user_id }, {
                        $addToSet: { like_movies: movieId }
                    })
                    const user = await UserSechema.findById(req.user_id).populate('like_movies')
                    res.send({ status: 'success', user })
                }

            } catch (error) {
                console.log(error)
                res.send(error)
            }
        }
    }

    getLikedMovies(){
        return async (req, res) => {
            try {
                const { like_movies } = await UserSechema.findById(req.user_id).populate('like_movies')
                res.send(like_movies)
            } catch (error) {
                console.log(error)
                res.send(error)
            }
        } 
    }

    removeLikeMovie(){
        return async (req, res) => {
            try {
                const { movieId } = req.body
                await UserSechema.updateOne({ _id: req.user_id }, {
                    $pull: { like_movies: movieId }
                })
                const user = await UserSechema.findById(req.user_id).populate('like_movies')
                res.send({ user })
            } catch (error) {
                console.log(error)
                res.send(error)
            }
        }
    }

    upComingMovies(){
        return async (req, res) =>{
            try {
                const limit = 50
                const up_coming_movies = await MoviesSchema.find({up_coming:true}).limit(limit)
                return res.send({ status: 'success', result: up_coming_movies })
            } catch (error) {
                res.send(error)
                console.log(error)
            }
        }
    }

    setReminder(){
        return async (req, res) => {
            try {
                const { movieId } = req.body
                if (movieId && req.user_id) {
                    const user_id = req.user_id
                    await MoviesSchema.findOneAndUpdate({ _id: movieId }, {
                        $addToSet: { notifiedUsers: user_id }
                    })
                   
                    res.send({status:'success'})
                }

            } catch (error) {
                res.send(error)
                console.log(error)
            }
        }
    }
}
exports.MoviesContorllers = MoviesContorllers;