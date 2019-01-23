exports.postImg = (req, res) => {
  console.log(req.file);
  res.status(200).json(req.file);
};

export function getImg(req, res){
  var file = __dirname + "/isima.png";
  res.download(file); 
};
