import * as services from "./services";
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

export async function  list(req, res){
    const list  = await services.listByPage(req.query.page || 1, req.query.per_page || 10)
    res.status(200).send({
        users: list
    });
};

export function login(req, res){
    let { email, password } = req.body;
    if (services.checkUser(email, password) != null) {
        
      res.status(200).json({
        success: true,
        token: createJWToken({
          sessionData: { name: "toto", age: 15 },
          maxAge: 3600
        })
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





  