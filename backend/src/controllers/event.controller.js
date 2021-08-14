const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { eventService, userService } = require("../services")

const getEvents = catchAsync(async (req,res)=>{
    const user = await userService.getUserById(req.user._id);
    if(user){
        if(user.email !== req.user.email) {
            throw new ApiError(
              httpStatus.FORBIDDEN,
              "User not authorized to access this resource"
            );
        }
        const events = await eventService.getEventsByUser(req.user);
        res.status(200).send(user);
    }
    else
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    
})

const addEvent = catchAsync(async (req,res)=>{
    const user = await userService.getUserById(req.user._id);
    if(user.email !== req.user.email) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "User not authorized to access this resource"
        );
    }
    if(user){
        console.log(req.body.eventInfo)
        const new_calendar = await eventService.addEventToCalendar(req.user,req.body.eventInfo);
        // console.log(new_calendar);
        res.status(httpStatus.CREATED).send(user);
    }
    else
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    
})

const updateEvent = catchAsync(async (req,res)=>{
    const user = await userService.getUserById(req.user._id);

    if(user.email !== req.user.email) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "User not authorized to access this resource"
        );
    }
    if(user){
        await eventService.modifyEvent(user, req.body.data);
        res.send({user:user});
    }
    else
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    

})

const deleteEvent = catchAsync(async (req,res)=>{
    const user = await userService.getUserById(req.user._id);
    if(user.email !== req.user.email) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "User not authorized to access this resource"
        );
    }
    if(user){
        console.log("ok",req.body.data)

        await eventService.removeEvent(user, req.body.data);
        res.send({user:user});
    }
    else
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    

})

module.exports = {
    getEvents,
    addEvent,
    deleteEvent,
    updateEvent,
}