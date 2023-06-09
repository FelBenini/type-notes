import mongoose, { model, Model, Document, ObjectId } from "mongoose";

export interface IPost {
    postedBy: ObjectId;
    createdAt: Date;
    likesCount: Number;
    likedBy: Array<ObjectId>;
    content: string;
    type: string;
    replies: Array<ObjectId>;
    replyCount: Number
}

export interface IPostDocument extends IPost, Document { }
export interface IPostModel extends Model<IPostDocument> {
    buildUser(args: IPost): IPostDocument
}

const postSchema = new mongoose.Schema<IPost>({
    postedBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
    createdAt: { type: Date, default: () => Date.now() },
    likesCount: { type: Number, required: true, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    content: { type: String, required: true },
    type: {type: String, required: true, default: 'post'},
    replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}],
    replyCount: {type: Number, required: true, default: 0}
})

const postModel = model<IPostDocument, IPostModel>('Posts', postSchema)

export default postModel