const { db, seed } = require("./db");

async function main() {
  await seed();
}

main()
  .then(() => {
    console.log("Seeded database.");
    db.close();
  })
  .catch((err) => console.log(err));
