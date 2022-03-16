import {Document} from 'mongoose';

export default interface PostDoc extends Document {
    title : string,
    body : string
}