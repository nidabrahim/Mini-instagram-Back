import Post from "./model";

module.exports = {
  createPost: async function(post) {
    if (post) {
      if (!post._id) {
        return Post.create(post);
      }
    }
  },

  list: async function() {
    let result = await Post.find({});
    return result;
  },

  listByPage: async function(page, per_page) {
    var start = (parseInt(page) - 1) * parseInt(per_page);
    let result = await Post.find({})
      .populate({
        path: "author.ref",
        model: "User"
      })
      .skip(start)
      .limit(parseInt(per_page));
    return result;
  }

};
