const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);
describe('Auth server',()=>{
     it('should register a user',(done)=>{
        chai.request(server)
            .post('/register')
            .send({username:'testuser',password:'password'})
            .end((err,res)=>{
                res.should.have.status(201);
                done();
            });
     });





     it('should login a user and return a token',(done)=>{
        chai.request(server)
            .post('/login')
            .send({username:'testuser',password:'password'})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property('token')
                done();
            });
     });
});
