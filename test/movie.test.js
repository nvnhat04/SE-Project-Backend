process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../index');

chai.use(chaiHttp);

describe('Movie', () => {

describe('/GET movie discover', (done) => {
    it('it should GET movie discover', function(done) {
        chai.request(server)
            .get('/movie')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });

    describe('/GET movie detail', (done) => {
        it('it should GET movie info', function(done) {
            chai.request(server)
                .get('/movie/135')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
            });
        });
    });