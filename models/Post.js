const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema.Types

const postSchema = new Schema ({
    //postedBy: {
      //  type:ObjectId,
      // ref:"User"
  //  },
    
    photo: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    fish_found: {
        type: String
    }
    
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema)
module.exports = Post