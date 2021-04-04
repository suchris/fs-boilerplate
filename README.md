<!-- # things that you could put in here

- heroku deploy step-by-step
- other setup step-by-step (npm, git, createdb etc)
- any other how-to notes

# my advice to you

- notice that bundle.js ends up in server/public!
- if you change the name or location of server/public, don't forget to change your webpack too
- if a file exports an UppercaseObject (Sequelize model or React component) capitalize the filename
- optional: make an index.js file in /client/components which imports all your components and then exports them; that way you have one single place you can import them all from. -->

## Application was deployed to heroku

https://csu-juniorproject.herokuapp.com/

## Getting started

This web app allows user to save a recipe and view all saved recipes. Selecting a listed recipe will bring user to the recipe detail page to view video url if there's one available and any note about the recipe.

1. Clone this repository.

   ```sh
   git clone https://github.com/suchris/fs-jpfp.git
   cd fs-jpfp
   ```

2. Install npm packages.

   ```sh
   npm install
   ```

3. Create a postgres database juniorproject_db, then run the following command to seed some data.

   ```sh
   createdb juniorproject_db
   npm run seed
   ```

4. Build client end.

   ```sh
   npm run build
   ```

5. Start server.

   ```sh
   npm run start
   ```

6. Visit http://localhost:3000 to interact with the client.
