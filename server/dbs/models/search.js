import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Act = new Schema({
  productId: {
    type: String//景点名
  },
  price: {
    type: Number
  },
  hostAvatarUrl:{
    type:String
  },
  title:{
    type:String
  },
  rentType:{
    type:String
  },
  layoutRoom:{
    type:Number
  },
  locationArea:{
    type:String
  },
  commentNumber:{
    type:Number
  },
  coverImage:{
    type:String
  },
  type:{
    type:String
  },
  keyword:{
    type:Number
  },
  favCount:{
    type:Number
  }
})

export default mongoose.model('act', Act,'act')
