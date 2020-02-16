process.env.PORT = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../board.js')
var Usertest = require("../models/User");

var should = chai.should();
chai.use(chaiHttp);


describe('Usertest', function() {

  Blob.collection.drop();

  beforeEach(function(done){
    var usertest = new Usertest({
      username: 'sisir',
      email: 'si@gmail.com',
  

    });
    usertest.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Usertest.collection.drop();
    done();
  });

  it('should list ALL User GET', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('email');
        res.body[0].name.should.equal('sisir');
        res.body[0].lastName.should.equal('si@gmail.com');
        done();
      });
  });



  it('should add a SINGLE post on /api/web/auth/posts POST', function(done) {
    chai.request(server)
      .post('/api/web/auth/posts')
      .send({'title': ' Today Java class', 'description': 'sharp time 8 am '})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('title');
        res.body.SUCCESS.should.have.property('description');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.name.should.equal('Today Java clas');
        res.body.SUCCESS.lastName.should.equal('sharp time 8 am ');
        done();
      });
  });


  });


