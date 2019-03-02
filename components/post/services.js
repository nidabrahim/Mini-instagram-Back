import Post from "./model";
import User from "../user/model";


export async function createPost(post) {
  // if (post) {
  //   if (!post._id) {
  //     Post.create(post).then(function(newPost){
  //       User.findOne({_id:post.author._id})
  //       .then(function(user){
          
  //         user.posts.push(newPost);
  //         user.save();
  //         console.log(user);
  //         return newPost;
  //       })
  //       .catch(err => {
  //         console.log("Find User error");
  //       });
  //     })
  //     .catch(err => {
  //       console.log("Add post error");
  //     });

      
  //   }
  // }
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
  //console.log(id);
  let result = await Post.find({'author.ref':id});
  //console.log(result);
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
            //item = post;
            item.comments.push(comment);
            item.save();
          }
        });
        user.save();
        //console.log(user);
      }
    }
    return post;
      // .then(function(post){
      //   post.comments.push(comment);
      //   post.save();
      //   console.log(post);
      //   return post;
      // })
      // .catch(err => {
      //   res.status(400).json({ message: "Find Post error" });
      // });
  }
  
}

export async function updateLikes(postId,post) {
  if (post) {
      //const _post = await Post.findByIdAndUpdate({_id:postId},post,{new: true});
      // .catch(err => {
      //   console.log("Update Post likes error");
      // });
      // return _post;

     const _post = await Post.findOneAndUpdate({_id:postId},post,{new: true});
     if(_post){
        const user = await User.findOne({name:_post.author.name});
        if(user){
          user.posts.map(item => {
            //console.log("cmp : ", item._id.equals(_post._id));
            if(item._id == _post._id){
              //console.log("item : ",item._id, " | post : ",_post._id);
              //item = post;
              item.likes = _post.likes;
              //item.save();
              
            }
            return item;
            
          });
          user.save();
          //console.log(user);
        }
     }
     return _post;
        
      // .then(function(post){
      //   //console.log(post);
      //   return post;
      // })
      // .catch(err => {
      //   console.log("Update Post likes error");
      // });
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


