const responseHandler = require("../handlers/response.handler.js");
const  MovieDB= require("node-themoviedb");

const options = {
    secure: true, // use https
    defaultLang: "en" // default language for all requests
};
const mdb = new MovieDB(process.env.TMDB_KEY, options);

class MovieController {
    async infoMovie(req, res) {
        const id = req.params.id;;
        try {
            const args = {
                pathParameters: {
                    movie_id: id,
                },
            };
            const response = await mdb.movie.getDetails(args);
           // res.send(response.data); // Assuming you want to send only the data part
            return responseHandler.ok(res, response);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Errorìno123");
        }
    }
    async getMovieList(req, res) {
        try {
            const args = {
                query: {
                    page: 1,
                },
            };
            const response = await mdb.movie.getPopular(args);
            return responseHandler.ok(res, response);  // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getVideos(req, res) {
        try {
            const args = {
                pathParameters: {
                    movie_id: req.params.id,
                },
            };
            const response = await mdb.movie.getVideos(args);
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async searchMovie(req, res) {
        try {
            const args = {
                query: {
                    query: req.query.query,
                },
            };
            const response = await mdb.search.getMovieList(args);
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getCredits(req, res) {
        try {
            const args = {
                pathParameters: {
                    movie_id: req.params.id,
                },
            };
            const response = await mdb.movie.getCredits(args);
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getSimilar (req, res) {
        try {
            const args = {
                pathParameters: {
                    movie_id: req.params.id,
                },
            };
            const response = await mdb.movie.getSimilar(args);
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
}

module.exports = new MovieController;
