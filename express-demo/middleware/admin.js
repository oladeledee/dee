const User=require('../model/user');

 module.exports =function (req,res,next){
if(!req.user.isAdmin) return res.status(404).send("Acces denied.")
next();
}