import mongoose from 'mongoose';
import Comment from './../comment/model';

const Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  likes: {
    type: Number,
    default: 0
  },
  comments: [Comment.schema],
  img: String,
  author: {
    name: String,
    ref: { 
      type: Schema.Types.ObjectId, 
      ref: "User" 
    },
  }
});

PostSchema.index({ title: 1});
let Post = mongoose.model('Post', PostSchema);

export default Post;