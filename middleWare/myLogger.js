const MyLogger = ({req, res, next}) => {
    console.log('LOGGED : '+ req);
    next();
  }
  
  export default MyLogger;