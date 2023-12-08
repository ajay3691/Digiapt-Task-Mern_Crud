import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    email: String,
    password: String,
    confirmPassword: String
})
let User = mongoose.model("userReg", userSchema)
export default User