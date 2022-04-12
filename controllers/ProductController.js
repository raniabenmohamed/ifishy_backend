const Product = require('../models/Product')


//show list of products
const cawiat = async (req, res) => {
    const t = await Product.find()
    res.json(t)
    
}

//Show single product
const show = (req, res, next) => {
let ProductID = req.body.PostID
Product.findById(ProductID)
.then(response => {
    res.json({
        response
    })
})
.catch(error => {
    res.json({
        message : 'An Error Occured'
    })
    
})
}

// create a product
const createProduct = (req,res,next) => {
        
        let product = new Product({
            title: req.body.title,
            photo: req.body.photo,
            description: req.body.description,
           // birthdate: req.body.birthdate,
            price: req.body.price,
            categorie: req.body.categorie
        })
        
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