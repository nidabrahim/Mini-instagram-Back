import * as services from "./../post/services";

export function postImg(req, res){
  console.log(req);
  res.status(200).json(req.file);
};

export function getImg(req, res){
  //var file = __dirname+'/upload/'+req.body.path;
  var file = __dirname+'/upload/schema.jpg';
  console.log(file);
 // res.status(200).json(file);
  res.sendFile(file);
  //res.download(file); 
};

export async function getPostImage(req, res){

  var file = __dirname+'/upload/images.jpg';
  const post  = await services.getPost(req.params.id);
  if(post){
    file = __dirname+'/upload/'+post.img;
  }
  console.log(file);
  res.sendFile(file);

 // res.status(200).json(file);
   //res.download(file); 
};

