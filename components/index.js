require ('custom-env').env('prod')
import express from "express";
import post from "./post/routes";
import user from "./user/routes";
import multer from "multer";
import { postImg, getImg, getPostImage } from "./storage";
import { verifyJWT_MW } from "./../middleWare/auth"
import {login, signup} from "./user/controller"

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "components/storage/upload/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const type = upload.single("photo");

const routes = express.Router();

routes.post("/api/login", login);
routes.post("/api/signup", signup);


routes.get("/api/image/:id", getPostImage);

if( process.env.NODE_ENV != 'test'){
  routes.use('/api/', verifyJWT_MW);
}

routes.use("/api/", post);
routes.use("/api/", user);

routes.post("/api/post/path", getImg);
routes.post("/api/post/photo", type, postImg);

export default routes;
