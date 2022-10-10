const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controller/userController");
const sendRespose = require("../helper/sendResponse");

const isAuth = require("../middleware/IsAuth");

//1. REGISTERATION
router.post("/registration", (req, res) => {
  return sendRespose.executeMethod(
    userController.registration,
    req.body,
    req,
    res
  );
});
//2. update user
router.put("/updateUser", isAuth, (req, res) => {
  return sendRespose.executeMethod(
    userController.updateUser,
    req.body,
    req,
    res
  );
});
//3. login
router.post("/login", (req, res) => {
  return sendRespose.executeMethod(userController.login, req.body, req, res);
});

//5. Get specific user detail using id
router.get("/list/:id", (req, res) => {
  return sendRespose.executeMethod(userController.list, req.body, req, res);
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("User logged out successfully!!");
  });
});


//8. Block the user
router.put("/block/:id", (req, res) => {
  return sendRespose.executeMethod(userController.block, req.params, req, res);
});
// router.get("/userDetails", (req, res) => {
//   return sendRespose.executeMethod(
//     userController.userDetails,
//     req.body,
//     req, 
//     res
//   );
// });
    
router.get("/lists", (req, res) => {
  let payload = req.query;
  if (payload.skip && payload.limit && payload.skip > 0) {
    payload.skip = (payload.skip - 1) * payload.limit;
  }
  return sendRespose.executeMethod(
    userController.getAllAdmins,
    payload,
    req,
    res
  );
});


//Delete for edit and edit api
router.delete("/editdelete/:id", (req, res) => {
  return sendRespose.executeMethod(
    userController.editdeleteUser,
    req.params,
    req,
    res
  );
});


router.put("/editUser/:id", (req, res) => {
  return sendRespose.executeMethod(
    userController.editUser,
    req.body,
    req,
    res
  );
});



//Testing  passs
router.get("/userDetails1", (req, res) => {
  return sendRespose.executeMethod(
    userController.userDetails1,
    req.body,
    req, 
    res
  );
});
router.get("/userDetails2/:id", (req, res) => {
  return sendRespose.executeMethod(
    userController.userDetails2,
    req.body,
    req, 
    res
  );
});
router.get("/userDetails3/:id", (req, res) => {
  return sendRespose.executeMethod(
    userController.userDetails3,
    req.body,
    req, 
    res
  );
});
module.exports = router;
