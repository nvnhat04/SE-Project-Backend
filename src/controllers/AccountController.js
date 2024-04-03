const responseHandler = require("../handlers/response.handler.js");
const User = require('../models/user.model.js');

class AccountController {
    async signUp(req, res) {
        const newUser = req.body;
        const find = await User.findOne({email: newUser.email});
        if(!find) {
            const user = await User.create(req.body);
            res.send({email: user.email, _id: user._id});
        }
        else {
            res.send('0');
        }
    }

    async login(req, res) {
        const authUser = req.body;
        const check = await User.findOne(authUser, {_id: 1, email: 1});
        if(check) {
            res.send(check);
        } else {
            res.send('0');
        }
    }
}
module.exports = new AccountController();
