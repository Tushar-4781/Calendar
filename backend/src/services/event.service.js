const httpStatus = require("http-status");
const { User } = require("../models")
const ApiError = require("../utils/ApiError");


const getEventsByUser = async(user) =>{
    let result = await User.findOne({'email':user.email});
    
    if(result)
        return result.events;
    throw new ApiError(httpStatus.NOT_FOUND,"User does not have any events")
}

const addEventToCalendar = async(user,eventInfo)=>{
    let USER  = await User.findOne({"email":user.email});
    if(USER){  
        USER.events.push(eventInfo);
        await USER.save();
        return USER;
    }
    else{
        throw new ApiError(httpStatus.NOT_FOUND,"User Does not exist")
    }
}

const modifyEvent = async(user,info)=>{
    let USER = await User.findOne({"email":user.email});
    
    if(info.addedRecords.length===0){
        USER.events[info.data[0].Id-1] = info.data[0];
    }
    else{
        USER.events.splice(info.changedRecords[0].Id-1,1);
        USER.events.push(info.changedRecords[0]);
        USER.events.push(info.addedRecords[0]);
    }

    
    USER.markModified("events");
    await USER.save();

    return USER

}

const removeEvent = async(user,info)=>{
        let USER = await User.findOne({"email":user.email});

        if(info.changedRecords.length!==0){ 
            USER.events[info.data[0].Id-1] = info.changedRecords[0];
        }
        else{
            USER.events.splice(info.deletedRecords[0].Id-1,1);
        }
        USER.markModified("events");

        await USER.save();
    return USER;
}
module.exports = {
    getEventsByUser,
    modifyEvent,
    addEventToCalendar,
    removeEvent
}