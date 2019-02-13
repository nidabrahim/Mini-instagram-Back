import * as services from "./services";
import {postsByUser} from "./../post/services";
import {createJWToken} from "./../../libs/auth";

export function post(req, res){
    if (!req.body.name) {
        return res.status(400).send({
          message: "name is required"
        });
    }
    services.createUser(req.body).then(
      user => res.status(200).json(user),
      err => {
        res.status(500).send("error");
        return;
      }
    );
};

export async function posts(req, res){
  const list = await postsByUser(req.params.id)
  res.status(200).send({
      posts: list
  });
};

export async function list(req, res){
    const list  = await services.listByPage(req.query.page || 1, req.query.per_page || 10)
    res.status(200).send({
        users: list
    });
};

export async function me(req, res){
 // console.log(req.user);
  res.status(200).send({
      user: req.user
  });
};

export async function getUserById(req, res){
  //var id = req.params.id;  
  const user  = await services.getUser(req.query.id)
  res.status(200).send({
      user: user
  });
};

export async function login(req, res){
    let { email, password } = req.body;
    const user = await services.checkUser(email, password);
   // console.log(user);
    if (user != null) {
      res.status(200).json({
        success: true,
        token: createJWToken({
          sessionData: user,
          maxAge: 3600
        }),
        user:user
      });

    } else {
      res.status(401).json({
        message: "Login ou mot de passe incorrecte."
      });
    }
};

export function signup(req, res){
  services.createUser(req.body).then(
    user => res.status(200).json(user),
    err => {
      res.status(500).send("error");
      return;
    }
  );
};





  