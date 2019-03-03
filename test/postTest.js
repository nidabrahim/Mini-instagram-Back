import chai from "chai"
import chaiHttp from "chai-http"
import server from "./../index"
import mongoose from "mongoose"
import Post from "./../components/post/model"
import User from "./../components/user/model"

let should = chai.should();
chai.use(chaiHttp);

describe('Posts', () => {

    beforeEach((done) => {
        Post.remove({}, (err) => { 
            User.remove({}, (err) => { 
                done();           
             });          
        });  
    });

    afterEach((done) => {
        Post.remove({}, (err) => { 
            User.remove({}, (err) => { 
                done();           
            });          
        });  
    });

 /*
  * Test the /GET route
  */
  describe('/GET post', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/posts/public')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

 /*
  * Test the /POST route
  */
 describe('/POST post', () => {
    it('it should not POST a post without title or description fields', (done) => {
        let post = {}
      chai.request(server)
          .post('/api/post/add')
          .send(post)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('title is required');
            done();
          });
    });

    it('it should POST a post', (done) => {
        let user = new User({ name: "test1", secondname: "test1", pseudo: "test1", email: "test1@test.com", password: "123" });
        user.save((err, user) => {
            let post = {
                title: "test0",
                description: "test0",
                author: user
            }
            chai.request(server)
              .post('/api/post/add')
              .send(post)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
               });
        });

    });

});

 /*
  * Test the /GET/:id route
  */
 describe('/GET/:id post', () => {
    it('it should GET a post by the given id', (done) => {
        let post = new Post({ title: "test1", description: "test1" });
        post.save((err, post) => {
            chai.request(server)
          .get('/api/post/' + post.id)
          .send(post)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('post');
            done();
          });
        });

    });
});

 /*
  * Test the /POST route
  */
 describe('/POST comment', () => {

    it('it should POST a comment', (done) => {
        let user = new User({ name: "test1", secondname: "test1", pseudo: "test1", email: "test1@test.com", password: "123" });
        user.save((err, user) => {
            let post = new Post({ title: "test1", description: "test1", author: user });
            post.save((err, post) => {
                let comment = {
                    body: "test0",
                    author: user
                }
                chai.request(server)
                .post('/api/post/' + post.id + '/comments/add')
                .send(comment)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                    done();
                });
            });
        });

    });

});

 /*
  * Test the /PUT route
  */
 describe('/PUT post', () => {

    it('it should ADD like to the post', (done) => {
        let user = new User({ name: "test1", secondname: "test1", pseudo: "test1", email: "test1@test.com", password: "123" });
        user.save((err, user) => {
            let post = new Post({ title: "test1", description: "test1", author: user });
            post.save((err, post) => {
                let upost = {
                    likes: 1,
                }
                chai.request(server)
                .put('/api/post/' + post.id + '/likes/update')
                .send(upost)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                    done();
                });
            });
        });

    });

});


});


