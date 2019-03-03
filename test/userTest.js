import chai from "chai"
import chaiHttp from "chai-http"
import server from "./../index"
import mongoose from "mongoose"
import User from "./../components/user/model"

let should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {

    beforeEach((done) => {
        User.remove({}, (err) => { 
           done();           
        });        
    });

    afterEach((done) => {
        User.remove({}, (err) => { 
            done();           
        });  
    });

    describe("login - bad", () => {
        it("login bad credentials", async () => {
          let response = await chai
            .request(server)
            .post(`/api/login`)
            .send({ email: "t", password: "t" });
          chai.expect(response).to.have.status(401);
        });
    });

 /*
  * Test the /GET route
  */
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

 /*
  * Test the /POST route
  */
 describe('/POST user', () => {
    it('it should not POST a user without name field', (done) => {
        let user = {
            secondname: "test",
            pseudo: "test",
            email: "test@test.com"
        }
      chai.request(server)
          .post('/api/user')
          .send(user)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('name is required');
            done();
          });
    });

    it('it should POST a user', (done) => {
        let user = {
            name: "test0",
            secondname: "test0",
            pseudo: "test0",
            email: "test0@test.com",
            password: "123"
        }
      chai.request(server)
          .post('/api/user')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });

});

describe("login - pass", () => {
    it("login good credentials", async () => {
        let response = await chai
          .request(server)
          .post(`/api/login`)
          .send({ email: "test0@test.com", password: "123" });
        chai.expect(response).to.have.status(401);
      });
});

 /*
  * Test the /GET/:id route
  */
 describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
        let user = new User({ name: "test1", secondname: "test1", pseudo: "test1", email: "test1@test.com", password: "123" });
        user.save((err, user) => {
            chai.request(server)
          .get('/api/user/' + user.id)
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('user');
            done();
          });
        });

    });
});

 /*
  * Test the /PUT/:id route
  */
 describe('/PUT/:id user', () => {
    it('it should UPDATE a user given the id', (done) => {
        let user = new User({ name: "test1", secondname: "test1", pseudo: "test2", email: "test2@test.com", password: "123" });
        user.save((err, user) => {
              chai.request(server)
              .post('/api/user/' + user.id + '/update')
              .send({name: "test2", secondname: "test2"})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
              });
        });
    });
});

});


