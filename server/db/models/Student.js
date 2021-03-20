const { STRING, TEXT, DECIMAL } = require("sequelize");
const Sequelize = require("sequelize"); //for things like Sequelize.STRING
//import your db
const db = require("../db.js");

//define your model
const Student = db.define("student", {
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Student first name can not be empty",
      },
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Student last name can not be empty",
      },
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Student email can not be empty",
      },
      isEmail: true,
    },
  },
  imageUrl: {
    type: STRING,
    allowNull: false,
    defaultValue: "../../public/student.jpg",
  },
  gpa: {
    type: DECIMAL(2, 1),
    validate: {
      max: 4.0,
      min: 0.0,
    },
  },
});

//define any class or instance methods

//export your model
module.exports = Student;
