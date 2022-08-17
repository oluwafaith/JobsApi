import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export interface WalletUser {
  name: string;
  email: string;
  password: string;
  roles: any[];
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  
});


const token: any = process.env.JWT_SECRET
userSchema.pre< WalletUser>('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
  userSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.name },
      token,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
  }
  
  userSchema.methods.comparePassword = async function (canditatePassword: any) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
  }

export const User = mongoose.model("User", userSchema);
