import mongoose, {model, Model, Document} from "mongoose";

export interface IPost {
    postedBy: string;
}

const postSchema = new mongoose.Schema({
    postedBy: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users'},
    createdAt: {type: Date, default: () => Date.now()},
    likesCount: {type: Number, required: true, default: 0},
    likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
    content: {type: String, required: true}
})

const postModel = model('Posts', postSchema)

export default postModel