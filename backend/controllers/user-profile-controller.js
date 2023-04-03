const userProfileService = require('../services/user-profile-service')


function getUserInfoCntrl(req, res){
    const userId = req.authData.userId
    userProfileService.getUserInfo(userId).then((results)=>{
        res.status(200).send({ succMsg: "user info", results: results[0] });
    }).catch((error)=>{
        res.status(500).send({errMsg: "cannot get user info"})
    })
}

function updateFieldCntrl(req, res){
    const userId = req.authData.userId
    const field = req.params.field
    const value = req.body.value
    userProfileService.updateField(userId, field, value).then((results)=>{
        res.status(200).send({ succMsg: "update user "+field, results: results[0] });
    }).catch((error)=>{
        res.status(400).send({errMsg: "cannot update user "+field})
    })
}

function updateInfoCntrl(req, res){
    const userId = req.authData.userId
    const user = req.body
    userProfileService.updateUserInfo(userId, user).then(()=>{
        res.status(200).send({ succMsg: "update user info"});
    }).catch((error)=>{
        res.status(400).send({errMsg: "cannot update user info"})
    })
}


module.exports = {getUserInfoCntrl, updateFieldCntrl,
     updateInfoCntrl}