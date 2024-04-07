const responseHandler = require("../handlers/response.handler.js");
const User = require('../models/user.model.js');

class AccountController {
    async signUp(req, res) {
        const newUser = req.body;
        const find = await User.findOne({email: newUser.email});
        if(!find) {
            const user = await User.create(req.body);
            res.send({email: user.email, _id: user._id});
            console.log("success");
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
    async getDetails(req, res) {
        try{
            const user = await User.find({username: req.params.username});
            if(user) {
                res.send(user);
            } else {
                res.send('0');
            }
        }catch {
            res.send('can not find user');
        }
    }
}
module.exports = new AccountController();
