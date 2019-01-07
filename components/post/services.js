import Post from "./model";

module.exports = {
  createPost: async function(post) {
    if (post) {
      return Post.create(post);
    }
  },

  list: async function() {
    let result = await Post.find({});
    return result;
  },

  listByPage: async function(page, per_page) {
    var start = (parseInt(page) - 1) * parseInt(per_page);
    let result = await User.find({})
      .skip(start)
      .limit(parseInt(per_page));
    return result;
  }


};
