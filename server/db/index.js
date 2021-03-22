//import your db
//import your models
const db = require("./db");
const Campus = require("./models/Campus");
const Student = require("./models/Student");
const faker = require("faker");

//state your model associations (hasOne etc)
Student.belongsTo(Campus);
Campus.hasMany(Student);

// seed function uses faker to generate some data
const seed = async () => {
  // delete data if already exists
  await db.sync({ force: true });

  // generate 2 campus
  const campuses = await Promise.all([
    Campus.create({
      name: "Manhattan",
      imageUrl: faker.image.imageUrl(),
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraphs(),
    }),
    Campus.create({
      name: "Brooklyn",
      imageUrl: faker.image.imageUrl(),
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraphs(),
    }),
    Campus.create({
      name: "Mars",
      imageUrl: faker.image.imageUrl(),
      address: faker.address.streetAddress(),
      description: faker.lorem.paragraphs(),
    }),
  ]);

  console.log(`${campuses.length} of campus(es) were created.`);

  // generate 10 students
  const numOfStudents = 10;
  for (let i = 0; i < numOfStudents; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const imageUrl = faker.image.people();
    const gpa = Math.round(Math.random() * 40) / 10;
    const student = await Student.create({
      firstName,
      lastName,
      email,
      imageUrl,
      gpa,
    });
    student.campusId = campuses[Math.floor(Math.random() * 2)].id;
    await student.save();
  }

  console.log(`${numOfStudents} of student(s) were created`);
};

//export your db and Models (so they all can be imported from a single central location)
module.exports = {
  db,
  seed,
  models: {
    Campus,
    Student,
  },
};
