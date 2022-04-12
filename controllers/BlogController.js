const Blog = require('../models/Blog')


//show list of posts
const cawiat = async (req, res) => {
    const t = await Blog.find()
    res.json(t)
    
}

//Show single post
const show = (req, res, next) => {
let BlogID = req.body.BlogID
Blog.findById(BlogID)
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

// create a post
const createBlog = (req,res,next) => {
        
        let blog = new Blog({
            title: req.body.title,
            description: req.body.description,
           // birthdate: req.body.birthdate,
            contenu: req.body.contenu
        })
       
        blog.save()
        .then(response => {
            res.json({
                message: 'Blog added successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured'
            })
        })
    
    
}

// update a post
const update = (req, res, next) => {
    let BlogID = req.body.BlogID

    let updatedData = {
        title: req.body.title,

        description: req.body.description,
       // birthdate: req.body.birthdate,
        contenu: req.body.contenu,
    }
    Blog.findByIdAndUpdate(BlogID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Blog Updated Successfully'
        })
    })
    .catch(error => {
        res.json({
            message : 'An error Occured'
        })
    })
}

// delete 
//search by location
const search_blog= async (req, res) => {
    const text = req.body.text;
    var blog = await Blog.find({ "title": { "$regex": text, "$options": "i" } }).exec()
    console.log(blog)
    if(blog!=undefined){
        res.json(blog)
    }
}

module.exports = {
    cawiat, show, createBlog, update, search_blog
}