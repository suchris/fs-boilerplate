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
      return res.status(200).send(campuses);
    }
    return res.status(400).send({ message: "No campus found" });
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
      return res.status(200).send(campus);
    }
    return res.status(400).send({ message: "No campus found" });
  } catch (ex) {
    next(ex);
  }
});

router.post("/campuses", async (req, res, next) => {
  try {
    const campus = await Campus.create(req.body);
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
    const campus = await Campus.findByPk(req.params.id);
    if (campus) {
      await campus.update(req.body);
      const updatedCampus = await Campus.findByPk(campus.id, {
        include: { model: Student, require: true },
      });
      res.status(200).send(updatedCampus);
    }
  } catch (ex) {
    next(ex);
  }
});

router.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll({ include: Campus });
    if (students) {
      return res.status(200).send(students);
    }
    return res.status(400).send({ message: "No student found" });
  } catch (ex) {
    next(ex);
  }
});

router.get("/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: Campus });
    if (student) {
      return res.status(200).send(student);
    }
    return res.status(400).send({ message: "No student found" });
  } catch (ex) {
    next(ex);
  }
});

router.post("/students", async (req, res, next) => {
  try {
    res.status(201).send(await Student.create(req.body));
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
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.status(200).send(await student.update(req.body));
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
