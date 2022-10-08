require("dotenv").config();
const Service = require("../service");
const Helper = require("../helper/validator.js");
const Joi = require("joi");
let Projection = [
  "salaryId",
  "salaryType",
  "isBlocked",
  "createdAt",
  "deletedAt",
  "minSalary",
  "maxSalary",
];

module.exports = {
  addSalary: async (data, req, res) => {
    const schema = Joi.object({
      salaryType: Joi.string().required(),
      minSalary: Joi.string().required(),
      maxSalary: Joi.string().required(),
    });
    let payload = await Helper.verifyjoiSchema(data, schema);
    if (!payload) {
      return { status: "failed", message: "Invalid strings types" };
    } else {
      const data = {
        salaryType: payload.salaryType,
        minSalary: payload.minSalary,
        maxSalary: payload.maxSalary,
      };
      let getdata = await Service.SalaryService.findData(data);
      if (!getdata) {
        if(data.minSalary<data.maxSalary){  
          let create = await Service.SalaryService.createData(data);
          return {
            status: 200,
            message: "Salary range added successfully",
            department: create,
          };
        }
        return {
          status: 201,
          message: "Please enter the maxSalary more than minSalary.",
        };
      
      }
      return {
        status: 400,
        message: "Salary range already exists.",
      };
    }
  },

  blockUnblock: async (d) => {
    let data = {
      salaryId: d.salaryId,
    };
    let salary = await Service.SalaryService.getData(data);
    if (salary.isBlocked === 0) {
      let blockSalary = await Service.SalaryService.block(data);
      return {
        status: 200,
        message: "Successfully blocked the salary",
        data: blockSalary,
      };
    } else {
      let unBlockSalary = await Service.SalaryService.Unblock(data);
      return {
        status: 201,
        message: "Successfully Unblocked the salary",
        data: unBlockSalary,
      };
    }
  },

  edit: async (d, req, res) => {
    const schema = Joi.object({
      minSalary: Joi.string().required(),
      maxSalary: Joi.string().required(),
      salaryType:Joi.string().optional(),
    });
    let payload = await Helper.verifyjoiSchema(d, schema);
    if (!payload) {
      return { status: "failed", message: "Invalid strings types" };
    } else {
      let data = {
        salaryId: req.params.salaryId, 
        salaryType:payload.salaryType,
        minSalary: payload.minSalary,
        maxSalary: payload.maxSalary,
      };
      let user = await Service.SalaryService.getData(data);
      if (user) {
        let user = await Service.SalaryService.edit(data);
        return {
          status: "Success",
          message: "Sucessfully edited the data.",
          data: user,
        };
      }
    }
    return {
      status: "Failed",
      message: "Not able to edit data.",
    };
  },

  getAllDetails: async (payloadData) => {
    const schema = Joi.object().keys({
      limit: Joi.number().required(),
      skip: Joi.number().required(),
      sortBy: Joi.string().optional(),
      orderBy: Joi.string().optional(),
      search: Joi.string().optional().allow(""),
      isBlocked: Joi.number().optional().allow(""),
      maxSalary: Joi.string().optional().allow(""),
      minSalary: Joi.string().optional().allow(""),
      salaryType: Joi.string().optional().allow(""),
    });
    let payload = await Helper.verifyjoiSchema(payloadData, schema);
    let salary = await Service.SalaryService.getAllDetails(
      payload,
      Projection,
      parseInt(payload.limit, 10) || 10,
      parseInt(payload.skip, 10) || 0
    );
    if (salary) {
      return salary;
    } else {
      return {
        rows: [],
        count: 0,
      };
    }
  },
  indvisiable: async (data, req, res) => {
    const userData = {
      salaryId: req.params.salaryId,
    };

    let salaryDeatil = await Service.SalaryService.indvisiable(userData);
    if (salaryDeatil) {
      return {
        status: 200,
        message: "salaryDeatil Get Successfully",
        notification: salaryDeatil,
      };
    } else {
      return {
        rows: [],
        count: 0,
      };
    }
  },
  gets: async (d, req, res) => {
    let user = await Service.SalaryService.getDatas();
      return {
       user:user
      };
},
getSalary: async (d, req, res) => {
  let data={
    salaryId: req.params.salaryId,
  }
  let user = await Service.SalaryService.findDatas(data);
    return {
     user:user 
    };
},
gettotal: async (d, req, res) => {
  let user = await Service.SalaryService.getDatas();
  let Unblock=user.count
  let user1 = await Service.SalaryService.getDatass();
  let block=user1.count
  let total=Unblock+block
    return {
      Unblock:Unblock,
      block:block,
     total:total
    };
  }
};
