import User from "./model";

export async function listByPage(page, per_page) {
      var start = (parseInt(page) - 1) * parseInt(per_page);
      let result = await User.find({})
        .skip(start)
        .limit(parseInt(per_page));
      return result;
}

export async function createUser(user) {
      if (user) {
        if (!user._id) {
          console.log("[user] - Creation");
          return User.create(user);
        }
      }
}

export async function getUser(id) {
  // var ObjectId = require('mongodb').ObjectId; 
  // var o_id = new ObjectId(id);
  let result = await User.findOne({_id:id});
  console.log(result);
  return result;
}

export async function checkUser(email, pwd) {
    let result = await User.findOne({email:email,password: pwd});
    return result;
}
  