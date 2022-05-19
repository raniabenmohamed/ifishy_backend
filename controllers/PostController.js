const Post = require('../models/Post')


//show list of posts
/*const cawiat = async (req, res) => {
    const t = await Post.find()
    res.json(t)
    
}*/
const cawiat = (req, res)=> {
    Post.find()
    .then(response => {
        res.json(
            response
        )
    })
        .catch(error =>{
            res.json({
                message:'An error Occured ! '
            })
        })
}

//Show single post
const show = async (req, res) => {

    var post;
    if (req.body._id) {
        post = await Post.findById(req.body._id)
    } else {
        post = await Post.find()
    }

    res.send({ post })
}

// create a post
const createPost = (req,res,next) => {
    const {description,location,fish_found, latitude,longitude}=req.body
        
        let post = new Post({
            
        })
       post.description=description
       post.location=location
       post.fish_found=fish_found
       post.latitude=latitude
       post.longitude=longitude

       post.photo=req.file.filename
       console.log(post)
        post.save()
        .then(response => {
            res.json({
                message: 'Post added successfully'
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
    let PostID = req.body.PostID

    let updatedData = {
        photo: req.body.photo,

        description: req.body.description,
       // birthdate: req.body.birthdate,
        location: req.body.location,
        fish_found: req.body.fish_found
    }
    Post.findByIdAndUpdate(PostID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Post Updated Successfully'
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
const search_post= async (req, res) => {
    const text = req.body.text;
    var post = await Post.find({ "location": { "$regex": text, "$options": "i" } }).exec()
    console.log(post)
    if(post!=undefined){
        res.json(post)
    }
}

module.exports = {
    cawiat, show, createPost, update, search_post
}