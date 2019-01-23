import db from "../../db/db";
import services from "./services";

export function post(req, res){
  // if (!req.body.title) {
  //   return res.status(400).send({
  //     message: "title is required "+req.body.title
  //   });
  // } else if (!req.body.description) {
  //   return res.status(400).send({
  //     message: "description is required"
  //   });
  // }
  services.createPost(req.body).then(
    post => res.status(200).json(post),
    err => {
      res.status(500).send("error");
      return;
    }
  );
};

export async function list(req, res){
  const list  = await services.list()
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
