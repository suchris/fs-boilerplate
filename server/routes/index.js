const router = require("express").Router();
//import models from /db
const {
  models: { Campus, Student },
} = require("../db");
//routes go here

router.get("/campuses", async (req, res, next) => {
  try {
    const campuses = await Campus.findAll({
      /*you dont need to include the students when you're getting all campuses, especially if you're also getting all the students when you first start up the app. it essentially means you have the students and campuses multiple times on your front end. */
      include: {
        model: Student,
        require: true,
      },
    });
    if (campuses) {
      res.status(200).send(campuses);
    } else {
      res.status(400).send({ message: "No campus found" });
    }
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
    } else {
      res.status(400).send({ message: "No campus found" });
    }
  } catch (ex) {
    next(ex);
  }
});

router.post("/campuses", async (req, res, next) => {
  try {
    const { name, address } = req.body;
    const campus = await Campus.create({
      name,
      address,
    });
    /*when you're first adding a campus, there aren't any students to include, so getting the campus again isn't necessary */
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
    //should handle what happens if you don't find a campus
  } catch (ex) {
    next(ex);
  }
});

router.put("/campuses/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const campus = await Campus.findByPk(id);
    if (campus) {
      const { name, address, imageUrl, description } = req.body;
      const updatedCampus = await campus.update({
        name,
        address,
        imageUrl,
        description,
      });
      res.status(200).send(updatedCampus);
    } else {
      res.status(400).send(`No campus with id ${id} is found`);
    }
  } catch (ex) {
    next(ex);
  }
});

router.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll({
      include: { model: Campus, require: true },
    });
    if (students) {
      res.status(200).send(students);
    } else {
      res.status(400).send({ message: "No student found" });
    }
  } catch (ex) {
    next(ex);
  }
});

router.get("/students/:id", async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: Campus });
    if (student) {
      res.status(200).send(student);
    } else {
      res.status(400).send({ message: "No student found" });
    }
  } catch (ex) {
    next(ex);
  }
});

router.post("/students", async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    res.status(201).send(
      await Student.create({
        firstName,
        lastName,
        email,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

router.delete("/students/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (student) {
      await student.destroy();
      res.status(204).send(student);
    } else {
      res.status(400).send(`Cannot find student with id ${id}`);
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
      const { firstName, lastName, email, imageUrl, gpa, campusId } = req.body;
      const updatedStudent = await student.update({
        firstName,
        lastName,
        email,
        imageUrl,
        gpa,
        campusId,
      });
      res.status(200).send(updatedStudent);
    } else {
      res.status(400).send(`No student with id ${id} is found`);
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
