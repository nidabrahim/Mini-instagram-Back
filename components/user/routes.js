import express from 'express';
import * as User from "./controller";

const routes = express.Router();

routes.route("/users").get(User.list);
routes.route("/userid").post(User.getUserById);
routes.route("/user").post(User.post);


export default routes;