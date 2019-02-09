import express from "express";
import post from "./post/routes";
import user from "./user/routes";
import multer from "multer";
import { postImg, getImg } from "./storage";
import { verifyJWT_MW } from "./../middleWare/auth"
import {login, signup} from "./user/controller"

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "upload/");
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

routes.use('/api/', verifyJWT_MW);

routes.use("/api/", post);
routes.use("/api/", user);

routes.get("/zz", getImg);
routes.post("/zz", type, postImg);

export default routes;
