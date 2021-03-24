const { STRING, TEXT } = require("sequelize");
const Sequelize = require("sequelize"); //for things like Sequelize.STRING
//import your db
const db = require("../db.js");

//define your model
const Campus = db.define("campus", {
  name: {
    type: STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Campus name can not be empty",
      },
    },
  },
  imageUrl: {
    type: STRING(200),
    allowNull: false,
    defaultValue: "./public/campus.jpeg",
  },
  address: {
    type: STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Campus address can not be empty",
      },
    },
  },
  description: {
    type: TEXT,
  },
});

//define any class or instance methods

//export your model
module.exports = Campus;
