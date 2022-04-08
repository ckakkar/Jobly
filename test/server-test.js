var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', function(){
    it('should return all user data on a successful GET request for /getdata', function (done) {
        chai.request(server).get('/getdata')
         .end(function (error, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            done();
        });

    });

    it('should return all job data on a successful GET request for /getjobsdata', function (done) {
        chai.request(server).get('/getjobsdata')
         .end(function (error, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            done();
        });

    });

    it('should return add a user for a successful POST request for /update', function (done) {
        chai.request(server).get('/update').send({"code":"insert into users values('sample','sample@gmail.com','samplepassword',0,0,0);"})
         .end(function (error, res) {
            res.should.have.status(200);
            done();
        });

    });

    it('should return all user preferences on a successful GET request for /getdata', function (done) {
        chai.request(server).get('/getdata')
         .end(function (error, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            done();
        });

    });


});