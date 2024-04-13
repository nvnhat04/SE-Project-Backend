const responseHandler = require("../handlers/response.handler.js");
const  MovieDB= require("node-themoviedb");
const axios = require('axios');
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
            console.log(response.data);
            return response.data; // Assuming you want to send only the data part
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
            const response = await mdb.search.movies(args);
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
            const response = await mdb.movie.getSimilarMovies(args);
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getGenres  (req, res)  {
        try {
            const response = await mdb.genre.getMovieList();
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getDiscover (req, res) {
        try {
            const args = req.params;
            const response = await mdb.discover.movie(args);
            
            return responseHandler.ok(res, response)// Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
}

module.exports = new MovieController;
