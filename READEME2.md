# Backend Setup Using Express

## Install base Dependencies 
1. npm i node
2. npx gitignore node
3. npm init -y (creates JSON file)
4. npm i express
5. npm i -D nodemon (-D means loaded under devDependencies)
6. npm i -g fkill-cli (example use => fkill:500)
7. npm i -D eslint
   1. npx eslint --init
      1. problems
      2. common js
      3. none
      4. no
      5. node
      6. json
      7. yes (eslint)
8. As Needed install
   1. npm i cors
   2. npm i helmet
   3. npm i dotenv (add .env file inside put PORT=5000 and NODE_ENV=developement)
9. npm i sqlite3

## KNEX files
10.  npm i knex or npm i -g knex (for globlal)
    1.  in package.json add  
        ```json
        1."cleanup": "knex seed:run --specific=01-cleanup.js",
        1.  "migrate": "knex migrate:latest",
        2.  "rollback": "knex migrate:rollback",
        3.  "reset": "npm run rollback && npm run migrate && npm run seed",
        4.  "seed": "knex seed run"
        ```
     2.  npm i -D knex-cleaner
     3.  knex init
     4.  knex migrate:make create-<name>-table
     5.  knex migrate latest (later user "knex migrate:rollback" as needed)
     6.  knex seed:make <01-users> put your name choice inside <...>
     7.  knex seed:run

## Install base FILES & FOLDERS
Here you are scafolding the base Express aplication then worry about database items
11. Root folder files
    1.  chart.drawio
    2.  index.js
    3.  knexfile.js
    4.  .env (if not done above)
12. Other folders with other folders or files in them 
    1.  api folder
        1.  server.js file
        2.  resource folder custom! Examples: recipes or cars or users etc
            1.  customName-router.js file
            2.  customName-model.js file
            3.  customName-middleware.js file

## Build out base files guts
13. index.js
14. server.js
15. knexfile.js
16. router.js (stubb at first then start debugger and server to test)

## Set Up Debugger
16. start debugger
    1.  select "Creat a launch.json file."
    2.  selctt node.js from the drop down list
    3.  review line 14 is \\index.js or appropriate for project
    4.  add debugger to gitignore file
        1.  on last line of .gitignore add ".vscode"
    5.  press f5 to start debugger
    6.  remember to restart it after each code change. 

## TEST Server working with stubbed router & model
17. stub out model.js file with something simple example:
```javascript
async function getRecipeById(recipe_id){
    return Promise.resolve(`Here's your recipe id ${recipe_id}`);//stubb
}
module.exports = {getRecipeById};
```
## Adding DATA & knex Migrations
1. Create data folder in root folder
2. Add & build out __db-config.js__ in __data__ folder
3. npx knex migrate:make initial-migration
4. Go to the newly create migrations js file and build it out. They can be huge. take your time
5. creat __seeds__ folder in the __data__ folder
6. inside __seeds__ add __01-cleanup.js__ (should match package.json) & build it out
    ```javascript
    const {clean} = require('knex-cleaner');

    exports.seed = function (knex) {
        return clean(knex, {
            mode:'truncate',
            ignoreTables: ['knex_migrations', 'knex_migrations_lock']
        });
    };
    ```
7. add __02-make-<resourceName>.js__ to __seeds__ 
   1. example 02-make-recipes.js
   2. example 02-make=cars.js
   3. stub it out & test
   ```javascript
    exports.seed = function (knex) {
    };
   ```
   4. run npm rollback
      1. save file if needed
      2. npm run migrate (to capture changes)
      3. npm run seed (no seeds will be inserted if the file is not built out yet, which it shouldn't be)
      4. npm run cleanup (to test truncating)
8.  Check Tables in SQLite3
    1.  open sqlite3 and use it to open the db3 data file. In the case of this project is was recipes.db3
    2.  verify each table's columns have the appropriate constraints, keys, columns etc. desired.
9.  Add seeds... if you want... or wait until the end and add them. 
   
   ## use sql editor to build out the Model Functions. 

10. [review of normalized data ](https://lambdaschool.instructure.com/courses/1692/pages/objective-1-explain-data-normalization?module_item_id=618670)
11. Normalization Guidelines
    - Each record has a primary key
    - No fields are repeated
    - All fields relate directly to the key data
    - Each field entry contains a single data point
    - There are no redundant entries