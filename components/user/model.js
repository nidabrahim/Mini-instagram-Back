import mongoose from "mongoose";
import Post from "./../post/model";

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  pseudo: {
    type: String,
    index: true,
    unique: true
  },
  email: String,
  password: String,
  posts: [Post.schema]
  // posts: [{ 
  //   type: Schema.Types.ObjectId, 
  //   ref: 'Post' 
  // }]
});

UserSchema.index({ name: 1});
let User = mongoose.model("User", UserSchema);
User.createIndexes();

export default User;