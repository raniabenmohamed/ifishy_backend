const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema.Types

const blogSchema = new Schema ({
    //postedBy: {
      //  type:ObjectId,
      // ref:"User"
  //  },
  title: {
    type: String
},
    description: {
        type: String
    },
    
    contenu: {
        type: String
    }
    
}, {timestamps: true})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog