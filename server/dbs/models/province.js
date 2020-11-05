import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Province=new Schema({
  id:{
    type:String,
    require:true
  },
  type:{
    type:String,
    require:true
  },
  name:{
    type:String,
    require:true
  }
})

export default mongoose.model('Province',Province)
