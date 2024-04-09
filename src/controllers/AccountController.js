const responseHandler = require("../handlers/response.handler.js");
const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

class AccountController {
    async signUp(req, res) {
        const newUser = req.body;
        try {
            const find = await User.findOne({email: newUser.email});
            if (!find) {
                // Hash the password before storing it
                const hashedPassword = await bcrypt.hash(newUser.password, 10); // 10 is the saltRounds
                newUser.password = hashedPassword;
                const user = await User.create(newUser);
                res.send({email: user.email, _id: user._id});
                console.log("success");
            } else {
                res.send('0');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    async login(req, res) {
        const authUser = req.body;
        try {
            const user = await User.findOne({ email: authUser.email });
            if (user) {
                // Compare hashed password with the provided password
                const match = await bcrypt.compare(authUser.password, user.password);
                if (match) {
                    res.send({ success: true, message: 'Login successful', email: user.email, _id: user._id });
                } else {
                    res.send({ success: false, message: 'Invalid credentials' });
                }
            } else {
                res.send({ success: false, message: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
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
