
const movieRoute = require("./movie.route");
const accountRoute = require("./account.route");
const personRoute = require("./person.route");
function routes(app) {
    app.use("/movie", movieRoute);
    app.use("/person", personRoute)
    app.use("/account", accountRoute);
    // app.use("/u", userRoute);
}
module.exports = routes;
