const Model = require("../model");
const { Op } = require("sequelize");

exports.findUserByEmail = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.UserModel.findOne({
      where: {
        email: data.email,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find the User", error);
      });
  });
};

exports.findUserByNumber = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.UserModel.findOne({
      where: {
        phoneNumber: data.phoneNumber,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find the User", error);
      });
  });
};

exports.registration = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.create(data).then((result) => {
      resolve(result);
    });
    // .catch((error) => {
    //   console.log("Unable to Register the User");
    // });
  });
};

exports.findUserByFacebookID = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.UserModel.findOne({
      where: {
        facebookID: data.id,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find the User", error);
      });
  });
};

exports.findUserById = (data) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    Model.UserModel.findOne({
      where: {
        id: data.id,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("User Not Exits in Database", error);
      });
  });
};

exports.updateUser = (data) => {
  console.log(data); /* user ka data */
  return new Promise((resolve, reject) => {
    Model.UserModel.update(
      {
        gender: data.gender,
        age: data.age,
        address: data.address,
      },
      {
        where: {
          id: data.id,
        },
      }
    )
      .then((result) => {
        console.log("RESULT", result); /* 1 */
        resolve(result);
        return result;
      })
      .catch((error) => {
        console.log("Unable to Update User", error);
      });
  });
};

exports.countuserByPhoneNumber = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.findAndCountAll({
      where: {
        phoneNumber: {
          [Op.ne]: 0,
        },
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to count the user");
      });
  });
}; 

exports.countuserByEmail = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.findAndCountAll({
      where: {
        [Op.and]: [
          {
            email: {
              [Op.like]: "%@%",
            },
            googleId: {
              [Op.eq]: 0,
            },
          },
        ],
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to show count of User");
      });
  });
};

exports.getUserBygoogleId = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.findAndCountAll({
      where: {
        googleId: {
          [Op.ne]: 0,
        },
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Show the Count of the Users");
      });
  });
};

exports.getUserByFacebookId = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.findAndCountAll({
      where: {
        facebookID: {
          [Op.ne]: 0,
        },
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Show the Count of the Users");
      });
  });
};

exports.get = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.findOne({
      where: { id: data.id },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

//delete a person
exports.deleteUser = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.destroy({
      where: { id: data.id },
      // data
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

//block the person  check
exports.blockperson = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.update({ Isblocked: 1 }, { where: { id: data.id } })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};



//block the person  check
exports.Unblockperson = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.update({ Isblocked: 0 }, { where: { id: data.id } })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

exports.updateData = (newdata) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.update(
      {
        name: newdata.name,
        phoneNumber: newdata.phoneNumber,
      },
      {
        where: {
          id: newdata.id,
        },
      }
    )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

//-------------association----------------
Model.UserModel.hasMany(Model.employeeDept, { foreignKey: "employeeId" });
Model.employeeDept.hasMany(Model.employeeEducation, {
  foreignKey: "empdeptId",
});
Model.employeeEducation.hasMany(Model.employeeSalary, {
  foreignKey: "empEduId",
});

exports.userDetails = () => {
  return new Promise((resolve, reject) => {
    Model.UserModel.findAll({
      include: [
        {
          model: Model.employeeDept,
          include: [
            {
              model: Model.employeeEducation,
              include: [
                {
                  model: Model.employeeSalary,
                },
              ],
            },
          ],
        },
      ],
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};



Model.UserModel.hasMany(Model.employeeDept, { foreignKey: "employeeId" });
Model.employeeDept.hasMany(Model.employeeEducation, {
  foreignKey: "empdeptId",
});
Model.employeeEducation.hasMany(Model.employeeSalary, {
  foreignKey: "empEduId",
});

exports.getAllAdmins = (criteria, limit, offset) => {
  let where = {};
  let order = [
    [
      criteria.sortBy ? criteria.sortBy : "createdAt"||"name"||"image"||"title"||"email",
      criteria.orderBy ? criteria.orderBy : "ASC"||"DESC",
    ],
  ];
  if (criteria && criteria.search) {
    where = {
      [Op.or]: { 
        name: {
          [Op.like]: "%" + criteria.search + "%",
        },
        email: {
          [Op.like]: "%" + criteria.search + "%",
        },
      },
    };
  }
  if (criteria && criteria.title) {
    where.title = criteria.title;
  }
  
  if (criteria["Isblocked"] === 1) where.Isblocked = 1;
  if (criteria["Isblocked"] === 0) where.Isblocked = 0;
  return new Promise((resolve, reject) => {
    Model.UserModel.findAndCountAll({
      limit,
      offset, 
      where: where,
      order: order,
      include: [
        {
          model: Model.employeeDept,
          include: [
            {
              model: Model.employeeEducation,
              include: [
                {
                  model: Model.employeeSalary,
                },
              ],
            },
          ],
        },
      ],
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};