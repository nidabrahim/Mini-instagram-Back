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
          console.log("[user] - Creation");
          let hash = bcrypt.hashSync(user.password, 10);
          user.password = hash;
          //console.log(user);
          return User.create(user);
        }
      }
}

export async function getUser(id) {
  let result = await User.findOne({_id:id})//.populate('posts');
    .populate([{
    path: "posts",
    model: "Post"
  }]);
//   User.findOne({_id:id}).populate('posts').exec(function (err, user) {
//     console.log(user);
//     return user;
// });
  return result;
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
  