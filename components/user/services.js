const bcrypt = require('bcrypt');
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
          let hash = bcrypt.hashSync(user.password, 10);
          user.password = hash;
          return User.create(user);
        }
      }
}

export async function getUser(id) {
  let user = await User.findOne({_id:id})
    .populate({
      path: "posts",
      model: "Post",
    });

  return user;
}

export async function checkUser(email, pwd) {
  let user = await User.findOne({email:email});
  if(user != null){
    if(bcrypt.compareSync(pwd, user.password)) {
      return user;
     }
  }
  return null;
}


export async function updateUser(id, newUser) {
  let user = null;
  if (newUser) {
    user = await User.findOneAndUpdate({_id:id}, newUser, {new : true}).populate({
      path: "posts",
      model: "Post"
    });
  }
  return user;
}