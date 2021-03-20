const router = require("express").Router();
//import models from /db
const {
  models: { Campus, Student },
} = require("../db");
//routes go here

router.get("/campuses", async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    if (campuses) {
      return res.status(200).send(campuses);
    }
    return res.status(400).send({ message: "No campus found" });
  } catch (ex) {
    next(ex);
  }
});

router.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    if (students) {
      return res.status(200).send(students);
    }
    return res.status(400).send({ message: "No student found" });
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
