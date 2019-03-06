
const Cors = (req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
  
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        res.status(200).json({ message: "ok" });
    }
    else {
        next();
    }
}
  
export default Cors;