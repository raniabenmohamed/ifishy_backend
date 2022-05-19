const Product = require('../models/Product')


//show list of products
const cawiat = async (req, res) => {
    const t = await Product.find()
    res.json(t)
    
}

//Show single post
const show = async (req, res) => {

    var product;
    if (req.body._id) {
        product = await Product.findById(req.body._id)
    } else {
        product = await Product.find()
    }

    res.send({ product })
}

// create a post
const createProduct = (req,res,next) => {
    const {title,description,price,categorie}=req.body
        
        let product = new Product({
            
        })
       product.description=description
       product.title=title
       product.price=price
       product.categorie=categorie
       product.photo=req.file.filename
       console.log(product)
        product.save()
        .then(response => {
            res.json({
                message: 'Product added successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured'
            })
        })
    
    
}

// update a product
const update = (req, res, next) => {
    let ProductID = req.body.ProductID

    let updatedData = {
        title: req.body.title,
        photo: req.body.photo,

        description: req.body.description,
       // birthdate: req.body.birthdate,
        price: req.body.price,
        categorie: req.body.categorie
    }
    Product.findByIdAndUpdate(ProductID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Product Updated Successfully'
        })
    })
    .catch(error => {
        res.json({
            message : 'An error Occured'
        })
    })
}

// delete 
//search by title
const search_product= async (req, res) => {
    const text = req.body.text;
    var product = await Product.find({ "title": { "$regex": text, "$options": "i" } }).exec()
    console.log(post)
    if(product!=undefined){
        res.json(product)
    }
}

module.exports = {
    cawiat, show, createProduct, update, search_product
}