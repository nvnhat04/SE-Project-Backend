const express = require("express");
const mediaRoute = require("./media.route");
const movieRoute = require("./movie.route");

function routes(app) {
    app.use("/movie", movieRoute)
   // app.use("/media", mediaRoute);
}


module.exports = routes;