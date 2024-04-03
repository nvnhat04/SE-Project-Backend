const responseHandler = require("../handlers/response.handler.js");
const  MovieDB= require("node-themoviedb");

const options = {
    secure: true, // use https
    defaultLang: "en" // default language for all requests
};
const mdb = new MovieDB(process.env.TMDB_KEY, options);

class PersonController {
  
    async getDetails(req, res) {
        try {
            const id = req.params.id;
            const args = {
                pathParameters: {
                    person_id: id,
                },
            };
            const person = await mdb.person.getDetails(args);
            if(!person.data) return responseHandler.sendErrorResponse(res, "No data found");
            res.send(person.data); // Assuming you want to send only the data part
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    async getMovieCredits(req, res) {
        try {
            const id = req.params.id;
            const args = {
                pathParameters: {
                    person_id: id,
                },
            };
            const movies = await mdb.person.getMovieCredits(args);
            res.send(movies.data); // Assuming you want to send only the data part
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    
}
module.exports = new PersonController();