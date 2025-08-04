import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    username: String,
    password: String,
    createDAT: {
        type: Date,
        default: Date.now
    }
});
const user = model('User', userSchema);
export default user;