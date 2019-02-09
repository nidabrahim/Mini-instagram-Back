import jwt from "jsonwebtoken";
import _ from "lodash";
//import User from "./../components/user/model";
import * as services from "./../components/user/services";


export async function verifyJWTToken(token) {
    try {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
  
      if (!decodedToken) {
        throw new err();
      }

      var userId = decodedToken.data._doc._id;
      const user  = await services.getUser(userId);
      
      return user;

      // User.findOne({_id: userId}).then(function(user){
      //   return user;
      // });

      //return decodedToken;
    } catch (err) {
      throw new err();
    }
  }

export function createJWToken(details) {

  if (typeof details !== "object") {
    details = {};
  }

  if (!details.maxAge || typeof details.maxAge !== "number") {
    details.maxAge = 3600;
  }

  details.sessionData = _.reduce(
    details.sessionData || {},
    (memo, val, key) => {
      if (typeof val !== "function" && key !== "password") {
        memo[key] = val;
      }
      return memo;
    },
    {}
  );

  let token = jwt.sign(
    {
      data: details.sessionData
    },
    process.env.JWT_SECRET,
    {
      expiresIn: details.maxAge,
      algorithm: "HS256"
    }
  );

  return token;
}