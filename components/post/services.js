import Post from "./model";
import User from "../user/model";


export async function createPost(post) {
  var newPost = null;
  if (post) {
    if (!post._id) {
      newPost = await Post.create(post);
      if(newPost){
        const user = await User.findOne({_id:post.author._id});
        if(user){
            user.posts.push(newPost);
            user.save();
        }
      }
    }
  }
  return newPost;
}

export async function list() {
  let result = await Post.find({});
  return result;
}

export async function publicPosts() {
  let result = await Post.find({hidden:false})
  .populate([{
    path: "comments",
    model: "Comment",
  }]);
  
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
  let result = await Post.find({'author.ref':id});
  return result;
}

export async function createComment(postId,comment) {
  if (comment) {
    const post = await Post.findOne({_id:postId});
    if(post){
      post.comments.push(comment);
      post.save();
      const user = await User.findOne({_id:post.author._id});
      if(user){
        user.posts.map(item => {
          if(item._id == post._id){
            item.comments.push(comment);
            item.save();
          }
        });
        user.save();
      }
    }
    return post;
  }
  
}

export async function updateLikes(postId,post) {
  if (post) {

     const _post = await Post.findOneAndUpdate({_id:postId},post,{new: true});
     if(_post){
        const user = await User.findOne({name:_post.author.name});
        if(user){
          user.posts.map(item => {
            if(item._id == _post._id){
              item.likes = _post.likes;
            }
            return item;
            
          });
          user.save();
        }
     }
     return _post;
  }
}

export async function getPost(id) {
    let result = await Post.findOne({_id:id})
    .populate([{
      path: "comments",
      model: "Comment",
    }]);
    
    return result;
}


