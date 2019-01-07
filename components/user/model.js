import mongoose from "mongoose";

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String
});

UserSchema.index({ name: 1});
let User = mongoose.model("User", UserSchema);

export default User;