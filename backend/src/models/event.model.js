const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        Description: {
            type: String,
            trim: true,
            default: null
        },
        EndTime: {
            type: String,
            trim: true,
            default: null
        },
        EndTimezone: {
            type: String,
            trim: true,
            default: null
        },
        Id:{
            type: Number,
            trim: true,
            default: null
        },
        IsAllDay: {
            type: Boolean,
            default: false
        },
        Location: {
            type: String,
            trim: true,
            default: null 
        },
        RecurrenceRule: {
            type: String,
            trim: true,
            default: null
        },
        RecurrenceException: {
            type: String,
            trim: true,
            default: null
        },
        StartTime: {
            type: String,
            trim: true,
            default: null
        },
        StartTimezone: {
            type: String,
            trim: true,
            default: null
        },
    },
    {
        timestamps: false,
    }
);

const Event = mongoose.model("Event",eventSchema);
module.exports.Event = Event;
module.exports.eventSchema = eventSchema;