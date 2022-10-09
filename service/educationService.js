const Model = require("../model");
const { Op } = require("sequelize");

exports.createData = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.education
      .create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find the User", error);
      });
  });
};

exports.findData = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.education
      .findOne({
        where: {
          eduName: data.eduName,
        },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find the department.", error);
      });
  });
};

exports.getData = (data) => {
  return new Promise((resolve, reject) => {
    Model.education
      .findOne({
        where: { eduId: data.eduId },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

//block the educatioin
exports.block = (data) => {
  return new Promise((resolve, reject) => {
    Model.education
      .update({ isBlocked: 1 }, { where: { eduId: data.eduId } })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

//block the education
exports.Unblock = (data) => {
  return new Promise((resolve, reject) => {
    Model.education
      .update({ isBlocked: 0 }, { where: { eduId: data.eduId } })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

exports.getAllDetails = (criteria, projection, limit, offset) => {
  let where = {};
  let order = [
    [
      criteria.sortBy ? criteria.sortBy : "createdAt" || "eduName" || "eduId",
      criteria.orderBy ? criteria.orderBy : "ASC" || "DESC",
    ],
  ];
  if (criteria && criteria.search) {
    where = {
      [Op.or]: {
        eduName: {
          [Op.like]: "%" + criteria.search + "%",
        },
      },
    };
  }
  if (criteria && criteria.eduName) {
    where.eduName = criteria.eduName;
  }

  if (criteria["isBlocked"] === 1) where.isBlocked = 1;
  if (criteria["isBlocked"] === 0) where.isBlocked = 0;
  return new Promise((resolve, reject) => {
    Model.education
      .findAndCountAll({
        limit,
        offset,
        where: where,
        order: order,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

exports.edit = (d) => {
  return new Promise((resolve, reject) => {
    Model.education
      .update(
        {
          eduName: d.eduName,
        },
        {
          where: { eduId: d.eduId },
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
exports.getDatas = (data) => {
  return new Promise((resolve, reject) => {
    Model.education.findAndCountAll({
      where: { isBlocked:0},
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};
exports.getDatasBlocked = (data) => {
  return new Promise((resolve, reject) => {
    Model.education.findAndCountAll({
      where: { isBlocked:1},
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

exports.getDatasUnblock = (data) => {
  return new Promise((resolve, reject) => {
    Model.education.findAndCountAll({
      where: { isBlocked:0},
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

exports.getDatasall = (data) => {
  return new Promise((resolve, reject) => {
    Model.education.findAndCountAll({
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};


exports.deleteUser = (data) => {
  return new Promise((resolve, reject) => {
    Model.employeeEducation.destroy({
      where: { employeeId: data.id },
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