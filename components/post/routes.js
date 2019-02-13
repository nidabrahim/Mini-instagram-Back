import * as Post from "./controller";
import express from "express";
import bodyParser from "body-parser"

const routes = express.Router();
routes.use(bodyParser.json());


routes.route("/posts").get(Post.list);
routes.route("/posts/public").get(Post.listPublicPosts);
routes.route("/postsByPage").get(Post.listByPage);
routes.route("/post/add").post(Post.post);

export default routes;
