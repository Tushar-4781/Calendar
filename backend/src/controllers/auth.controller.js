const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const {userService, tokenService, authService} = require("../services/");


const login = catchAsync( async (req,res) => {
    let user = await authService.loginUserWithEmailAndPassword(req.body.email, req.body.password)
    if(user){
        let token = await tokenService.generateAuthTokens(user);
        let data = {"user":user, "tokens":token};
        res.status(200).send(data);
    }
    else
        throw new ApiError(httpStatus.NOT_FOUND);
})


const register = catchAsync(async (req,res) => {
    
    const newUser = await userService.createUser(req.body);
    if(newUser){
        let token = await tokenService.generateAuthTokens(newUser);
        let data = {"user":newUser,"tokens":token};
        res.status(201).send(data);
    }
    else
        throw new ApiError(httpStatus.NOT_FOUND);
})

module.exports = {
    register,
    login,
}