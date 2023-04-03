const userProfileService = require('../services/user-profile-service')


function getUserInfoCntrl(req, res){
    const userId = req.authData.userId
    userProfileService.getUserInfo(userId).then((results)=>{
        res.status(200).send({ succMsg: "user info", results: results[0] });
    }).catch((error)=>{
        res.status(500).send({errMsg: "cannot get user info"})
    })
}

module.exports = {getUserInfoCntrl}