const express = require("express");
const router = express.Router();
const controller = require("../controller");
const sendResponse = require("../helper/sendResponse");

router.post("/addDepartment", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.addDepartment,
    req.body,
    req,
    res
  );
});
router.put("/block/:deptId", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.blockUnblock,
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
    controller.departmentControllers.getAllDetails,
    payload,
    req,
    res
  );
});

router.put("/edit/:deptId", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.edit,
    req.body,
    req,
    res
  );
});

router.get("/get/:deptId", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.get,
    req.body,
    req,
    res
  );
});


router.get("/getdepartment", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.gets,
    req.body,
    req,
    res
  );
});



router.get("/getalltablerecorde", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.getsallrecorde,
    req.body,
    req,
    res
  );
}); 
 
  
router.get("/getDepartmentSalary", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.getDepartmentSalary,
    req.body,
    req,
    res
  ); 
});  
router.get("/getDepartmentSalarylevel1", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.getDepartmentSalarylevel1,
    req.body,
    req,
    res
  ); 
});
router.get("/getDepartmentSalarylevel2", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.getDepartmentSalarylevel2,
    req.body,
    req,
    res
  ); 
});
router.get("/getDepartmentSalarylevel3", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.getDepartmentSalarylevel3,
    req.body,
    req,
    res
  ); 
});

router.get("/getDepartmentSalarylevel4", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.getDepartmentSalarylevel4,
    req.body,
    req,
    res
  ); 
});

router.get("/getDepartmentSalarylevel5", (req, res) => {
  return sendResponse.executeMethod(
    controller.departmentControllers.getDepartmentSalarylevel5,
    req.body,
    req,
    res
  ); 
});

module.exports = router;
