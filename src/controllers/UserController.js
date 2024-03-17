const User = require('../models/user.model');

class UserController {
    async index(req, res) {
        // res.render('home');
        try {
            const courses = await User.find({});
            res.json(courses);
            
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = new UserController;

// const _id = req.params.id;
// User.findOne({_id: _id},
//              {_id: 1, email: 1, name: 1, likeSong: 1})
//     .then((data) => {
//     res.send(data);
// }).catch((err) => {
//     res.status(500);
// });