import * as services from "./../post/services";

export function postImg(req, res){
  res.status(200).json(req.file);
};

export function getImg(req, res){
  var file = __dirname+'/upload/schema.jpg';
  res.sendFile(file);
};

export async function getPostImage(req, res){

  var file = __dirname+'/upload/images.jpg';
  const post  = await services.getPost(req.params.id);
  if(post){
    file = __dirname+'/upload/'+post.img;
  }
  res.sendFile(file);

};

