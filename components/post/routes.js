import Post from "./controller";
import express from "express";
import bodyParser from "body-parser"

const routes = express.Router();
routes.use(bodyParser.json());


routes.route("/posts").get(Post.list);
routes.route("/postsByPage").get(Post.listByPage);
routes.route("/posts").post(Post.post);

export default routes;
