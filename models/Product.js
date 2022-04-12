const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema.Types

const productSchema = new Schema ({
    //postedBy: {
      //  type:ObjectId,
      // ref:"User"
  //  },
    title: {
        type: String
    },
    photo: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    categorie: {
        type: String
    }
    
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product