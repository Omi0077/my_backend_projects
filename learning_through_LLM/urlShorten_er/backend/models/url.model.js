import mongoose , {Schema} from 'mongoose'

const urlSchema = new Schema({
    orignalUrl : {
        type: String,
        required: true,
    },
    shortUrl : {
        type : String,
        required : true
    }
},{timestamps : true})

export const Url = mongoose.model('Url' , urlSchema)