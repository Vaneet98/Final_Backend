const express = require("express");
const router = express.Router();
const controller = require("../controller");
const sendResponse = require("../helper/sendResponse");

router.post("/add", (req, res) => {
  return sendResponse.executeMethod(
    controller.eduControllers.addEducation,
    req.body,
    req,
    res
  );
});
router.put("/block/:eduId", (req, res) => {
  return sendResponse.executeMethod(
    controller.eduControllers.blockUnblock,
    req.params,
    req,
    res
  );
});

router.get("/list", (req, res) => {
  let payload = req.query;
  if (payload.skip && payload.limit && payload.skip > 0) {
    payload.skip = (payload.skip - 1) * payload.limit;
  }
  return sendResponse.executeMethod(
    controller.eduControllers.getAllDetails,
    payload,
    req,
    res
  );
});

router.get("/geteducation", (req, res) => {
  return sendResponse.executeMethod(
    controller.eduControllers.gets,
    req.body,
    req,
    res
  );
});

router.put("/edit/:eduId", (req, res) => {
  return sendResponse.executeMethod(
    controller.eduControllers.edit,
    req.params,
    req,
    res
  );
});

router.get("/get/:eduId", (req, res) => {
  return sendResponse.executeMethod(
    controller.eduControllers.get,
    req.params,
    req,
    res
  );
});


router.get("/getalltablerecorde", (req, res) => {
  return sendResponse.executeMethod(
    controller.eduControllers.getsallrecorde,
    req.body,
    req,
    res
  );
}); 

module.exports = router;
