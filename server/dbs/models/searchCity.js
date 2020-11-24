import mongoose from 'mongoose'
const Schema = mongoose.Schema
const py = new Schema({
  cityPinYin: {
    type: String
  },
  value: {
    type: String
  },
  name:{
    type:String
  },
  cityAcronym:{
    type:String
  },
  
})

export default mongoose.model('py',py,'py')
