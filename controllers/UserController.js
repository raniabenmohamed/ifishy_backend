const User = require('../models/User')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

//show list of users
const index = (req, res, next) => {
    User.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured'
        })
    })
}

//Show single user
const show = (req, res, next) => {
let UserID = req.body.UserID
User.findById(UserID)
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

// add a user (registration)
const register = (req,res,next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if (err){
            res.json({
                error: err
            })
        }
        let user = new User({
            username: req.body.username,
           // birthdate: req.body.birthdate,
            email: req.body.email,
            password: hashedPass,
            adresse: req.body.adresse,
            phone: req.body.phone
        })
       
        user.save()
        .then(response => {
            res.json({
                message: 'User added successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured'
            })
        })
    })
    
}


// delete 

//login
const login = (req, res ) => {
    var usename = req.body.usename 
    var password =req.body.password
    User.findOne({email: usename}, function(err, user){
        if(err) {
          console.log(err);
        }
       
        if(user) {
            bcrypt.compare(password, user.password, function(err,result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name},'verysecretValue',{expiresIn: '1h'})
                    console.log(result)
                    console.log("-----------------------------------")
                    console.log( "username :"+user.username)
                    console.log( "email :"+user.email)
                    console.log("password :"+ user.password)
                    console.log( "adresse:"+user.adresse)
                    console.log( "phone :"+user.phone)
                    console.log( token)
                    return res.json({
                        
                        username :user.username,
                        email :user.email,
                       password : user.password,
                       adresse:user.adresse,
                       phone :user.phone,
                       token : token
                       

                    })
                
                }else{
                    res.json({
                        message:'password does not matched !'
                    })
                }
            })

    
             } else {
            return res.json({
                message : 'usere leee'
            })
     
            
        
        }
    })

}

const search_user = (req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

}

module.exports = {
    index, show, register,  login, search_user,
    
    update: async (req, res) => {
        console.log(req.body)
        let isUserFound = await User.findById(req.params.id)
        console.log(isUserFound)
        if (isUserFound) {
        res.user = isUserFound
            if (req.body.email != null) {
                res.user.email = req.body.email
            }
            if (req.body.username != null) {
                res.user.username = req.body.username
            }
            
            if (req.body.phone != null) {
                res.user.phone = req.body.phone
            }
            
            if (req.body.adresse != null) {
                res.user.adresse = req.body.adresse
            }
           
            try {
                const update = await res.user.save()
                res.json(update)
            } catch (err) {
                res.json({ message: err.message })
            }
        }
    }

}