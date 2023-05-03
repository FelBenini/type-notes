import mongoose, {model, Model, Document} from "mongoose";

export interface IUser {
    email: string;
    username: string;
    password: string;
    displayName: string;
    followers: Array<string>;
    followerCount: number;
    following: Array<string>;
    followingCount: number;
    profilePic: string;
    bannerPic: string;
    createdAt: Date
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {
    buildUser(args: IUser): IUserDocument
}

const userSchema = new mongoose.Schema<IUser>({
    username: {type: String, required: true, unique: true, min: 3, max: 24},
    email: {type: String, required: true, unique: true, min: 5},
    displayName: {type: String, required: true},
    password: {type: String, required: true},
    followers: {type: [String], default: []},
    followerCount: {type: Number, default: 0},
    following: {type: [String], default: []},
    followingCount: {type: Number, default: 0},
    profilePic: {type: String, default: ''},
    bannerPic: {type: String, default: ''},
    createdAt: {type: Date, default: () => Date.now()}
})

const userModel = model<IUserDocument, IUserModel>('Users', userSchema)

export default userModel