const router = require("express").Router();
//import models from /db
const {
  models: { Campus, Student },
} = require("../db");
//routes go here

router.get("/campuses", async (req, res, next) => {
  try {
    const campuses = await Campus.findAll({
      include: {
        model: Student,
        require: true,
      },
    });
    if (campuses) {
      res.status(200).send(campuses);
    }
    res.status(400).send({ message: "No campus found" });
  } catch (ex) {
    next(ex);
  }
});

router.get("/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id, {
      include: {
        model: Student,
        require: true,
      },
    });
    if (campus) {
      res.status(200).send(campus);
    }
    res.status(400).send({ message: "No campus found" });
  } catch (ex) {
    next(ex);
  }
});

router.post("/campuses", async (req, res, next) => {
  try {
    const { name, address, imageUrl, description } = req.body;
    const campus = await Campus.create({
      name,
      address,
      imageUrl,
      description,
    });
    const addedCampus = await Campus.findByPk(campus.id, {
      include: { model: Student, require: true },
    });
    res.status(201).send(addedCampus);
  } catch (ex) {
    next(ex);
  }
});

router.delete("/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (campus) {
      await campus.destroy();
      res.status(204).send(campus);
    }
  } catch (ex) {
    next(ex);
  }
});

router.put("/campuses/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const campus = await Campus.findByPk(id);
    if (campus) {
      const { name, address } = req.body;
      const updatedCampus = await campus.update({ name, address });
      res.status(200).send(updatedCampus);
    }
    res.status(400).send(`No campus with id ${id} is found`);
  } catch (ex) {
    next(ex);
  }
});

router.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll({ include: Campus });
    if (students) {
      res.status(200).send(students);
    }
    res.status(400).send({ message: "No student found" });
  } catch (ex) {
    next(ex);
  }
});

router.get("/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: Campus });
    if (student) {
      res.status(200).send(student);
    }
    res.status(400).send({ message: "No student found" });
  } catch (ex) {
    next(ex);
  }
});

router.post("/students", async (req, res, next) => {
  try {
    const { firstName, lastName, email, imageUrl, gpa } = req.body;
    res.status(201).send(
      await Student.create({
        firstName,
        lastName,
        email,
        imageUrl,
        gpa,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.delete("/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.status(204).send(student);
    }
  } catch (ex) {
    next(ex);
  }
});

router.put("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (student) {
      const { firstName, lastName, email } = req.body;
      const updatedStudent = await student.update({
        firstName,
        lastName,
        email,
      });
      res.status(200).send(updatedStudent);
    }
    res.status(400).send(`No student with id ${id} is found`);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
