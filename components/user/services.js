const bcrypt = require('bcrypt');
import User from "./model";
import Post from "../post/model";

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
  let result = await User.findOne({_id:id})
    .populate({
      path: "posts",
      model: "Post",
      populate: { path: "comments", model: "Comment"}
    });
    console.log(result);
    // , function (err, docs) {
    //   console.log(docs);
    //   Post.populate(docs, [{
    //     path: "posts.comments",
    //     model: "Comment"
    //   }]);
    // });
    // .populate([{
    //   path: "posts.comments",
    //   model: "Comment"
    // }]);

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
  