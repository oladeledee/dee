function auth(req,res,next){
    console.auth('authenticating....');
    next();
}

module.exports=auth;
