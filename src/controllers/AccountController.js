const responseHandler = require("../handlers/response.handler.js");
const User = require('../models/user.model.js');
const Review = require('../models/review.model.js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { EmailTransporter } = require('../config/email.config.js');
const UserVerification = require('../models/user.verification.js');
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
                res.send({"message": 'Email already exists'});
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
                const token = jwt.sign({ _id: user._id, username: user.username},process.env.TOKEN_SECRET_KEY, { expiresIn: '24h' }); // token expires in 1 hour
                // console.log(user);
                const match = await bcrypt.compare(authUser.password, user.password);
                if (match) {
                   // res.send({ success: true, message: 'Login successful', user, token});
                    res.status(200).send({ success: true, token: token, user});
                } else {
                    res.send({ success: false, message: 'Invalid credentials' });
                }
            } else {
                res.send({ success: false, message: 'Email not found' });
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
    async getAllUsers(req, res) {
        try {
            const data = await User.find();
            if(data){
                res.send({data: data, success: true, message: "get all users success"});
            }else {
                res.send({success: false, message: "can not get all users"});
            }
        }catch (error){
            console.log(error);
            res.send({success: false, message: "error to get all users"});
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
    async addFavorite(req, res) {
        const { username, movieId } = req.params;
    
        function isValidMovieId(movieId) {
            const movieIdNumber = Number(movieId);
            return Number.isInteger(movieIdNumber) && movieIdNumber > 0;
        }
    
        try {
            if (!movieId) {
                res.status(400).send({ success: false, message: "Movie ID is required" });
                return;
            }
            if (!isValidMovieId(movieId)) {
                res.status(400).send({ success: false, message: "Invalid Movie ID" });
                return;
            }
    
            const user = await User.findOne({ username: username });
            if (!user) {
                res.status(404).send({ success: false, message: "User not found" });
                return;
            }
    
            if (user.favoriteFilm.includes(movieId)) {
                res.status(409).send({ success: false, message: "Movie already in favorites" });
                return;
            }
    
            user.favoriteFilm.push(movieId);
            user.save();
            res.status(200).send({ success: true, message: "Add favorite film success", favorite: user.favoriteFilm });
        } catch (error) {
            console.error("Error occurred:", error);
            res.status(500).send({ success: false, message: "Error occurred" });
        }
    }
    
    async removeFavorite(req, res){
        const { username, movieId } = req.params;
        try{
            const user = await User.findOne({username: username});
            if(user && user.favoriteFilm.findIndex(film => film === movieId) !== -1){
                user.favoriteFilm = user.favoriteFilm.filter(film => film !== movieId);
                user.save();
                res.send({success: true, message: "remove favorite film success",favorite: user.favoriteFilm});
            }
            else {
                res.send('0');
            }
        } catch {
            res.send('can not find user');
        } 
    }
    async updateProfile(req, res){
        const { username } = req.params;
        const {name, gender} = req.body;
        try {
            const user = await User.findOne({username: username});
            if(user){
                user.name = name;
                user.gender = gender;
                user.save();
                res.send({success: true, message: "update profile success"});
            } else {
                res.send('0');
            }
            
        } catch{
            res.send('0');
        }
    }
    async updatePassword(req, res){
        const { username } = req.params;
        const {oldPassword, newPassword } = req.body;
        try {
            const user = await User.findOne({username: username});
            if(user){
                
                const match = await bcrypt.compare(oldPassword, user.password);
                if(match){
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    user.password = hashedPassword;
                    user.save();
                    res.send({success: true, message: "update password success"});
                }else{
                    res.send({success: false, message: "password not match"});
                }
            } else {
                res.send({success: false, message: "user not found"});
            }
        } catch {
            res.send({success: false, message: "error to update password"});
        }
    }
    async deleteAccount(req, res){
        const { username } = req.params;
        try {
            const user = await User.findOne({usename : username});
            if(user){
                user.remove();
                res.send({success: true, message: "remove account success"});
            } else {
                res.send('0');
            }
        }catch {
            res.send('0');
        }
    }
    
    async resetPassword(req, res){
        const {email, password } = req.body;
        try {
            const user = await User.findOne({email: email});
            if(user){
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
                user.save();
                res.send({success: true, message: "set up password success"});
            } else {
                res.send({success: false, message: "user not found"});
            }
        } catch {
            res.send({success: false, message: "error to set up password"});
        }
    }
    async verifyOTP(req, res){
        const {email, otp} = req.body;
        try{
            // Reset verified field to false at the start of verification
            await User.updateOne({email: email}, {verified: false});

            const userVerification = await UserVerification.findOne({email: email});
            if(userVerification){
                const expireAt = userVerification.expireAt;
                if(Date.now() > expireAt){
                    await UserVerification.deleteMany({email: email});
                    throw new Error("OTP expired");
                }
                const match = await bcrypt.compare(otp, userVerification.otp);
                if(match){
                    const newPassword = `${Math.floor(100000 + Math.random() * 900000)}`;
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    await User.updateOne({email: email},{password: hashedPassword}, {verified: true});
                    await UserVerification.deleteMany({email: email});
                    
                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: 'New Password',
                        html: `<h1>Your new password is ${newPassword}</h1>`
                    };
                    const transporter = await EmailTransporter();
                    transporter.sendMail(mailOptions);
                    res.send({email: email,password: newPassword,success: true, message: "verify otp success"});
                } else {
                    res.send({success: false, message: "OTP not match"});
                }
            } else {
                res.send({success: false, message: "OTP not found"});
            }
        }catch(error){
            console.log(error);
            res.send({error: error, success: false, message: "error to verify otp"});

        }
    }
    async sendOTPVerification(req, res){
        const { email} = req.body;
        try {
            if(email){
                
            
            const opt = `${Math.floor(1000 + Math.random() * 9000)}`;
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                
                subject: 'OTP Verification',
                html: `<h1>Your OTP is ${opt}</h1>`
            };
            const hashOTP = await bcrypt.hash(opt, 10);
            const newOTPVerification = new UserVerification( {
                email: email,
                otp: hashOTP,
                createdAt: Date.now(),
                expireAt: Date.now() + 60000,
            });
            await newOTPVerification.save();
            const transporter = await EmailTransporter();
            transporter.sendMail(mailOptions);
            res.send({
                success: true, 
                message: "send otp success",
                data: {
                    verify: newOTPVerification
                }});
            } else {
                res.send({success: false, message: "Email is required"});
                // throw new Error("Email is required");
            }

        }
        catch(error)
        {
            console.log(error);
            res.send({error: error, success: false, message: "send otp fail"});
        }
    }
    
}
module.exports = new AccountController();
