const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { User } = require("../models");

async function createUser(user){
    const c1 = await User.isEmailTaken(user.email);

    if(c1)
        throw new ApiError(httpStatus.OK,"Email already Taken");
    else
        return await User.create(user);
}

async function getUserByEmail(email){
    const x = await User.findOne({'email': email});
    return x;
}

async function getUserById(id){
    const x= await User.findById(id);
    return x;
}


const getEventsByUser = async(user) =>{
    let result = await Event.findOne({'email':user.email});
    if(result)
        return result;
    throw new ApiError(httpStatus.NOT_FOUND,"User does not have any events")
}


module.exports = {
    createUser,
    getUserByEmail,
    getEventsByUser,
    getUserById,
}