
const movieRoute = require("./movie.route");
const accountRoute = require("./account.route");
const personRoute = require("./person.route");
const genreRoute = require("./genre.route");

function routes(app) {
    app.use("/movie", movieRoute);
    app.use("/person", personRoute)
    app.use("/account", accountRoute);
    app.use("/genre", genreRoute);

}
module.exports = routes;
