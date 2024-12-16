import mongoose, { Schema } from "mongoose";

export interface User extends Document {
  username : string,
  email : string,
  password : string
}

const UserSchema : Schema<User> = new Schema(
  {
    username : {
      type : String,
      required : true,
      unique : true,
   },
    email : {
        type : String,
        required : true,
        unique : true,
        match : [/.+\@.+\..+/,'please use a valid email address']
    },
    password : {
        type : String,
        unique : true,
        required : [true,"password is required"]
    }
  }
)


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

  export default UserModel;