const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid Email");
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      }
    },
    events: {
        type: Array,
        default: []
    }
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);


userSchema.statics.isEmailTaken = async function (email) {
  let exist=await this.find({"email": email}).countDocuments();
  if(exist>=1)
    return true
  else
    return false
};

userSchema.pre('save',function(next){
  var user = this
  if(!user.isModified('password')) 
    return next();
  bcrypt.genSalt(10, function(err,salt){
    if(err)
      return next(err);
    bcrypt.hash(user.password,salt,function(err,hash){
      if(err)
        return next(err);
      user.password = hash;
      next();
    })
  })
})
userSchema.methods.isPasswordMatch = async function(userPassword){
  return await bcrypt.compare(userPassword,this.password)
}


module.exports.User = mongoose.model("User",userSchema);
