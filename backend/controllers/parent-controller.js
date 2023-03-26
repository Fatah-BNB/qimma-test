const parentService = require('../services/parent-service');
const userService = require('../services/user-service');

function createChildAccountCntrl(req, res) {
    const user = req.body
    const parentId = req.authData.userId
    console.log("parent ID", parentId)
    parentService.registerChild(user, parentId).then(async (results) => {//after the user register the server send an email to the user
        //1) create token for email 
        const emailToken = userService.createEmailToken(results[0].user_firstName, results[0].user_id);
        //2) send the email
        userService.sendEmail(results[0].user_firstName, results[0].user_email, emailToken);
        res.status(200).send({ succMsg: "Account created", results: results[0] });
    }).catch((error) => {
        res.status(401).send({ errMsg: "Faild to create account" });
    });

}
module.exports = { createChildAccountCntrl }