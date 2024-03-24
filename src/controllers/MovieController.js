
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
            const movie = await mdb.movie.getDetails(args);
            res.send(movie.data); // Assuming you want to send only the data part
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Errorìno");
        }
    }
    // mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(
    //     `genre/${mediaType}/list`
    //   ),
    async getMovieList(req, res) {
        try {
            const args = {
                query: {
                    page: 1,
                },
            };
            const movieList = await mdb.movie.getPopular(args);
            res.send(movieList.data); // Assuming you want to send only the data part
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error getinfo");
        }
    }
    async getDiscover(req, res) {
        try {
            const args = {
                query: {
                    page: 1,
                },
            };
            const movieList = await mdb.discover.getMovies(args);
            if (!movieList || !movieList.data) {
                throw new Error("Movie list data is missing or invalid.");
            }
            res.send(movieList.data); // Assuming you want to send only the data part
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new MovieController;