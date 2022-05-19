const User = require('../models/User')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const config = require("../config.json");
const nodemailer = require('nodemailer');
const Role = require('../middleware/role');


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
/*const show = (req, res, next) => {
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
}*/

const show = (req, res, next) => {
        
  User.findById(req.body._id)
 .then(response => {
     res.json({
         response
     })
 })
 .catch(error => {
     res.status(404).send({ message: "probleme" })
 })
 console.log(
     req.body._id
 )
};

const register = async (req, res) => {
    const { username, email, adresse, password,phone} = req.body;
    console.log(
      req.body.username
  )
  console.log(
  req.body.email
  )
  console.log(
  req.body.adresse
  )
  console.log(
  req.body.password
  )
  console.log(
    req.body.phone
    )
  
  
  
  
    const verifUtilisateur = await User.findOne({ email });
    if (verifUtilisateur) {
      res.status(403).send({ message: "Utilisateur existe deja !" });
    } else {
      const nouveauUtilisateur = new User();
  
      mdpEncrypted = await bcrypt.hash(password, 10);
  
      nouveauUtilisateur.username = username;
      nouveauUtilisateur.email = email;
      nouveauUtilisateur.adresse = adresse;
      nouveauUtilisateur.password = mdpEncrypted; 
      nouveauUtilisateur.phone = phone;
     
      nouveauUtilisateur.isVerified = false;
  
      nouveauUtilisateur.save();
  
      
      // token creation
      const token = jwt.sign({ _id: nouveauUtilisateur._id, role: Role.Utilisateur }, config.token_secret, {
        expiresIn: "120000", // in Milliseconds (3600000 = 1 hour)
      });
  
      sendConfirmationEmail(email, token);
      res.status(201).send({ message: "success", uses: nouveauUtilisateur, "Token": jwt.verify(token, config.token_secret) });
    }
  };
  
  
    const reEnvoyerConfirmationEmail = async (req, res) => {
      const utilisateur = await User.findOne({ "email": req.body.email });
    
      if (utilisateur) {
        // token creation
        const token = jwt.sign({ _id: utilisateur._id, email: utilisateur.email, role: Role.Utilisateur }, config.token_secret, {
          expiresIn: "60000", // in Milliseconds (3600000 = 1 hour)
        });
    
        sendConfirmationEmail(req.body.email, token);
    
        res.status(200).send({ "message": "L\'email de confirmation a été envoyé a " + utilisateur.email })
      } else {
        res.status(404).send({ message: "Utilisateur innexistant" })
      }
    };  
  
    async function sendConfirmationEmail(Email, token) {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'testrapide45@gmail.com',
          pass: 'biglou009'
        }
      });
    
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          console.log("Server not ready");
        } else {
          console.log("Server is ready to take our messages");
        }
      });
    
    
      const urlDeConfirmation = "http://localhost:3000/api/confirmation/"+ token;
    
    
      const mailOptions = {
          from: 'I-FISHY<testrapide45@gmail.com>',
        to: Email,
        text: 'For clients with plaintext support only',
        subject: 'I-FISHY ACCOUNT ',
        html: "<h3>Veuillez confirmer votre email en cliquant sur ce lien : </h3><a href='" + urlDeConfirmation + "'>Confirmation</a>"
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    
  }
  const confirmation = async (req, res) => {

    var tokenValue;
    try {
      tokenValue = jwt.verify(req.params.token, config.token_secret);
    } catch (e) {
      return res.status(400).send({ message: 'Le lien verification a peut être expireé, Veuillez revérifier votre email.' });
    }
  
    User.findById(tokenValue._id, function (err, use) {
      if (!use) {
        return res.status(401).send({ message: 'Aucun utilisateur, Veuillez proceder a l\'inscription.' });
      }
      else if (use.isVerified) {
        return res.status(200).send({ message: 'Cet utilisateur a deja été verifié, Veuillez vous connecter' });
      }
      else {
        use.isVerified = true;
        use.save(function (err) {
          if (err) {
            return res.status(500).send({ message: err.message });
          }
          else {
            return res.status(200).send({ message: 'Votre compte a été verifié' });
          }
        });
      }
    });
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

const login = async (req, res) => {
    console.log("body");
    const { email, password } = req.body;
  
    const use = await User.findOne({ email });
  
    if (use && (await bcrypt.compare(password, use.password))) {
      const token = jwt.sign({ id: use._id, email }, config.token_secret, {
        expiresIn: "360000",
      });
  
      if (!use.isVerified) {
        res.status(200).send({ use, message: "email non verifié" });
      } else {
        res.status(200).send({ token, use, message: "success" });
      }
  
    } else {
      res.status(403).send({ message: "mot de passe ou email incorrect" });
    };
  }


  const changerMotDePasse = async (req, res) => {
    const { email, nouveauMotDePasse } = req.body;
  
    nouveauMdpEncrypted = await bcrypt.hash(nouveauMotDePasse, 10);
  
    let user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password : nouveauMdpEncrypted
        }
      }
    );
  
    res.send({ user });
  };

  const motDePasseOublie = async (req, res) => {
    const codeDeReinit = req.body.codeDeReinit
    const utilisateur = await User.findOne({ "email": req.body.email });
  
    if (utilisateur) {
      // token creation
      const token = jwt.sign({ _id: utilisateur._id, email: utilisateur.email }, config.token_secret, {
        expiresIn: "3600000", // in Milliseconds (3600000 = 1 hour)
      });
  
      envoyerEmailReinitialisation(req.body.email, token, codeDeReinit);
  
      res.status(200).send({ "message": "L'email de reinitialisation a été envoyé a " + utilisateur.email })
    } else {
      res.status(404).send({ "message": "Utilisateur innexistant" })
    }
  };

  async function envoyerEmailReinitialisation(email, token, codeDeReinit) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testrapide45@gmail.com',
        pass: 'biglou009'
      }
    });
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        console.log("Server not ready");
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  
    const mailOptions = {
      from: 'I-FISHY<testrapide45@gmail.com>',
      to: email,
      subject: 'Reinitialisation de votre mot de passe - I-Fishy',
      html: "<h3>Vous avez envoyé une requete de reinitialisation de mot de passe </h3><p>Entrez ce code dans l'application pour proceder : <b style='color : blue'>" + codeDeReinit + "</b></p>"
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent : ' + info.response);
      }
    });
  }
 
 /* const ChangeProfilePic = async (req, res) => {
    console.log("upload image body", req.body);
    const id = req.params.id;
  
    upload(req, res, async function (err) {
      if (err) {
        res.send({ err });
      }
  
      console.log("req", id);
      console.log(req.files[0]["originalname"]);
      //console.log(res)
      const path = req.body.originalname + new Date();
      const Updateuser = await User.updateOne(
        { _id: id },
        {
          $set: {
            pictureId:
              "uploads/users/user-" +
              id +
              "/profil-pic/" +
              req.files[0]["originalname"],
          },
        }
      );
  
      const user = await User.findOne({ _id: id });
      //  console.log("user updated", user);
      res.status(200).send({ user });
    });
  };
*/

  const updateProfile = async (req, res) => {
    const {_id , username, email, adresse, phone} = req.body
  
    let user = await User.updateOne(
      { _id: _id },
      {
        $set: {
          username,
          email,
          adresse,
          phone
        },
      }
    )
  
    return res.send({ message: "Profile updated successfully", user })
  };

module.exports={ 
reEnvoyerConfirmationEmail,confirmation,register,show,index,login,changerMotDePasse, motDePasseOublie,updateProfile
}