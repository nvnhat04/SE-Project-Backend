const responseHandler = require("../handlers/response.handler.js");
const User = require('../models/user.model.js');
const Review = require('../models/review.model.js');
const jwt = require("jsonwebtoken");
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
            responseHandler.error(res);
        }
    }
    
    async login(req, res) {
        const authUser = req.body;
        try {
            const user = await User.findOne({ email: authUser.email });
            if (user) {
                // Compare hashed password with the provided password
                const token = jwt.sign({ _id: user._id},process.env.TOKEN_SECRET_KEY, { expiresIn: '24h' }); // token expires in 1 hour
                // console.log(user);
                const match = await bcrypt.compare(authUser.password, user.password);
                if (match) {
                   // res.send({ success: true, message: 'Login successful', user, token});
                    res.status(200).send({ success: true, token: token, user});
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
            const user = await User.findOne({username: req.params.username});
            if(user) {
                res.send(user);
            } else {
                res.send('0');
            }
        }catch {
            res.send('can not find user');
        }
    }

    async getFavorite(req, res) {
        try{
            const user = await User.findOne({username: req.params.username});
            if(user && user.favoriteFilm) {
                res.send(user.favoriteFilm);
            } else {
                res.send('0');
            }
        }catch {
            res.send('can not find user');
        }
    }
    async addFavorite(req, res){
        const { username, movieId } = req.params;
        try{
            const user = await User.findOne({username: username});
            if(user && user.favoriteFilm.findIndex(film => film === movieId) === -1){
                user.favoriteFilm.push(movieId);
                user.save();
                res.send({success: "true", message: "add favorite film success",favorite: user.favoriteFilm});
            } else {
                res.send('0');
            }
        }catch{
            res.send('can not find user');
        }
    }
    async removeFavorite(req, res){
        const { username, movieId } = req.params;
        try{
            const user = await User.findOne({username: username});
            if(user && user.favoriteFilm.findIndex(film => film === movieId) !== -1){
                user.favoriteFilm = user.favoriteFilm.filter(film => film !== movieId);
                user.save();
                res.send({success: "true", message: "remove favorite film success",favorite: user.favoriteFilm});
            }
            else {
                res.send('0');
            }
        } catch {
            res.send('can not find user');
        } 
    }
    
}
module.exports = new AccountController();
