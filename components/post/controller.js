
import * as services from "./services";

export async function post(req, res){

  if (!req.body.title) {
    return res.status(400).send({
      message: "title is required"
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      message: "description is required"
    });
  }

  const post = await services.createPost(req.body);
  res.status(200).send({
    post: post
  });

};

export async function list(req, res){
  const list  = await services.list()
  res.status(200).send({
    posts: list
  });
};

export async function listPublicPosts(req, res){
  const list  = await services.publicPosts()
  res.status(200).send({
    posts: list
  });
};

export async function listByPage(req, res){
  const list  = await services.listByPage(req.query.page || 1, req.query.per_page || 10)
  res.status(200).send({
    posts: list
  });
};

export async function addCommentToPost(req, res){
  const post = await services.createComment(req.params.id, req.body);
  res.status(200).send({
    post: post
  });
};

export async function updateLikes(req, res){
  const post = await services.updateLikes(req.params.id, req.body);
  res.status(200).send({
    post: post
  });
};


export async function getPostById(req, res){
  const post  = await services.getPost(req.query.id)
  res.status(200).send({
      post: post
  });
};
