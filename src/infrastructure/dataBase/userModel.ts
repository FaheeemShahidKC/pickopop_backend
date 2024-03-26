import mongoose, { Schema, model } from "mongoose";
import User from "../../domian/user";

const userSchema: Schema<User> = new Schema({
     name: {
          type: String,
          required: true
     },
     mobile: {
          type: Number,
          required: true
     },
     email: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     },
     isBlock: {
          type: Boolean,
          default: false
     },
     isPicker: {
          type: Boolean,
          default: false
     }
})

const UserModel = model<User>('user', userSchema)
export default UserModel