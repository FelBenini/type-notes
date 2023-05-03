import mongoose, {model, Model, Document} from "mongoose";

export interface IUser {
    email: string;
    username: string;
    password: string;
    displayName: string
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {
    buildUser(args: IUser): IUserDocument
}

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, min: 3, max: 24},
    email: {type: String, required: true, unique: true, min: 5},
    displayName: {type: String, required: true},
    password: {type: String, required: true},
})

const userModel = model<IUserDocument, IUserModel>('Users', userSchema)

export default userModel