const express = require("express");
const router = express.Router();
const controller = require("../controller");
const sendResponse = require("../helper/sendResponse");

router.post("/add", (req, res) => {
  return sendResponse.executeMethod(
    controller.salaryController.addSalary,
    req.body,
    req,
    res
  );
});

router.put("/block/:salaryId", (req, res) => {
  return sendResponse.executeMethod(
    controller.salaryController.blockUnblock,
    req.params,
    req,
    res
  );
});

router.put("/edit/:salaryId", (req, res) => {
  return sendResponse.executeMethod(
    controller.salaryController.edit,
    req.body,
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
    controller.salaryController.getAllDetails,
    payload,
    req,
    res
  );
});
router.get("/indvisiable/:salaryId",(req,res)=>{
  return sendResponse.executeMethod(
    controller.salaryController.indvisiable,
    req.body,
    req,
    res
  );
})

router.get("/getsalary", (req, res) => {
  return sendResponse.executeMethod(
    controller.salaryController.gets,
    req.body,
    req,
    res
  );
});

router.get("/getsalary/:salaryId", (req, res) => {
  return sendResponse.executeMethod(
    controller.salaryController.getSalary,
    req.body,
    req,
    res
  );
});


router.get("/gettotal", (req, res) => {
  return sendResponse.executeMethod(
    controller.salaryController.gettotal,
    req.body,
    req,
    res
  );
});

module.exports = router;
