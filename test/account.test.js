process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

const Account = require('../src/models/user.model');    

chai.use(chaiHttp);

before(async () => {
    const existingAccount = await Account.findOne({ email: "test@gmail.com" });
    if (existingAccount) {
        await Account.deleteOne({ email: "test@gmail.com" });
    }
    const existingAccount2 = await Account.findOne({ email: "testExistingEmail@gmail.com" });
    if (!existingAccount2) {
        await Account.create({ email: "testExistingEmail@gmail.com", "password": "test123" });
    }

});

after(async () => {
    const existingAccount = await Account.findOne({ email: "test@gmail.com" });
    if (existingAccount) {
        await Account.deleteOne({ email: "test@gmail.com" });
    }
    const existingAccount2 = await Account.findOne({ email: "testExistingEmail@gmail.com" });
    if (existingAccount2) {
        await Account.deleteOne({ email: "testExistingEmail@gmail.com", "password": "test123" });
    }
});


describe('Account', () => {

    describe('/POST signup', () => {
        it('it should not POST a user without email field', function(done) {
            let user = {
                password: "test",
                username: "test"
            }
            chai.request(server)
                .post('/account/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
            });
        it('it should POST a user ', function(done) {
            let user = {
                email: "test@gmail.com",
                password: "test123",
            }
            chai.request(server)
                .post('/account/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('email').eql('test@gmail.com');   
                    done();
                });
            });
            

        it('it should not POST a user with existing email', function(done) {
      
            let user = {
                email: "testExistingEmail@gmail.com",
                password: "test123",
            }
            chai.request(server)
                .post('/account/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Email already exists');
                    console.log(res.body);
                    done();
                });
            });
    });
});