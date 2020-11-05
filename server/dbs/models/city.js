import mongoose from 'mongoose'
const Schema = mongoose.Schema
const City=new Schema({
  id:{
    type:Number,
    require:true
  },
  name:{
    type:String,
    require:true
  }
})

export default mongoose.model('address',City,'address')
