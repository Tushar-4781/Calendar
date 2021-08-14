const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const auth =()=> async(req, res, next) => {
  return new Promise( (resolve, reject) => {
      passport.authenticate("jwt",{session:false},async (err, user,info)=>{
      if(err|| info ||!user) {
     reject(new ApiError(httpStatus.UNAUTHORIZED,`Please authenticate`)); 
      }

      req.user =  user;
      resolve();
    })(req,res,next);

  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
