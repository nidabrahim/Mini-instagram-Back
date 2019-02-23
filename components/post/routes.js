import * as Post from "./controller";
import express from "express";
import bodyParser from "body-parser"
import multer from "multer";

const routes = express.Router();
routes.use(bodyParser.json());


routes.route("/posts").get(Post.list);
routes.route("/posts/public").get(Post.listPublicPosts);
routes.route("/postsByPage").get(Post.listByPage);
 routes.route("/post/add").post(Post.post);
routes.route("/post/:id/comments/add").post(Post.addCommentToPost);
routes.route("/post/:id/likes/update").put(Post.updateLikes);
routes.route("/post/:id").get(Post.getPostById);

// routes.post("/post/add", type, Post.post);

export default routes;
