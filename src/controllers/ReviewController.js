const responseHandler = require("../handlers/response.handler.js");
const  MovieDB= require("node-themoviedb");
const Review = require('../models/review.model.js');
const options = {
    secure: true, // use https
    defaultLang: "en" // default language for all requests
};
const mdb = new MovieDB(process.env.TMDB_KEY, options);
class ReviewController {
    async getDetails(req, res) {
        try {
           const args = {
                pathParameters: {
                    review_id: req.params.id,
                },
            };
            const response = await mdb.review.getDetails(args);
            if (response.data) {
                return responseHandler.ok(res, response); // Assuming you want to send only the data part
            } else {
                responseHandler.error(res);
           }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    async createReview(req, res) {
        const newReview = req.body;
       // const {movieId, username} =req.params;
        try {
            const review = await Review.create(newReview);
            res.send({success: "true",message: "create successfully",review: review});
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getReviews(req, res) {
        try {
            const reviews = await Review.find({movieId: req.params.movieId});
            res.send(reviews);
        } catch (error) {
            responseHandler.error(res);
        }
    }
}
module.exports = new  ReviewController;