import Post from "./model";
import User from "../user/model";


export async function createPost(post) {
  if (post) {
    if (!post._id) {
      Post.create(post).then(function(newPost){
        User.findOne({_id:post.author._id})
        .then(function(user){
          
          user.posts.push(newPost);
          user.save();
          console.log(user);
          return newPost;
        })
        .catch(err => {
          res.status(400).json({ message: "Find User error" });
      
        });
      })
      .catch(err => {
        res.status(400).json({ message: "Add post error" });
    
      });

      
    }
  }
}

export async function list() {
  let result = await Post.find({});
  return result;
}

export async function publicPosts() {
  let result = await Post.find({hidden:false});
  return result;
}

export async function listByPage(page, per_page) {
  var start = (parseInt(page) - 1) * parseInt(per_page);
  let result = await Post.find({})
    .populate({
      path: "author.ref",
      model: "User"
    })
    .populate("comments")
    .skip(start)
    .limit(parseInt(per_page));
  return result;
}

export async function postsByUser(id) {
  console.log(id);
  let result = await Post.find({'author.ref':id});
  //console.log(result);
  return result;
}


