module.exports.getStudentId = function(profileObj){

  console.log("Utils:" + profileObj);

  return profileObj.username;

  next();
}

module.exports.verifyUser = function(req, res, next){
  if(!(req.profile && req.profile.length)){
        console.log("Unverified User");
        console.log(req.profile);
        req.session.state = state;
        console.log(req.session.state);
        res.redirect("/");
        return;
  } else{
        console.log("Verified");
        next();
    }
}
