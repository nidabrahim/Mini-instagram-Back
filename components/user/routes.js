import express from 'express';
import * as User from "./controller";

const routes = express.Router();

routes.route("/users").get(User.list);
routes.route("/me").get(User.me);
routes.route("/userid").post(User.getUserById);
routes.route("/user").post(User.post);
routes.route("/user/:id/posts").get(User.posts);


export default routes;