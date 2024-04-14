const responseHandler = require("../handlers/response.handler.js");
const  MovieDB= require("node-themoviedb");

const options = {
    secure: true, // use https
    defaultLang: "en" // default language for all requests
};
const mdb = new MovieDB(process.env.TMDB_KEY, options);
class ReviewController {
    async getReviews(req, res) {
        try {
            const args = {
                query: {
                    page: 1,
                },
            };
            const movieList = await mdb.review.getReviews(args);
            res.send(movieList.data); // Assuming you want to send only the data part
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
}
module.exports = new  ReviewController;