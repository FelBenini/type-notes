import mongoose, {Model} from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, min: 3, max: 24},
    email: {type: String, required: true, unique: true, min: 5},
    displayName: {type: String, required: true},
    password: {type: String, required: true},
})

const userModel = new Model('Users', userSchema)

export default userModel