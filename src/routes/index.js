
const profileRouter = require('./profile');

function route(app){
    app.use('/profile', profileRouter);
    app.get('/', (req, res) => {
        res.render('home')
    })
    
}
module.exports = route;
