import mongoose from "mongoose";

const Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: String,
  date: { type: Date, default: Date.now },
  author: {
    name: String,
    ref: { 
      type: Schema.Types.ObjectId, 
      ref: "User" 
    }
  }
});


let Comment = mongoose.model("Comment", CommentSchema);

export default Comment;